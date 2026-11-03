# Wireframes e funcionamento da Oficina

Os esquemas abaixo definem **hierarquia e comportamento**. A antiga paleta marinho/lima/coral foi rejeitada por parecer genérica e cansativa. O protótipo tinta/giz/oliva/óxido descrito em [02-SISTEMA-VISUAL.md](02-SISTEMA-VISUAL.md) está em revisão e ainda não foi aprovado visualmente. Marca, composição, responsividade e acessibilidade continuam pendentes.

**Atualização 03/11/2026:** o percurso vertical atual e a leitura das referências estão especificados em [07-DIRECAO-DE-EXPERIENCIA.md](07-DIRECAO-DE-EXPERIENCIA.md). O diagrama antigo da home abaixo é uma referência de conteúdo; o scrollytelling substitui a sequência anterior de cases soltos.

As quatro estações da Oficina ficam reabertas para avaliação: Rota, Quarta, Condrio e MNEME. A implementação é configurada por estação; MNEME compara cenários prontos com uma alternativa que deixa a maioria visível. Teclado, toque, retorno ao mapa e acessibilidade ainda precisam de inspeção real antes do aceite.

## Home — desktop

```text
┌──────────────────────────────────────────────────────────────────────┐
│ HS / HENRIQUE SOUZA             TRABALHOS   OFICINA   CONTATO         │
├──────────────────────────────────────────────────────────────────────┤
│ 01 / BELO HORIZONTE                                      2026        │
│                                                                      │
│ HENRIQUE                                                             │
│ SOUZA.                    ╭── percurso autoral entre três nós ──╮   │
│                                                                      │
│ Construo produtos para gente sair pela cidade, equipes tirarem      │
│ trabalho da planilha e dados virarem decisões explicáveis.          │
│                                                                      │
│ [VER TRABALHOS ↓]                 [ENTRAR NA OFICINA ↗]               │
└──────────────────────────────────────────────────────────────────────┘
┌──────────────────────────────────────────────────────────────────────┐
│ TRABALHOS / 01—04       [ROTA] [QUARTA] [CONDRIO] [MNEME]  ←  →      │
│ A faixa acompanha o scroll; clicar abre o case.                      │
└──────────────────────────────────────────────────────────────────────┘
```

**Comportamento:** cabeçalho permanece disponível sem ocupar altura excessiva. Índice mostra posição e permite teclado/botões. Scroll vertical sempre avança. Nenhum loader antecede o nome.

## Home — celular

```text
┌───────────────────────────┐
│ HENRIQUE S.       MENU    │
│ 01 / BH                   │
│ HENRIQUE                  │
│ SOUZA.                    │
│ [gráfico de percurso]     │
│ frase em 4–6 linhas       │
│ [TRABALHOS] [OFICINA]     │
├───────────────────────────┤
│ 01  ROTA DI BUTECO  ↗     │
│ 02  QUARTA...       ↗     │
│ 03  CONDRIO        ↗     │
│ 04  MNEME          ↗     │
└───────────────────────────┘
```

**Comportamento:** faixa lateral horizontal em desktop e celular, com loop, swipe, arrasto e botões; foco e links diretos continuam disponíveis. O documento inteiro segue rolagem vertical nativa.

## Percurso vertical atualizado — desktop e celular

```text
DESKTOP                         CELULAR
┌─────────────────────┐         ┌───────────────────┐
│ PRANCHA STICKY      │         │ ARTE DA ROTA      │
│  desenho da Rota    │         │  texto + prova    │
│  legenda / índice   │         │  abrir o case ↗   │
└─────────────────────┘         ├───────────────────┤
       ↕ scroll                 │ ARTE DA QUARTA    │
┌─────────────────────┐         │  texto + regra    │
│ 01 ROTA             │         │  abrir o case ↗   │
└─────────────────────┘         ├───────────────────┤
┌─────────────────────┐         │ ARTE DO CONDRIO   │
│ 02 QUARTA           │         │  texto + prova    │
└─────────────────────┘         └───────────────────┘
┌─────────────────────┐
│ 03 CONDRIO          │
└─────────────────────┘
┌─────────────────────┐
│ 04 MNEME            │
└─────────────────────┘
```

**Comportamento:** no desktop, a prancha muda quando outro capítulo ocupa a faixa central de leitura. Quatro links na própria prancha pulam diretamente para cada capítulo. No celular, a arte reaparece dentro do capítulo, antes do texto, e a leitura permanece vertical. O efeito não controla nem acelera o scroll do navegador; com movimento reduzido, as transições desaparecem.

## Template de case

```text
[NÚMERO / CATEGORIA / ESTADO]
[TÍTULO GRANDE DO PROJETO]
[FRASE HUMANA: O QUE MUDOU PARA A PESSOA]
              ↓
[SITUAÇÃO REAL]       [IMAGEM REAL OU DIAGRAMA IDENTIFICADO]
              ↓
[DEMO CURTA COM INSTRUÇÃO, AÇÃO E RESULTADO]
              ↓
[COMO FUNCIONA POR TRÁS: COMPONENTES / DADOS / REGRAS]
              ↓
[DECISÃO DE ENGENHARIA: POR QUÊ + CONSEQUÊNCIA + LIMITE]
              ↓
[CRÉDITOS / ESTADO ATUAL / GITHUB / PRODUTO QUANDO VÁLIDO]
              ↓
[PRÓXIMO PROJETO]
```

### Diferença entre os quatro cases

- **Rota:** mapa social e mudança visível de feed/ranking; ritmo de cidade.
- **Quarta:** sobreposição de lugar e regra; ritmo de campanha e horário.
- **Condrio:** módulos e profundidade; ritmo de mesa de operação.
- **MNEME:** sequência de portas e justificativas; ritmo de decisão.

## Oficina — quatro estações e uma alternativa em avaliação

```text
┌──────────────────────────────────────────────────────────────────────┐
│ OFICINA DE SISTEMAS                              [LISTA] [SAIR ×]     │
│ Mova com setas/WASD ou toque em uma estação.                          │
│                                                                      │
│                           ┌─────────────────────┐                    │
│                           │ 04 MNEME            │                    │
│                           │ SALA DE DECISÃO     │                    │
│                           └──────────┬──────────┘                    │
│                                      │                               │
│ ┌───────────────────┐     [ HS ]    ┌───────────────────────┐       │
│ │ 01 ROTA           ├───────○───────┤ 02 QUARTA             │       │
│ │ MAPA SOCIAL       │               │ CHAVE DE CAMPANHA     │       │
│ └───────────────────┘               └───────────────────────┘       │
│                                      │                               │
│                           ┌──────────┴──────────┐                    │
│                           │ 03 CONDRIO          │                    │
│                           │ MESA DE OPERAÇÃO   │                    │
│                           └─────────────────────┘                    │
│                                                                      │
│           [VER LISTA DE PROJETOS]          [SAIR ×]                  │
└──────────────────────────────────────────────────────────────────────┘
```

**Comportamento:** mapa curto entre quatro estações. Setas/WASD movem o marcador; `Enter` abre a estação próxima. Cada botão abre a interação diretamente, sem exigir movimento. “Explorada” é somente orientação local, sem pontuação, login ou armazenamento.

## Estações — ciclo completo

| Estação | Objetivo visível | Ação | Resposta | Nota de realidade | Saídas |
|---|---|---|---|---|---|
| Rota | “Faça uma visita aparecer para o grupo” | Selecionar um estabelecimento fictício e acionar check-in | Contador local e texto do feed de exemplo atualizam | A PWA usava listeners do Firestore para atualizar feed e ranking; mapa e nomes são ilustrativos | Abrir case / voltar |
| Quarta | “Veja qual campanha vence” | Ativar/desativar camadas fictícias | Bar → cidade → estado → nacional destaca a primeira camada ativa | A ordem vem da função no Worker; campanhas são fictícias; o site externo pede confirmação de idade | Abrir case / voltar |
| Condrio | “Leve uma demanda ao fluxo certo” | Escolher módulo sintético e abrir caminhos de arquitetura | O fluxo muda; README/Databricks e Worker/Hono aparecem separados | Sem dado interno; a relação entre arquiteturas não está confirmada | Abrir case / voltar |
| MNEME | “Entenda a maioria antes da simulação” | Versão A: escolher cenário pronto. Versão B: alternar votos fictícios | Mostra entrada simulada ou ausência de maioria | Projeto de Thiago Antunes; Henrique colaborou. Sem score, preço, carteira ou resultado financeiro | Abrir case / voltar |

### Protótipos da estação MNEME

| Versão | O que demonstra | Vantagem | Custo/risco |
|---|---|---|---|
| A — cenários prontos (atual) | Maioria de alto acerto comprando ou nenhuma maioria; resposta em simulação | Direta e curta, sem atribuir quantidade de participantes | Explica menos claramente como a maioria surge |
| B — montar a maioria (alternativa) | Três traders fictícios alternáveis entre compra e venda; resultado acompanha a maioria | Torna a regra observável | O número de cartões é inventado; não pode sugerir um limiar real configurado |

**Decisão provisória:** manter A como padrão até inspeção, pois usa menos premissas ilustrativas; B fica disponível para comparação. A escolha final depende da legibilidade nos dois formatos e da visibilidade do aviso sobre dados fictícios.

### Estados do sistema

```text
Fechado
  └─ Abrir → Planta
                ├─ selecionar estação → Foco
                │                       ├─ agir → Resultado → Case
                │                       └─ voltar → Planta
                ├─ Ver lista → Índice de projetos
                └─ Sair → Página na mesma posição
```

**Controles implementados no protótipo:** tab até a área do mapa; setas/WASD movem o marcador, `Enter` abre a estação próxima; tab e toque alcançam as quatro estações. `Esc` retorna ao mapa ou fecha a Oficina. O visitante pode pular a ação e abrir o case. O resultado é local e não acessa os produtos originais.

**Acessibilidade a validar no navegador:** modal com foco gerenciado, saída visível, mapa focável com instrução acessível, alternativa por botões, conteúdo equivalente nos cases e movimento sem animação quando `prefers-reduced-motion` está ativo. Verificar fluxo de foco, toque e leitura em viewport estreito antes de aceitar a Oficina.

## Mudanças de tela e URLs

- Home: `/`.
- Cases: `/projetos/rota-di-buteco`, `/projetos/quarta-amstel`, `/projetos/condrio`, `/projetos/mneme`.
- PULSO e TrilhaBH: âncoras na seção Laboratório, com possibilidade de case no futuro.
- Oficina: `/` ou `/?explorar=1`. A query abre diretamente a Oficina; o botão voltar do navegador fecha a camada; Escape e “Sair” removem a query.
- Página inexistente: 404 com índice de projetos e volta para home.
