# Execução e aceite do portfólio

**Revisão:** 03/11/2026.  
**Projeto:** React + TypeScript + Vite; publicação atual no Cloudflare Pages não sincronizada com esta revisão local.  
**Regra desta rodada:** avançar arquivo, conteúdo e verificações técnicas sem controlar o computador de Henrique. A revisão visual na interface depende de validação manual posterior.

**Direção ativa — 03/11/2026:** a home segue briefing → IDE → protótipo ao lado do código → produto, sem menu ou números de etapa. A narrativa termina nos projetos, na mesma rolagem. O estado em vigor está detalhado em [07-DIRECAO-DE-EXPERIENCIA.md](07-DIRECAO-DE-EXPERIENCIA.md) e [QA.md](QA.md); os wireframes e ordens anteriores deste plano são histórico.

## Fase A — inventário de projetos

**Estado:** inventário e fatos editoriais revistos para os seis repositórios. Fontes, autoria, status, pilhas e limites estão em [05-INVENTARIO-FASE-A.md](05-INVENTARIO-FASE-A.md) e [01-CONTEUDO-E-PROJETOS.md](01-CONTEUDO-E-PROJETOS.md).

- Rota di Buteco ocupa o primeiro lugar; o evento de 2026 está encerrado.
- Quarta tem repositório público e link ao site com aviso de confirmação 18+.
- Condrio é apresentado como ERP; as arquiteturas do README/Databricks e da implementação Worker/Hono ficam separadas, sem declarar qual está implantada.
- MNEME é de Thiago Antunes; Henrique colaborou. O README descreve execução simulada atualmente.
- PULSO fica em desenvolvimento; TrilhaBH fica em pré-beta.
- A existência de URL pública não é confundida com fluxo de produto testado.

## Fase B — identidade visual

**Registro histórico substituído:** a paleta publicada em marinho/lima/coral deixou de ser tratada como identidade depois que Henrique disse que a composição parecia genérica e cansativa. O protótipo tinta/giz/oliva/óxido está em revisão em [02-SISTEMA-VISUAL.md](02-SISTEMA-VISUAL.md); nenhuma identidade final está aprovada.

**Ainda em aberto:** símbolo/logotipo final e aprovação visual das famílias tipográficas e composição. Os tokens e tipografia carregada na aplicação são a implementação atual, não uma aprovação formal separada.

### Aceite desta fase

- [x] paleta antiga arquivada como decisão superada;
- [x] valores provisórios e contrastes do protótipo atual registrados;
- [ ] revisar visualmente símbolo, composição e tipografia em interface;
- [ ] conferir contraste de cada texto/estado após renderização.

## Fase C — narrativa e conteúdo

**Estado:** a arquitetura editorial está aplicada nos cases e no conteúdo tipado. Cada projeto tem estrutura, estado e evidência próprios. Rota, Quarta e Condrio têm campo **PAPEL** explícito; MNEME mantém crédito de colaboração e não recebe atribuição de módulo.

### Trabalho concluído

- Separar no Condrio o README que descreve FastAPI/Databricks da implementação Worker/Hono encontrada na branch `dev`.
- Atualizar o MNEME com regras do README: janela de 30 dias para operações fechadas, entrada por maioria de compras de traders elegíveis, saída entre os formadores da entrada e execução simulada; sem score, saldo ou resultado financeiro inventado.
- Manter as demos locais desconectadas dos produtos e rotuladas como dados fictícios.
- Recuperar links externos da Rota e da Quarta, com rótulos que revelam evento encerrado e gate 18+.

### Aceite restante

- [ ] leitura humana do texto na composição final;
- [ ] validar as páginas públicas em interface sem enviar dados pessoais;
- [ ] confirmar detalhes de implantação do Condrio antes de qualquer claim de produção.

## Fase D — Oficina de sistemas

**Estado:** quatro estações reabertas para avaliação; arquitetura de conteúdo refatorada por configuração em `src/Workshop.tsx`.

| Estação | Mecânica | Limite explícito |
|---|---|---|
| Rota di Buteco | Selecionar bar e registrar visita fictícia, atualizando contador e feed local. | Não consulta Firebase nem mapa real. |
| Quarta é Dia de Amstel | Ligar/desligar camadas e observar a prioridade bar → cidade → estado → nacional. | Campanhas e contexto são exemplos; não consulta o Worker. |
| Condrio | Alternar módulos operacionais e abrir dois caminhos de arquitetura documentados. | Dados sintéticos; nenhuma tela ou dado interno. |
| MNEME | A: alternar dois cenários prontos. B: editar três votos fictícios e observar a maioria. | Sem trader, token, score, preço, ordem ou resultado financeiro real. |

A Oficina aceita `/?explorar=1`, fechar com Escape, escolher estações por botão e mover o marcador por setas/WASD + Enter. A seleção por toque é prevista por botões. A alternativa B do MNEME é um protótipo comparativo no mesmo espaço; a escolha entre A e B só pode ser fechada após avaliação visual e de uso.

### Aceite restante da Oficina

- [ ] conferir foco inicial, foco preso, Escape, retorno ao mapa e foco após fechar;
- [ ] testar toque e alvos de toque;
- [ ] percorrer quatro estações em 320, 375 e 768 px;
- [ ] validar leitura com movimento reduzido e leitor de tela;
- [ ] decidir entre MNEME A, B ou manter as duas opções, após inspeção manual.

## Fase E — direção vigente: percurso e projetos

**Estado:** implementado e compilado nesta rodada. Esta direção substitui o percurso 2D empilhado, o rail em loop e a bancada 3D genérica de sete estações.

- A home usa três trechos contínuos com uma bancada 3D fixa: briefing no papel, código e protótipo sendo montados juntos no monitor, e produto ocupando a tela.
- A câmera e o cursor acompanham o scroll; o mouse acompanha o ponteiro e uma tecla responde à construção do código. A indicação inicial e a linha de progresso ajudam a pessoa a avançar, sem cards, números ou navegação separada.
- Sons curtos de teclado e clique são opcionais, sintetizados localmente e desligados por padrão. A página do monitor é construída ao longo da rolagem, mas permanece uma demonstração visual sem envio de dados.
- A bancada ganhou parede texturizada, veios irregulares na mesa, luminária e mousepad. Os materiais são proceduralmente gerados; a inspeção visual renderizada ainda depende da conferência de Henrique.
- As interfaces de Rota, Quarta, Condrio e MNEME continuam como reconstruções HTML próprias, baseadas nos repositórios e identificadas como conteúdo editorial.
- Rota aparece primeiro e recebe a maior composição. Quarta explicita o acesso 18+. Condrio preserva os limites das arquiteturas documentadas. MNEME apresenta crédito e execução simulada. PULSO continua em desenvolvimento e TrilhaBH em pré-beta.
- A cena procedural usa Three.js diretamente; Blender e modelos externos não são necessários para a bancada atual.
- Manter scroll nativo, foco visível, tipografia legível e composição responsiva. Movimento reduzido fixa a câmera e remove as transições do texto.

### Aceite restante

- [ ] Henrique validar a leitura e a direção no navegador após receber o pacote local.
- [ ] Revisar visualmente telas amplas e estreitas, contraste e recortes.
- [ ] Confirmar operação com teclado e movimento reduzido na versão publicada.
- [ ] Corrigir os pontos observados e compilar novamente antes do próximo pacote.

## Fase F — rotas, build e publicação manual

### Verificações de build

| Item | Evidência esperada |
|---|---|
| TypeScript e Vite | Comandos concluídos sem erro, anotados em `QA.md`. |
| Cases | `dist/projetos/*/index.html`, um por slug. |
| Metadados | Título, descrição, canonical e Open Graph próprios por case. |
| Sitemap e 404 | `dist/sitemap.xml` e `dist/404.html` gerados. |
| Pacote de deploy | Conteúdo de `dist`, sem código-fonte ou dependências desnecessárias. |
| Pacote-fonte | Código e documentos incluídos; sem `node_modules` ou ZIP recursivo. |

### Publicação

O deploy é manual por Henrique no Cloudflare Pages. Não declarar o domínio atualizado até que Henrique faça o upload e confirme a versão. O caminho local para o upload continua sendo `outputs/henrique-portfolio/dist/`.

## Revisão local — 03/11/2026

A cena 3D de mesa, papel, teclado e monitor substituiu a apresentação empilhada. A tela do monitor percorre código, protótipo e produto com o scroll. TypeScript, build Vite e postbuild passaram; a inspeção visual WebGL em navegador amplo e estreito segue pendente. Os pacotes locais atualizados e seus checks estão registrados em QA.md.
