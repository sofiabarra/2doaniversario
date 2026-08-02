/* =========================================================
   2 AÑOS — Sofía & Erik
   -------------------------------------------------------
   COSAS QUE PROBABLEMENTE QUIERAS EDITAR:
   1) START_DATE          -> fecha exacta en que empezaron
   2) slides []           -> tus fotos reales del recuerdo
                              (cambia "src" por images/tuFoto.jpg,
                              ajusta "date" y "caption")
   3) ERIK_WHATSAPP        -> tu número con código de país, sin
                              espacios ni "+", ej: "50499999999"
   4) mensajes de WhatsApp -> más abajo, dentro de waTextMap
   5) la carta secreta     -> texto en index.html, sección
                              #secretModal
   6) la canción           -> coloca tu audio en audio/cancion.mp3
   ========================================================= */

const START_DATE = new Date(2024, 7, 2, 0, 0, 0); // 2 agosto 2024 (mes 7 = agosto, en JS los meses empiezan en 0)
const ERIK_WHATSAPP = "50400000000"; // <-- EDITA: pon aquí tu número real

// espacio reservado para 25 fotos — mismo formato siempre: { src, date, caption }
// reemplaza "src" por tu foto real (ej. images/foto1.jpg) y ajusta "date"/"caption"
const slides = [
  { src: "images/foto1.jpeg",  date: "Feb 2024",     caption: "Conociendo a esa joveen guapa" },
  { src: "images/foto2.jpeg",  date: "Jun 2024",     caption: "Acompañandola en uno de sus loagros mas importantes" },
  { src: "images/foto3.jpeg",  date: "2024",         caption: "Primera date especial" },
  { src: "images/foto4.jpeg",  date: "02 Ago 2024",     caption: "¿Puedo ser su novio?" },
  { src: "images/foto5.jpeg",  date: "02 Ago 2024",     caption: "Si, podemos ser novios" },
  { src: "images/foto6.jpeg",  date: "28 Sep 2024",     caption: "Qué lindo fue celebrar el primer cumpleaños de mi princesa juntos 💘" },
  { src: "images/foto7.jpeg",  date: "Dic 2024",     caption: "Que guapos nos veíamos en Diciembre 🥹" },
  { src: "images/foto8.jpeg",  date: "",     caption: "Me encanta que seas mi compañera de viaje" },
  { src: "images/foto9.jpeg",  date: "Ene 2025",     caption: "Iniciando el año con esa hermosa sonrisa que me enamora 🥰" },
  { src: "images/foto10.jpeg", date: "2025",     caption: "Lo hermoso que me miras, me haces muy feliz 🥹" },
  { src: "images/foto11.jpeg", date: " Feb 2025",     caption: "Mr. & Mrs. Pineda" },
  { src: "images/foto12.jpeg", date: "2025",     caption: "Andar match y quue te pongas la camisa de mi equipo favorito, que lindooooo ♥️" },
  { src: "images/foto13.jpeg", date: "02 Ago 2025",     caption: "¡Un año juntos! 🎉" },
  { src: "images/foto135.jpg", date: "02 Ago 2025",     caption: "¡Lo hermosa que te ves, lo hermosa que sos, como no estar enamorado de esa mujeeer. Que lindo nuestro primer año juntos!" },
  { src: "images/foto14.jpeg", date: "28 Sep 2025",     caption: "Tu segundo cumpleaños juntos, fue muy especial y lindo 💗" },
  { src: "images/foto15.jpeg", date: "Sep 2025",     caption: "Me encanta verte feeeeliz 🥰" },
  { src: "images/foto16.jpeg", date: "Oct 2025",     caption: "Un viaje inolvidable" },
  { src: "images/foto17.jpeg", date: "Dic 2025",     caption: "Nuestra date de fin de año" },
  { src: "images/foto18.jpeg", date: "Dic 2025",     caption: "Momentos que adorooo" },
  { src: "images/foto19.jpeg", date: "2026",     caption: "Celebrando mi cumpleaños" },
  { src: "images/foto20.jpeg", date: "2026",     caption: "Fuimos al Salvadoor" },
  { src: "images/foto21.jpeg", date: "2026",     caption: "Tambien a Guatemala" },
  { src: "images/foto22.jpeg", date: "2026",     caption: "Siempre juntos, guiados de la mano Dios" },
  { src: "images/foto23.jpeg", date: "2026",     caption: "Disfrutando cada viaje" },
  { src: "images/foto24.jpeg", date: "2026",     caption: "Amandote cada dia mas" },
  { src: "images/foto26.jpeg", date: "Jun 2026",     caption: "Cada vez más cerca de hoy" },
  { src: "images/foto25.jpeg", date: "Hoy",          caption: "Hoy, 2 años después amandote cada vez mas ❤️" },
];

// tiempo (ms) que se muestra cada foto antes de pasar a la siguiente
// mismo tiempo para todas, sin importar cuántas fotos agregues arriba
const SLIDE_DELAY = 2400;

/* ---------------------------------------------------------
   Sobre de bienvenida
--------------------------------------------------------- */
(function envelopeIntro() {
  const envelope = document.getElementById("envelope");
  const overlay = document.getElementById("envelopeOverlay");

  function openEnvelope() {
    if (envelope.classList.contains("open")) return;
    envelope.classList.add("open");
    const rect = envelope.getBoundingClientRect();
    spawnConfetti(rect.left + rect.width / 2, rect.top + rect.height * 0.35, 18);

    // los navegadores móviles bloquean el autoplay con sonido hasta que hay
    // un gesto real del usuario — abrir el sobre ES ese primer gesto, así
    // que la canción arranca justo aquí, como si la abriera la propia carta.
    const ourSong = document.getElementById("ourSong");
    const musicPlayer = document.getElementById("musicPlayer");
    ourSong.play()
      .then(() => musicPlayer.classList.add("playing"))
      .catch(() => { /* aún no hay archivo de audio, o el navegador lo bloqueó */ });

    setTimeout(() => {
      overlay.classList.add("opened");
      document.body.classList.remove("locked");
      setTimeout(() => { overlay.style.display = "none"; }, 800);
    }, 900);
  }

  envelope.addEventListener("click", openEnvelope);
  envelope.addEventListener("keydown", (e) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      openEnvelope();
    }
  });
})();

/* ---------------------------------------------------------
   Contador en vivo
--------------------------------------------------------- */
function elapsedSince(start, now) {
  let years = now.getFullYear() - start.getFullYear();
  let anniversary = new Date(start);
  anniversary.setFullYear(start.getFullYear() + years);
  if (anniversary > now) {
    years--;
    anniversary = new Date(start);
    anniversary.setFullYear(start.getFullYear() + years);
  }
  const msLeft = now - anniversary;
  const days = Math.floor(msLeft / 86400000);
  const hours = Math.floor((msLeft % 86400000) / 3600000);
  const mins = Math.floor((msLeft % 3600000) / 60000);
  return { years, days, hours, mins };
}

function pad(n) { return String(n).padStart(2, "0"); }

function updateCounter() {
  const { years, days, hours, mins } = elapsedSince(START_DATE, new Date());
  document.getElementById("c-years").textContent = years;
  document.getElementById("c-days").textContent = days;
  document.getElementById("c-hours").textContent = pad(hours);
  document.getElementById("c-mins").textContent = pad(mins);
}
updateCounter();
setInterval(updateCounter, 1000 * 30);

/* ---------------------------------------------------------
   Corazones flotantes de fondo
--------------------------------------------------------- */
(function floatingHearts() {
  const container = document.getElementById("floatingHearts");
  const symbols = ["❤", "🤍", "✨"];
  const count = 14;
  for (let i = 0; i < count; i++) {
    const el = document.createElement("span");
    el.className = "heart";
    el.textContent = symbols[Math.floor(Math.random() * symbols.length)];
    const size = 12 + Math.random() * 16;
    el.style.left = Math.random() * 100 + "vw";
    el.style.fontSize = size + "px";
    el.style.animationDuration = 14 + Math.random() * 12 + "s";
    el.style.animationDelay = Math.random() * 16 + "s";
    container.appendChild(el);
  }
})();

/* ---------------------------------------------------------
   Rastro de corazones táctil + confeti
--------------------------------------------------------- */
const touchTrail = document.getElementById("touchTrail");
let lastTrailTime = 0;

function spawnTrailHeart(x, y) {
  const el = document.createElement("span");
  el.className = "trail-heart";
  el.textContent = "♡";
  el.style.left = x + "px";
  el.style.top = y + "px";
  touchTrail.appendChild(el);
  setTimeout(() => el.remove(), 950);
}

// en táctil, pointermove también dispara durante el gesto de scroll:
// generar corazones ahí compite por el hilo principal y "traba" el scroll,
// así que la estela solo corre con mouse (hover de escritorio).
document.addEventListener(
  "pointermove",
  (e) => {
    if (e.pointerType === "touch") return;
    const now = Date.now();
    if (now - lastTrailTime < 90) return;
    lastTrailTime = now;
    spawnTrailHeart(e.clientX, e.clientY);
  },
  { passive: true }
);

function spawnConfetti(x, y, count = 22) {
  const symbols = ["❤", "💕", "💗", "✨", "🤍"];
  for (let i = 0; i < count; i++) {
    const el = document.createElement("span");
    el.className = "confetti-heart";
    el.textContent = symbols[Math.floor(Math.random() * symbols.length)];
    const angle = Math.random() * Math.PI * 2;
    const distance = 70 + Math.random() * 140;
    el.style.left = x + "px";
    el.style.top = y + "px";
    el.style.setProperty("--dx", Math.cos(angle) * distance + "px");
    el.style.setProperty("--dy", Math.sin(angle) * distance - 40 + "px");
    el.style.setProperty("--rot", Math.random() * 360 - 180 + "deg");
    touchTrail.appendChild(el);
    setTimeout(() => el.remove(), 1350);
  }
}

/* ---------------------------------------------------------
   Galería / corcho de recuerdos (empieza lento, acelera)
--------------------------------------------------------- */
const slideImg = document.getElementById("slideImg");
const slideCaption = document.getElementById("slideCaption");
const flash = document.getElementById("flash");
const dotsWrap = document.getElementById("polaroidDots");
const corkboard = document.getElementById("corkboard");

let currentIndex = 0;
let timelineTimer = null;
let timelineStarted = false;
const pinPhotos = [];

slides.forEach((s, i) => {
  const dot = document.createElement("button");
  if (i === 0) dot.classList.add("active");
  dot.addEventListener("click", () => goToSlide(i));
  dotsWrap.appendChild(dot);

  const slot = document.createElement("div");
  slot.className = "cork-slot";

  const pin = document.createElement("div");
  pin.className = "pin-photo";
  pin.style.setProperty("--rot", Math.random() * 16 - 8 + "deg");

  const img = document.createElement("img");
  img.src = s.src;
  img.alt = s.caption;
  pin.appendChild(img);

  pin.addEventListener("click", () => {
    if (pin.classList.contains("pinned")) goToSlide(i);
  });

  slot.appendChild(pin);
  corkboard.appendChild(slot);
  pinPhotos.push(pin);
});

function pinSlide(i) {
  if (pinPhotos[i]) pinPhotos[i].classList.add("pinned");
}

function renderSlide(i) {
  const s = slides[i];
  slideImg.src = s.src;
  slideImg.alt = s.caption;
  slideCaption.textContent = `${s.date} · ${s.caption}`;

  flash.classList.remove("active");
  void flash.offsetWidth; // reinicia la animación
  flash.classList.add("active");

  [...dotsWrap.children].forEach((d, idx) => d.classList.toggle("active", idx === i));

  setTimeout(() => pinSlide(i), 380);
}

function scheduleNext() {
  clearTimeout(timelineTimer);
  if (currentIndex >= slides.length - 1) return;
  timelineTimer = setTimeout(() => {
    currentIndex++;
    renderSlide(currentIndex);
    scheduleNext();
  }, SLIDE_DELAY);
}

function goToSlide(i) {
  currentIndex = i;
  renderSlide(currentIndex);
  scheduleNext();
}

function playTimelineOnce() {
  if (timelineStarted) return;
  timelineStarted = true;
  renderSlide(0);
  scheduleNext();
}

const timelineObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        playTimelineOnce();
        timelineObserver.disconnect();
      }
    });
  },
  { threshold: 0.4 }
);
timelineObserver.observe(document.getElementById("timeline"));

/* ---------------------------------------------------------
   Pregunta -> abre el modal de opciones
--------------------------------------------------------- */
const optionsModal = document.getElementById("optionsModal");
const optionsClose = document.getElementById("optionsClose");

function openOptionsModal() {
  optionsModal.classList.add("open");
  document.body.classList.add("locked");
}
function closeOptionsModal() {
  optionsModal.classList.remove("open");
  document.body.classList.remove("locked");
}

document.getElementById("btnYes").addEventListener("click", (e) => {
  spawnConfetti(e.clientX, e.clientY, 26);
  openOptionsModal();
});

optionsClose.addEventListener("click", closeOptionsModal);
optionsModal.addEventListener("click", (e) => {
  if (e.target === optionsModal) closeOptionsModal();
});
document.addEventListener("keydown", (e) => {
  if (e.key === "Escape") closeOptionsModal();
});

/* ---------------------------------------------------------
   Postales que se voltean
--------------------------------------------------------- */
document.querySelectorAll(".card-flip").forEach((card) => {
  function toggleFlip() { card.classList.toggle("flipped"); }
  card.addEventListener("click", toggleFlip);
  card.addEventListener("keydown", (e) => {
    if (e.key === "Enter" || e.key === " ") { e.preventDefault(); toggleFlip(); }
  });
});

/* ---------------------------------------------------------
   Selección de plan
--------------------------------------------------------- */
const cards = document.querySelectorAll(".card-flip");
const confirmation = document.getElementById("confirmation");
const confirmationText = document.getElementById("confirmationText");
const whatsappBtn = document.getElementById("whatsappBtn");

const messages = {
  playa: "¡Perfecto! Nos vemos en la playa a ver el atardecer más bonito, mi muñeca hermosa 🌊",
  cena: "¡Delicioso plan! Preparo una tarde y una cena inolvidable solo para ti 🕯️",
};

const waTextMap = {
  playa: "Si quieroooo: Tarde en la playa 🌊 ¡Feliz 2do aniversario, mi amor!",
  cena: "Si quierooo: Tarde juntos y cena de aniversario 🕯️ ¡Feliz 2do aniversario, mi amor!",
};

function selectChoice(choice, x, y) {
  cards.forEach((c) => {
    const isChosen = c.dataset.choice === choice;
    c.classList.toggle("selected", isChosen);
    c.classList.toggle("dimmed", !isChosen);
  });

  const waUrl = `https://wa.me/${50497744055}?text=${encodeURIComponent(waTextMap[choice])}`;

  // la estampa "¡Elegido!" siempre se muestra, sin importar el plan elegido
  confirmationText.textContent = messages[choice];
  whatsappBtn.href = waUrl;
  confirmation.classList.add("visible");
  spawnConfetti(x, y, 30);

  // manda directo a WhatsApp (gesto del usuario, así que el navegador lo deja pasar)
  window.open(waUrl, "_blank", "noopener");
}

cards.forEach((card) => {
  card.querySelector(".card-select").addEventListener("click", (e) => {
    e.stopPropagation();
    selectChoice(card.dataset.choice, e.clientX, e.clientY);
  });
  const link = card.querySelector(".card-link");
  if (link) link.addEventListener("click", (e) => e.stopPropagation());
});

document.getElementById("resetBtn").addEventListener("click", () => {
  cards.forEach((c) => c.classList.remove("selected", "dimmed"));
  confirmation.classList.remove("visible");
});

/* ---------------------------------------------------------
   Carta secreta (cápsula del tiempo)
--------------------------------------------------------- */
const secretModal = document.getElementById("secretModal");
const secretTrigger = document.getElementById("secretTrigger");
const secretClose = document.getElementById("secretClose");

function openSecret() { secretModal.classList.add("open"); }
function closeSecret() { secretModal.classList.remove("open"); }

secretTrigger.addEventListener("click", openSecret);
secretClose.addEventListener("click", closeSecret);
secretModal.addEventListener("click", (e) => {
  if (e.target === secretModal) closeSecret();
});
document.addEventListener("keydown", (e) => {
  if (e.key === "Escape") closeSecret();
});

/* ---------------------------------------------------------
   Reproductor de música (nuestra canción)
--------------------------------------------------------- */
const musicPlayer = document.getElementById("musicPlayer");
const ourSong = document.getElementById("ourSong");

musicPlayer.addEventListener("click", () => {
  if (ourSong.paused) {
    ourSong.play()
      .then(() => musicPlayer.classList.add("playing"))
      .catch(() => {
        // todavía no hay archivo en audio/cancion.mp3 — no rompemos la experiencia
        musicPlayer.classList.remove("playing");
      });
  } else {
    ourSong.pause();
    musicPlayer.classList.remove("playing");
  }
});
ourSong.addEventListener("ended", () => musicPlayer.classList.remove("playing"));
