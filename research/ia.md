# Arquitetura de informação — edsonboldrini.com.br

Decidido pelo orquestrador (Claude) na Fase 2. **Contrato vinculante para os workers da Fase 3.**
Todo fato aqui é rastreável a `research/person.md` (com prioridade para o ADENDO DO ORQUESTRADOR).

## Princípio que governa tudo

O material verificado sobre o Edson é **bom, porém finito**. A tentação óbvia é esticá-lo com
seções de enchimento (skills em barrinha, "serviços", blog vazio, badges). Isso é exatamente o
que faz um portfólio parecer gerado por IA. **A resposta é o oposto: um site curto e denso, em
que cada linha é verdadeira e específica.** Menos superfície, mais sinal.

Corolário: **é proibido criar seção que não tenha conteúdo real para sustentá-la.**
Sem blog, sem "depoimentos", sem "serviços", sem grade de logos, sem % de proficiência.

## Idioma: inglês (`lang="en"`)

Decisão minha, com base em evidência: toda a autoapresentação pública do Edson é em inglês
(README do GitHub, `resume.json`, bio do X, bio do Instagram) e ele trabalha numa empresa de
Nova York (Superset). Inglês maximiza alcance para recrutadores e para LLMs.
→ **Ponto de reversão barato:** se o Edson preferir PT-BR, é troca de `content/` + `lang`,
sem mexer em componente nenhum. **Sinalizado para decisão dele no relatório final.**

## Páginas e URLs

| URL | Página | Por quê |
|---|---|---|
| `/` | Home — a composição inteira | Todo o conteúdo essencial numa página. Um leitor (ou um agente) resolve tudo num único fetch. |
| `/work/cortefilme` | Case study do CorteFilme | Único projeto com profundidade real e verificável. Merece página própria. |
| `/404` | Not found | Exigido pelo Portão 2. |
| `/sitemap.xml`, `/robots.txt`, `/llms.txt` | Máquinas | Fase 3, worker `seo`. |

**Não criar:** `/blog`, `/uses`, `/now`, `/services`, `/resume`. Não há conteúdo verdadeiro.
`/about` **não** vira página separada — vira seção da home (o conteúdo não dá uma página inteira).

## Seções da home, em ordem

1. **Hero** — nome, uma linha de posicionamento, localização, dois links primários (GitHub, LinkedIn).
2. **About** — 2 parágrafos curtos, primeira pessoa. Quem é, como trabalha, onde está.
3. **Selected Work** — 4 itens em *linha de case* (padrão do `design.md`), não cards.
4. **Experience** — lista tipográfica de empresas, **sem datas** (ver trava abaixo).
5. **Open Source** — 2 repos originais, com honestidade de escala. Seção pequena.
6. **Contact** — email + perfis. Sem formulário (não há backend).

## Selected Work — os 4 escolhidos, e por quê

| # | Item | Papel | Por que entra | Fonte |
|---|---|---|---|---|
| 1 | **CorteFilme** | Criador / dono | Único produto que é **dele**, confirmado no registro.br. Otimiza corte de película solar e reduz desperdício de rolo — problema concreto, resultado explicável. É a âncora do site. | registro.br + cortefilme.com.br |
| 2 | **Superset** | Software engineer (atual) | Cargo atual, empresa real de NYC. Mostra o presente. | bio X + Instagram (autorais) |
| 3 | **Club Trip (Além)** | Construiu a maior parte | Produto de assinatura nomeado — específico, não genérico. | `resume.json` (autoral) |
| 4 | **Le Card — app de pagamento** | Construiu do zero | Mobile + terminal Bluetooth: o item mais tangível de engenharia embarcada/pagamentos. | `resume.json` (autoral) |

**Fora do Selected Work, de propósito:** Dersalis e Conceptho vão só para *Experience*
(bons, mas o item mais forte de cada um se sobrepõe aos de cima); Pontal Store e 4Eat ficam
fora (`[NAO CONFIRMADO]`).

### Trava de honestidade sobre o trabalho na Superset
O trabalho dele lá é proprietário. O site diz **onde ele trabalha e o que a empresa faz** —
**nunca** reivindica feature ou métrica do produto da Superset. Enquadrar como cargo, não como
portfólio de entregas.

## Travas de conteúdo (Portão 7 — não negociáveis)

**PROIBIDO no site:**
- Endereço, CEP, telefone, idade, data de nascimento *(PII — vem do `resume.json`)*.
- **Formação acadêmica.** É desconhecida. "University of Oklahoma" no `resume.json` é
  boilerplate do template JSON Resume. **Nunca publicar.**
- **Datas de emprego.** As do `resume.json` se sobrepõem e são inconsistentes. Experience sai
  **sem datas**, só na ordem cronológica (mais recente primeiro).
- Autoria de plugins Flutter que são **fork** (`flutter_inapp_purchase`, `FlutterCieloLioSDK`,
  `flutter-rx-ble`, `flutter_workmanager`, `tcc-proxy`).
- Contagem de seguidores, estrelas, "Arctic Code Vault", Pontal Store, 4Eat.
- Números de negócio do CorteFilme (clientes, receita) — **não temos nenhum**. Não inventar.
- Qualquer superlativo sem lastro ("apaixonado por código", "ninja", "10x").

## Headline do hero (baseada em fato)

> **Edson Boldrini**
> Software engineer. I build products end to end — and I run one.
> *Vitória, Brazil · Currently at Superset · Creator of CorteFilme*

Cada fragmento tem lastro: "run one" = CorteFilme (registro.br); "at Superset" = bio autoral;
localização = API do GitHub. Sem adjetivo não verificável.

## Metadata por página

| | `/` | `/work/cortefilme` |
|---|---|---|
| `title` | `Edson Boldrini — Software Engineer` | `CorteFilme — Edson Boldrini` |
| `description` | Full-stack software engineer in Vitória, Brazil. TypeScript, Node, React and Flutter. Currently at Superset; creator of CorteFilme. | How I built CorteFilme, a SaaS that cuts window-film waste for Brazilian installers. |
| `canonical` | `https://edsonboldrini.com.br/` | `https://edsonboldrini.com.br/work/cortefilme` |
| OG | `summary_large_image`, imagem gerada em `opengraph-image.tsx` | idem |

`metadataBase = new URL("https://edsonboldrini.com.br")`. Sem keyword stuffing.

## JSON-LD — só o que se sustenta

| Schema | Onde | Conteúdo |
|---|---|---|
| `Person` | `/` | `name`, `url`, `jobTitle`, `address` (só `addressLocality`/`addressRegion`/`addressCountry`), `email`, `knowsAbout`, `worksFor` (Organization Superset), `sameAs` → github, linkedin, x, instagram |
| `WebSite` | `/` | `name`, `url`, `inLanguage: en` |
| `ProfilePage` | `/` | `mainEntity` → o `Person` |
| `CreativeWork` | `/work/cortefilme` | O CorteFilme é **produto/SaaS**, não repositório público → `CreativeWork`, **não** `SoftwareSourceCode`. |

**Não usar** `SoftwareSourceCode` nos repos de open source: são experimentos de 0-1 estrela;
marcar como obra de destaque seria inflar. **Sem `EducationalOccupationalCredential`** (formação
desconhecida). **Sem `Rating`/`Review`** (não existem).

## Descoberta por LLM/agente

O HTML servido por `curl` (sem JS) tem que responder, em prosa:
- *Who is Edson Boldrini?* → hero + about
- *What does he do?* → posicionamento + Superset
- *What has he built?* → Selected Work, com o CorteFilme explicado
- *Where's his GitHub/LinkedIn?* → links `<a href>` reais no contato **e** em `sameAs`

Consistência de entidade: a string **"Edson Boldrini"** idêntica em `<title>`, `<h1>`,
JSON-LD `Person.name` e `llms.txt`. `llms.txt` é **complemento**, nunca substituto —
nenhum fato pode existir só nele.

## Estratégia canônica

- Canônica: **`https://edsonboldrini.com.br`** (apex, com barra final na home).
- `www.edsonboldrini.com.br` → **301** para o apex (no nginx, Fase 7).
- HTTP → 301 HTTPS. `sitemap.xml` e `<link rel=canonical>` usam **só** a forma apex.
- Uma URL por conteúdo. Sem `index.html`, sem parâmetros, sem trailing-slash duplo.
