const serviceCategories = {
  architects: [
    "Conceitos fundamentais de design (para gerar orçamentos e apresentar pedidos de planejamento)",
    "Plantas detalhadas em conformidade (para construtores e regulamentos de construção)",
    "Cálculos de estrutura de construção",
    "Não tenho certeza",
  ],
  "bathroom-fitters": [
    "Renovação / instalação de banheiro",
    "Instalar ou substituir um dispositivo",
    "Reparar",
    "Azulejos",
    "Outro",
  ],
  bricklayers: [
    "Construindo uma parede",
    "Construção de uma estrutura",
    "Trabalho de alvenaria personalizado",
    "Alterações na parede",
    "Reapontamento",
    "Trabalho na chaminé",
    "Reparos",
  ],
  "carpenters-and-joiners": [
    "Portas, janelas e pisos",
    "Fabricação, montagem e reparos de móveis",
    "Unidades de cozinha e bancadas",
    "Área coberta",
    "Outro trabalho em carpintaria",
  ],
  "carpet-flooring-fitters": [
    "Piso novo ou substituição",
    "Lixamento / restauração",
    "Reparo / ajuste",
    "Outro",
  ],
  "heating-engineers": [
    "Caldeira",
    "Tubulação / fornecimento",
    "Radiadores",
    "Termostato",
    "Aquecimento de piso",
    "Instalação completa do sistema",
    "Outro",
  ],
  "chimney-fireplace-specialists": [
    "Chaminé",
    "Lareira",
    "Outro ou vários dos acima",
  ],
  conversions: [
    "Conversão de sotão",
    "Conversão de um espaço existente",
    "Alteração de paredes",
    "Restaurar ou melhorar um espaço existente",
  ],
  "damp-proofing-specialists": [
    "Não - Preciso de ajuda para investigar",
    "Sim - Preciso apenas de ajuda para resolver o problema",
  ],
  "demolition-specialists": [
    "Remoção de lixo apenas",
    "Demolição de edifícios / estruturas",
    "Derrubar uma parede",
  ],
  "driveway-specialists": [
    "Instalar / Reparar uma entrada",
    "Limpar ou selar uma entrada",
    "Kerb suspenso (crossover)",
    "Pavimentação, pátios e caminhos",
  ],
  electricians: [
    "Refazer circuitos",
    "Caixas de fusíveis",
    "Fittings e aparelhos elétricos",
    "Verificação ou certificado de segurança",
    "Falhas e reparos elétricos",
    "Outro",
  ],
  "extension-specialists": [
    "Extensão de propriedade",
    "Conversão de loft",
    "Uma varanda",
    "Edifício anexo",
    "Alterações internas",
    "Outro",
  ],
  "fascias-soffits-guttering-specialists": [
    "Somente calhas",
    "Somente beirais e / ou guarnições",
    "Ambos",
  ],
  fencers: [
    "Esgrima",
    "Portões",
    "Esgrima e portões",
    "Reparar uma cerca ou portão",
  ],
  "landscape-gardeners": [
    "Jardinagem geral",
    "Paisagismo",
    "Cirurgia de árvores",
  ],
  "gas-engineers": [
    "Verificação de segurança de gás",
    "Serviço de caldeira ou aparelho",
    "Instalar ou substituir caldeira ou aparelho",
    "Mover ou remover caldeira ou aparelho",
    "Apenas tubulações",
    "Problema ou reparo",
    "Outro",
  ],
  "groundwork-and-foundations-specialists": [
    "Fundações para uma estrutura a ser construída",
    //start description
    "Drenagem e tubulação",
    "Terraplanagem geral do jardim",
    "Outro",
    //end description
  ],
  handymen: [
    //start description
    "O trabalho inclui trabalho elétrico",
    "O trabalho não inclui trabalho elétrico",
    //end description
  ],
  "insulation-specialists": [
    //start description
    "Isolamento de sótão / telhado",
    //end description
    "Isolamento de parede",
    "Isolamento de piso",
    //start description
    "Outro",
    //end description
  ],
  "kitchen-fitters": [
    "Instalação de cozinha nova",
    "Instalação de bancada",
    //start description
    "Reforma / substituição de portas de armário",
    //end description
    "Instalar aparelho (pia, forno, lava-louças, etc.)",
    "Reparo menor",
    //start description
    "Vários dos itens acima ou outro",
    //end description
  ],
  locksmiths: [
    "Instalar novas fechaduras",
    "Reparar fechaduras",
    //start description
    "Outro (ex. trancado do lado de fora)",
    //end description
  ],
  "loft-conversion-specialists": [
    "Conversão de sótão com alterações estruturais",
    "Conversão de sótão (sem alterações estruturais)",
    "Conversão de sótão para fins de armazenamento",
    //start description
    "Instalar uma claraboia",
    //end description
  ],
  "new-builds-specialists": [
    "Eu possuo o terreno em que planejo construir",
    "Estou comprando o terreno em que planejo construir",
    "Não possuo o terreno em que planejo construir",
  ],
  "painters-and-decorators": [
    //start description
    "Pintura interna",
    "Pintura externa",
    "Ambos",
    //end description
  ],
  plasterers: ["Reboco (interior)", "Texturização (exterior)"],
  plumbers: [
    "Radiador",
    "Caldeiras",
    "Aparelhos",
    "Fixações",
    "Tubulações, torneiras e drenagem",
  ],
  "restoration-and-refurbishment-specialists": [
    "Entendo que este serviço é para grandes projetos que exigem gerenciamento e supervisão. Se você precisar de vários trabalhos que abranjam várias áreas, publique-os separadamente nas categorias comerciais apropriadas.",
  ],
  roofers: [
    "Telhado novo ou de substituição",
    "Reparo ou avaliação de telhado",
    "Trabalho de chaminé",
    //start description
    "Algo mais",
    //end description
  ],
  "security-system-installers": [
    "Sistema de alarme de segurança",
    "Câmera de segurança / inteligente",
    //start description
    "Sistema de entrada",
    "Alarmes de fumaça",
    "Luzes de segurança",
    "Trancas",
    "Outro",
    //end description
  ],
  stonemasons: ["Construção", "Reparação", "Reapontamentos", "Outro"],
  tilers: [
    "Telhas novas ou de substituição",
    "Reparação / rejuntes de azulejos",
    //start description
    "Outro",
    //end description
  ],
  "tree-surgeons": [
    "Poda ou corte",
    "Corte (abate)",
    "Remoção apenas de toco",
    "Diagnóstico / Avaliação",
    "Arbustos ou outras tarefas de jardinagem",
    "Outro",
  ],
  "window-fitters": [
    "Janelas novas",
    "Portas novas (internas ou externas)",
    //start description
    "Janelas e portas externas novas",
    //end description
    "Substituição de vidro",
    "Reparações",
    //start description
    "Outro",
    //end description
  ],
};
export default serviceCategories;
