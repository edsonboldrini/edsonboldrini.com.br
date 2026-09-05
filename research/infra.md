# Infra verificada pelo orquestrador — 2026-09-05

Apurado por mim (Claude) diretamente, não delegado. É esta a fonte de verdade para
Dockerfile/porta (Fase 4) e nginx/certbot (Fase 7). O `research/infra.md` do worker `audit`
serve como conferência independente.

## Rede
- IPv4 público: `167.235.246.150` (confirmado `curl -4 ifconfig.me`)
- IPv6 público: `2a01:4f8:c010:9847::1`
- `dig +short cortefilme.com.br` → `167.235.246.150`
- `dig +short edsonboldrini.com.br` → **vazio, sem registro A** (bloqueia Fase 6/7)

## Nginx (no host, não em container)
Binário `/usr/sbin/nginx`, ativo. Um único site habilitado:
`sites-enabled/cortefilme -> sites-available/cortefilme-cutover`.

### Server blocks existentes

| server_name | Porta | O que faz |
|---|---|---|
| `sistema.cortefilme.com.br` **e `_`** | 443 ssl | **estático** SPA: root `/home/edson/Developer/cortefilme/sistema/web/dist/spa` + `proxy_pass` para `hasura`, `api_suporte`, `api_calculo` |
| `api.cortefilme.com.br` | 443 ssl | proxy para `hasura`, `api_suporte`, `api_calculo` |
| `cortefilme.com.br www.cortefilme.com.br` | 443 ssl | **estático**: root `/home/edson/Developer/cortefilme/site-landing/beta.cortefilme.com.br`, `try_files ... /index.html` |
| `sistema.cortefilme.com.br` **e `_`** | **80 `default_server`** | `return 301 https://sistema.cortefilme.com.br$request_uri` |
| `api.` / apex+www | 80 | redirect 301 p/ https (gerados pelo Certbot) |

### ⚠️ DOIS FATOS CRÍTICOS PARA A FASE 7

1. **O bloco do `sistema` é o `default_server` e tem `server_name ... _` (catch-all).**
   → Meu novo bloco **NÃO PODE** usar `default_server` em 80 nem 443: duplicaria a diretiva e
   o `nginx -t` falha (ou pior, rouba o catch-all do CorteFilme).
   → Hoje, qualquer Host desconhecido em :80 é redirecionado para `sistema.cortefilme.com.br`.
2. **Consequência para o Certbot:** o desafio HTTP-01 de `edsonboldrini.com.br` cairia nesse
   catch-all e seria redirecionado → falha. Por isso a ordem obrigatória é:
   **(a)** DNS resolvendo → **(b)** criar o server block :80 com `server_name edsonboldrini.com.br
   www.edsonboldrini.com.br` → **(c)** `nginx -t` + reload → **(d)** só então rodar o certbot.
   Com o server_name explícito, o nginx casa o Host antes de cair no `_`.

## TLS / Certbot
- Autenticador e instalador: **`nginx`** (`/etc/letsencrypt/renewal/*.conf`).
- **Um único certificado** cobrindo 4 domínios:
  `sistema.cortefilme.com.br`, `api.cortefilme.com.br`, `cortefilme.com.br`, `www.cortefilme.com.br`
  em `/etc/letsencrypt/live/sistema.cortefilme.com.br/`. Expira **2026-10-10**.
- Renovação automática: `certbot.timer` **enabled + active**.

> **Decisão de arquitetura (minha):** emitir um **certificado NOVO e separado** para
> `edsonboldrini.com.br` + `www.`, com lineage próprio. **Não expandir** o certificado do
> CorteFilme — expandir significa reemitir o cert que serve o CorteFilme em produção, e uma
> falha ali derruba os quatro domínios. Lineage separado é isolado e reversível.

## Portas
Ocupadas em loopback: `5432`, `5433` (postgres), `8080` (hasura), `8081`, `8082` (APIs),
`11434` (ollama). Públicas: `22`, `80`, `443`.

Faixa 3000-3999: `3000`, `3001`, `3100`, `3200`, `3210`, `3333` — **todas livres**.

> **Porta escolhida: `3100`**, bind exclusivo em `127.0.0.1:3100`.
> (Evitei 3000/3001 de propósito: são as portas que qualquer `npm run dev` ocupa por hábito,
> e um conflito futuro derrubaria o site em produção.)

## Containers (baseline para o Portão 1)
Todos `Up`, todos com bind só em `127.0.0.1`:

| Container | Porta |
|---|---|
| `sistema-hasura-1` | 127.0.0.1:8080->8080 |
| `sistema-postgres-1` | 127.0.0.1:5432->5432 (healthy) |
| `sistema-postgres-prod-1` | 127.0.0.1:5433->5432 (healthy) |
| `sistema-api-suporte-1` | 127.0.0.1:8081->8081 |
| `sistema-api-calculo-1` | 127.0.0.1:8082->8082 |

**Nenhum destes pode ser alterado, reiniciado ou recriado.**
O CorteFilme apex é **estático em disco** — não depende de container nenhum.

## Toolchain do host
- Node do sistema: **v18.20.8 (EOL)** — insuficiente. Instalei **Node v22.23.2 via nvm**
  (`~/.nvm`, default 22) só para o meu shell. **Não mexi no Node do sistema**, para não
  arriscar nada que o CorteFilme use.
- `gh` **JÁ ESTÁ instalado** (v2.100.0) e **JÁ autenticado** como `edsonboldrini`
  (scopes: gist, read:org, repo, workflow). → A pré-auditoria errou nisso; a Fase 5 **não**
  precisa de `apt install` nem de login interativo do Edson.
