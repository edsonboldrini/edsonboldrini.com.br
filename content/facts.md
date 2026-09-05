# facts.md — evidência do Portão 7

Cada afirmação publicada em `lib/content.ts` e sua fonte em `research/person.md`
(ADENDO do orquestrador prevalece em conflito). Campo `meta` em `selectedWork` usa
**domínio**, não ano — datas de emprego não são publicadas (ADENDO C3).

## Hero

| Afirmação do site | Fonte em research/person.md |
|---|---|
| Nome "Edson Boldrini" | C6.1 (nome); API GitHub: name "Edson Boldrini" |
| Headline "Software engineer. I build products end to end — and I run one." | ia.md §Headline do hero; lastro: cargo Full Stack/Software Engineer (SignalHire, bio X) + "run one" = CorteFilme (C6.4, registro.br) |
| Tagline "Vitória, Brazil · Currently at Superset · Creator of CorteFilme" | ia.md (block do hero); localização = GitHub API (C2), Superset = bios X/Instagram (C6.3), CorteFilme = registro.br (C6.4) |
| Localização "Vitória, Brazil" | C2 (API: "Vitoria, ES, Brasil"); C6.1 |

## About

| Afirmação do site | Fonte |
|---|---|
| "six years of experience" — REMOVIDO (número envelhece; README é ~2024) | C2/README desatualizado; C3 datas inconsistentes — não quantificar |
| TypeScript first; Node, Vue, React, Flutter, Go, Elixir | GitHub README bio (stack profissional) |
| "deployed on AWS and GCP" | GitHub README bio (destaques AWS, GCP) |
| "based in Vitória, Brazil" | C6.1 / C2 (GitHub API) |
| Superset = "platform personal trainers and fitness coaches use to run their coaching business" | C6.3; linha 12 (descrição da empresa); linha 60 (OS para coaches — clientes, programação, pagamentos) |
| CorteFilme = "web app that helps Brazilian window-film shops waste less film per roll" | C6.4; linha 59 (site: otimizar corte de películas solares, menos desperdício). "installers"→"shops" e "more jobs" foram REMOVIDOS (revisão: "more jobs" sem fonte) |

## Selected Work

| Afirmação do site | Fonte |
|---|---|
| CorteFilme: Creator & owner | C6.4 — "Criador e dono", confirmado registro.br |
| CorteFilme oneLine (layout mais eficiente, menos desperdício) | linha 59 (cortefilme.com.br) |
| CorteFilme stack: Next.js (landing) + Vue/Quasar (produto) + Hasura + PostgreSQL + Node.js + Docker/nginx | C8 (tabela; prevalece sobre inferência web) |
| CorteFilme href = cortefilme.com.br | C6.6 / linha 80 |
| CorteFilme hasCaseStudy = true | ia.md §Páginas e URLs (único caso com página própria) |
| Superset: Software Engineer | C6.3; bio X "Software Engineer @supersetapp"; SignalHire |
| Superset oneLine (descrição do produto da empresa) | linha 60 (Crunchbase/Fitt) — fato da empresa, NÃO entrega reivindicada |
| Superset stack: Python, TypeScript, React, Expo | linha 15 (stack citada da empresa — CTO LinkedIn) |
| Superset href = supersetapp.com | linha 12 |
| Club Trip/Além: "built most of the product" | C3 — "construiu a maior parte do produto de assinatura 'Club Trip'". "from API to screens" REMOVIDO (revisão: C3 não sustenta o escopo) |
| Club Trip meta: Travel subscriptions | C3 ("produto de assinatura") |
| Além stack: Vue, Node.js, AdonisJS, Hasura, PostgreSQL | C3 (stack declarada da Além no `resume.json`) — **suposição**: stack da empresa, não per-feature. "Node" padronizado em "Node.js" (não duplicar no knowsAbout do JSON-LD) |
| Além href — REMOVIDO | alem.com.br sem registro A (verificado com dig/curl 2026-09-05) — sem link quebrado; item continua no site sem href |
| Le Card: "built the payments app from scratch, Bluetooth terminal" | C3 — "construiu do zero o app mobile de pagamentos (terminal Bluetooth)" |
| Le Card meta: Payments · mobile | C3 |
| Le Card stack: Xamarin, .NET Core | C3 (stack declarada da Le Card no `resume.json`) — **suposição**: app mobile em Xamarin (única stack mobile do período) |
| Le Card href = lecard.com.br | C3 |

## Experience

| Afirmação do site | Fonte |
|---|---|
| Ordem: Superset → w3.care → Além → Conceptho → Dersalis → Le Card | C3 (tabela; mais recente primeiro) |
| Sem datas | ADENDO C3 — "Não publicar datas precisas de emprego" |
| Superset: cargo + descrição da empresa | C6.3; linha 12 |
| w3.care: health care; mobile & frontend | C3 (w3.care = "health care"; cargo "Full Stack Engineer (mobile/front)") |
| Além: online travel | C3 ("viagens online") |
| Conceptho: news apps, content protection and paywalls | C3 (proteção de conteúdo/paywall em app de notícias) — **suposição**: descrição da empresa derivada do trabalho declarado |
| Dersalis: health and productivity, smartband apps; managed the dev team | C3 ("saúde/produtividade"; "geriu o time de dev"; apps mobile para smartbands) |
| Le Card: payments | C3 ("pagamentos") |

## Open Source

| Afirmação do site | Fonte |
|---|---|
| Só 2 repos (originais): flutter_getnet_pos, flutter_ycbtsdk | ADENDO C1 (tabela fork/original) |
| flutter_getnet_pos: Flutter plugin p/ POS Getnet, Java | C1 ("ORIGINAL (Java, 2023) — integração POS Getnet"); linha 27 |
| flutter_ycbtsdk: wrapper Objective-C do SDK YCB (smartband) | C1 ("ORIGINAL (Objective-C, 2023)"); linha 28 |
| Escala honesta ("small integration", "experiment", sem tração) | C2 — "repos originais têm 0-1 estrelas... não portfólio com tração" (números de estrelas não publicados — trava) |
| Nenhum menu fork de plugins Flutter | C1 (forks: flutter_inapp_purchase, FlutterCieloLioSDK, flutter-rx-ble, flutter_workmanager, tcc-proxy) |

## Contact

| Afirmação do site | Fonte |
|---|---|
| email edsonboldrini@gmail.com | linha 7 (email público no registro.br do domínio) |
| Perfis github/linkedin/x/instagram | C6.6 (delegados a lib/site.ts, não redeclarados) |

## Case Study CorteFilme

| Afirmação do site | Fonte |
|---|---|
| Context: web app p/ lojas brasileiras que cortam película solar (insulfilm) de rolos | linha 59; C6.4. "on cars and buildings" e "cut by hand" REMOVIDOS (revisão: sem fonte; não afirmar como o corte é feito hoje) |
| Problem: desperdício de rolo (largura/comprimento fixos; sobras pequenas demais) | linha 59 (otimizar ao máximo o corte; menos desperdício). "plan cuts by eye" REMOVIDO (revisão: sem fonte) |
| What I built: layout de corte, relatórios/gestão, trial 15 dias | linha 59 |
| "landing page e produto no ar", sistema.cortefilme.com.br | linha 59 (site + plataforma) |
| Landing em Next.js (estático); produto é SPA Vue/Quasar; Backend Hasura + PostgreSQL + serviços Node.js; Docker + nginx em VPS própria (migrado de AWS) | C8 — sem portas, container names ou caminhos de disco |
| "I own it / creator" | C6.4 (registro.br) |
| Result: sem receita/clientes publicados ("won't invent it") | ia.md trava — "Números de negócio do CorteFilme (clientes, receita) — não temos nenhum. Não inventar." |
| Nenhuma métrica inventada em Trade-offs/What I learned | ia.md trava |
| Trade-offs: "web first — hosted, nothing to install"; sem offline/shop computer | linha 59 (produto web). "offline use is simply out" e "works from the shop computer" REMOVIDOS (revisão: requisito de usuário inventado) |

## JSON-LD (lib/schema.ts)

| Afirmação do site | Fonte / motivo |
|---|---|
| Person recebe `@id` estável `${site.origin}/#person`; ProfilePage.mainEntity vira referência `{"@id": ...}` | Correção de revisão: a mesma entidade não pode aparecer duplicada no HTML; blocos mantidos (Person, WebSite, ProfilePage) |

## Suposições declaradas (Portão 7 — rastreáveis)

1. Le Card: app mobile em Xamarin (derivado da stack declarada; única trilha mobile naquela empresa).
2. Conceptho: "what" descrito pelo escopo do trabalho (app de notícias/paywall), já que a pesquisa não descreve o negócio da empresa.
3. Stack de Club Trip e Le Card = stack declarada da empresa no `resume.json` (não há stack per-feature publicado).
4. Superset stack = stack declarada da empresa (CTO), não per-papel.