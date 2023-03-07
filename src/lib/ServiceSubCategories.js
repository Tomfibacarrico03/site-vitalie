const serviceCategories = {
  architectsSub: [
    "Que tipo de serviço precisa?",
    "Extensão",
    "Conversão loft",
    "Renovação",
    "Nova construção",
    "Outros",
  ],
  bathroomRefurbishmentInstallationSub: [
    "Quantas casas de banho precisam de renovação / instalação de banheiro?",
    "1",
    "2 ou mais",
  ],
  bathroomInstallReplaceFixture: [
    "É necessário mais algum serviço?",
    "Sim",
    "Não",
  ],
  bathroomRepair: ["É alguma fuga?", "Sim", "Não"],
  bathroomTilling: [
    "O que involve o teu trabalho de Azulejos?",
    "Novo ou Substituição de azulejos",
    "Reparação de azulejos",
    "Outros",
  ],
  bricklayingBuildingWall: [
    "Que tipo de parede quer construir?",
    "Parede pequena, decorativa",
    "Parede pequena",
    "Parede de jardim",
    "Parede mestra",
    "Mais que uma parede",
  ],
  bricklayingBuildStructure: [
    "Que tipo de estrutura quer construir?",
    "Anexo",
    "Varanda",
    "Garagem",
    "Extensão",
    "Outros",
  ],
  bricklayingBuildingBrickWork: [
    "Que tipo de trabalho de alvenaria?",
    "Pilar",
    "Degraus",
    "Outros",
  ],
  bricklayingWallAlterations: [
    "Que tipo de alteração quer fazer?",
    "Instalação / Subtituição de janelas ou portas",
    "Remoção de parede",
    "Outros",
  ],
  bricklayingRepointing: [
    "Que tipo de reencaminhamento?",
    "Alvenaria",
    "Pedra natural",
  ],
  bricklayingChimney: [
    "O que precisa de fazer na sua chaminé?",
    "Remoção",
    "Reconstruir / Grandes alterações",
    "Reemcaminhamento / Reparação",
    "Outros",
  ],
  bricklayingRepair: [
    "Que tipo de reparação necessita?",
    "Pequena",
    "Média",
    "Grande",
  ],
  carpentryJoinerySub: [
    "Precisas de ajuda de um capinteiro em quê?",
    "Portas indoor",
    "Portas outdoor",
    "Janelas",
    "Chão",
    "Rodapés e Arquitraves",
    "Vários dos acima",
  ],
  carpentryFurniture: [
    "Oque precisas?",
    "Móveis feitos",
    "Móveis por montar (Ikea, etc....)",
    "Reparações a móveis",
  ],
  carpentryKitchenUnits: [
    "Precisas de ajuda de um capinteiro em quê?",
    "Colocar bancada de madeira",
    "Reparar bancada de madeira",
    "Instalar unidades",
    "Construir unidades de cozinha personalizadas",
    "Reparar / Ajustar unidades de cozinha",
  ],
  carpentryDecking: [
    "Que tipo de trabalho precisas?",
    "Construir um deck novo",
    "Reparar um deck existente",
  ],
  carpetsFloring: [
    "Que tipo de trablho de piso necessita?",
    "Carpet",
    "Linóleo",
    "Laminado",
    "Tijoleira",
    "Projetado",
    "Madeira",
    "Outros",
  ],
  carpetsSanding: [
    "Que tipo de trablho de piso necessita de lixar / restaurar?",
    "Projetado",
    "Madeira",
    "Outros",
  ],
  carpetsRepair: [
    "Que tipo de trablho de piso necessita de reparação?",
    "Carpet",
    "Linóleo",
    "Laminado",
    "Tijoleira",
    "Projetado",
    "Madeira",
    "Outros",
  ],
  heatingBoiler: [
    "Têm que tipo de caldeira?",
    "Gás",
    "Elétrica",
    "Oléo",
    "Outra",
  ],
  heatingPipes: ["Que tipo de tubo requer o trabalho?", "Gás", "Água", "Outro"],
  heatingRaditors: [
    "O que precisa?",
    "Problema pequeno (fugas, etc..)",
    "Mover ou Substituir",
    "Outro",
  ],
  heatingUnderFloor: [
    "Que tipo de piso aquecido necessita?",
    "Caldeira fornecida",
    "Eletrico",
  ],
  heatingFullSystem: [
    "Têm que tipo de sistema?",
    "Gás",
    "Elétrico",
    "Oléo",
    "Outro",
  ],
  chimneyFireChimney: [
    "O que precisa de fazer na sua chaminé?",
    "Varrer",
    "Remoção",
    "Reconstruir / Grandes alterações",
    "Reemcaminhamento / Reparação",
    "Outros",
  ],
  chimneyFireFireplace: [
    "Qual é o seu sistema?",
    "Gás",
    "Elétrico",
    "Combustivél sólido (madeira, etc..)",
  ],
  chimneyFireFlue: [
    "O que precisa de fazer na sua chaminé?",
    "Instalação ou alteração",
    "Reparação",
  ],
  consversionLoft: [
    "Qual tipo de conversão de sótão você deseja?",
    "Conversão de sótão com mudanças estruturais",
    "Conversão de sótão (sem mudanças estruturais)",
    "Conversão de sótão para fins de armazenamento",
    "Instalar uma claraboia",
  ],
  conversionExistingSpace: [
    "Quão extenso é o seu trabalho de conversão?",
    "Conversão de um único cômodo",
    "Conversão de uma garagem / anexo pequeno",
    "Conversão de vários cômodos ou anexo grande",
    "Conversão de toda a propriedade",
  ],
  conversionWall: [
    "E qual das seguintes opções melhor descreve o trabalho de alteração da sua parede?",
    "Instalação ou substituição de janela ou porta",
    "Remoção de parede",
    "Outros",
  ],
  conversionRestoringImproving: [
    "De que tipo de trabalho se trata?",
    "Pequena reforma",
    "Grande reforma",
    "Reforma total",
  ],
  DampProofingYes: [
    "Qual é a dimensão da área afetada?",
    "Pequena área isolada",
    "Área extensa",
    "Não tenho certeza",
  ],
  DemoltionClearWaste: [
    "Quanto lixo você precisa remover?",
    "Pequena quantidade, que cabe em uma carrinha ou carro",
    "Quantidade média, que cabe em uma carrinha média",
    "Grande quantidade, que cabe em uma carrinha grande",
    "Limpeza completa do local ou mais",
  ],
  DemoltionClearBuilding: [
    "Aproximadamente, qual é o tamanho da estrutura que precisa ser demolida?",
    "Pequena",
    "Média",
    "Grande",
    "Muito grande",
  ],
  DemolitionClearKnock: [
    "Que tipo de parede você deseja remover?",
    "Parede de estrutura de madeira",
    "Parede não portante (que não suporta cargas estruturais).",
    "Parede portante (que suporta cargas estruturais).",
  ],
  drivewaysPavingInstallRepair: [
    "Qual é o material de superfície que você precisa?",
    "Pavimentação de blocos (também conhecida como 'pavimentação intertravada' ou 'pavimentação de pavers').",
    "Brita (também conhecida como 'cascalho' ou 'pedra britada').",
    "Cimento",
    "Asfalto ou resina.",
    "Outros",
  ],
  drivewaysPavingPaving: [
    "Colocar ou substituir um pátio.",
    "Colocar ou substituir um caminho/passeio.",
    "Reparar pavimentação, caminho/passeio ou pátio.",
  ],
  electricalRewiring: [
    "Quantas instalações elétricas precisam ser refeitas?",
    "Parte da minha propriedade.",
    "Entire property",
  ],
  eletricalFuseBoxs: [
    "De que tipo de trabalho em caixa de fusíveis se trata?",
    "Substituição da caixa de fusíveis - no mesmo local.",
    "Substituição da caixa de fusíveis - no mesmo local diferente.",
    "Instalação de uma nova caixa de fusíveis.",
    "Outros",
  ],
  eletricalFittings: [
    "O que você deseja instalar?",
    "Instalações elétricas.",
    "Eletrodomésticos.",
    "Sistemas de segurança.",
    "Caldeiras e sistemas de aquecimento.",
  ],
  eletricalSafety: [
    "O que você precisa verificar ou certificar?",
    "Um único eletrodoméstico.",
    "Vários eletrodomésticos ou propriedade inteira.",
    "Propriedade comercial.",
  ],
  eletricalFaults: [
    "Qual das opções abaixo melhor descreve o seu problema?",
    "Simples",
    "Complexo",
  ],
  extensionsProperty: [
    "Em qual estágio do projeto você se encontra no momento?",
    "Estou pronto / quase pronto para o início do trabalho.",
    "Preciso de ajuda com o design ou planejamento antes de iniciar o trabalho.",
    "Ainda não estou pronto para construir, ainda estou explorando opções.",
  ],
  extensionsLoft: [
    "Que tipo de conversão de sótão você deseja?",
    "Conversão de sótão com alterações estruturais.",
    "Conversão de sótão (sem alterações estruturais).",
    "Conversão de sótão para fins de armazenamento.",
    "Instalar uma claraboia",
  ],
  extensionsPorch: [
    "Que tipo de trabalho em varanda?",
    "Apenas uma varanda nova.",
    "Preciso de uma nova varanda e alguns trabalhos adicionais.",
  ],
  fasciasSoffitsGutteringGuttering: [
    "Qual trabalho de calhas você precisa?",
    "Instalar / substituir",
    "Reparar (exemplo: vazamento)",
    "Limpeza / bloqueios",
  ],
  fasciasSoffitsGutteringFascias: [
    "O que você deseja ter feito com as suas beirais e / ou guarnições",
    "Instalar / substituir",
    "Reparar",
  ],
  fasciasSoffitsGutteringBoth: [
    "O que você deseja ter feito em suas fáscias, sofitos e sarjetas?",
    "Instalar / substituir",
    "Reparar",
  ],
  fencingFencing: [
    "Que tipo de cerca gostaria?",
    "Cerca de painel",
    "Cerca de borda de pena",
    "Outros",
  ],
  fencingGates: [
    "Quantos portões precisa?",
    "1",
    "2",
    "3 ou mais",
    "portão à medida",
  ],
  fencingFencingAndGates: [
    "Que tipo de cerca gostaria?",
    "Cerca de painel",
    "Cerca de borda de pena",
    "Outros",
  ],
  fencingRepair: ["Pequena reparação", "Grande reparação"],
  gardeningLandscapingGeneral: [
    "Qual das opções a seguir melhor descreve seu trabalho de jardinagem?",
    "Pequeno trabalho de jardinagem pontual",
    "Grande trabalho de jardinagem pontual",
    "Pequena manutenção contínua do jardim",
    "Grande manutenção contínua do jardim",
  ],
  gardeningLandscapingLandscaping: [
    "Qual das opções a seguir melhor descreve seu trabalho de jardinagem?",
    "Reparações de jardins",
    "Adicionar ou substituir elementos",
    "Projeto de reforma de jardim/paisagismo",
  ],
  gardeningLandscapingTree: [
    "Que tipo de serviço de cirurgia de árvore você precisa?",
    "Cortar ou Cobrir",
    "Cortar",
    "Apenas remoção de tocos",
    "Diagnóstico / Avaliação",
    "Arbustos ou outras tarefas de jardinagem",
    "Outros",
  ],
  gasWorkSafety: [
    "O que você precisa certificado?",
    "Caldeira",
    "Único aparelho",
    "Vários aparelho",
  ],
  gasWorkService: [
    "O que você precisa de serviço?",
    "Caldeira",
    "Único aparelho",
    "Vários aparelho",
  ],
  gasWorkInstall: [
    "Que tipo de aparelho você deseja instalar ou substituir?",
    "Aquecedor de água a Gás",
    "Fogão a gás ou forno",
    "Outro ou vários dos anteriores",
  ],
  gasWorkMove: ["Deseja remover uma caldeira a gás?", "Sim", "Não"],
  gasWorkPipeWork: [
    "O que precisa ser mudado com a tubulação?",
    "Desconecte ou tampe a tubulação",
    "Instalar ou alterar tubulações",
    "Outros",
  ],
  gasWorkRepair: [
    "Qual eletrodoméstico precisa de reparo?",
    "Caldeira",
    "Fogão a gás ou forno",
    "Lareira a gás",
    "Outros",
  ],
  groundworkFoundationsFoundations: [
    "Para que você quer fundações?",
    "Casa nova",
    "Extensão da casa",
    "Dependência ou garagem",
    "Cabana",
    "Outros",
  ],
  kitchenFittingExtensive: [
    "Qual o tamanho da sua cozinha?",
    "Ampla reforma na cozinha",
    "Reforma de cozinha padrão",
    "Outros",
  ],
  kitchenFittingWorkTop: [
    "Qual material da bancada gostaria?",
    "Pedra natural",
    "Composto",
    "Madeira sólida",
    "Laminada",
    "Outros",
  ],
  kitchenFittingFitAppliance: [
    "Que tipo de aparelho necessita de instalação?",
    "Fogão a gás / bicombustível / forno",
    "Fogão/forno elétrico",
    "Máquina de lavar",
    "Lava-louças",
    "Afundar",
    "Outros",
  ],
  lockSmithInstall: [
    "Quantas fechaduras você precisa instalar?",
    "1 cadeado",
    "2 cadeados",
    "3 ou mais cadeados",
  ],
  loftConversionsConversions: [
    "Para que tipo de casa é a conversão do loft?",
    "Desanexado",
    "Geminado",
    "Terraço",
    "Bangalô",
    "Outros",
  ],
  loftConversionsStorage: [
    "O que você precisa fazer no seu loft?",
    "Embarque no sótão",
    "Embarque mais trabalho adicional",
  ],
  newBuildSub: [
    "Você tem permissão de planejamento?",
    "Sim",
    "Em progresso",
    "Não",
  ],
  plasteringRenderingPlastering: [
    "Que tipo de gesso você precisa?",
    "Desnatar apenas",
    "Placa de gesso e skim",
    "Outro",
  ],
  plasteringRenderingRendering: [
    "O que você precisa renderizado?",
    "Exterior da casa",
    "Parede(s) do jardim",
  ],
  plumbingRadiators: [
    "O que precisa ser feito?",
    "Problema menor (por exemplo, vazamento, sangramento, batidas",
    "Mover ou substituir",
    "Outros",
  ],
  plumbingBoiler: [
    "Que tipo de caldeira você tem?",
    "Gás",
    "Óleo",
    "Elétrico",
    "Outros",
  ],
  plumbingAppliances: [
    "Quantos aparelhos você precisa instalar ou substituir?",
    "1 item",
    "2 to 3 items",
    "4 or more items",
  ],
  plumbingFixtures: [
    "Como um encanador pode ajudá-lo com seus acessórios?",
    "Instalar ou substituir",
    "Reparação",
  ],
  plumbingPipework: [
    "Existe a possibilidade de que seu trabalho envolva tubulação de gás?",
    "Sim",
    "Não",
  ],
  restorationRefurbishmentSub: [
    "O trabalho envolve mudar o propósito ou a estrutura de uma sala?",
    "Sim",
    "Não",
  ],
  roofingNewReplace: [
    "Que tipo de telhado você precisa?",
    "Telhado inclinado",
    "Telhado plano",
  ],
  roofingChimney: [
    "Que trabalho de chaminé precisa ser feito?",
    "Instalar ou reconstruir nova chaminé",
    "Remover uma chaminé existente",
    "Consertar ou reencaixar minha chaminé",
    "Tampa de chaminé",
    "Outros",
  ],
  securitySystemsAlarm: [
    "Instalar ou reconstruir nova chaminé",
    "Instalação",
    "Serviço de reparo",
    "Remoção",
    "Outros",
  ],
  securitySystemsCCTV: [
    "Que tipo de serviço de câmera de segurança você precisa?",
    "Instalação",
    "Serviço de reparo",
    "Remoção",
    "Outros",
  ],
  stonemasonryBuilding: [
    "Que tipo de trabalho de pedra você precisa?",
    "Silhar",
    "Cascalho aleatório",
    "Pedra seca",
    "Outros",
  ],
  stonemasonryRepairing: [
    "Que tipo de trabalho de pedra você precisa reparar?",
    "Silhar",
    "Cascalho aleatório",
    "Pedra seca",
    "Outros",
  ],
  stonemasonryRepoiting: [
    "Que tipo de trabalho de pedra você precisa reencaminhamento?",
    "Silhar",
    "Cascalho aleatório",
    "Outros",
  ],
  tilingNewReplace: [
    "Quantos metros quadrados precisam ser azulejados?",
    "Menos de 2m²",
    "Menos de 2m²",
    "2 - 14m²",
    "15 - 30m²",
    "31 - 50m²",
    "Mais de 50m²",
    "Comercial ou projeto",
    "Outros",
  ],
  tillingRepair: [
    "Aproximadamente, qual é o tamanho da área afetada?",
    "Pequena (menos de 2m²)",
    "Grande (2m² ou mais)",
  ],
  windowsDoorFitingWindows: [
    "Qual tipo de janela você precisa?",
    "Madeira",
    "PVC",
    "Alumínio",
    "Outro",
  ],
  windowsDoorFitingDoors: [
    "As portas são internas ou externas?",
    "Portas internas",
    "Portas externas",
  ],
  windowsDoorFitingReplaceGalss: [
    "Quantos vidros precisam ser substituídos?",
    "1",
    "2 - 3",
    "4 ou mais",
  ],
  windowsDoorFitingReplaceRepair: [
    "Que tipo de janelas/portas precisam de reparo?",
    "Madeira",
    "PVC and metal",
  ]
};
export default serviceCategories;