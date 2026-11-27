// ==========================================
// 1. BASE DE DATOS DE PROYECTOS Y ARQUITECTURA
// ==========================================
const projectsData = [
  {
    id: 'vita-sanctorum',
    title: 'Vita Sanctorum',
    subtitle: 'Plataforma Web del Santoral Católico + Gemini AI',
    featured: true,
    categories: ['php', 'ai'],
    image: 'assets/img/index.png',
    liveUrl: 'https://vita-sanctorum.kesug.com/',
    repoUrl: null,
    summary: 'Plataforma web para consultar biografías, festividades y patronazgos de santos, con panel administrativo CRUD e integración de Gemini AI para reflexiones.',
    tags: ['PHP 8', 'MySQL (PDO)', 'JavaScript', 'Gemini API', 'Auth Admin'],
    architecture: [
      'Frontend (HTML/JS) solicita reflexión espiritual vía Fetch API',
      'Endpoint PHP actúa como proxy seguro ocultando la API Key',
      'Conexión a Google Gemini AI para generar contenido contextual',
      'Persistencia en MySQL mediante consultas preparadas PDO'
    ],
    highlights: [
      'Protección de credenciales mediante endpoint intermedio en PHP.',
      'Panel administrativo con control de sesiones y gestión de imágenes.',
      'Consultas parametrizadas con PDO para prevenir inyección SQL.'
    ]
  },
  {
    id: 'reciclaje-cartago',
    title: 'Gestión de Reciclaje - Cartago',
    subtitle: 'Sistema Municipal de Recolección de Residuos',
    featured: false,
    categories: ['php'],
    image: 'assets/img/reciclaje_cartago.png',
    liveUrl: 'https://reciclajecartago.great-site.net/',
    repoUrl: null,
    summary: 'Plataforma web municipal para el registro de solicitudes ciudadanas de recolección de residuos valorizables y seguimiento administrativo en el cantón de Cartago.',
    tags: ['PHP', 'MySQL (PDO)', 'JavaScript', 'Bootstrap'],
    architecture: [
      'Portal ciudadano para registro y clasificación de materiales reciclables',
      'Validación de cobertura geográfica delimitada al cantón de Cartago',
      'Base de datos relacional MySQL para trazabilidad de estados',
      'Panel administrativo para gestión de rutas y atención de solicitudes'
    ],
    highlights: [
      'Delimitación funcional basada en requerimientos municipales reales.',
      'Flujo estructurado de estados (Pendiente, Programada, Recolectada).',
      'Interfaz responsiva accesible desde dispositivos móviles.'
    ]
  },
  {
    id: 'contratista',
    title: 'Sitio Web para Contratista',
    subtitle: 'Portafolio Dinámico & Gestor Administrativo',
    featured: false,
    categories: ['php'],
    image: 'assets/img/contratista.jpg',
    liveUrl: 'https://ramirez-contratista.great-site.net/',
    repoUrl: null,
    summary: 'Aplicación web corporativa con autenticación administrativa y gestión de obras civiles con carga de imágenes usando transacciones SQL.',
    tags: ['PHP', 'MySQL (PDO)', 'Transacciones', 'Auth'],
    architecture: [
      'Galería pública dinámica alimentada desde base de datos MySQL',
      'Módulo de autenticación con hashing seguro de contraseñas',
      'Transacciones PDO (beginTransaction / commit / rollBack)',
      'Sincronización atómica entre subida de archivos y registros SQL'
    ],
    highlights: [
      'Uso de transacciones para evitar registros huérfanos si falla la imagen.',
      'CRUD completo para publicar, editar o archivar proyectos realizados.'
    ]
  },
  {
    id: 'invictus-dashboard',
    title: 'Dashboard Deportivo - Invictus',
    subtitle: 'Sistema Full-Stack de Gestión de Club Deportivo',
    featured: false,
    categories: ['node'],
    image: 'assets/img/dashboard.jpg',
    liveUrl: null,
    repoUrl: 'https://github.com/Eduardora21/invictus-dashboard',
    summary: 'Sistema web Full-Stack para la administración integral de un club de fútbol: plantilla, inventario, pagos y pizarra táctica mediante API REST.',
    tags: ['Node.js', 'Express.js', 'MySQL', 'API REST', 'Bootstrap'],
    architecture: [
      'Cliente SPA responsivo consumiendo endpoints RESTful vía Fetch',
      'Servidor backend en Node.js + Express con arquitectura modular',
      'Capa de datos relacional en MySQL para jugadores, cuotas e inventario',
      'Módulo interactivo de pizarra táctica en frontend'
    ],
    highlights: [
      'Separación clara entre frontend y API REST en Node/Express.',
      'Control financiero de mensualidades e inventario deportivo.'
    ]
  },
  {
    id: 'english-quest',
    title: 'English Quest',
    subtitle: 'Plataforma Educativa Gamificada para Niños',
    featured: false,
    categories: ['php', 'ai'],
    image: 'assets/img/english-quest.jpg',
    liveUrl: null,
    repoUrl: 'https://github.com/Eduardora21/english-quest',
    summary: 'Plataforma web gamificada para aprendizaje de inglés infantil con control de roles, sistema de XP, niveles, vidas y progreso dinámico.',
    tags: ['PHP (PDO)', 'MySQL', 'Gamificación', 'Roles'],
    architecture: [
      'Control de acceso basado en roles (Estudiante / Administrador)',
      'Motor de gamificación: cálculo de experiencia (XP), niveles y vidas',
      'Persistencia en tiempo real del avance por lección en MySQL',
      'Interfaz visual amigable enfocada en retención infantil'
    ],
    highlights: [
      'Lógica de progresión por niveles y penalización/recuperación de vidas.',
      'Arquitectura backend limpia en PHP con PDO.'
    ]
  }
];

// ==========================================
// 2. RENDERIZADO DE TARJETAS Y FILTROS
// ==========================================
const projectsGrid = document.getElementById('projects-grid');
const filterButtons = document.querySelectorAll('.filter-btn');

function renderProjects(filter = 'all') {
  if (!projectsGrid) return;

  const filtered = filter === 'all'
    ? projectsData
    : projectsData.filter(p => p.categories.includes(filter));

  projectsGrid.innerHTML = filtered.map(project => {
    const isFeaturedClass = (project.featured && filter === 'all') ? 'md:col-span-2' : '';
    const imageHeightClass = (project.featured && filter === 'all') ? 'h-56 sm:h-64' : 'h-48';

    const actionLink = project.liveUrl
      ? `<a href="${project.liveUrl}" target="_blank" class="inline-flex items-center gap-1.5 text-xs font-mono text-cyber-neon hover:underline font-bold">
           Sitio en vivo <span>↗</span>
         </a>`
      : `<a href="${project.repoUrl}" target="_blank" class="inline-flex items-center gap-1.5 text-xs font-mono text-purple-400 hover:underline font-bold">
           Código en GitHub <span>→</span>
         </a>`;

    return `
      <article class="spotlight-card bg-cyber-card border border-white/10 hover:border-cyber-neon/50 rounded-2xl overflow-hidden transition-all duration-300 flex flex-col justify-between group ${isFeaturedClass}">
        <div>
          <div class="${imageHeightClass} bg-black/70 overflow-hidden border-b border-white/10 relative">
            <img src="${project.image}" alt="${project.title}" class="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-500">
            ${project.featured ? '<span class="absolute top-3 left-3 bg-black/85 backdrop-blur-md border border-cyber-neon/50 text-cyber-neon font-mono text-[10px] px-2.5 py-1 rounded-full">★ Proyecto Destacado</span>' : ''}
          </div>
          
          <div class="p-6 space-y-3">
            <div>
              <h3 class="text-lg sm:text-xl font-bold text-white group-hover:text-cyber-neon transition-colors">${project.title}</h3>
              <p class="font-mono text-[11px] text-slate-400 mt-0.5">${project.subtitle}</p>
            </div>
            
            <p class="text-slate-300 text-xs sm:text-sm leading-relaxed">
              ${project.summary}
            </p>
            
            <div class="flex flex-wrap gap-1.5 pt-1 font-mono text-[11px]">
              ${project.tags.map(tag => `<span class="bg-white/[0.04] text-slate-300 border border-white/10 px-2 py-0.5 rounded-md">${tag}</span>`).join('')}
            </div>
          </div>
        </div>

        <div class="px-6 py-4 bg-white/[0.02] border-t border-white/10 flex items-center justify-between gap-4">
          ${actionLink}
          <button onclick="openProjectDrawer('${project.id}')" class="font-mono text-xs bg-white/5 hover:bg-cyber-neon/15 text-slate-200 hover:text-cyber-neon border border-white/10 hover:border-cyber-neon/40 px-3 py-1.5 rounded-lg transition-all">
            Ver arquitectura →
          </button>
        </div>
      </article>
    `;
  }).join('');

  initSpotlight();
}

filterButtons.forEach(btn => {
  btn.addEventListener('click', () => {
    filterButtons.forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    renderProjects(btn.dataset.filter);
  });
});

// ==========================================
// 3. DRAWER DE ARQUITECTURA DE PROYECTO
// ==========================================
const drawer = document.getElementById('project-drawer');
const drawerBackdrop = document.getElementById('project-drawer-backdrop');
const drawerContent = document.getElementById('drawer-content');

function openProjectDrawer(projectId) {
  const project = projectsData.find(p => p.id === projectId);
  if (!project) return;

  const primaryBtn = project.liveUrl
    ? `<a href="${project.liveUrl}" target="_blank" class="flex-1 text-center bg-cyber-neon text-black font-bold py-2.5 px-4 rounded-xl text-xs font-mono hover:bg-sky-300 transition-colors">Abrir Aplicación en Vivo ↗</a>`
    : `<a href="${project.repoUrl}" target="_blank" class="flex-1 text-center bg-purple-500 text-white font-bold py-2.5 px-4 rounded-xl text-xs font-mono hover:bg-purple-400 transition-colors">Ver Repositorio GitHub ↗</a>`;

  drawerContent.innerHTML = `
    <div class="flex items-center justify-between border-b border-white/10 pb-4">
      <span class="font-mono text-xs text-cyber-neon">FICHATÉCNICA // ${project.id.toUpperCase()}</span>
      <button onclick="closeProjectDrawer()" class="text-slate-400 hover:text-white font-mono text-sm px-2.5 py-1 rounded-lg bg-white/5">✕ Cerrar</button>
    </div>

    <div class="rounded-xl overflow-hidden border border-white/10 h-48 bg-black">
      <img src="${project.image}" alt="${project.title}" class="w-full h-full object-cover object-top">
    </div>

    <div class="space-y-2">
      <h3 class="text-2xl font-bold text-white">${project.title}</h3>
      <p class="text-xs font-mono text-purple-400">${project.subtitle}</p>
      <p class="text-sm text-slate-300 leading-relaxed pt-1">${project.summary}</p>
    </div>

    <div class="space-y-3">
      <h4 class="font-mono text-xs font-bold text-cyber-neon uppercase tracking-wider">Flujo &amp; Arquitectura</h4>
      <div class="space-y-2">
        ${project.architecture.map((step, i) => `
          <div class="flex items-start gap-3 p-3 rounded-xl bg-black/50 border border-white/10 text-xs">
            <span class="font-mono font-bold text-cyber-neon">0${i + 1}</span>
            <span class="text-slate-200">${step}</span>
          </div>
        `).join('')}
      </div>
    </div>

    <div class="space-y-2">
      <h4 class="font-mono text-xs font-bold text-emerald-400 uppercase tracking-wider">Aspectos Técnicos Resueltos</h4>
      <ul class="space-y-1.5 text-xs text-slate-300 list-disc list-inside">
        ${project.highlights.map(item => `<li>${item}</li>`).join('')}
      </ul>
    </div>

    <div class="pt-4 border-t border-white/10 flex gap-3">
      ${primaryBtn}
    </div>
  `;

  drawerBackdrop.classList.remove('hidden');
  setTimeout(() => {
    drawerBackdrop.classList.remove('opacity-0');
    drawer.classList.remove('translate-x-full');
  }, 10);
}

function closeProjectDrawer() {
  drawer.classList.add('translate-x-full');
  drawerBackdrop.classList.add('opacity-0');
  setTimeout(() => {
    drawerBackdrop.classList.add('hidden');
  }, 300);
}

document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') closeProjectDrawer();
});

// ==========================================
// 4. CONSOLA INTERACTIVA CON HISTORIAL Y TAB
// ==========================================
const terminalScreen = document.getElementById('terminal-screen');
const commandInput = document.getElementById('command-input');
let commandHistory = [];
let historyIndex = -1;

const availableCommands = [
  'ayuda', 'sobre-mi', 'proyectos', 'arquitectura',
  'habilidades', 'certificaciones', 'limpiar',
  'ver vita-sanctorum', 'ver reciclaje-cartago', 'ver contratista',
  'ver invictus-dashboard', 'ver english-quest'
];

const staticCommands = {
  'ayuda': `
    <div class="text-slate-300 space-y-1">
      <p class="text-emerald-400 font-bold">Comandos disponibles:</p>
      <p>• <span class="text-cyber-neon">sobre-mi</span>            - Resumen profesional y enfoque técnico</p>
      <p>• <span class="text-cyber-neon">proyectos</span>           - Lista de los 5 proyectos desarrollados</p>
      <p>• <span class="text-cyber-neon">ver &lt;proyecto&gt;</span>      - Abre la ficha de arquitectura (ej: <span class="text-purple-400">ver vita-sanctorum</span>)</p>
      <p>• <span class="text-cyber-neon">arquitectura</span>        - Resumen de patrones y prácticas aplicadas</p>
      <p>• <span class="text-cyber-neon">habilidades</span>         - Stack tecnológico completo</p>
      <p>• <span class="text-cyber-neon">certificaciones</span>     - Credenciales Cisco e idioma</p>
      <p>• <span class="text-rose-400">limpiar</span>             - Limpia la terminal</p>
    </div>
  `,
  'sobre-mi': `
    <div class="text-slate-300 space-y-1">
      <p class="text-emerald-400 font-bold">[PERFIL PROFESIONAL]</p>
      <p>Soy Eduardo Ramírez, estudiante de Ingeniería en Sistemas de la Computación (Universidad Fidélitas).</p>
      <p>Desarrollo aplicaciones web con PHP (PDO), Node.js/Express, MySQL e integración de APIs REST e IA.</p>
    </div>
  `,
  'proyectos': `
    <div class="text-slate-300 space-y-1.5">
      <p class="text-emerald-400 font-bold">[5 PROYECTOS EN PORTAFOLIO]</p>
      <p>1. <span class="text-white font-bold">Vita Sanctorum</span> — PHP, MySQL (PDO), JS, Gemini AI API</p>
      <p>2. <span class="text-white font-bold">Gestión de Reciclaje - Cartago</span> — PHP, MySQL (PDO), Bootstrap</p>
      <p>3. <span class="text-white font-bold">Sitio Web Contratista</span> — PHP, MySQL (PDO), Transacciones</p>
      <p>4. <span class="text-white font-bold">Dashboard Deportivo Invictus</span> — Node.js, Express, MySQL, API REST</p>
      <p>5. <span class="text-white font-bold">English Quest</span> — PHP (PDO), MySQL, Sistema Gamificado</p>
      <p class="text-slate-400 pt-1">Tip: escribe <span class="text-cyber-neon">ver reciclaje-cartago</span> o <span class="text-cyber-neon">ver vita-sanctorum</span> para inspeccionar su arquitectura.</p>
    </div>
  `,
  'arquitectura': `
    <div class="text-slate-300 space-y-1">
      <p class="text-emerald-400 font-bold">[ARQUITECTURA &amp; BUENAS PRÁCTICAS]</p>
      <p>• Seguridad SQL mediante consultas preparadas PDO y transacciones atómicas.</p>
      <p>• Protección de API Keys delegando llamadas a Gemini AI desde endpoints backend en PHP.</p>
      <p>• Diseño de APIs REST desacopladas con Node.js y Express.</p>
    </div>
  `,
  'habilidades': `
    <div class="text-slate-300 space-y-1">
      <p class="text-emerald-400 font-bold">[STACK TECNOLÓGICO]</p>
      <p>• <span class="text-white">Lenguajes:</span> JavaScript, PHP, Java, SQL</p>
      <p>• <span class="text-white">Frontend:</span> HTML5, CSS3, Tailwind CSS, Bootstrap</p>
      <p>• <span class="text-white">Backend/DB:</span> Node.js, Express.js, MySQL, PDO</p>
      <p>• <span class="text-white">Tools:</span> Git, GitHub, Docker, APIs REST, Gemini AI, Scrum</p>
    </div>
  `,
  'certificaciones': `
    <div class="text-slate-300 space-y-1">
      <p class="text-emerald-400 font-bold">[CERTIFICACIONES &amp; IDIOMAS]</p>
      <p>• CCNA: Switching, Routing &amp; Wireless Essentials (Cisco)</p>
      <p>• Introduction to Networks &amp; Introduction to IoT (Cisco)</p>
      <p>• Scrum Fundamentals Certified (SCRUMstudy)</p>
      <p>• Idiomas: Español (Nativo) • Inglés (Intermedio B1)</p>
    </div>
  `
};

function appendTerminalLine(html) {
  const div = document.createElement('div');
  div.innerHTML = html;
  terminalScreen.appendChild(div);
  terminalScreen.scrollTop = terminalScreen.scrollHeight;
}

function runCommand(rawCmd) {
  const cleanCmd = rawCmd.trim().toLowerCase();
  if (!cleanCmd) return;

  commandHistory.push(cleanCmd);
  historyIndex = commandHistory.length;

  if (cleanCmd === 'limpiar' || cleanCmd === 'clear') {
    terminalScreen.innerHTML = '<p class="text-slate-500">Terminal limpia. Escribe <span class="text-cyber-neon">ayuda</span> para ver comandos.</p>';
    return;
  }

  appendTerminalLine(`<span class="text-cyber-neon font-bold">&gt;</span> <span class="text-white">${cleanCmd}</span>`);

  // Comando dinámico: ver <id-proyecto>
  if (cleanCmd.startsWith('ver ')) {
    const slug = cleanCmd.replace('ver ', '').trim();
    const found = projectsData.find(p => p.id === slug);
    if (found) {
      appendTerminalLine(`<p class="text-emerald-400">Abriendo ficha técnica de <span class="font-bold">${found.title}</span>...</p>`);
      openProjectDrawer(found.id);
    } else {
      appendTerminalLine(`<p class="text-rose-400">Proyecto '${slug}' no encontrado. Opciones: vita-sanctorum, reciclaje-cartago, contratista, invictus-dashboard, english-quest.</p>`);
    }
    return;
  }

  if (staticCommands[cleanCmd]) {
    appendTerminalLine(staticCommands[cleanCmd]);
  } else {
    appendTerminalLine(`<p class="text-rose-400">Comando no reconocido: '${cleanCmd}'. Escribe <span class="text-cyber-neon">ayuda</span>.</p>`);
  }
}

if (commandInput) {
  commandInput.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') {
      runCommand(commandInput.value);
      commandInput.value = '';
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      if (historyIndex > 0) {
        historyIndex--;
        commandInput.value = commandHistory[historyIndex];
      }
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      if (historyIndex < commandHistory.length - 1) {
        historyIndex++;
        commandInput.value = commandHistory[historyIndex];
      } else {
        historyIndex = commandHistory.length;
        commandInput.value = '';
      }
    } else if (e.key === 'Tab') {
      e.preventDefault();
      const val = commandInput.value.trim().toLowerCase();
      if (!val) return;
      const match = availableCommands.find(c => c.startsWith(val));
      if (match) commandInput.value = match;
    }
  });
}

// ==========================================
// 5. UTILIDADES (COPIAR CORREO, SPOTLIGHT, REVEAL, FORM)
// ==========================================
function copyEmail() {
  navigator.clipboard.writeText('ramirezreynosae@gmail.com').then(() => {
    const label = document.getElementById('copy-email-text');
    label.textContent = '¡Correo copiado!';
    label.classList.add('text-emerald-400');
    setTimeout(() => {
      label.textContent = 'Copiar correo';
      label.classList.remove('text-emerald-400');
    }, 2000);
  });
}

function initSpotlight() {
  document.querySelectorAll('.spotlight-card').forEach(card => {
    card.addEventListener('mousemove', e => {
      const rect = card.getBoundingClientRect();
      card.style.setProperty('--mouse-x', `${e.clientX - rect.left}px`);
      card.style.setProperty('--mouse-y', `${e.clientY - rect.top}px`);
    });
  });
}

// Animación al hacer scroll
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
    }
  });
}, { threshold: 0.1 });

document.querySelectorAll('.reveal').forEach(el => observer.observe(el));

// Formulario de contacto
const contactForm = document.getElementById('contact-form');
const formStatus = document.getElementById('form-status');

if (contactForm) {
  contactForm.addEventListener('submit', function (e) {
    e.preventDefault();
    const name = this.name.value;
    const email = this.email.value;
    const message = this.message.value;

    const subject = encodeURIComponent(`Contacto Portafolio - ${name}`);
    const body = encodeURIComponent(`Nombre: ${name}\nCorreo: ${email}\n\nMensaje:\n${message}`);
    
    formStatus.textContent = 'Abriendo cliente de correo...';
    formStatus.className = 'text-xs font-mono text-center font-bold text-cyber-neon block';
    
    window.location.href = `mailto:ramirezreynosae@gmail.com?subject=${subject}&body=${body}`;
    this.reset();
  });
}

// Inicialización al cargar
document.addEventListener('DOMContentLoaded', () => {
  renderProjects('all');
  initSpotlight();
  
  // Mensaje inicial en terminal
  appendTerminalLine(`<p class="text-slate-400">Sistema listo. <span class="text-cyber-neon">5 proyectos</span> indexados (incluyendo <span class="text-white">Vita Sanctorum</span> y <span class="text-white">Reciclaje Cartago</span>).</p>`);
  appendTerminalLine(`<p class="text-slate-500">Escribe <span class="text-cyber-neon">ayuda</span> o haz clic en un comando superior.</p>`);
});