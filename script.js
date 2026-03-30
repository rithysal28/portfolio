const menuBtn = document.getElementById("menuBtn");
const navLinks = document.getElementById("navLinks");
const yearEl = document.getElementById("year");
const ticker = document.querySelector(".ticker");
const tickerContent = document.querySelector(".ticker-content");

if (yearEl) {
  yearEl.textContent = new Date().getFullYear();
}

if (menuBtn && navLinks) {
  menuBtn.addEventListener("click", () => {
    const isOpen = navLinks.classList.toggle("open");
    menuBtn.setAttribute("aria-expanded", String(isOpen));
  });

  navLinks.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      navLinks.classList.remove("open");
      menuBtn.setAttribute("aria-expanded", "false");
    });
  });
}

if (ticker && tickerContent) {
  const baseTrack = tickerContent.querySelector(".ticker-track");
  const duplicateTrack = tickerContent.querySelector(".ticker-track[aria-hidden='true']");

  const setupTickerLoop = () => {
    if (!baseTrack || !duplicateTrack) return;

    while (baseTrack.scrollWidth < ticker.clientWidth) {
      const items = Array.from(baseTrack.children);
      items.forEach((item) => {
        baseTrack.appendChild(item.cloneNode(true));
      });
    }

    duplicateTrack.innerHTML = baseTrack.innerHTML;
    tickerContent.style.setProperty("--ticker-distance", `${baseTrack.scrollWidth}px`);
  };

  setupTickerLoop();
  window.addEventListener("resize", setupTickerLoop);
}

const revealItems = document.querySelectorAll(
  ".section-head, .section-copy, .card, .skills-block, .contact-links a, .hero-content, .hero-panel, .hero-actions"
);

if (revealItems.length > 0) {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("reveal-visible");
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.12, rootMargin: "0px 0px -40px 0px" }
  );

  revealItems.forEach((item, index) => {
    item.classList.add("reveal");
    item.style.transitionDelay = `${Math.min(index * 35, 280)}ms`;
    observer.observe(item);
  });
}

const gridEffect = document.getElementById("heroGridEffect");
if (gridEffect) {
  // 3rem is usually 48px
  const colCount = Math.floor(gridEffect.clientWidth / 48) + 2; 
  const rowCount = Math.floor(gridEffect.clientHeight / 48) + 2;
  const tileCount = colCount * rowCount;
  
  for (let i = 0; i < tileCount; i++) {
    const tile = document.createElement("div");
    tile.className = "hero-grid-effect-tile";
    gridEffect.appendChild(tile);
  }
}

// 3D Profile Carousel Logic
const carouselBlock = document.getElementById("profileCarousel");
if (carouselBlock) {
  const items = Array.from(carouselBlock.querySelectorAll(".carousel-item"));
  
  // Ordered classes defining the 3D queue states
  const classState = [
    "item-active", 
    "item-next-1", 
    "item-next-2", 
    "item-next-3", 
    "item-prev"
  ];
  
  let carouselInterval;
  
  const slideNext = () => {
    // Shift the class array to rotate the state mappings backwards
    // making elements move "forward" (leftward) through the sequence.
    classState.unshift(classState.pop());
    
    items.forEach((item, index) => {
      // Reset base class and apply new positional class
      item.className = "carousel-item";
      item.classList.add(classState[index]);
    });
  };
  
  const startCarousel = () => {
    carouselInterval = setInterval(slideNext, 2000);
  };
  
  const stopCarousel = () => {
    clearInterval(carouselInterval);
  };
  
  // Start infinite loop
  startCarousel();
  
  // Pause on hover
  carouselBlock.addEventListener("mouseenter", stopCarousel);
  carouselBlock.addEventListener("mouseleave", startCarousel);
}
