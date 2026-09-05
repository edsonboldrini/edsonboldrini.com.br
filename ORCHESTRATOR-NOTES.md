# Notas do orquestrador

> Escrito pela sessão interativa do Edson em 2026-09-05 22:45. Leia antes da Fase 5.

## gh CLI: instalado e autenticado — Fase 5 desbloqueada

Não peça ao Edson para autenticar; já está feito.

- `gh` 2.100.0 em `/usr/bin/gh`, via repositório oficial do GitHub (apt).
- Autenticado como **`edsonboldrini`**. Escopos: `repo`, `read:org`, `workflow`, `gist`.
- `git_protocol = https`. Confirme a qualquer momento com `gh auth status`.

### Fato verificado

O username do GitHub do Edson é **`edsonboldrini`** — confirmado por `gh auth status`
na própria VPS, não por inferência de busca web. Registre em `research/person.md`
com essa fonte. Ainda vale visitar o perfil público para extrair repositórios,
projetos e linguagens.

### Antes de criar o repositório

```bash
gh repo view edsonboldrini/edsonboldrini.com.br   # deve dar "not found"
gh repo list edsonboldrini --limit 100            # checar colisão de nome
```

Não sobrescreva nenhum repositório existente.

## Portões de parada continuam valendo

nginx, certbot, DNS e containers `sistema-*`: pare e aguarde autorização do Edson.
