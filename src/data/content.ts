// All visible text lives here as { pt, en }. Empty strings / empty arrays hide the element.
export type Lang = "pt" | "en";
export type T = { pt: string; en: string };

const same = (x: string): T => ({ pt: x, en: x });

export const shared = {
  name: "Eduardo Effgen Dall'Orto",
  nickname: "Dudu",
  monogram: "EE",
  // Fill these in to show the icons / contact entries.
  github: "https://github.com/eduardoeffgendallorto",
  linkedin: "https://www.linkedin.com/in/eduardo-effgen-dall-orto-8595b2270/",
  email: "dudueffgen@hotmail.com",
  whatsapp: { label: "+55 27 99237-5899", url: "https://wa.me/5527992375899" },
  // Files inside public/. If only one exists, put the same path in both.
  cv: { pt: "cv/curriculo-pt.pdf", en: "cv/curriculo-pt.pdf" },
  cvAvailable: true, // set to true after adding the PDF(s) to public/cv/
};

export const content = {
  nav: {
    home: { pt: "Início", en: "Home" },
    about: { pt: "Sobre", en: "About" },
    projects: { pt: "Projetos", en: "Projects" },
    stack: { pt: "Stack", en: "Stack" },
    journey: { pt: "Trajetória", en: "Journey" },
    process: { pt: "Processo", en: "Process" },
    contact: { pt: "Contato", en: "Contact" },
    cv: { pt: "Currículo", en: "Résumé" },
    menu: { pt: "Menu", en: "Menu" },
  },
  hero: {
    badge: { pt: "Disponível para estágio · período da tarde", en: "Available for internship · afternoons" },
    subtitle: { pt: "Estudante de Engenharia de Software", en: "Software Engineering Student" },
    tagline: { pt: "Python, dados e interfaces: do requisito ao deploy.", en: "Python, data and interfaces: from requirements to deploy." },
    ctaProjects: { pt: "Ver projetos", en: "View projects" },
    ctaCv: { pt: "Baixar currículo", en: "Download résumé" },
    photoAlt: { pt: "Foto de Eduardo Effgen Dall'Orto", en: "Photo of Eduardo Effgen Dall'Orto" },
    dragHint: { pt: "arraste-me", en: "drag me" },
    code: { pt: 'print("Olá, recrutador!")', en: 'print("Hello, recruiter!")' },
  },
  about: {
    label: { pt: "01 · sobre", en: "01 · about" },
    title: { pt: "Sobre mim", en: "About me" },
    paragraphs: [
      {
        pt: "Sou o Eduardo (Dudu), estudante de Engenharia de Software na UVV e técnico em Administração. Gosto de transformar ideias em soluções que funcionam: do levantamento de requisitos e do protótipo no Figma até o código, o banco de dados e a publicação.",
        en: "I'm Eduardo (Dudu), a Software Engineering student at UVV and a Business Administration technician. I like turning ideas into solutions that work: from gathering requirements and prototyping in Figma to the code, the database and the release.",
      },
      {
        pt: "Tenho base em Python, SQL/MySQL, HTML, CSS e Git/GitHub, e já uni software e hardware em um robô-sumô com Arduino. Também me interesso por análise de dados e pelo mercado financeiro (ações e FIIs). Busco um estágio no período da tarde para aprender na prática, contribuir com o time e crescer como desenvolvedor.",
        en: "I have a foundation in Python, SQL/MySQL, HTML, CSS and Git/GitHub, and I've already combined software and hardware in an Arduino sumo robot. I'm also interested in data analysis and the financial market (stocks and REITs). I'm looking for an afternoon internship to learn hands-on, contribute to the team and grow as a developer.",
      },
    ] as T[],
    stats: {
      projects: { pt: "projetos", en: "projects" },
      certificates: { pt: "certificados", en: "certificates" },
      stack: { pt: "itens no stack", en: "stack items" },
    },
  },
  projects: {
    label: { pt: "02 · projetos", en: "02 · projects" },
    title: { pt: "Projetos", en: "Projects" },
    empty: { pt: "// nenhum projeto nesta categoria", en: "// no projects in this category" },
    filters: [
      { id: "all", label: { pt: "Todos", en: "All" } },
      { id: "data", label: { pt: "Dados", en: "Data" } },
      { id: "uiux", label: { pt: "UI/UX", en: "UI/UX" } },
      { id: "hardware", label: { pt: "Hardware", en: "Hardware" } },
    ] as { id: string; label: T }[],
    github: { pt: "Ver no GitHub", en: "View on GitHub" },
    figma: { pt: "Ver no Figma", en: "View on Figma" },
    zoom: { pt: "Ampliar imagem", en: "Enlarge image" },
    close: { pt: "Fechar", en: "Close" },
    items: [
      {
        title: { pt: "Python: Análise Comercial", en: "Python: Sales Analysis" },
        category: "data",
        tags: ["Python", "Análise de dados"],
        image: "python",
        alt: { pt: "Código Python do sistema de análise comercial, com funções que calculam lucro, ticket médio e margem", en: "Python code of the sales analysis system, with functions that calculate profit, average ticket and margin" },
        description: { pt: "Sistema desenvolvido para processar dados de vendas e gerar indicadores como faturamento, lucro, ticket médio e margem.", en: "A system built to process sales data and generate indicators such as revenue, profit, average ticket and margin." },
        link: { kind: "github", url: "https://github.com/eduardoeffgendallorto/projeto_analise_dados_em_python" },
      },
      {
        title: { pt: "Projeto ARCA: UI/UX", en: "ARCA Project: UI/UX" },
        category: "uiux",
        tags: ["Figma", "UX/UI", "Prototipação"],
        image: "figma",
        alt: { pt: "Telas do protótipo do Projeto ARCA no Figma: login e cadastro, tela inicial, animais disponíveis e descrição do pet", en: "ARCA Project prototype screens in Figma: login and sign-up, home screen, available animals and pet description" },
        description: { pt: "Projeto desenvolvido no Figma para prototipação e planejamento da interface de uma solução digital. Estruturação de telas, fluxos e elementos visuais com foco em usabilidade e experiência do usuário.", en: "A Figma project for prototyping and planning the interface of a digital solution. Screens, flows and visual elements structured with a focus on usability and user experience." },
        link: { kind: "figma", url: "https://www.figma.com/design/cTSIhslKv4Szyt1m9XEopm/Projeto-ARCA?node-id=0-1&p=f&t=c1PcUjvbfjaNO7rt-0" },
      },
      {
        title: { pt: "MySQL: Análise Comercial", en: "MySQL: Sales Analysis" },
        category: "data",
        tags: ["MySQL", "SQL", "Modelagem"],
        image: "mysql",
        alt: { pt: "Estrutura do banco analise_comercial no MySQL Workbench, com as tabelas clientes, produtos e vendas", en: "Structure of the analise_comercial database in MySQL Workbench, with the customers, products and sales tables" },
        description: { pt: "Banco de dados relacional para armazenar clientes, produtos e vendas, realizando consultas para análise e obtenção de informações comerciais.", en: "A relational database storing customers, products and sales, with queries for analysis and business insights." },
        link: { kind: "github", url: "https://github.com/eduardoeffgendallorto/analise_comercial_mysql" },
      },
      {
        title: { pt: "Robô-Sumô: Arduino", en: "Sumo Robot: Arduino" },
        category: "hardware",
        tags: ["Arduino", "Eletrônica", "Sistemas embarcados"],
        badge: { pt: "Projeto acadêmico · UVV", en: "Academic project · UVV" },
        image: "robosumo",
        alt: { pt: "Robô-sumô com dois sensores ultrassônicos, segurado na mão em uma arena da UVV", en: "Sumo robot with two ultrasonic sensors, held in a hand in an arena at UVV" },
        description: { pt: "Projeto acadêmico desenvolvido na UVV envolvendo a construção e programação de um robô-sumô autônomo, utilizando Arduino, motores, ponte H L298N e componentes eletrônicos para controle do robô. O projeto envolveu montagem de circuitos, integração entre hardware e software, testes, resolução de problemas de movimentação e ajustes para melhorar o desempenho do robô durante a competição.", en: "An academic project at UVV involving building and programming an autonomous sumo robot using Arduino, motors, an L298N H-bridge and electronic components to control the robot. It covered circuit assembly, hardware–software integration, testing, solving movement issues and tuning to improve the robot's performance during the competition." },
      },
    ] as {
      title: T; category: string; tags: string[]; image: "python" | "figma" | "mysql" | "robosumo"; alt: T; description: T;
      badge?: T; link?: { kind: "github" | "figma"; url: string };
    }[],
  },
  // Courses & certificates (newest first). The About counter uses this list's length.
  // file: path inside public/. Course and institution names stay official in both languages.
  certificates: [
    { title: same("Soluções de IA no GitHub"), issuer: "Fundação Bradesco · Escola Virtual", hours: 15, period: { pt: "out/2026", en: "Oct 2026" }, file: "certificados/solucoes-ia-github.pdf" },
    { title: same("AI-900: Fundamentos de IA no Azure"), issuer: "Fundação Bradesco · Escola Virtual", hours: 16, period: { pt: "out/2026", en: "Oct 2026" }, file: "certificados/ai-900-azure.pdf" },
    { title: { pt: "Inglês, nível A1 concluído", en: "English, level A1 completed" }, issuer: "CNA Idiomas", hours: 80, period: { pt: "jul/2025 – jul/2026", en: "Jul 2025 – Jul 2026" }, file: "certificados/cna-a1.jpg" },
    { title: same("Introdução ao Git e GitHub"), issuer: "FGV Online", hours: 15, period: { pt: "abr/2026", en: "Apr 2026" }, file: "certificados/git-github-fgv.pdf" },
    { title: same("Do Zero à Liberdade Financeira"), issuer: "VG Treinamentos", hours: 0, period: { pt: "jun/2024", en: "Jun 2024" }, file: "certificados/liberdade-financeira.pdf" },
  ] as { title: T; issuer: string; hours: number; period: T; file: string }[],
  stack: {
    label: { pt: "03 · stack", en: "03 · stack" },
    title: { pt: "Stack", en: "Stack" },
    groups: [
      { icon: "code", title: { pt: "Programação e Web", en: "Programming and Web" }, items: [same("Python"), same("HTML"), same("CSS"), same("Bootstrap")] },
      { icon: "database", title: { pt: "Dados", en: "Data" }, items: [{ pt: "Banco de Dados Relacional (MySQL)", en: "Relational Database (MySQL)" }, { pt: "Modelagem", en: "Data Modeling" }] },
      { icon: "wrench", title: { pt: "Ferramentas", en: "Tools" }, items: [same("Git"), same("GitHub"), { pt: "Deploy via GitHub Pages", en: "Deployment with GitHub Pages" }, same("Linux"), same("UX/UI")] },
      { icon: "cpu", title: { pt: "Fundamentos de Computação", en: "Computing Fundamentals" }, items: [{ pt: "Lógica para Computação", en: "Logic for Computing" }, { pt: "Álgebra para Computação", en: "Algebra for Computing" }, { pt: "Engenharia de Requisitos", en: "Requirements Engineering" }, { pt: "Arquitetura e Organização de Computadores", en: "Computer Architecture and Organization" }, { pt: "Sistemas Embarcados (Arduino)", en: "Embedded Systems (Arduino)" }] },
      { icon: "trending", interest: true, title: { pt: "Interesses", en: "Interests" }, items: [{ pt: "Bolsa de Valores", en: "Stock Market" }, { pt: "Futebol", en: "Football" }, { pt: "Tecnologia", en: "Technology" }, same("Beach Tennis"), { pt: "Sistemas Operacionais", en: "Operating Systems" }] },
    ] as { icon: "code" | "database" | "wrench" | "cpu" | "trending"; interest?: boolean; title: T; items: T[] }[],
    marquee: ["Python", "HTML", "CSS", "Bootstrap", "MySQL", "SQL", "Git", "GitHub", "GitHub Pages", "Linux", "Figma", "UX/UI", "Arduino"],
  },
  journey: {
    label: { pt: "04 · trajetória", en: "04 · journey" },
    title: { pt: "Trajetória e certificados", en: "Journey and certificates" },
    educationLabel: { pt: "Formação", en: "Education" },
    coursesLabel: { pt: "Cursos e certificados", en: "Courses and certificates" },
    viewCert: { pt: "Ver certificado", en: "View certificate" },
    hours: { pt: "h", en: "h" },
    newTab: { pt: "abre em nova aba", en: "opens in a new tab" },
    education: [
      { period: { pt: "cursando · 2º período · matutino", en: "in progress · 2nd semester · morning" }, title: { pt: "Engenharia de Software", en: "Software Engineering" }, place: "UVV (Universidade de Vila Velha)" },
      { period: { pt: "jan/2023 – dez/2025 · concluído", en: "Jan 2023 – Dec 2025 · completed" }, title: { pt: "Técnico em Administração", en: "Business Administration Technician" }, place: "" },
    ] as { period: T; title: T; place: string }[],
  },
  process: {
    label: { pt: "05 · processo", en: "05 · process" },
    title: { pt: "Como penso e desenvolvo", en: "How I think and build" },
    steps: [
      { title: { pt: "Entender", en: "Understand" }, text: { pt: "Começo levantando requisitos e entendendo o problema real do usuário ou do negócio antes de escrever qualquer linha.", en: "I start by gathering requirements and understanding the real problem of the user or the business before writing a single line." } },
      { title: { pt: "Planejar", en: "Plan" }, text: { pt: "Modelo os dados e prototipo a interface no Figma, pensando em UX/UI e em fluxos simples.", en: "I model the data and prototype the interface in Figma, focusing on UX/UI and simple flows." } },
      { title: { pt: "Construir", en: "Build" }, text: { pt: "Escrevo código organizado, estruturo o banco de dados e faço testes e ajustes até funcionar bem.", en: "I write organized code, structure the database and test and tweak until it works well." } },
      { title: { pt: "Entregar", en: "Deliver" }, text: { pt: "Versiono tudo com Git/GitHub e publico via GitHub Pages, pronto para receber feedback.", en: "I version everything with Git/GitHub and deploy via GitHub Pages, ready for feedback." } },
    ] as { title: T; text: T }[],
  },
  beyond: {
    title: { pt: "Além do código", en: "Beyond the code" },
    intro: { pt: "Fora do código, gosto de futebol, de acompanhar o mercado financeiro e de entender como a tecnologia e os sistemas operacionais funcionam por dentro.", en: "Outside of code, I enjoy football, following the financial market and understanding how technology and operating systems work under the hood." },
    // image: optional path inside public/ (hidden when empty)
    cards: [
      { icon: "football", image: "", title: { pt: "Futebol", en: "Football" }, text: { pt: "É um dos meus hobbies favoritos e uma boa forma de desligar a cabeça.", en: "It's one of my favorite hobbies and a great way to switch off." } },
      { icon: "market", image: "", title: { pt: "Bolsa de Valores", en: "Stock Market" }, text: { pt: "Acompanho ações e FIIs e gosto de entender como os números contam a história de uma empresa.", en: "I follow stocks and Brazilian REITs (FIIs) and like understanding how numbers tell a company's story." } },
      { icon: "tech", image: "", title: { pt: "Tecnologia", en: "Technology" }, text: { pt: "Sou curioso por novidades e por entender como as coisas funcionam por baixo da interface.", en: "I'm curious about what's new and about how things work beneath the interface." } },
      { icon: "os", image: "", title: { pt: "Sistemas Operacionais", en: "Operating Systems" }, text: { pt: "Tenho interesse em como um sistema operacional gerencia processos, memória e arquivos, com destaque para o Linux.", en: "I'm interested in how an operating system manages processes, memory and files, especially Linux." } },
    ] as { icon: "football" | "market" | "tech" | "os"; image: string; title: T; text: T }[],
  },
  contact: {
    label: { pt: "06 · contato", en: "06 · contact" },
    title: { pt: "Vamos conversar?", en: "Let's talk?" },
    text: { pt: "Procuro um estágio no período da tarde para aprender na prática e contribuir com o time.", en: "I'm looking for an afternoon internship to learn hands-on and contribute to the team." },
    email: { pt: "E-mail", en: "Email" },
    whatsapp: { pt: "WhatsApp", en: "WhatsApp" },
    backToTop: { pt: "Voltar ao topo", en: "Back to top" },
    skip: { pt: "Pular para o conteúdo", en: "Skip to content" },
  },
};
