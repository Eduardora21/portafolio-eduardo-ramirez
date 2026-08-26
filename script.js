const input = document.getElementById('command-input');
const screen = document.getElementById('terminal-screen');

// Registro de comandos actualizados con el nuevo CV
const commands = {
  'ayuda': `Comandos disponibles:<br>
  - <span class="text-cyber-neon">sobre-mi</span>: Resumen profesional y perfil.<br>
  - <span class="text-cyber-neon">proyectos</span>: Proyectos destacados y arquitectura.<br>
  - <span class="text-cyber-neon">experiencia</span>: Pasantía en Beta Tech y educación.<br>
  - <span class="text-cyber-neon">habilidades</span>: Lenguajes, herramientas y tecnologías.<br>
  - <span class="text-cyber-neon">certificaciones</span>: Certificados de Cisco y Scrum.<br>
  - <span class="text-cyber-neon">contacto</span>: Enlaces a LinkedIn, GitHub y correo.<br>
  - <span class="text-cyber-neon">limpiar</span>: Limpiar el historial de la pantalla.`,

  'sobre-mi': `Estudiante de Ingeniería en Sistemas de la Computación (Universidad Fidélitas, 2023 - En curso) y Desarrollador Web Junior.<br>Experiencia creando interfaces web, sistemas con autenticación, gestión de datos y funcionalidades dinámicas usando Java, JavaScript, PHP, HTML, CSS y MySQL.`,

  'proyectos': `<b>Proyectos Académicos y Personales:</b><br>
  1. <b>Dashboard Deportivo - Invictus Quebradas:</b> Sistema web Full-Stack en Node/Express + MySQL, API REST y pizarra táctica.<br>
  2. <b>English Quest:</b> Plataforma web gamificada para aprendizaje de inglés en niños con PHP + MySQL (PDO).<br>
  3. <b>Sitio Web Contratista:</b> Aplicación web con panel administrativo, carga de imágenes y transacciones en PHP con PDO.`,

  'experiencia': `<b>Experiencia & Educación:</b><br>
  - <b>Pasantía Beta Tech (Oct 2022 - Dic 2022):</b> Prototipeado en Penpot, diseño de flujos de usuario y análisis de requerimientos.<br>
  - <b>Ingeniería en Sistemas:</b> Universidad Fidélitas (2023 - En curso).<br>
  - <b>Técnico Medio en Informática:</b> IPEC de Santo Domingo de Heredia (2021 - 2022).`,

  'habilidades': `<b>Habilidades Técnicas:</b><br>
  - Lenguajes: Java, JavaScript, PHP.<br>
  - Frontend: HTML5, CSS3, Tailwind CSS, Bootstrap, Diseño Responsivo.<br>
  - Backend: PHP, Node.js, Express.js.<br>
  - Bases de Datos: MySQL, SQL, PDO.<br>
  - Herramientas & Otros: GitHub, Docker, GitHub Pages, APIs REST, POO, Scrum.`,

  'certificaciones': `<b>Certificaciones e Idiomas:</b><br>
  - CCNA: Fundamentos de Conmutación, Enrutamiento y Redes Inalámbricas (Cisco)<br>
  - Introduction to Networks & IoT (Cisco)<br>
  - Scrum Fundamentals Certified (ScrumStudy)<br>
  - Inglés: Intermedio (B1) | Español: Nativo`,

  'contacto': `<b>Medios de Contacto:</b><br>
  - Correo: ramirezreynosae@gmail.com<br>
  - Teléfono: (506) 7053-2547<br>
  - GitHub: <a href="https://github.com/Eduardora21" target="_blank" class="text-cyber-neon underline">github.com/Eduardora21</a><br>
  - LinkedIn: <a href="https://linkedin.com/in/eduardo-ramirez-dev" target="_blank" class="text-cyber-neon underline">linkedin.com/in/eduardo-ramirez-dev</a>`
};

// Función para ejecutar comando desde botón o desde teclado
function runCommand(cmdName) {
  if (cmdName === 'limpiar') {
    screen.innerHTML = '';
  } else if (commands[cmdName]) {
    printLine(`> ${cmdName}`, 'text-gray-400');
    printLine(commands[cmdName], 'text-green-400');
  }
  screen.scrollTop = screen.scrollHeight;
}

// Escucha el teclado al presionar Enter
if (input) {
  input.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') {
      const cmd = input.value.trim().toLowerCase();
      
      if (cmd === 'limpiar') {
        screen.innerHTML = '';
      } else if (commands[cmd]) {
        printLine(`> ${input.value}`, 'text-gray-400');
        printLine(commands[cmd], 'text-green-400');
      } else if (cmd === 'ayuda') {
        printLine(`> ${input.value}`, 'text-gray-400');
        printLine(commands['ayuda'], 'text-green-400');
      } else if (cmd !== '') {
        printLine(`> ${input.value}`, 'text-gray-400');
        printLine(`Comando no reconocido: "${cmd}". Escribe <span class="text-cyber-neon">ayuda</span> para ver las opciones.`, 'text-red-400');
      }

      input.value = '';
      screen.scrollTop = screen.scrollHeight;
    }
  });
}

function printLine(text, colorClass) {
  const p = document.createElement('p');
  p.className = `${colorClass} my-1`;
  p.innerHTML = text;
  screen.appendChild(p);
}

// Manejo asíncrono del formulario con Formspree
const form = document.getElementById('contact-form');
const submitBtn = document.getElementById('submit-btn');
const formStatus = document.getElementById('form-status');

if (form) {
  form.addEventListener('submit', function(e) {
    e.preventDefault();

    submitBtn.disabled = true;
    submitBtn.innerText = 'Enviando...';
    formStatus.classList.add('hidden');

    const formData = new FormData(form);
    const data = new URLSearchParams(formData);

    fetch('https://formspree.io/f/mqpkzkya', {
      method: 'POST',
      body: data,
      headers: {
        'Accept': 'application/json'
      }
    })
    .then(response => {
      if (response.ok) {
        formStatus.textContent = '¡Mensaje enviado con éxito! Me pondré en contacto pronto.';
        formStatus.className = 'text-xs text-center font-bold text-green-400 mt-2 block';
        form.reset();
      } else {
        return response.json().then(data => {
          if (data.hasOwnProperty('errors')) {
            formStatus.textContent = data["errors"].map(error => error["message"]).join(", ");
          } else {
            formStatus.textContent = 'Error al enviar el formulario.';
          }
          formStatus.className = 'text-xs text-center font-bold text-red-400 mt-2 block';
        });
      }
    })
    .catch(error => {
      console.error('Error de envio:', error);
      formStatus.textContent = 'Ocurrió un error al enviar. Intenta de nuevo.';
      formStatus.className = 'text-xs text-center font-bold text-red-400 mt-2 block';
    })
    .finally(() => {
      submitBtn.disabled = false;
      submitBtn.innerText = 'Enviar Mensaje';
    });
  });
}