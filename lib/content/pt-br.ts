import type { LocaleContent } from "./types";

/**
 * English — the source of truth. Every string here was checked against
 * research/person.md and is mapped in content/facts.md. Translations must
 * carry the same claims and add none.
 */
export const ptBR: LocaleContent = {
  hero: {
    headline:
      "Engenheiro de software. Eu construo produtos de ponta a ponta — e opero um.",
    tagline: "Vitória, Brasil · Hoje na Superset · Criador do CorteFilme",
  },
  about: [
    "Sou engenheiro de software full-stack, atuando em web e mobile — TypeScript primeiro, depois Node, Vue, React, Flutter, Go e Elixir, deploy em AWS e GCP. Vivo em Vitória, Brasil.",
    "No trabalho, sou engenheiro de software na Superset, a plataforma que personal trainers e treinadores de fitness usam para tocar o próprio negócio. Fora do trabalho, criei o CorteFilme e o opero sozinho: um app web que ajuda instaladores de película solar no Brasil a desperdiçar menos película por rolo.",
  ],
  work: {
    cortefilme: {
      title: "CorteFilme",
      role: "Criador e dono",
      oneLine:
        "Um app web que calcula o layout mais eficiente para cortar rolos de película solar, para o instalador desperdiçar menos.",
      meta: "Corte de película · Brasil",
    },
    superset: {
      title: "Superset",
      role: "Engenheiro de Software",
      oneLine:
        "A plataforma em que personal trainers e treinadores de fitness tocam o negócio — clientes, programação e pagamentos — e onde trabalho hoje.",
      meta: "Software de treino fitness",
    },
    "club-trip": {
      title: "Club Trip · Além",
      role: "Engenheiro Full Stack — construí a maior parte do produto",
      oneLine:
        "Um produto de viagens por assinatura da Além, do qual construí quase tudo.",
      meta: "Assinaturas de viagem",
    },
    "le-card": {
      title: "Le Card",
      role: "Engenheiro Full Stack — construí o app de pagamentos do zero",
      oneLine:
        "O app mobile de pagamentos que construí do zero, emparelhando com um terminal de cartão Bluetooth.",
      meta: "Pagamentos · mobile",
    },
  },
  companies: {
    superset: {
      what: "Plataforma de software para personal trainers e treinadores de fitness",
      role: "Engenheiro de Software",
    },
    w3care: {
      what: "Software de saúde",
      role: "Engenheiro Full Stack — mobile e frontend",
    },
    alem: { what: "Viagens online", role: "Engenheiro Full Stack" },
    conceptho: {
      what: "Apps de notícias — proteção de conteúdo e paywalls",
      role: "Engenheiro Full Stack",
    },
    dersalis: {
      what: "Saúde e produtividade — apps de smartband",
      role: "Engenheiro Full Stack — gerenciava o time de dev",
    },
    lecard: { what: "Pagamentos", role: "Engenheiro Full Stack" },
  },
  openSource: {
    flutter_getnet_pos: {
      description:
        "Um plugin pequeno em Flutter que escrevi para falar com terminais POS da Getnet. Uma integração estreita, não uma biblioteca mantida.",
    },
    flutter_ycbtsdk: {
      description:
        "Um wrapper pequeno em Objective-C em volta do SDK da smartband YCB — um experimento, não uma biblioteca com usuários.",
    },
  },
  caseStudy: {
    title: "CorteFilme",
    summary:
      "Um app web que ajuda lojas de película solar no Brasil a desperdiçar menos película por rolo.",
    sections: {
      context: {
        heading: "Contexto",
        body: "O CorteFilme é um app web para lojas de película solar no Brasil — lojas que cortam película solar (insulfilm) de rolos. A película vem em rolos de tamanho fixo, e cada corte reduz o resto que sobra até virar desperdício. É meu produto, do início ao fim: eu o criei e ainda o possuo.",
      },
      problem: {
        heading: "Problema",
        body: "Como o rolo tem largura e comprimento fixos, um layout de corte ruim deixa sobras pequenas demais para reaproveitar — e esse desperdício sai direto da margem da loja. O problema central é o layout: dadas as peças que um serviço exige, como cortá-las de um rolo com o mínimo de sobra?",
      },
      built: {
        heading: "O que eu construí",
        body: "Um aplicativo web que calcula o layout de corte mais eficiente para um rolo de película, embrulhado nas partes sem glamour, porém obrigatórias: registro de serviços, relatórios e um teste grátis de 15 dias para atrair as lojas. A landing page é um site estático em Next.js; o produto em si é uma SPA em Vue/Quasar sobre Hasura e PostgreSQL, sustentada por alguns serviços em Node.js. Tudo roda em Docker atrás de nginx num VPS que eu mesmo opero — migrado da AWS —, o que faz parte de como mantenho o custo de um produto de uma pessoa só sob controle.",
      },
      tradeoffs: {
        heading: "Trade-offs",
        body: "Web primeiro — um app hospedado, para as lojas usarem de qualquer navegador, sem nada para instalar. Tocando sozinho, mantenho o escopo enxuto — um recurso só sai se valer a manutenção que exige. O teste grátis de 15 dias é o jeito honesto de provar o plano de corte antes de pedir dinheiro: uma aposta no problema ser real, não num funil de vendas.",
      },
      result: {
        heading: "Resultado",
        body: "O CorteFilme está no ar: cortefilme.com.br, com o produto em sistema.cortefilme.com.br e o teste de 15 dias funcionando. Não vou publicar receita nem números de clientes — nada disso é público, e não vou inventar. A afirmação que se sustenta é a simples: o produto roda, e eu ainda o opero.",
      },
      learned: {
        heading: "O que aprendi",
        body: "A propriedade solo é uma força direcionadora: escopo, suporte e lançamentos respondem a uma pessoa só. Aprendi que um problema que dá para enunciar em uma frase — \"cortar película com menos desperdício\" — basta para construir um produto de verdade em volta, e que manter vivo um produto de uma pessoa só vale mais do que acrescentar recursos a ele.",
      },
    },
  },
  ui: {
    about: "Sobre",
    selectedWork: "Trabalhos selecionados",
    experience: "Experiência",
    openSource: "Código aberto",
    contact: "Contato",
    backToHome: "Voltar ao início",
    languageLabel: "Idioma",
    notFoundTitle: "Página não encontrada",
    notFoundBody:
      "Essa página não existe — pode ter sido movida ou o link pode estar errado.",
    skipToContent: "Pular para o conteúdo",
  },
  meta: {
    home: {
      title: "Edson Boldrini — Software Engineer",
      description:
        "Engenheiro de software full-stack em Vitória, Brasil. TypeScript, Node, React e Flutter. Hoje na Superset; criador do CorteFilme.",
    },
    caseStudy: {
      title: "CorteFilme",
      description:
        "Como construí o CorteFilme, um SaaS que reduz o desperdício de película para instaladores brasileiros.",
    },
  },
};