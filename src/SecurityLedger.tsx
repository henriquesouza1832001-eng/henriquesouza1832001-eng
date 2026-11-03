const records = [
  {
    key: 'rota', number: '01', name: 'Rota di Buteco', tone: 'olive', status: 'LIMITE DOCUMENTADO',
    mark: '01 / IDENTIDADE', rule: 'Firebase Authentication exige sessão para as rotas do Firestore.',
    boundary: 'A regra geral ainda libera leitura e escrita a qualquer pessoa autenticada. O README reconhece que o feed em array pode ser sobrescrito; para crescer, indica escrita validada no servidor.',
    href: 'https://github.com/henriquesouza1832001-eng/rotadibuteco/blob/main/firestore.rules', source: 'firestore.rules + README',
  },
  {
    key: 'quarta', number: '02', name: 'Quarta é Dia de Amstel', tone: 'rust', status: 'PEÇAS NO CÓDIGO',
    mark: '02 / BORDA DE REDE', rule: 'O Worker declara cabeçalhos de segurança, allowlist de origens, JWT e rotinas de rate limit e registro de eventos.',
    boundary: 'A configuração lista secrets que precisam ser fornecidos fora do código. O repositório público não prova que os valores estejam configurados no ambiente publicado nem representa uma auditoria.',
    href: 'https://github.com/henriquesouza1832001-eng/quarta-amstel/blob/main/worker/index.js', source: 'worker/index.js + wrangler.toml',
  },
  {
    key: 'condrio', number: '03', name: 'Condrio / Controler', tone: 'steel', status: 'POLÍTICA PUBLICADA',
    mark: '03 / SESSÃO E DADOS', rule: 'A política descreve JWT em cookie HttpOnly, senha com bcrypt e credenciais Databricks em secrets do GitHub Actions.',
    boundary: 'A própria política aponta SQL dinâmico, upload e XSS como áreas sensíveis para revisão. A branch consultada não confirma qual arquitetura está implantada hoje.',
    href: 'https://github.com/henriquesouza1832001-eng/condrio/blob/dev/SECURITY.md', source: 'SECURITY.md / branch dev',
  },
  {
    key: 'mneme', number: '04', name: 'MNEME', tone: 'lilac', status: 'EXECUÇÃO SIMULADA',
    mark: '04 / PERMISSÃO DE AÇÃO', rule: 'O README informa código cifrado com git-crypt e descreve o fluxo atual como simulação com preço, taxas e slippage de mercado.',
    boundary: 'Execução real em Solana está descrita como etapa futura. O portfólio não reproduz dados de carteira, não envia ordens e apresenta o crédito de colaboração explicitamente.',
    href: 'https://github.com/th1agx/MNEME/blob/main/README.md', source: 'README público',
  },
];

export default function SecurityLedger() {
  return <section className="security-ledger section-wrap" id="seguranca" data-palette-zone="security" aria-labelledby="security-title">
    <div className="section-label"><span>04 / CADERNO DE SEGURANÇA</span><span>LEITURA DE REPOSITÓRIO · NÃO É AUDITORIA</span></div>
    <div className="security-heading"><div><span className="editorial-overline">LIMITES SÃO PARTE DO PROJETO</span><h2 id="security-title">Mostrar também<br/>o que <em>não passa.</em></h2></div><p>Segurança aparece nas fronteiras: quem entra, o que cada ação alcança e o que ainda precisa de revisão. Aqui, cada nota aponta para sua fonte pública.</p></div>
    <div className="security-spine" aria-hidden="true"><span>IDENTIDADE</span><i/><span>ACESSO</span><i/><span>DADOS</span><i/><span>EXECUÇÃO</span></div>
    <div className="security-records">{records.map(record => <article className={`security-record security-${record.tone}`} key={record.key}>
      <div className="record-index"><span>{record.number} / 04</span><b>{record.key === 'rota' ? '◉' : record.key === 'quarta' ? '⊙' : record.key === 'condrio' ? '⌗' : '◎'}</b></div>
      <div className="record-content"><div className="record-title"><h3>{record.name}</h3><span><i/> {record.status}</span></div>
        <div className="record-analysis"><div><span>{record.mark}</span><p>{record.rule}</p></div><div><span>LIMITE / O QUE A FONTE ADMITE</span><p>{record.boundary}</p></div></div>
        <a href={record.href} target="_blank" rel="noreferrer">{record.source} <b>↗</b></a>
      </div>
    </article>)}</div>
    <p className="security-colophon">O código é uma fonte de evidência; o ambiente ativo, as permissões reais e as respostas de incidentes exigem verificação própria.</p>
  </section>;
}
