const serviceCategories = {
  architects: [
    "Conceitos fundamentais de design (para gerar orçamentos e apresentar pedidos de planejamento)",
    "Plantas detalhadas em conformidade (para construtores e regulamentos de construção)",
    "Cálculos de estrutura de construção",
    "Não tenho certeza",
  ],
  bathroom: [
    "Renovação / instalação de banheiro",
    "Instalar ou substituir um dispositivo",
    "Reparar",
    "Azulejos",
    "Outro",
  ],
  bricklayingRepointing: [
    "Construindo uma parede",
    "Construção de uma estrutura",
    "Trabalho de alvenaria personalizado",
    "Alterações na parede",
    "Reapontamento",
    "Trabalho na chaminé",
    "Reparos",
  ],
  carpentryJoinery: [
    "Portas, janelas e pisos",
    "Fabricação, montagem e reparos de móveis",
    "Unidades de cozinha e bancadas",
    "Área coberta",
    "Outro trabalho em carpintaria",
  ],
  carpetsLinoFlooring: [
    "Piso novo ou substituição",
    "Lixamento / restauração",
    "Reparo / ajuste",
    "Outro",
  ],
  centralHeating: [
    "Caldeira",
    "Tubulação / fornecimento",
    "Radiadores",
    "Termostato",
    "Aquecimento de piso",
    "Instalação completa do sistema",
    "Outro",
  ],
  chimneyFireplace: [
    "Chaminé",
    "Lareira",
    "Outro ou vários dos acima",
  ],
  conversions:[
    "Conversão de sotão",
    "Conversão de um espaço existente",
    "Alteração de paredes",
    "Restaurar ou melhorar um espaço existente"
  ],
  dampProofing: [
    "Não - Preciso de ajuda para investigar",
    "Sim - Preciso apenas de ajuda para resolver o problema",
  ],
  demolitionClearance: [
    "Remoção de lixo apenas",
    "Demolição de edifícios / estruturas",
    "Derrubar uma parede",
  ],
  drivewaysPaving: [
    "Instalar / Reparar uma entrada",
    "Limpar ou selar uma entrada",
    "Kerb suspenso (crossover)",
    "Pavimentação, pátios e caminhos",
  ],
  electrical: [
    "Refazer circuitos",
    "Caixas de fusíveis",
    "Fittings e aparelhos elétricos",
    "Verificação ou certificado de segurança",
    "Falhas e reparos elétricos",
    "Outro",
  ],
  extensions: [
    "Extensão de propriedade",
    "Conversão de loft",
    "Uma varanda",
    "Edifício anexo",
    "Alterações internas",
    "Outro",
  ],
  fasciasSoffitsGuttering: [
    "Somente calhas",
    "Somente beirais e / ou guarnições",
    "Ambos",
  ],
  fencing: [
    "Esgrima",
    "Portões",
    "Esgrima e portões",
    "Reparar uma cerca ou portão",
  ],
  gardeningLandscaping: [
    "Jardinagem geral",
    "Paisagismo",
    "Cirurgia de árvores",
  ],
  gasWork: [
    "Verificação de segurança de gás",
    "Serviço de caldeira ou aparelho",
    "Instalar ou substituir caldeira ou aparelho",
    "Mover ou remover caldeira ou aparelho",
    "Apenas tubulações",
    "Problema ou reparo",
    "Outro",
  ],
  groundworkFoundations: [
    "Fundações para uma estrutura a ser construída",
    "Drenagem e tubulação",
    "Terraplanagem geral do jardim",
    "Outro",
  ],
  handymanCategory: [
    "O trabalho inclui trabalho elétrico",
    "O trabalho não inclui trabalho elétrico",
  ],
  insulationCategory: [
    "Isolamento de sótão / telhado",
    "Isolamento de parede",
    "Isolamento de piso",
    "Outro",
  ],
  kitchenFittingCategory: [
    "Instalação de cozinha nova",
    "Instalação de bancada",
    "Reforma / substituição de portas de armário",
    "Instalar aparelho (pia, forno, lava-louças, etc.)",
    "Reparo menor",
    "Vários dos itens acima ou outro",
  ],
  locksmithCategory: [
    "Instalar novas fechaduras",
    "Reparar fechaduras",
    "Outro (ex. trancado do lado de fora)",
  ],
  loftConversionsCategory: [
    "Conversão de sótão com alterações estruturais",
    "Conversão de sótão (sem alterações estruturais)",
    "Conversão de sótão para fins de armazenamento",
    "Instalar uma claraboia",
  ],
  newBuildCategory: [
    "Eu possuo o terreno em que planejo construir",
    "Estou comprando o terreno em que planejo construir",
    "Não possuo o terreno em que planejo construir",
  ],
  paintingDecoratingCategory: ["Pintura interna", "Pintura externa", "Ambos"],
  plasteringRenderingCategory: ["Reboco (interior)", "Texturização (exterior)"],
  plumbingCategory: [
    "Radiadores",
    "Caldeiras",
    "Aparelhos",
    "Fixações",
    "Tubulações, torneiras e drenagem",
  ],
  restorationRefurbishmentCategory: [
    "Entendo que este serviço é para grandes projetos que exigem gerenciamento e supervisão. Se você precisar de vários trabalhos que abranjam várias áreas, publique-os separadamente nas categorias comerciais apropriadas.",
  ],
  roofingCategory: [
    "Telhado novo ou de substituição",
    "Reparo ou avaliação de telhado",
    "Trabalho de chaminé",
    "Algo mais",
  ],
  securitySystems: [
    "Sistema de alarme de segurança",
    "Câmera de segurança / inteligente",
    "Sistema de entrada",
    "Alarmes de fumaça",
    "Luzes de segurança",
    "Trancas",
    "Outro",
  ],
  stonemasonryCategory: ["Construção", "Reparação", "Reapontamento", "Outro"],
  tillingCategory: [
    "Telhas novas ou de substituição",
    "Reparação / rejuntes de azulejos",
    "Outro",
  ],
  treeSurgeryCategory: [
    "Poda ou corte",
    "Corte (abate)",
    "Remoção apenas de toco",
    "Diagnóstico / Avaliação",
    "Arbustos ou outras tarefas de jardinagem",
    "Outro",
  ],
  windowsDoorFitingCategory: [
    "Janelas novas",
    "Portas novas (internas ou externas)",
    "Janelas e portas externas novas",
    "Substituição de vidro",
    "Reparação",
    "Outro",
  ],
};
export default serviceCategories;
