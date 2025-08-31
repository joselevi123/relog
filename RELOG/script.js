
  // Menu Hambúrguer
  const menuBtn = document.getElementById("menuBtn");
  const mobileMenu = document.getElementById("mobileMenu");

  menuBtn.addEventListener("click", () => {
    mobileMenu.classList.toggle("hidden");
  });

  // Fecha o menu ao clicar em qualquer link
  const mobileLinks = mobileMenu.querySelectorAll("a");
  mobileLinks.forEach(link => {
    link.addEventListener("click", () => {
      mobileMenu.classList.add("hidden");
    });
  });
  
  // se clicou no overlay (fora do menu)
  function closeMenu(e) {
    if (e.target.id === "mobileMenu") {
      mobileMenu.classList.add("hidden");
    }
  }

  // Modal
  function openModal(title, description) {
    document.getElementById("modalTitle").innerText = title;
    document.getElementById("modalDescription").innerText = description;
    document.getElementById("courseModal").classList.remove("hidden");
  }

  function closeModal() {
    document.getElementById("courseModal").classList.add("hidden");
  }

  // Script FAQ
  document.querySelectorAll(".faq-toggle").forEach(button => {
    button.addEventListener("click", () => {
      const content = button.nextElementSibling;
      const icon = button.querySelector("svg");

      // Fecha todos os outros
      document.querySelectorAll(".faq-toggle").forEach(btn => {
        if (btn !== button) {
          btn.nextElementSibling.classList.add("hidden");
          btn.querySelector("svg").classList.remove("rotate-180");
        }
      });

      // Abre/fecha o clicado
      content.classList.toggle("hidden");
      icon.classList.toggle("rotate-180");
    });
  });

  // Scroll suave
  const headerEl = document.querySelector('header');

  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener("click", function (e) {
      const targetId = this.getAttribute("href").slice(1);
      const el = document.getElementById(targetId);
      if (!el) return;

      e.preventDefault();
      // Fecha modal e menu
      document.getElementById("courseModal")?.classList.add("hidden");
      document.getElementById("mobileMenu")?.classList.add("hidden");

      const headerH = headerEl?.offsetHeight || 80;
      const y = el.getBoundingClientRect().top + window.pageYOffset - headerH - 8;

      window.scrollTo({ top: y, behavior: "smooth" });
    });
  });

  // Seleciona todas as seções e links do menu
  const sections = Array.from(document.querySelectorAll("section[id]"));
  const navAnchors = Array.from(document.querySelectorAll('header nav a, #mobileMenu a'));
  let headerH = headerEl?.offsetHeight || 80;

  function setActiveLink(id) {
    navAnchors.forEach(a => {
      a.classList.remove("text-blue-600", "font-bold");
      const href = a.getAttribute("href");
      if (href && href.startsWith("#") && href.slice(1) === id) {
        a.classList.add("text-blue-600", "font-bold");
      }
    });
  }

  function onScroll() {
    headerH = headerEl?.offsetHeight || 80;
    const pos = window.scrollY + headerH + 10;

    // escolhe a última seção cujo topo já passou do topo visível
    let current = sections[0]?.id;
    for (const sec of sections) {
      if (sec.offsetTop <= pos) current = sec.id;
    }
    if (current) setActiveLink(current);
  }

  window.addEventListener("scroll", onScroll, { passive: true });
  window.addEventListener("load", onScroll);
  window.addEventListener("resize", () => { headerH = headerEl?.offsetHeight || 80; onScroll(); });

