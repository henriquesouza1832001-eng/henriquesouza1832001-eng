# Regras do portfólio — Henrique Souza

**Status:** documento-base para qualquer nova etapa de design, conteúdo ou implementação.  
**Objetivo:** fazer do site uma apresentação autoral e confiável do trabalho de Henrique como desenvolvedor full stack, não uma coleção genérica de cartões de projeto.

Este documento reúne as decisões que se repetiram ao longo do planejamento e define como resolver o que ainda está em aberto. Em caso de conflito com um rascunho anterior, estas regras prevalecem. Os documentos da fase 0 continuam úteis para conteúdo e comportamento; devem ser atualizados quando uma decisão nova os contradisser.

---

## 1. O que o site precisa provar

O portfólio é a porta de entrada para o trabalho de Henrique. Em poucos minutos, quem visita precisa conseguir:

1. entender quem é Henrique e que tipo de problema ele resolve;
2. encontrar primeiro o trabalho mais representativo;
3. perceber a relação entre interface, regra de negócio, dados e infraestrutura;
4. distinguir trabalho publicado, colaboração e projeto em desenvolvimento;
5. abrir um case, verificar o repositório ou produto e entrar em contato;
6. explorar o computador interativo sem perder o caminho direto para projetos, autoria e contato.

O site deve mostrar **como Henrique pensa e constrói**, não apenas afirmar que sabe fazer frontend e backend. Toda afirmação importante precisa estar ligada a uma decisão, uma demonstração ou uma fonte verificável.

## 2. Hierarquia dos projetos

Esta ordem editorial é obrigatória. A posição não deve ser alterada só porque um projeto é mais novo, mais chamativo ou mais simples de ilustrar.

| Prioridade | Projeto | Papel no portfólio | Tratamento obrigatório |
|---|---|---|---|
| 1 | **Rota di Buteco** | Projeto principal e porta de entrada | Recebe a maior presença na home e o case mais completo. Mostrar cidade, uso social, fluxo de visita, mapa, feed e decisões que sustentam a experiência. |
| 2 | **Quarta é Dia de Amstel** | Produto local com campanha e regras | Mostrar como local, prioridade de campanha e disponibilidade se relacionam. Distinguir o que o código faz do que está ativo no mundo real. |
| 3 | **Condrio** | Evidência principal de profundidade full stack e operação | Investigar o repositório público antes de afirmar arquitetura. Explicar módulos, fluxos, dados, integrações, desempenho e limites que puderem ser comprovados. Não expor informação interna. |
| 4 | **MNEME** | Colaboração em sistema de decisão | A fonte inicial é o README de [th1agx/MNEME](https://github.com/th1agx/MNEME). Apresentar como projeto de Thiago Antunes e descrever Henrique como colaborador no desenvolvimento. Não atribuir autoria individual nem capacidades além do que a fonte confirma. |
| 5 | **PULSO** | Trabalho em desenvolvimento | Manter visível como projeto em andamento. Não descrevê-lo como produto pronto ou serviço operacional. |
| 6 | **TrilhaBH** | Trabalho em pré-beta | Usar o estado pré-beta até nova confirmação. Não sugerir disponibilidade pública maior do que a fonte comprova. |

**Obra Pro está fora do portfólio.** Não deve aparecer em texto, card, Oficina, navegação, SEO ou imagens. O pato e qualquer personagem baseado nele também foram descartados. Não reintroduzir essas ideias por conta própria.

## 3. Regras de pesquisa e verdade factual

Antes de escrever ou redesenhar um case:

- conferir README, código, documentação e estado público do projeto;
- registrar a URL e a evidência que sustentam cada afirmação técnica;
- confirmar linguagem, serviços, infraestrutura, estado do produto e autoria no próprio repositório;
- separar fato comprovado, interpretação editorial e demonstração fictícia;
- marcar dados de demonstração como simulados, sem insinuar que vieram de produção;
- atualizar a informação quando o estado do projeto mudar.

É proibido inventar clientes, usuários, resultados, métricas, depoimentos, precisão de mapas, integração em produção ou impacto comercial. Se um dado não estiver disponível, explicar a decisão qualitativamente ou deixar a lacuna fora do site. Se uma informação não puder ser verificada, não a publicar como fato.

No Condrio, usar telas reais apenas após remover nomes, valores, endereços, registros e qualquer outro dado interno. Se não houver captura segura, preferir diagrama autoral identificado como diagrama. No MNEME, manter os créditos visíveis no resumo, no case e na demonstração.

## 4. Identidade visual: decisões aprovadas e pontos em aberto

### Regras fixas

- A identidade deve nascer da combinação entre **trabalho de campo, cidade e sistemas**. Cartografia, percursos, operações e decisões são matéria visual; enfeites sem relação com esses temas não entram.
- O site precisa de uma assinatura reconhecível: wordmark ou símbolo próprio, sistema tipográfico, composição e vocabulário gráfico consistentes.
- O fundo é escuro e de tinta; o protótipo atual combina giz, oliva, óxido, aço e lilás. A paleta ainda não está aprovada. Consultar [02-SISTEMA-VISUAL.md](02-SISTEMA-VISUAL.md) para valores provisórios e contraste calculado.
- A tipografia pode ter escala e personalidade, mas precisa caber na viewport, manter a leitura e não encobrir rótulos, conteúdo ou ilustrações.
- Cada projeto terá uma linguagem gráfica derivada de seu funcionamento. Um mapa social, uma regra de campanha, um ERP e um fluxo de decisão não podem ser a mesma composição com cores trocadas.
- Preferir capturas reais anonimizadas e gráficos próprios em SVG, CSS ou Canvas. Não usar ilustração genérica de banco nem imagem decorativa gerada como substituto da prova do produto.
- Cor, fonte, símbolo e movimento precisam formar um sistema pequeno e repetível. Não escolher uma cor de destaque apenas por estar em alta.

### Decisão cromática superada

**Registro superado:** marinho/lima/coral foi a paleta aplicada antes da revisão, mas Henrique disse que ela parecia genérica e cansativa. O protótipo atual e seus cálculos WCAG constam em [02-SISTEMA-VISUAL.md](02-SISTEMA-VISUAL.md); cor e marca continuam abertas até a validação visual.

### Decisões ainda em aberto

Símbolo/logotipo, fontes e composição seguem em revisão. A direção visual deve continuar ligada ao trabalho de campo, à cidade e aos sistemas, com contraste conferido em contexto e sem movimento decorativo.

Revisar a abertura e os quatro cases como uma única narrativa. Fazer inspeção real em desktop e em 320, 375 e 768 px; conferir contraste depois da renderização, forma do monograma em 16 px, legibilidade e comportamento sem movimento. Registrar resultado no `QA.md` sem declarar telas inspecionadas que não foram abertas.

## 5. Uso das referências

As referências são estudos de qualidade, não modelos a reproduzir:

- **[Antoine Wodniack](https://wodniack.dev/):** tipografia com presença, cadência e movimento deliberado;
- **[Bruno Simon](https://bruno-simon.com/):** mundo jogável, controles claros e descoberta opcional;
- **[Tabasco — Hilo Studio](https://hilostudiolab.com/en/projects/tabasco):** história contada ao longo do scroll, com a cena acompanhando as etapas do processo;
- **[Heron AI](https://heronaiapp.com/):** desenho técnico interativo e microestados ligados ao domínio do produto;
- **[Bisous Production — 07](https://bisous-production.com/work/):** arte visual própria por projeto e índice de trabalhos em grade/lista;
- **[seocubo — 09](https://seocubo.com/):** ambiente pessoal com áreas de trabalho distintas.

Antes de tomar uma decisão baseada numa referência, voltar ao link original e registrar **qual princípio** será adaptado. Não copiar composição, texto, código, personagem, veículo, cenário, paleta ou mecânica identificável. Cada ideia trazida para o portfólio precisa ter uma razão ligada ao trabalho de Henrique.

A aplicação dessas seis referências e o novo percurso vertical estão detalhados em [07-DIRECAO-DE-EXPERIENCIA.md](07-DIRECAO-DE-EXPERIENCIA.md).

## 6. Conteúdo e estrutura dos cases

Todo case deve responder às perguntas abaixo, com profundidade proporcional ao projeto:

1. **Situação:** qual problema ou contexto concreto motivou o trabalho?
2. **Papel:** o que Henrique fez e com quem colaborou?
3. **Experiência:** o que a pessoa usuária consegue fazer e como o sistema responde?
4. **Sistema:** quais partes de frontend, backend, dados, integrações e infraestrutura sustentam esse fluxo?
5. **Decisão:** qual escolha técnica ou de produto foi relevante, por que foi feita e qual consequência teve?
6. **Estado e limites:** o que funciona hoje, o que é demonstração e o que ainda está em andamento?
7. **Prova:** onde abrir o produto, repositório, documentação ou diagrama correspondente?

As respostas precisam ser objetivas e verificáveis contra a fonte do projeto. Se a informação não estiver confirmada, registrar “não verificado” ou removê-la; não preencher a lacuna com texto genérico. Cada case precisa de ao menos uma prova própria — link funcional para produto/repositório, vídeo/GIF de uso real ou diagrama específico que não aparece em outro case. É desejável repetir navegação, hierarquia e legibilidade; não repetir história, prova, diagrama ou demonstração entre cases.

Antes de redigir cada case, escrever uma frase que identifique o que o diferencia estruturalmente do case anterior: stack, papel de Henrique ou decisão central. Depois, cobrir o nome do projeto no texto. Se ele ainda fizer sentido para qualquer outro case, reescrever.

Os cases não devem repetir o mesmo template em todos os detalhes. Reutilizar estrutura de navegação e legibilidade é bom; reutilizar a mesma história, diagrama e interação em todos eles é genérico. Cada case deve ter uma demonstração curta ligada à mecânica real do projeto.

## 7. Navegação, rolagem e experiência interativa

- O computador é a própria home, apresentado como uma área de trabalho de software; não há ambiente físico, monitor em perspectiva, segunda tela, lâmpada ou objeto cenográfico. A IDE aparece desde a abertura, e o desktop oferece atalhos que abrem apps reais.
- O atalho **Portfólio** abre um Explorador de Arquivos funcional. A pasta raiz lista o README e as pastas de projetos; abrir uma pasta mostra o resumo, o case quando existe, o produto quando está publicado e o repositório público. A busca, o caminho da pasta, os atalhos laterais e os controles da janela precisam responder.
- O scroll do navegador continua nativo e vertical. Não interceptar roda ou gesto de toque, avançar sozinho, nem prender a navegação em painéis internos. O código público aparece linha a linha conforme a posição do scroll e recolhe ao subir; depois do primeiro controle manual, a escolha de app da pessoa prevalece.
- No fim do percurso, o desktop abre o Explorador de Arquivos se a pessoa ainda não escolheu um app. Os cases mantêm URLs diretas, recarregáveis e compartilháveis.
- Em telas estreitas, manter a metáfora de software em uma composição responsiva, sem moldura de telefone ou indicadores de estado fictícios. O conteúdo e os links ficam acessíveis ao toque.
- Cases mantêm URLs diretas, recarregáveis e compartilháveis. Links de índice precisam levar ao case correto e as âncoras devem respeitar o cabeçalho fixo.
- **Decisão atual:** a área de trabalho interativa é a própria home. A IDE fica aberta desde o início; a pasta Portfólio abre o Explorador e seus arquivos. Quem chega com pressa consegue abrir projetos, cases, produtos, código e contato sem completar a narrativa.
- Em telas estreitas, os mesmos apps permanecem disponíveis numa interface direta, sem desenhar carcaça de dispositivo.
- O painel de ajustes tem ao menos um controle funcional. O som começa desligado e só é ativado por escolha explícita.
- O computador tem relação com o trabalho de Henrique: acompanha uma interface sendo construída e termina como um lugar navegável para inspecionar projetos e código. Não criar um jogo separado nem adicionar WebGL só para impressionar.
- Não roubar o cursor, bloquear controles do navegador, forçar movimento, esconder o botão de saída ou exigir arrastar. Não usar personagem descartado, carro ou mecânica que imite a identidade de Bruno Simon.
- Toda interação tem instrução curta, resposta legível, saída imediata e alternativa equivalente para teclado e toque. Respeitar `prefers-reduced-motion`.

## 8. Regras técnicas

- **React e TypeScript** são a base aprovada para a aplicação interativa atual. Manter componentes e conteúdo tipado; não migrar de stack apenas por preferência estética.
- Adicionar dependências só quando uma necessidade concreta não puder ser atendida bem com a stack existente. A área de trabalho usa React, HTML e CSS; não manter Three.js ou outro renderer 3D para simular hardware.
- Usar HTML semântico, foco visível, rótulos para controles, links externos seguros e contrastes legíveis. A experiência principal precisa funcionar sem hover.
- Garantir layout em 320, 375, 768 e desktop amplo. Não deixar títulos cortados, cards inacessíveis ou a página com rolagem horizontal acidental.
- Manter títulos e descrições próprios por case, 404, canonical, sitemap e metadados sociais atualizados.
- Não publicar credenciais, informações privadas, bases de produção ou arquivos de ambiente.

## 9. O que caracteriza uma solução com “cara de IA” e deve ser evitado

- Hero intercambiável com frase abstrata, nome gigante e botão genérico sem ligação com os projetos;
- grades repetidas de cartões, ícones aleatórios, gradientes sem função e mockups que poderiam pertencer a qualquer produto;
- adjetivos vazios como “inovador”, “inteligente” ou “transformador” sem prova concreta;
- blocos de texto com o mesmo ritmo e a mesma quantidade em todos os cases;
- animação, 3D, jogo ou cursor personalizado usados apenas para impressionar;
- títulos com quebras artificiais, lettering que cobre rótulos ou contraste baseado em cores neon em excesso;
- seções com promessas, estatísticas ou detalhes de produto não verificados.

Regra prática: se um elemento puder ser movido para outro portfólio sem mudar nada, perguntar que evidência ou relação com um projeto ele acrescenta. Se não houver resposta clara, remover ou redesenhar.

## 10. Processo por fases e validação

Trabalhar por marcos completos, sem pedir aprovação a cada ajuste de linha:

### Fase A — inventário factual

Revisar um repositório por vez, confirmar autoria, estado, stack, fluxos e material visual seguro. Entregar uma matriz de evidências e lacunas. Não iniciar claims novos antes desta revisão.

### Fase B — identidade e validação visual

A paleta marinho/lima/coral foi rejeitada depois da implementação por parecer genérica e cansativa. O protótipo tinta/giz/oliva/óxido precisa ser inspecionado antes de consolidar cor, marca, tipografia e composição. Revisar desktop e 320, 375 e 768 px, contraste renderizado, assinatura a 16 px, movimento reduzido e a relação visual com Rota, Quarta, Condrio e MNEME. Registrar no `QA.md` somente o que foi efetivamente visto.

### Fase C — narrativa e estrutura

Definir ordem da home, argumentos de cada case, conteúdo de sobre, chamadas e contatos. Verificar que Rota ocupa o primeiro plano e que estados e créditos estão corretos.

### Fase D — Computador como home

O desktop da home é uma interface de sistema operacional feita em React e CSS. A IDE começa aberta e revela código público durante o scroll. O atalho Portfólio abre um Explorador com pastas e arquivos de projetos reais; cada atalho externo corresponde a um produto, case ou repositório existente. Em viewport estreito, a mesma ideia se reorganiza sem carcaça de dispositivo. O ajuste de som é real, global e desligado ao abrir. Validar teclado, toque, foco, saída, viewport e movimento reduzido.

Não simular bancada, monitor, iluminação, segunda tela ou objetos físicos por CSS/3D. A identidade vem da própria interface, do conteúdo público e dos controles que funcionam. Remover controles decorativos e registrar no QA as mudanças de direção.

### Fase E — implementação

Aplicar identidade aprovada, construir cases com linguagem própria e fechar navegação, responsividade e acessibilidade. Concluir a experiência antes de adicionar efeitos de acabamento.

### Fase F — revisão e publicação

Validar build, conteúdo, links, rotas diretas, movimento reduzido, teclado, toque e telas estreitas. Conferir domínio e conteúdo publicado. Atualizar o registro de QA com resultado e limites reais da verificação.

Ao fim de cada fase, executar as verificações e registrar o que passou ou falhou; então continuar para a próxima fase. Parar para decisão do usuário só quando uma escolha de identidade, autoria ou conteúdo não puder ser inferida com segurança, ou quando houver risco de expor dado privado. Não interromper por decisões cosméticas reversíveis.

## 11. Critérios de aceite do portfólio

O trabalho só pode ser chamado de pronto quando:

- Rota di Buteco é reconhecida como o projeto principal sem esconder os outros trabalhos;
- um visitante entende o papel de Henrique em cada projeto e consegue distinguir autoria própria de colaboração;
- ao menos um exemplo concreto por case mostra interface e sistema funcionando juntos;
- cada case tem uma prova própria e passa no teste de genericidade;
- detalhes técnicos e estados conferem com os repositórios e não há afirmações inventadas;
- cada case tem composição e demonstração adequadas à sua mecânica;
- a paleta aprovada está documentada; símbolo, tipografia e composição foram inspecionados sem reabrir a decisão cromática;
- a decisão de manter ou cortar a Oficina está registrada;
- o jogo é opcional, relacionado aos projetos e fácil de abandonar;
- desktop e larguras de 320, 375 e 768 px foram conferidos visualmente e a pessoa que validou está indicada;
- teclado, toque, foco, leitor de tela, contraste e movimento reduzido foram verificados;
- não há links quebrados, rota direta quebrada, scroll preso ou overflow horizontal acidental;
- o domínio publicado corresponde ao build aprovado e o QA registra o que foi realmente conferido.

## 12. Documentos relacionados

- [Fundamento e conteúdo](00-FASE-0.md)
- [Pesquisa de projetos](01-CONTEUDO-E-PROJETOS.md)
- [Sistema visual inicial](02-SISTEMA-VISUAL.md)
- [Wireframes e Oficina](03-WIREFRAMES-E-JOGO.md)
- [Plano de execução](04-EXECUCAO-E-ACEITE.md)
- [Histórico de validação](QA.md)

Este arquivo define as regras. Os demais documentos guardam decisões e relatórios de fases anteriores; quando uma regra daqui exigir mudança neles, atualizar o documento correspondente na fase em andamento.
