# Fase 0 — fundamento do novo portfólio

> Documento histórico da primeira definição de escopo. Para identidade visual e critérios atuais, prevalecem [REGRAS-DO-PORTFOLIO.md](REGRAS-DO-PORTFOLIO.md), [02-SISTEMA-VISUAL.md](02-SISTEMA-VISUAL.md) e o plano atualizado em [04-EXECUCAO-E-ACEITE.md](04-EXECUCAO-E-ACEITE.md).

**Direção revisada em 03/11/2026:** o scroll vertical agora precisa conduzir os capítulos dos projetos e sincronizar uma prancha gráfica com a leitura. A definição abaixo continua válida para liberdade de rolagem e navegação direta; a regra antiga de que o scroll vertical só avança por seções independentes foi substituída por [07-DIRECAO-DE-EXPERIENCIA.md](07-DIRECAO-DE-EXPERIENCIA.md).

## Resultado desejado

O portfólio deve ser uma porta de entrada para o trabalho de Henrique Souza como desenvolvedor capaz de construir a experiência e o sistema que a sustenta. Em três minutos, alguém deve entender **o que foi feito, por que foi feito, qual foi o papel de Henrique e onde ver a prova**. Quem quiser explorar mais encontra uma segunda camada em forma de minijogo.

## Tese

**Do trajeto ao sistema.** Um percurso começa com uma pessoa e uma situação concreta. Rota di Buteco organiza uma saída e a transforma em experiência coletiva; Quarta é Dia de Amstel liga local, regra e campanha; Condrio organiza o fluxo de uma operação; MNEME mostra como um sinal passa por critérios antes de uma decisão. PULSO e TrilhaBH aparecem como trabalho em evolução, sem fingir que estão concluídos.

**Nome de trabalho da experiência:** Oficina de sistemas. É uma mesa de percursos e decisões, não uma interface de sistema operacional literal.

## Hierarquia editorial fixa

| Peso | Projeto | Papel no portfólio | Estado |
|---|---|---|---|
| 1 | Rota di Buteco | Primeiro grande case; produto social, cidade, uso real durante evento | Evento encerrado |
| 2 | Quarta é Dia de Amstel | Produto local com regra de negócio e backend na Cloudflare | Repositório público; site HTTP 200, com confirmação 18+ |
| 3 | Condrio / Controler | Profundidade full stack, operação complexa, arquitetura e desempenho | Sistema interno; sem dados reais no portfólio |
| 4 | MNEME | Colaboração em sistema de decisão explicável | Projeto de Thiago Antunes; contribuição de Henrique em desenvolvimento |
| 5 | PULSO | Engenharia de fontes e sinais | Em desenvolvimento |
| 6 | TrilhaBH | Continuidade da exploração local | Pré-beta |

Obra Pro e o pato não entram. Não vamos usar um carro ou personagem semelhante ao de Bruno Simon. O jogo será uma ferramenta para entender os projetos, com mecânicas próprias.

## Inspirações traduzidas em decisões

| Referência | O que observamos | Como entra aqui |
|---|---|---|
| [Antoine Wodniack](https://wodniack.dev/) | Tipografia dominante e ritmo de movimento | Abertura forte e transições por percurso, sem copiar composição ou vermelho |
| [Bruno Simon](https://bruno-simon.com/) | Descoberta explorável | Oficina opcional, sempre com acesso direto aos projetos |
| [Bisous Production](https://bisous-production.com/) — referência 07 | Projetos apresentados como capítulos visuais | Cada case tem linguagem gráfica derivada de sua mecânica; passagem contínua entre capítulos |
| [seocubo](https://seocubo.com/) — referência 09 | Trabalho organizado como ambiente pessoal | Oficina como índice funcional, sem janelas de computador de enfeite |
| [Tabasco Hilo](https://hilostudiolab.com/en/projects/tabasco) | Scroll vira uma linha do tempo visual do produto | O percurso de cases transforma a prancha enquanto cada capítulo avança |
| [Heron AI](https://heronaiapp.com/) | Desenho técnico que reage à ação e explica o produto | Diagramas por projeto com regras, legenda e estados específicos |

## Visitantes e tarefas

1. **Recrutador ou líder técnico, com pouco tempo:** deve identificar Henrique, ver os quatro projetos principais, entender stack e decisão técnica, abrir GitHub/LinkedIn e entrar em contato sem jogar.
2. **Designer ou desenvolvedor curioso:** pode percorrer o site, acionar demos e entrar na Oficina; deve sair com memória de uma ideia visual ligada aos projetos.
3. **Pessoa que chegou por um case:** deve abrir URL direta, entender contexto e autoria, explorar o projeto seguinte ou voltar ao índice.

## Arquitetura de informação

```text
Início
 ├─ Índice / Trabalhos
 │   ├─ Rota di Buteco
 │   ├─ Quarta é Dia de Amstel
 │   ├─ Condrio
 │   └─ MNEME
 ├─ Em construção: PULSO + TrilhaBH
 ├─ Sobre + Como trabalho
 ├─ Contato
 └─ Oficina (entrada opcional)
     ├─ Mapa social / Rota
     ├─ Chave de campanha / Quarta
     ├─ Mesa de operações / Condrio
     └─ Câmara de decisão / MNEME
```

## O que significa “scroll infinito” aqui

A experiência é uma narrativa vertical contínua: ao atravessar os quatro cases, a prancha muda junto do capítulo e o percurso segue até projetos em desenvolvimento, sobre e contato. O índice horizontal de projetos também pode correr em loop. O scroll continua natural; nenhum efeito bloqueia a roda, teclado ou gesto de toque. A tradução das referências escolhidas está atualizada em [07-DIRECAO-DE-EXPERIENCIA.md](07-DIRECAO-DE-EXPERIENCIA.md).

## Resultado completo desta fase

- Inventário factual dos seis projetos e limites de apresentação.
- Texto inicial de capa e de cada case, com títulos e rótulos de estado.
- Uma hipótese inicial de direção visual; o registro cromático que veio depois foi superado pela revisão atual em `02-SISTEMA-VISUAL.md`.
- Wireframes da home, dos quatro cases, do laboratório e da Oficina.
- Interações especificadas com entrada, ação, resposta, saída e alternativa acessível.
- Lista de arquivos a produzir, sequência de implementação e critério de aceite.

**Passagem para a próxima fase:** esta definição de escopo é histórica. Uma paleta marinho/lima/coral aplicada depois foi rejeitada por Henrique como genérica e cansativa. O protótipo tinta/giz/oliva/óxido em `02-SISTEMA-VISUAL.md` ainda precisa de aprovação visual. Marca e validação acessível continuam pendentes; preferências de foto e canal direto de contato não devem ser inventadas.
