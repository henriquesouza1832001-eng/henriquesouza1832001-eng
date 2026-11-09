<div align="center">

# Henrique Souza

<a href="https://readme-typing-svg.demolab.com?font=Fira+Code&weight=500&size=22&pause=1100&color=36BC9B&center=true&vCenter=true&width=800&height=48&lines=Desenvolvedor+Full+Stack;Apps+%26+Sistemas+Web;PWA+%C2%B7+Android+%C2%B7+APIs+%C2%B7+Cloud">
  <img src="https://readme-typing-svg.demolab.com?font=Fira+Code&weight=500&size=22&pause=1100&color=36BC9B&center=true&vCenter=true&width=800&height=48&lines=Desenvolvedor+Full+Stack;Apps+%26+Sistemas+Web;PWA+%C2%B7+Android+%C2%B7+APIs+%C2%B7+Cloud" alt="Desenvolvedor full stack de apps e sistemas web" />
</a>

[LinkedIn](https://www.linkedin.com/in/henrique-s-4080b9139/)　·　[E-mail](mailto:henriquesouza1832001@gmail.com)　·　[Todos os repositórios](https://github.com/henriquesouza1832001-eng?tab=repositories)

</div>

---

## Apps e sistemas, da tela ao servidor

Sou desenvolvedor full stack em Belo Horizonte, com experiência em software e engenharia. Construo aplicações web, PWAs e sistemas operacionais completos: interface, regras de negócio, APIs, autenticação, dados, integrações e deploy.

Gosto de entender o processo antes de escolher a tecnologia. Por isso, meus projetos passam de ferramentas para obras e manutenção a apps para explorar a cidade, plataformas sociais e produtos digitais.

<p align="center">
  <a href="https://github.com/henriquesouza1832001-eng/ObraPro"><img src="https://raw.githubusercontent.com/henriquesouza1832001-eng/ObraPro/main/public/icons/icon-192.png" width="72" alt="Ícone do app ObraPro" /></a>　<a href="https://github.com/henriquesouza1832001-eng/trilhaBH"><img src="https://raw.githubusercontent.com/henriquesouza1832001-eng/trilhaBH/main/www/images/logo.png" width="72" alt="Logo do app Trilha BH" /></a>　<a href="https://github.com/henriquesouza1832001-eng/quarta-amstel"><img src="https://raw.githubusercontent.com/henriquesouza1832001-eng/quarta-amstel/main/www/logos/Logo-256.png" width="72" alt="Logo do app Quarta é Dia de Amstel" /></a>
</p>
<p align="center"><sub>Produtos que estou construindo: gestão de obras · descoberta pela cidade · experiências locais</sub></p>

### O que existe por trás de cada app

```mermaid
flowchart LR
    subgraph APP["APPS"]
      A["ObraPro<br/>Web · PWA"]
      B["Trilha BH<br/>PWA · Android"]
      C["Rota di Buteco<br/>PWA social"]
    end
    subgraph SISTEMA["SISTEMAS"]
      D["Controler<br/>ERP operacional"]
      E["CORVO<br/>Coleta · análise"]
      F["Civiciclo<br/>Simulação"]
    end
    subgraph BASE["FULL STACK"]
      G["Interface<br/>Web · mobile"]
      H["Backend<br/>API · regras · auth"]
      I["Dados<br/>D1 · Firebase · SQL"]
      J["Cloud<br/>Workers · deploy"]
    end
    A --> G
    B --> G
    C --> G
    D --> H
    E --> H
    F --> H
    G --> H --> I --> J
    classDef app fill:#e8f4ef,stroke:#2e8267,color:#173d32
    classDef sys fill:#fff0e8,stroke:#cf6948,color:#592e1d
    classDef layer fill:#eff2f7,stroke:#657894,color:#24374b
    class A,B,C app
    class D,E,F sys
    class G,H,I,J layer
```

## Projetos

### Apps e produtos digitais

#### [ObraPro](https://github.com/henriquesouza1832001-eng/ObraPro) · [Abrir preview](https://obrapro-preview.henriquesouza.workers.dev)

Plataforma web/PWA para aprender, planejar e acompanhar obras. Reúne catálogo de cursos, organizações, obras e operações, com autenticação, papéis e APIs privadas.

`TypeScript` `PWA` `Cloudflare Workers` `D1` `GitHub Actions`

#### [Trilha BH](https://github.com/henriquesouza1832001-eng/trilhaBH)

App colaborativo para descobrir bares e experiências em Belo Horizonte: mapa, avaliações, grupos, rotas, desafios, XP e emblemas. Preparado como PWA e para Android com Capacitor.

`JavaScript` `Firebase` `Firestore` `Leaflet` `Capacitor`

#### [Rota di Buteco 2026](https://github.com/henriquesouza1832001-eng/rotadibuteco) · [Abrir app](https://rotadibuteco.web.app/)

PWA social feita para o Comida di Buteco em BH. A jornada reuniu 128 bares, check-ins por foto, grupos, feed, mapa e nove rankings em tempo real. O evento terminou e os dados foram preservados.

`Firebase Auth` `Firestore` `Storage` `Leaflet` `PWA`

#### [Quarta é Dia de Amstel](https://github.com/henriquesouza1832001-eng/quarta-amstel)

App de localização e descoberta de estabelecimentos, campanhas, painel administrativo e notificações Web Push.

`JavaScript` `Cloudflare Workers` `D1` `KV` `Web Push`

#### [Tudo Começou de um Sim](https://github.com/henriquesouza1832001-eng/tudocomecoudeumsim)

Produto para casais criarem o site do casamento e organizarem convites, convidados, eventos e confirmações. Cada perfil — casal, convidado, padrinho e equipe — tem um fluxo específico.

`React` `Cloudflare Pages` `Workers` `D1` `R2`

### Sistemas para engenharia e operação

#### [Controler · Labs & Tracks](https://github.com/henriquesouza1832001-eng/condrio)

ERP que reúne obras, manutenção, climatização, controle de acesso, atividades e indicadores. Criado para substituir planilhas e conversas dispersas por fluxos e dados integrados.

`Python` `FastAPI` `Databricks Apps` `Delta Lake` `PWA`

#### [Dashboard Labs & Tracks](https://github.com/henriquesouza1832001-eng/dashboard-labs-and-tracks)

Painéis e interfaces operacionais para acompanhar dados e rotinas de facilities, manutenção e obras.

`JavaScript` `HTML` `CSS`

### Dados e simulação

#### [CORVO](https://github.com/henriquesouza1832001-eng/Corvo)

Coleta notícias de fontes públicas, filtra sinais que podem mexer com mercados e registra evidências. A etapa de previsão está em construção e será avaliada com calibração.

`Python` `Cloudflare Workers` `Turso` `Feeds`

#### [Civiciclo](https://github.com/henriquesouza1832001-eng/simulator-election-brazil-) · [Jogar protótipo](https://d2dpmk0vrt66wn.cloudfront.net)

Simulador político fictício no navegador. Decisões, campanhas, eleições e projetos mudam a partida; as regras são abstrações de jogo, não previsões sobre a política real.

`Python` `React` `SQLite` `Simulação determinística`

---

## Stack de desenvolvimento

<p align="center">
  <img src="https://skillicons.dev/icons?i=js,ts,python,php,laravel,react,html,css,firebase,cloudflare,git,github&perline=6" alt="JavaScript, TypeScript, Python, PHP, Laravel, React, HTML, CSS, Firebase, Cloudflare, Git e GitHub" />
</p>

**Apps:** interfaces responsivas, PWA, Service Workers, mapas, geolocalização, Capacitor e experiência mobile-first.  
**Sistemas:** arquitetura, APIs REST, regras de negócio, autenticação, controle de acesso, dashboards e SQL.  
**Operação:** Firebase, Firestore, Cloudflare Workers, Pages, D1, KV, Web Push, GitHub Actions e CI/CD.

## Atividade e tecnologias

<p align="center">
  <img height="170" src="https://github-readme-stats.vercel.app/api?username=henriquesouza1832001-eng&show_icons=true&hide_border=true&rank_icon=github&theme=transparent" alt="Estatísticas públicas do GitHub" />
  <img height="170" src="https://github-readme-stats.vercel.app/api/top-langs/?username=henriquesouza1832001-eng&layout=compact&hide_border=true&theme=transparent" alt="Linguagens nos repositórios públicos" />
</p>

<p align="center">
  <img src="https://github-readme-activity-graph.vercel.app/graph?username=henriquesouza1832001-eng&theme=github-compact&hide_border=true&area=true" alt="Gráfico de atividade do GitHub" width="96%" />
</p>

<sub>Os cartões consultam os dados públicos do perfil; a proporção de linguagens reflete o tamanho dos arquivos nos repositórios.</sub>

---

<p align="center">
  <b>Apps e sistemas começam entendendo bem o problema.</b><br/>
  <a href="mailto:henriquesouza1832001@gmail.com">Vamos conversar</a> · <a href="https://www.linkedin.com/in/henrique-s-4080b9139/">LinkedIn</a>
</p>
