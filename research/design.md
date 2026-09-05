# Pesquisa de portfólios — Edson Boldrini

Pesquisa web (2024–2026): portfólios de software engineers sênior/staff, product engineers e founders. Extração de princípios — não cópia visual.

---

## 1. Referências

### [Brittany Chiang](https://brittanychiang.com/)
Sticky bio + experiência em timeline; curadoria de poucos projetos; dark navy com um único accent; a11y e performance como prova de craft. O site *é* o argumento de senioridade frontend.

### [Paco Coursey](https://paco.me/)
Tipografia e whitespace extremos; projetos como uma linha cada (nome + promessa); craft page de micro-interações. Demonstra que densidade baixa + precisão > galeria barulhenta. (Webmaster Linear / ex-Vercel DS.)

### [Rauno Freiberg](https://rauno.me/)
Identidade de staff design engineer via interação e atmosfera, não via lista de skills. Projetos apresentados com frieza editorial; motion com intenção de produto.

### [Josh W. Comeau](https://www.joshwcomeau.com/)
Autoridade por escrita e demos interativas; personalidade tipográfica e motion didático. O “portfólio” é prova contínua de julgamento técnico, não um grid de cards.

### [Lee Robinson](https://leerob.com/)
Hub de engineer-escritor: bio curta, notas e essays. Clareza de posicionamento (o que faz agora) e hierarquia de conteúdo sem marketing de SaaS.

### [Maggie Appleton](https://maggieappleton.com/)
Digital garden: tipografia editorial, ilustração própria, conteúdo em crescimento. Mostra como um site pessoal pode ter voz e estrutura sem parecer currículo HTML.

### [Brian Lovin](https://brianlovin.com/about)
Founder/product designer-engineer: trajetória em lista limpa (Notion, Campsite, GitHub, Spectrum). Projetos e produtos com nomes + função — zero badges coloridos, máxima legibilidade de carreira.

### [Daeseon Yoo](https://www.daeseon.ai/portfolio)
Case studies de produção como “filmes”: problema → restrição → decisão → princípio. Storytelling de engenharia sênior (trade-offs, não screenshots).

### [Shreyaan Seth](https://www.shreyaan.me/)
Lead backend/AI: headline de ownership, FAQ que responde o que um hiring manager pergunta, case studies linkados. Estrutura conversacional e específica.

### [Jason Overmier](https://jovermier.com/)
Staff/platform: prova em métricas e tenure no topo; featured work + case-study deep dives. Sinaliza impacto operacional sem landing page de produto.

### [Erland (case studies)](https://case.erland.me/)
Portfólio centrado em decisões, trade-offs e outcomes — não em screenshots. Tom de engenheiro que documenta o “porquê”.

### [Isaac Bernat](https://www.isaacbernat.com) ([repo](https://github.com/isaacbernat/homepage))
Staff case studies + system design; o próprio site demonstra a11y, CI e performance. Portfólio como artefato de engenharia.

---

## 2. Princípios extraídos (por tema)

### Tipografia
- Um display com caráter + um body neutro e legível; evitar Inter/Roboto/Arial como identidade.
- Escala curta e consistente (4–6 tamanhos); line-height generoso no body (~1.5–1.7).
- Hierarquia por peso/tamanho/cor muted — não por cor de arco-íris ou pills.

### Grid / layout
- Uma composição no primeiro viewport (não dashboard): nome/marca, uma linha de posicionamento, um CTA, um âncora visual.
- Largura de leitura ~60–72ch para texto; projetos em lista ou coluna única, não mosaico 3×N.
- Desktop: sticky identity + conteúdo scrollável funciona; mobile: empilhar sem perder hierarquia.

### Whitespace
- Espaço é hierarquia: seções com uma única função e ar entre elas.
- Respiração > cards com sombra; se borda/fundo/radius não ajudam a interação, remover.

### Hierarquia
- Nome/brand como sinal hero; headline não compete com o nome.
- 3–6 trabalhos selecionados; o resto em archive opcional.
- Impacto e ownership antes de stack.

### Navegação
- Poucos destinos (Work, About, Writing, Contact); labels curtos.
- Contato sempre alcançável; scroll-spy discreto ok se não virar chrome.
- Preferir links textuais a docks/OS gimmicks (salvo se o craft for o produto).

### Storytelling
- Problema → restrição → decisão → resultado (e o que faria diferente).
- Métricas de negócio quando existirem; honestidade sobre falhas.
- Voz em 1ª pessoa, específica, sem “apaixonado por código”.

### Apresentação de projetos
- Case > card genérico: título + uma frase de valor + papel + link para deep dive.
- Screenshot full-bleed ou frame editorial — não cards arredondados em grade.
- Stack como texto secundário (mono ou muted), nunca badges coloridos.

### Dark / light mode
- Ambos com tokens semânticos (bg, ink, muted, accent, border); contraste AA em texto e UI.
- Um accent só; dark não é desculpa para glow/glass.
- Respeitar `prefers-color-scheme` + toggle opcional; persistir escolha.

### Motion
- 2–3 motions intencionais: entrada de hierarquia, hover de links/projetos, transição de tema.
- Preferir CSS / WAAPI; honrar `prefers-reduced-motion`.
- Motion que guia o olho; se remover e nada se perde, cortar.

### Anti-padrões (evitar)
- Template genérico, currículo em HTML, landing de SaaS, “cara de IA”.
- Mar de cards iguais, badges de tech coloridos, gradient/glass/glow em excesso, emoji decorativo.

---

## 3. Direção visual própria — Edson Boldrini

**Nome da direção:** *Sala de Corte*  
Metáfora: bancada de edição — cortes precisos, frames, narrativa de produto. Referência sutil a CorteFilme sem virar landing do SaaS.  
**Não copiar** nenhum site da lista; princípios acima, linguagem própria.

### Paleta (hex) — light e dark, WCAG AA verificado

| Token | Light | Dark | Uso |
| --- | --- | --- | --- |
| `--bg` | `#F5F6F8` | `#0E1014` | Fundo de página |
| `--bg-elevated` | `#FFFFFF` | `#181B21` | Superfícies elevadas |
| `--ink` | `#14161A` | `#E9ECF1` | Texto principal |
| `--ink-muted` | `#5A616C` | `#9AA1AD` | Secundário, meta |
| `--border` | `#D8DCE3` | `#2A2F38` | Divisores finos |
| `--accent` | `#0B6E4F` | `#3CB88A` | Links, CTA, foco |
| `--accent-hover` | `#095C42` | `#4EC99A` | Hover |
| `--accent-subtle` | `#E6F3EE` | `#143528` | Fundo de highlight |
| `--focus` | `#0B6E4F` | `#3CB88A` | Outline de foco |

**Contrastes (amostra, texto normal ≥ 4.5:1):**
- Light: ink/bg **16.75:1**; muted/bg **5.78:1**; accent/bg **5.78:1**; branco/accent **6.25:1**
- Dark: ink/bg **16.08:1**; muted/bg **7.32:1**; accent/bg **7.63:1**; ink/accent (botão) **7.63:1**

Sem roxo, sem cream `#F4F1EA` + terracotta, sem glow. Accent único: verde “corte” (preciso, não neon).

### Tipografia (Google Fonts)

| Papel | Família | Pesos |
| --- | --- | --- |
| Display / nome | **Syne** | 600, 700 |
| Body / UI | **Source Sans 3** | 400, 600 |
| Meta / datas / stack | **IBM Plex Mono** | 400 |

**Escala (rem, root 16px):**

| Token | rem | px | Uso |
| --- | --- | --- | --- |
| `--text-xs` | `0.75rem` | 12 | Labels mono, captions |
| `--text-sm` | `0.875rem` | 14 | Meta, nav |
| `--text-base` | `1.125rem` | 18 | Body (leitura confortável) |
| `--text-lg` | `1.375rem` | 22 | Lead / supporting |
| `--text-xl` | `1.75rem` | 28 | Títulos de seção |
| `--text-2xl` | `2.5rem` | 40 | Headline |
| `--text-3xl` | `clamp(2.75rem, 5vw, 4rem)` | ~44–64 | Nome / brand hero |

Line-height: body `1.65`; display `1.1–1.2`. Letter-spacing levemente negativo no display (`-0.02em`).

### Espaçamento (escala 4-based)

| Token | rem |
| --- | --- |
| `--space-1` | `0.25rem` |
| `--space-2` | `0.5rem` |
| `--space-3` | `0.75rem` |
| `--space-4` | `1rem` |
| `--space-5` | `1.5rem` |
| `--space-6` | `2rem` |
| `--space-7` | `3rem` |
| `--space-8` | `4rem` |
| `--space-9` | `6rem` |
| `--space-10` | `8rem` |

Seções: `space-9`–`space-10` entre blocos; gutters laterais `space-5`–`space-7`. Max content ~`42rem` texto / `68rem` layout.

### Tom de voz / personalidade visual

Calmo, preciso, brasileiro sem folclore: engenheiro sênior que construiu produto (CorteFilme) e fala em decisões, não em buzzwords. Visual seco e editorial — “sala de corte”, não landing de startup. Um accent só, tipografia com caráter (Syne), zero ornamentação de IA. Confiança por clareza e curadoria.

### Padrão de apresentação de projetos

**Não usar mar de cards.** Usar **linha de case** + **página de case**.

1. **Lista (home / work):** cada projeto = uma linha (ou bloco full-width sem card):
   - Título (Syne) + uma frase de outcome
   - Meta mono: ano · papel (founder / eng) · domínio
   - Hover: accent no título + underline fino; imagem opcional em faixa full-bleed abaixo ao expandir/focar — sem radius de card, sem sombra multicamada
2. **Case page:** estrutura fixa — Contexto → Problema → O que construí → Trade-offs → Resultado → O que aprendi. Uma imagem hero full-bleed no topo do case (produto/atmosfera real). Stack em linha mono muted no rodapé do case, não como chips coloridos.
3. **CorteFilme:** case âncora (founder/product engineer), profundidade máxima; demais trabalhos em densidade menor, mesmo padrão de linha.
4. Máximo **4–5** featured; archive opcional em tabela tipográfica (ano | nome | tipo).

---

## Próximo uso

Aplicar tokens em CSS variables; home como uma composição; work como lista de cases; motion mínimo (tema + hover + reveal de seção).
