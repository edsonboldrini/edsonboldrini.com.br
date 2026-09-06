> **Nota do orquestrador (verificação independente):** a seção sobre o paco.me
> abaixo afirma, lendo o CSS, que o rodapé tem `border-top` full-bleed. Medindo
> o estilo COMPUTADO num navegador headless a 1280px, o `<footer>` do paco.me
> renderiza **sem borda alguma** — embora a geometria full-bleed seja real
> (1280px = largura da janela). A regra existe na folha mas não pinta nesse
> viewport. Ler CSS e medir o que de fato renderiza dão respostas diferentes;
> as medições da tabela abaixo, feitas por mim, são as que valem.
>
> | Site | Borda no rodapé (computada) | Como separa |
> |---|---|---|
> | joshwcomeau.com | nenhuma | 192px de respiro |
> | paco.me | nenhuma | tipografia pequena/apagada |
> | brittanychiang.com | nenhuma | 14px vs 16px + cor muted |
> | leerob.com | nenhuma | margem de 32px |
> | maggieappleton.com | 1px solid | borda + 66px de padding |
> | rauno.me, brianlovin.com | sem `<footer>` | — |
>
> `<hr>` nos sete sites: **zero**.

# Divisor estrutural vs divisor de lista

Pesquisa somente-leitura (2026-09-06). Foco: como portfólios minimalistas e sites editoriais marcam a **fronteira do rodapé/fim de conteúdo** de forma distinta das regras entre itens de lista. Verificação via HTML/CSS servidos; detalhes de layout só no viewport (hover, paint) marcados como **não verificado**.

Contexto deste site: `.work-item + .work-item` e `.site-footer` usam o mesmo traço (`1px solid var(--line)`), na mesma largura de coluna — o olho lê o rodapé como “mais um item”.

---

## 1. Exemplos concretos

### 1. [Brittany Chiang](https://brittanychiang.com/)

- **Fronteira do fim:** `<footer>` **sem** `border-top` (nenhuma classe `border-t` na página). Separação por **espaço** (`pb-16`) + **mudança tipográfica** (`text-sm text-slate-500` / links `text-slate-400`) — colofão muted, não chrome de seção.
- **Lista (Experience/Projects):** itens com `mb-12` / seções `mb-16`–`lg:mb-36`; **sem** hairlines entre rows. Borders só em thumbs de projeto (`border-2 border-slate-200/10`), outra espécie.
- **Verificado:** markup + classes Tailwind no HTML.

### 2. [Paco Coursey](https://paco.me/)

- **Contato (“Connect”):** ainda dentro de `<main>` / prose — **sem linha**; só spacer + heading.
- **Rodapé chrome:** `footer { border-top: 1px solid var(--mono5); height: 48px; width: calc(100% + body-margins); left: -margin }` — regra **full-bleed** sob a coluna de conteúdo, barra baixa de colofão (“Pray at the altar… / 2025”).
- **Listas (Projects/Writing):** `min-height: 84px` + spacers; **sem** `border` entre itens.
- **Verificado:** CSS em `/_next/static/chunks/…css`. Espécie: linha de **chrome de página**, não de lista.

### 3. [Rauno Freiberg](https://rauno.me/)

- **Fronteira:** **não há** `<footer>` de contato. A página termina no conteúdo; chrome lateral (minimap) não é divisor tipográfico.
- Contato/links sociais, se existirem noutro sítio do site: **não verificado** nesta passagem (home não fecha com regra de rodapé).
- **Verificado:** ausência de footer + fim do body no HTML da home.

### 4. [Lee Robinson](https://leerob.com/)

- **Fronteira da home:** sem bloco Contato/rodapé clássico. Fecha com aside visual (imagem/vídeo); o único `<footer class="article-margin-notes">` está vazio (notas de margem, não colofão).
- Separação de seções (Notes / Blogs): **hierarquia tipográfica + whitespace**, não hairline de lista.
- **Verificado:** HTML da home. Tratamento visual fino do aside vs texto: parcialmente **não verificado** (depende de CSS de layout).

### 5. [Maggie Appleton](https://maggieappleton.com/)

- **Rodapé:** `.styled-footer { padding: var(--space-xl) 0; border-top: 1px solid var(--color-gray-300); }` — linha + **padding generoso** (`--space-xl`). Cinza light: `#d3d3d1`.
- **Listas do garden (Essays/Notes):** no HTML da home, **sem** classes `border` nos itens; agrupamento por headings + espaço.
- **Verificado:** CSS Astro + tokens. Se algum card interno usa borda em páginas internas: **não verificado**.

### 6. [Brian Lovin](https://brianlovin.com/)

- **Home:** **sem** `<footer>`. Writing / Projects / Elsewhere são seções com título + lista; itens **sem** `border-t` / `divide-y`.
- Fronteira de “fim”: o documento simplesmente acaba após a última lista — **só espaço e tipografia**.
- **Verificado:** HTML da home. Página `/about` e chrome global: **não verificado** nesta passagem.

### 7. [Josh W. Comeau](https://www.joshwcomeau.com/)

- **Rodapé:** classe `w1e2q9l8` — `padding-top: 192px` + `background: linear-gradient(to bottom, var(--color-sky-from), var(--color-sky-to))`. Fronteira por **faixa atmosférica / mudança de fundo**, não por hairline de lista.
- **Nota para Sala de Corte:** técnica válida como *espécie*, mas **gradiente é proibido** neste projeto — citar só como prova de “outro mecanismo”, não como proposta direta.
- **Verificado:** CSS da home.

### 8. [ped.ro](https://ped.ro/)

- **Fronteira:** **sem** `<footer>` e sem `border-top`. Contato embutido no fechamento do texto (links sociais na prosa).
- Espécie: **mudança de papel tipográfico** (fecho narrativo), não regra.
- **Verificado:** HTML da home.

### 9. [s-ings.com](https://www.s-ings.com/) (Stephen Hutchings)

- **Rodapé:** `#footer` é zona densa (Fonts / Art / …) com `py-xl` / tipografia `txt-nano` nos headings; CSS **sem** `border-top` no `#footer`.
- Fronteira por **mudança de função e densidade** (diretório vs artigo), não por o mesmo traço da lista.
- **Verificado:** HTML + `app.css`. Qualquer linha vinda de ancestral/bg: **não verificado** no paint.

### 10. [Frank Chimero](https://frankchimero.com/)

- **Fronteira:** home = nav de projetos; “Profile & Contact” é um item da lista; **sem** footer com regra.
- Separação: **só tipografia + espaço** entre entradas.
- **Verificado:** HTML. Estilos de hover/sublinhado: **não verificado** em detalhe.

---

## 2. Padrões emergentes (por técnica)

| Técnica | O que faz | Trade-off |
| --- | --- | --- |
| **A. Sem linha — só whitespace** | Ratio “entre grupos ≫ dentro do grupo” (Gestalt proximity). | Mais limpo e editorial; exige ritmo generoso; se o padding for curto, o fim “some”. |
| **B. Mudança tipográfica / colofão** | Tamanho menor, cor muted, mono ou weight mais leve marca *paratext*. | Barato e alinhado a portfólio seco; fraco se o rodapé ainda parecer “mais uma seção H2”. |
| **C. Regra full-bleed (chrome)** | Linha que cruza a página / vaza da coluna (ex.: Paco). | Diferencia de lista *inset*; pode competir com minimalismo se a lista também for full-bleed. |
| **D. Regra curta (editorial)** | Traço curto (ex. 3–8ch), não edge-to-edge da coluna. | Clássico de capítulo; precisa disciplina (um só lugar) ou vira ornamento. |
| **E. Mudança de fundo / faixa** | Região com outro `--bg` / elevated (Josh usa gradient — fora das regras daqui). | Separação forte sem hairline de lista; risco de “card” se ganhar radius/sombra. |
| **F. Mudança de papel (contato na prosa / sem footer)** | Fim = última frase ou link, sem chrome. | Máxima secura; pior se o produto precisar de bloco Contato explícito e scaneável. |
| **G. Mesma hairline, só mais grosso/escuro** | Intensidade, não espécie. | **É o anti-padrão deste bug** — o olho ainda lê “item de lista”. |

Literatura alinhada:

- [Tubik — Visual Dividers](https://tubikstudio.com/blog/visual-dividers-user-interface/): full-width = novo capítulo; inset = mesmo capítulo / nova linha; preferir espaço e hierarquia antes de linhas.
- [Blake Crosley — Five Spacing Decisions](https://blakecrosley.com/blog/five-spacing-decisions): “Borders are what spacing looks like when it gives up”; fundo antes de stroke.
- [open-design — typography-hierarchy-editorial](https://github.com/nexu-io/open-design/blob/main/craft/typography-hierarchy-editorial.md): section breaks default = space; separators só para conteúdo *não relacionado* ou identidade.
- Siegel (via [revisão Spaceninja](https://medium.com/@spaceninja/do-siegels-seven-deadly-sins-hold-up-e02b637a20cb)): horizontal rules são **barreiras**, substituto fraco de hierarquia; escalada de separadores quando o whitespace falha.
- Material (M2/M3): full-bleed vs inset dividers codificam níveis diferentes — mesma lição de *espécie* (página M3 overview carregou pouco texto sem JS; princípio confirmado na literatura M2/comunidade e em Tubik).

---

## 3. Princípio tipográfico: espécie ≠ intensidade

Uma regra de **lista** é pontuação *intra-grupo*: diz “ainda estamos no mesmo conjunto; aqui muda o item”. Por isso costuma ser **inset** ou hairline alinhada à medida do texto — continua o mesmo capítulo.

Uma regra (ou ausência dela) de **rodapé / fim** é pontuação *inter-grupo*: diz “acabou o corpo; começa paratexto (contato, colofão, meta)”. Em tipografia editorial, isso é análogo a fim de capítulo / folha / colofão — muda o **papel**, não só o contraste.

Por isso **escurecer ou engrossar o mesmo 1px** falha: o sistema visual classifica pelo *tipo de marca* (comprimento, alinhamento, presença/ausência, papel tipográfico, região), não só pela opacidade. Dois traços da mesma espécie na mesma largura = mesma sintaxe = o rodapé vira “último work-item”.

---

## 4. Três propostas para este site (Sala de Corte)

Restrições: editorial seco; accent `#0b6e4f` / `#3cb88a`; Syne + Source Sans 3 + IBM Plex Mono; whitespace como hierarquia; **proibido** gradiente / glow / sombra / card. Tokens já existentes: `--line`, `--muted`, `--ink`, `--bg`, `--elevated`, `--space-*`, `--font-mono`.

Manter listas como estão (`.work-item + .work-item { border-block-start: 1px solid var(--line); }`) — o bug é só a fronteira do footer.

### Proposta 1 — Recomendada: sem linha + colofão tipográfico

Espécie: **ausência de regra de lista** + demotion tipográfica (padrão Brittany / Brian / ped.ro; Connect do Paco).

```css
.site-footer {
  border-block-start: 0;
  padding-block: var(--space-9, 6rem) var(--space-8, 4rem);
  color: var(--muted);
  font-size: var(--text-sm);
}

.site-footer .section-label,
.site-footer h2 {
  font-family: var(--font-mono);
  font-size: var(--text-xs);
  letter-spacing: 0.06em;
  text-transform: uppercase;
  color: var(--muted);
  font-weight: 500;
}
```

**Por que funciona:** remove a sintaxe de lista; o salto de espaço (`--space-9`) + mono muted marca paratexto. Zero ornamento, 100% alinhado a “whitespace como hierarquia”.

### Proposta 2: regra curta editorial (não full-column)

Espécie: **comprimento** diferente da hairline full-measure dos work-items.

```css
.site-footer {
  border-block-start: 0;
  padding-block: var(--space-8, 4rem) var(--space-8, 4rem);
}

.site-footer::before {
  content: "";
  display: block;
  width: 3rem; /* ~ curto; não atravessa a coluna */
  height: 1px;
  background: var(--ink); /* ou var(--accent) se quiser um único “corte” */
  margin-block-end: var(--space-6, 2rem);
}
```

**Por que funciona:** o olho lê “fim de capítulo”, não “próxima row”. A lista continua com regra *longa* na medida; o fim ganha regra *curta* — diferença de espécie, não só de peso. Accent opcional no traço reforça “Sala de Corte” sem glow.

### Proposta 3: full-bleed estrutural (chrome de página)

Espécie: **extensão / sangria** (padrão Paco), enquanto a lista permanece na medida do conteúdo.

```css
.site-footer {
  border-block-start: 1px solid var(--line);
  /* sangra além da coluna — ajuste ao wrapper real do layout */
  width: 100vw;
  margin-inline-start: calc(50% - 50vw);
  padding-inline: max(var(--space-5, 1.5rem), calc(50vw - (var(--measure-layout) / 2)));
  padding-block: var(--space-7, 3rem) var(--space-8, 4rem);
  background: var(--bg); /* mesmo campo; a espécie é a sangria, não um card */
}
```

**Por que funciona:** a linha do footer corta a *página*; a da lista corta só o *item*. Mesmo token `--line`, mas geometria diferente = espécie diferente. Evitar `background: var(--elevated)` com radius — isso tenderia a card (proibido).

---

## 5. Recomendação operacional

1. Implementar **Proposta 1** (mínimo diff, máximo alinhamento editorial).
2. Se o Contato ainda “flutuar”, acrescentar **Proposta 2** (`::before` curto) — um único traço de capítulo.
3. Reservar **Proposta 3** se o layout passar a ter margens laterais largas onde full-bleed se lê claramente.

Não resolver escurecendo `.site-footer { border-color: … }` ou `border-width: 2px` — isso perpetua o erro de espécie.
