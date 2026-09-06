# Onde fica o seletor de idioma — e por que sem bandeiras

Pesquisa do orquestrador, 2026-09-06. O worker delegado não entregou; isto é
busca web própria mais medição.

## O problema

O seletor estava no **topo da home**, acima do nome. Num site pessoal, a
primeira batida visual tem que ser *quem é essa pessoa*, não um controle de
configuração. O Edson apontou isso.

## Onde colocar

A prática de UX converge em dois lugares: **topo à direita** ou **rodapé**.
Quando precisam trocar de idioma, as pessoas olham primeiro o cabeçalho e,
não achando, vão direto ao fim da página.

- Smashing Magazine — https://www.smashingmagazine.com/2022/05/designing-better-language-selector/
- SimpleLocalize — https://simplelocalize.io/blog/posts/language-selector-best-practices/
- Smartling — https://www.smartling.com/blog/language-selector-best-practices

A ressalva conhecida do rodapé é página longa: o visitante desiste antes de
chegar lá. **Não se aplica aqui** — a home tem quatro seções e o rodapé é
alcançado com um scroll curto. E o custo do topo, num portfólio, é alto:
gasta a abertura com um controle.

→ **Decisão: rodapé**, junto do Contact. No case study, ao fim do conteúdo.

## Bandeira não é idioma

Consenso forte e documentado. Bandeira representa **país**, não idioma:

- Smart Interface Design Patterns — https://smart-interface-design-patterns.com/articles/language-selector/
- Flags are not languages — https://www.flagsarenotlanguages.com/blog/best-practice-for-presenting-languages/
- United Language Group — https://www.unitedlanguagegroup.com/blog/inside-design-a-language-selector-is-no-place-for-flags
- Damian Wajer — https://www.damianwajer.com/blog/language-selector/

Aplicado ao caso concreto deste site, o problema deixa de ser teórico:

| Idioma | Bandeira que eu tinha usado | Problema |
|---|---|---|
| Espanhol | Espanha | Espanhol é majoritariamente latino-americano. México, Argentina e Colômbia não se veem ali. |
| Inglês | Estados Unidos | Exclui Reino Unido, Austrália, Irlanda, Índia… |
| Português | Brasil | O único defensável, porque o conteúdo é **pt-BR** de fato. |

A correção padrão é o **endônimo** — o nome do idioma escrito no próprio
idioma: `English`, `Português (Brasil)`, `Español`. Já existia em
`localeMeta.nativeName`; era usado só como texto para leitor de tela.

## Como ficou

Rodapé, depois dos links de contato. Mono, `--text-xs`, discreto. O idioma que
você está lendo é **afirmado** (`<span aria-current="true">`), não oferecido
como link — só os outros dois são clicáveis. `hreflang` e `lang` preservados
em cada link, `<a>` puro, funciona sem JavaScript, alvo de toque de 24px.

## Nota

O Edson pediu bandeiras na primeira versão. Esta mudança as remove, por
instrução dele de "replicar o approach" dos sites pesquisados — e a pesquisa é
unânime contra. Voltar atrás é restaurar `components/Flag.tsx` (está no
histórico do git) e renderizá-lo antes do nome no `LocaleSwitcher`.
