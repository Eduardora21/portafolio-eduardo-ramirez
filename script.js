const input = document.getElementById('command-input');
const screen = document.getElementById('terminal-screen');

// Registro de comandos
const commands = {
  'ayuda': `Comandos disponibles:<br>
  - <span class="text-cyber-neon">sobre-mi</span>: Resumen profesional y perfil.<br>
  - <span class="text-cyber-neon">proyectos</span>: Proyectos destacados y arquitectura.<br>
  - <span class="text-cyber-neon">habilidades</span>: Lenguajes, herramientas y tecnologías.<br>
  - <span class="text-cyber-neon">certificaciones</span>: Certificados de Cisco y Scrum.<br>
  - <span class="text-cyber-neon">contacto</span>: Enlaces a LinkedIn, GitHub y correo.<br>
  - <span class="text-cyber-neon">limpiar</span>: Limpiar el historial de la pantalla.`,

  'sobre-mi': `Estudiante de Ingeniería en Sistemas (Universidad Fidélitas) y Desarrollador Web Junior.<br>Con experiencia en desarrollo de aplicaciones web Full-Stack, bases de datos MySQL, APIs REST y Docker.`,

  'proyectos': `<b>Proyectos Destacados:</b><br>
  1. <b>Dashboard Deportivo - Invictus Quebradas:</b> API REST en Node/Express + MySQL y pizarra táctica.<br>
  2. <b>English Quest:</b> Plataforma educativa gamificada desarrollada en PHP + MySQL.<br>
  3. <b>Sitio Web Contratista:</b> Panel administrativo y gestión de imágenes en PHP con PDO.`,

  'habilidades': `<b>Habilidades Técnicas:</b><br>
  - Lenguajes: JavaScript, PHP, Java.<br>
  - Desarrollo Web: Node.js, Express.js, HTML, CSS, Bootstrap.<br>
  - Bases de Datos: MySQL.<br>
  - Herramientas: Docker, Git, GitHub.<br>
  - Metodologías: Scrum, API REST, Programación Orientada a Objetos.`,

  'certificaciones': `<b>Certificaciones:</b><br>
  - Scrum Fundamentals Certified (SCRUMstudy)<br>
  - CCNA: Switching, Routing, and Wireless Essentials (Cisco)<br>
  - Introduction to Networks & IoT (Cisco)`,

  'contacto': `<b>Medios de Contacto:</b><br>
  - Correo: ramirezreynosae@gmail.com<br>
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