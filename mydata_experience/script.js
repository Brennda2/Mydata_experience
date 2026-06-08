// ========== INITIALIZATION ==========
window.addEventListener('DOMContentLoaded', () => {
  createParticles();
  initQuiz();
});

// ========== NAVIGATION ==========
function goPage(page) {
  document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));
  document.querySelectorAll('.nav-btn').forEach(b => b.classList.remove('active'));
  document.getElementById('page-' + page).classList.add('active');
  const btns = document.querySelectorAll('.nav-btn');
  const pages = ['home', 'education', 'comparativo', 'seguranca', 'quiz'];
  btns[pages.indexOf(page)]?.classList.add('active');
  window.scrollTo(0,0);
  if (page === 'comparativo') initBarChart();
}

// ========== PARTICLES ==========
function createParticles() {
  const container = document.getElementById('particles');
  if (!container) return;
  for (let i = 0; i < 25; i++) {
    const p = document.createElement('div');
    p.className = 'particle';
    p.style.left = Math.random() * 100 + '%';
    p.style.animationDuration = (6 + Math.random() * 10) + 's';
    p.style.animationDelay = (Math.random() * 10) + 's';
    p.style.width = p.style.height = (2 + Math.random() * 4) + 'px';
    container.appendChild(p);
  }
}

// ========== FLASHCARDS ==========
function flipCard(el) {
  if (window.getSelection().toString().length > 0) return;
  el.classList.toggle('flipped');
}

// ========== MODAL SYSTEM ==========
const modalData = {
  backup: { 
    title: '☁️ Cloud Backup', 
    body: 'Backup automatizado e gerenciado em nuvem de alta confiabilidade. ',
    url: 'https://www.mydatacloud.com.br/cloud-backup' 
  },
  vpc: { 
    title: '🔒 Rede Privada Virtual', 
    body: 'Proteja e isole seus dados na internet criando uma rede digital totalmente personalizada e segura.',
    url: 'https://www.mydatacloud.com.br/solu%C3%A7%C3%B5es-de-seguran%C3%A7a' 
  },
  iam: { 
    title: '🛡️ Identidade e Acesso Corporativo', 
    body: 'Garante o controle rigoroso de acessos para usuários e máquinas virtuais, aplicando autenticação multifator e gerando relatórios detalhados para auditoria, o que protege a infraestrutura contra acessos não autorizados e ameaças cibernéticas.',
    url: 'https://www.mydatacloud.com.br/solu%C3%A7%C3%B5es-de-seguran%C3%A7a'
  },
  priv: { 
    title: '🔐 Gestão de Acessos Limitados', 
    body: 'Nossas soluções e arquiteturas são implantadas de modo que cada sistema possua exclusivamente as credenciais necessárias para rodar, limitando o impacto de um possível ataque.',
    url: 'https://www.mydatacloud.com.br/solu%C3%A7%C3%B5es-de-seguran%C3%A7a'
  },
  datacloud: { 
    title: '☁️ Cloud VPS & Infraestrutura', 
    body: 'Infraestrutura de nuvem com servidores virtuais (VPS) de alto desempenho, alta disponibilidade e suporte técnico incluso, permitindo migrar seus sistemas sem a necessidade de uma equipe técnica especializada.',
    url: 'https://www.mydatacloud.com.br/cloud-vps'
  },
  omnichannel: { 
    title: '💬 Com.unica MyData', 
    body: 'A plataforma Com.unica integra os seus canais de comunicação. Atenda seus clientes de forma personalizada e consistente.',
    url: 'https://www.mydatacloud.com.br/com-unica' 
  },
  vpn: { 
    title: '🖥️ Cloud VPS MyData', 
    body: 'Nosso serviço Cloud VPS oferece servidores virtuais privados com conexão segura, desempenho consistente e suporte 24/7. Ideal para hospedar sistemas, ERPs e aplicações empresariais com segurança e disponibilidade.',
    url: 'https://www.mydatacloud.com.br/cloud-vps'
  },
  seguranca: { 
    title: '🔒 Soluções de Segurança MyData', 
    body: 'Proteja sua empresa com as Soluções de Segurança da MyData Cloud.',
    url: 'https://www.mydatacloud.com.br/solu%C3%A7%C3%B5es-de-seguran%C3%A7a'
  },
  pabx: { 
    title: '📱 PABX Cloud MyData', 
    body: 'Sistema de telefonia empresarial em nuvem com ramal virtual, gravação de chamadas, URA inteligente e integração com CRM. Reduza custos com telefonia e modernize a comunicação da sua empresa sem investimento em hardware.',
    url: 'https://www.mydatacloud.com.br/pabx-cloud'
  },
  datacenter: { 
    title: '🖥️ Data Center MyData Cloud', 
    body: 'Conectamos sua empresa ao futuro com soluções de Data Center seguras, escaláveis e de alta performance, projetadas para impulsionar o seu negócio.',
    url: 'https://www.mydatacloud.com.br/data-center'
  },
  colocation: { 
    title: '🏠 Colocation MyData', 
    body: 'Hospede seus próprios equipamentos em nosso Data Center de alto padrão em Marília-SP. Aproveite nossa infraestrutura redundante, energia garantida, climatização de precisão e segurança física 24/7, mantendo total controle sobre seu hardware.',
    url: 'https://www.mydatacloud.com.br/colocation'
  },
  contato: { 
    title: '💬 Fale com um Especialista MyData', 
    body: 'Nossa equipe de especialistas está em Marília-SP, pronta para entender as necessidades da sua empresa e apresentar a solução ideal',
    url: 'https://www.mydatacloud.com.br/contact-3' 
  }
};

function openModal(key) {
  const data = modalData[key];
  if (!data) return;
  
  // 1. Cria a base do HTML com título e o texto explicativo
  let modalHTML = `<h3>${data.title}</h3><p>${data.body}</p>`;
  
  // 2. Se o item atual possuir uma URL configurada, adiciona o botão de link
  if (data.url) {
    // Alvo em branco (_blank) para abrir em nova aba se for link externo do site principal
    const target = data.url.startsWith('http') ? 'target="_blank"' : '';
    
    modalHTML += `
      <div style="margin-top: 24px; text-align: right;">
        <a href="${data.url}" ${target} class="btn-primary" style="text-decoration: none; display: inline-flex; align-items: center; gap: 8px;">
          Acesse →
        </a>
      </div>
    `;
  }
  
  // 3. Injeta o HTML completo e exibe o modal
  document.getElementById('modalContent').innerHTML = modalHTML;
  document.getElementById('modalOverlay').classList.add('show');
}

function closeModal(e) {
  if (!e || e.target === document.getElementById('modalOverlay') || e.target.classList.contains('modal-close')) {
    document.getElementById('modalOverlay').classList.remove('show');
  }
}

// ========== BAR CHART ==========
const chartData = [
  { label: 'Previsibilidade de Custos', icon: '💰', mydata: 10, aws: 5, azure: 5 },
  { label: 'Baixa Complexidade Técnica', icon: '🎓', mydata: 9, aws: 3, azure: 3 },
  { label: 'Serviços Nativos (AI/IoT)', icon: '🤖', mydata: 3, aws: 10, azure: 10 },
  { label: 'Aderência ao Mercado BR', icon: '🇧🇷', mydata: 10, aws: 8, azure: 8 },
  { label: 'Suporte Incluso', icon: '🎧', mydata: 10, aws: 4, azure: 4 },
  { label: 'Facilidade de Contratação', icon: '✍️', mydata: 10, aws: 7, azure: 7 },
];

function initBarChart() {
  const el = document.getElementById('barChart');
  if (!el || el.dataset.init) return;
  el.dataset.init = 1;
  el.style.display = 'flex';
  el.style.flexDirection = 'column';
  el.style.gap = '28px';
  el.innerHTML = chartData.map(d => `
    <div style="display:grid;grid-template-columns:200px 1fr;gap:20px;align-items:center;">
      <div style="text-align:right;">
        <div style="font-size:1rem;margin-bottom:2px;">${d.icon}</div>
        <div style="font-family:Montserrat,sans-serif;font-weight:600;font-size:0.78rem;color:rgba(255,255,255,0.7);line-height:1.3;">${d.label}</div>
      </div>
      <div style="display:flex;flex-direction:column;gap:6px;">
        <div style="display:flex;align-items:center;gap:10px;">
          <div style="position:relative;flex:1;height:22px;background:rgba(255,255,255,0.07);border-radius:11px;overflow:hidden;">
            <div style="position:absolute;left:0;top:0;height:100%;width:${d.mydata*10}%;background:var(--azul-medio);border-radius:11px;transition:width 1s ease;"></div>
          </div>
          <div style="color:#fff;font-weight:700;font-size:0.8rem;width:40px;">${d.mydata}/10</div>
        </div>
        <div style="display:flex;align-items:center;gap:10px;">
          <div style="position:relative;flex:1;height:14px;background:rgba(255,255,255,0.07);border-radius:7px;overflow:hidden;">
            <div style="position:absolute;left:0;top:0;height:100%;width:${d.aws*10}%;background:#f59e0b;border-radius:7px;"></div>
          </div>
          <div style="color:rgba(255,255,255,0.5);font-size:0.75rem;width:40px;">${d.aws}</div>
        </div>
        <div style="display:flex;align-items:center;gap:10px;">
          <div style="position:relative;flex:1;height:14px;background:rgba(255,255,255,0.07);border-radius:7px;overflow:hidden;">
            <div style="position:absolute;left:0;top:0;height:100%;width:${d.azure*10}%;background:#7c3aed;border-radius:7px;"></div>
          </div>
          <div style="color:rgba(255,255,255,0.5);font-size:0.75rem;width:40px;">${d.azure}</div>
        </div>
      </div>
    </div>
  `).join('');
}

// ========== SIMULATOR ==========
const selectedRisk = { '1': null, '2': null, '3': null, '4': null };

function selectOpt(btn) {
  const q = btn.dataset.q;
  btn.parentElement.querySelectorAll('.sim-opt').forEach(b => b.classList.remove('selected'));
  btn.classList.add('selected');
  selectedRisk[q] = parseInt(btn.dataset.v);
  checkSimulatorResult();
}

function checkSimulatorResult() {
  const vals = Object.values(selectedRisk);
  if (vals.includes(null)) return;
  const maxScore = 12;
  const currentScore = vals.reduce((a, b) => a + b, 0);
  const pct = Math.round((currentScore / maxScore) * 100);
  let lvl, cls, msg;
  if (pct >= 70) { lvl = 'ALTO RISCO 🔥'; cls = 'risk-high'; msg = 'Sua empresa está altamente vulnerável a ataques ransomware, vazamentos e processos judiciais ligados à LGPD. Servidores físicos ou drives compartilhados pessoais são alvos fáceis.'; }
  else if (pct >= 35) { lvl = 'RISCO MÉDIO ⚠'; cls = 'risk-med'; msg = 'Você já possui algumas preocupações com segurança, mas faltam automações, monitoramento proativo e processos centralizados que blindem a operação contra falhas humanas.'; }
  else { lvl = 'BAIXO RISCO ✅'; cls = 'risk-low'; msg = 'Excelente! Sua empresa segue padrões profissionais de governança. Para garantir estabilidade absoluta, certifique-se de contar com um suporte ágil e 100% disponível para incidentes.'; }
  const result = document.getElementById('simResult');
  document.getElementById('simResultContent').innerHTML = `
    <h3 style="font-family:Montserrat,sans-serif;font-weight:900;font-size:1.2rem;margin-bottom:6px;">Resultado da Análise Técnico-Comercial:</h3>
    <div style="font-size:1.4rem;font-weight:900;margin-bottom:12px;">Nível de Vulnerabilidade: <span class="${cls === 'risk-high' ? 'warn' : ''}" style="color:${cls === 'risk-high' ? '#ef4444' : (cls === 'risk-med' ? '#f59e0b' : '#22c55e')}">${lvl}</span></div>
    <div class="risk-bar"><div class="risk-fill ${cls}" style="width:${pct}%"></div></div>
    <p style="font-size:0.9rem;line-height:1.6;color:rgba(255,255,255,0.8);margin-bottom:24px;">${msg}</p>
    <button class="btn-white" onclick="openModal('contato')" style="font-size:0.82rem;padding:12px 24px;">Falar com Engenheiro de Segurança →</button>
  `;
  result.classList.add('show');
  result.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
}

// ========== QUIZ ==========
const quizData = [
  { 
    q: 'O que é um Data Center?', 
    opts: [
      'Um software de backup na nuvem', 
      'Uma instalação física para servidores e TI', 
      'Um sistema para unificar chat e telefone', 
      'Um antivírus corporativo'
    ], 
    correct: 1, 
    feedback: 'É a infraestrutura física com refrigeração e segurança avançada onde ficam os servidores.' 
  },
  { 
    q: 'Qual a função estratégica do Backup?', 
    opts: [
      'Aumentar o desempenho do hardware', 
      'Bloquear a entrada de vírus na rede', 
      'Cópia de segurança para recuperar dados', 
      'Hospedar o site da empresa'
    ], 
    correct: 2, 
    feedback: 'O backup serve para recuperar suas informações em caso de falhas, erros ou ataques.' 
  },
  { 
    q: 'Qual a principal vantagem do Data Cloud?', 
    opts: [
      'Armazenamento econômico sem estrutura física', 
      'Não precisar de internet para acessar dados', 
      'Substituir o uso de firewalls na empresa', 
      'Gravar chamadas telefônicas de clientes'
    ], 
    correct: 0, 
    feedback: 'Permite guardar grandes volumes de dados na nuvem de forma escalável e barata.' 
  },
  { 
    q: 'O que caracteriza o Omnichannel?', 
    opts: [
      'Um tipo de vírus que rouba senhas', 
      'A criptografia de dados confidenciais', 
      'A hospedagem de sistemas web estáveis', 
      'A integração de canais de atendimento'
    ], 
    correct: 3, 
    feedback: 'Unifica telefone, chat e redes sociais em uma única estrutura conectada.' 
  },
  { 
    q: 'Para que serve a VPN no trabalho remoto?', 
    opts: [
      'Limpar malwares do computador', 
      'Criar uma conexão segura e criptografada', 
      'Monitorar a produtividade física da equipe', 
      'Hospedar páginas web institucionais'
    ], 
    correct: 1, 
    feedback: 'Garante acesso seguro e remoto aos sistemas criptografando o tráfego de dados.' 
  },
  { 
    q: 'Qual o objetivo da Segurança da Informação?', 
    opts: [
      'Práticas para proteger dados e operações', 
      'Instalar cabos de fibra ótica nas empresas', 
      'Remover a poeira de computadores locais', 
      'Gerar códigos de programação automáticos'
    ], 
    correct: 0, 
    feedback: 'É o conjunto de políticas e ferramentas para manter a integridade e confidencialidade.' 
  },
  { 
    q: 'Como atua o Firewall?', 
    opts: [
      'Fazendo cópias diárias de segurança', 
      'Como barreira que controla o tráfego de rede', 
      'Convertendo chamadas de voz analógicas', 
      'Removendo vírus do sistema operacional'
    ], 
    correct: 1, 
    feedback: 'Filtra o tráfego e bloqueia acessos não autorizados antes que invadam a rede.' 
  },
  { 
    q: 'O que é um Malware?', 
    opts: [
      'Um protocolo legal de privacidade', 
      'Uma central de atendimento ao cliente', 
      'Um software malicioso como vírus', 
      'Um hardware de refrigeração de TI'
    ], 
    correct: 2, 
    feedback: 'Termo para programas maliciosos que invadem, danificam ou causam lentidão.' 
  },
  { 
    q: 'Qual o principal benefício do VoIP?', 
    opts: [
      'Fazer chamadas telefônicas pela internet', 
      'Proteger o e-commerce contra hackers', 
      'Armazenar arquivos mortos offline', 
      'Substituir os servidores web'
    ], 
    correct: 0, 
    feedback: 'Permite ligações pela rede IP, gerando economia e integração com sistemas (CRM).' 
  },
  { 
    q: 'O que é o serviço de Hospedagem?', 
    opts: [
      'Segurança física para hotéis parceiros', 
      'Configuração de criptografia de celular', 
      'Armazenar e deixar sites/sistemas online', 
      'Disseminar testes com ransomware'
    ], 
    correct: 2, 
    feedback: 'É o serviço que disponibiliza seus sistemas na internet para acesso a qualquer momento.' 
  }
];

let currentQ = 0, quizScore = 0, answered = false;

function initQuiz() {
  currentQ = 0;
  quizScore = 0;
  answered = false;
  document.getElementById('quizContainer').style.display = 'block';
  document.getElementById('quizResult').style.display = 'none';
  showQuestion();
}

function showQuestion() {
  const d = quizData[currentQ];
  answered = false;
  document.getElementById('quizProgress').style.width = ((currentQ / quizData.length) * 100) + '%';
  document.getElementById('quizQNum').textContent = `Questão ${currentQ + 1} de ${quizData.length}`;
  document.getElementById('quizQuestion').textContent = d.q;
  document.getElementById('quizFeedback').style.display = 'none';
  document.getElementById('quizNext').style.display = 'none';
  
  const optsContainer = document.getElementById('quizOptions');
  optsContainer.innerHTML = '';
  d.opts.forEach((o, i) => {
    const btn = document.createElement('button');
    btn.className = 'quiz-opt';
    btn.textContent = o;
    btn.onclick = () => answerQuestion(i, btn);
    optsContainer.appendChild(btn);
  });
}

function answerQuestion(idx, btn) {
  if (answered) return;
  answered = true;
  const d = quizData[currentQ];
  const options = document.querySelectorAll('.quiz-opt');
  const feedbackEl = document.getElementById('quizFeedback');
  
  feedbackEl.style.display = 'block';
  
  if (idx === d.correct) {
    btn.classList.add('correct');
    quizScore++;
    feedbackEl.className = 'quiz-feedback show ok';
    feedbackEl.innerHTML = `<strong>Correto! </strong> ${d.feedback}`;
  } else {
    btn.classList.add('wrong');
    options[d.correct].classList.add('correct'); // Pinta a certa de verde
    feedbackEl.className = 'quiz-feedback show nok';
    // Mostra o erro e a explicação curta direto
    feedbackEl.innerHTML = `<strong>Incorreto! \n Explicação:</strong> ${d.feedback}`;
  }
  
  document.getElementById('quizNext').style.display = 'inline-flex';
  document.getElementById('quizNext').textContent = currentQ < quizData.length - 1 ? 'Próxima →' : 'Ver Resultado →';
}

function nextQuestion() {
  currentQ++;
  if (currentQ < quizData.length) { 
    showQuestion(); 
  } else { 
    showResult(); 
  }
}

function showResult() {
  document.getElementById('quizContainer').style.display = 'none';
  const res = document.getElementById('quizResult');
  res.style.display = 'block';
  const pct = Math.round((quizScore / quizData.length) * 100);
  let emoji, title, msg;
  if (pct >= 80) { 
    emoji='🏆'; title='Parabéns!'; msg='Você demonstrou um ótimo conhecimento sobre segurança digital e tecnologia em nuvem.'; 
  } else if (pct >= 50) { 
    emoji='👏'; title='Bom trabalho!'; msg='Você tem uma boa base. Que tal revisar os conteúdos educativos para aprofundar seu conhecimento?'; 
  } else { 
    emoji='📚'; title='Continue aprendendo!'; msg='Ainda há muito para explorar! Revise nosso conteúdo educativo e tente novamente.'; 
  }
  document.getElementById('quizEmoji').textContent = emoji;
  document.getElementById('quizScoreDisplay').textContent = `${quizScore}/${quizData.length}`;
  document.getElementById('quizResultTitle').textContent = title;
  document.getElementById('quizResultMsg').textContent = msg;
  document.getElementById('quizProgress').style.width = '100%';
}

function restartQuiz() {
  initQuiz();
}