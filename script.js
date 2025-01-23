gsap.registerPlugin(ScrollTrigger);
const locoScroll = new LocomotiveScroll({
  el: document.querySelector("#main"),
  smooth: true,
});
gsap.to("#nav", { y: "-100%", opacity: 0 });


// Set initial values for elements
function valueSetters() {
  gsap.set(".btnsection", { y: "-100%", opacity: 0 });
  gsap.set("#home .parent .child", { y: "100%" });
  gsap.set("#home .row .text img", { opacity: 0 });
  gsap.set("#downarrowbox", { opacity: 0, y: "-100%" });
  gsap.set("#home", { backgroundPositionX: "-100vw" });
  gsap;
}

document.addEventListener("DOMContentLoaded", function() {
  const cursor = document.getElementById('custom-cursor');
  
  // Set initial position
  gsap.set(cursor, { xPercent: -50, yPercent: -50 });
  
  let xTo = gsap.quickTo(cursor, "x", {duration: 0.6, ease: "power3"}),
      yTo = gsap.quickTo(cursor, "y", {duration: 0.6, ease: "power3"});

  window.addEventListener("mousemove", e => {
    xTo(e.clientX);
    yTo(e.clientY);
  });

  // Optional: add a subtle scale effect when clicking
  gsap.to(cursor, {
    scale: 0.8,
    duration: 0.15,
    ease: "power2.inOut",
    paused: true,
  });

  document.addEventListener('mousedown', () => cursor._gsap.play());
  document.addEventListener('mouseup', () => cursor._gsap.reverse());
});

// Convert elements with class "reveal" to span with nested spans
function revealToSpan() {
  document.querySelectorAll(".reveal").forEach(function (elem) {
    var parent = document.createElement("span");
    var child = document.createElement("span");

    parent.classList.add("parent");
    child.classList.add("child");

    child.innerHTML = elem.innerHTML;
    parent.appendChild(child);

    elem.innerHTML = "";
    elem.appendChild(parent);
  });
}

// Loading Animation
function loadingAnimation() {
  var tl = gsap.timeline();

  tl.from(".child span", {
    x: 100,
    duration: 1,
    stagger: 0.2,
    ease: Power3.easeInOut,
  })
    .to("#menu", { x: "100%" })
    .to(".btnsection", { y: "-100%", opacity: 0 })
    .to("#downarrowbox", { opacity: 0, y: "-100%" })
    .to(".row .text img", { y: "-200%", opacity: 1 })
    .to(".parent .child", {
      y: "-120%",
      duration: 0.8,
      ease: Circ.easeInOut,
    })
    .to("#loader", {
      height: 0,
      duration: 1,
      ease: Circ.easeInOut,
    })
    .to("#green", {
      height: "100vh",
      top: 0,
      duration: 1,
      delay: -0.8,
      ease: Power3.easeInOut,
    })

    .to("#green", {
      height: "0%",
      duration: 1,
      delay: -0.5,
      ease: Circ.easeInOut,
      onComplete: animateHomepage,
    });
}

// Grey out circles and sections
function greyout() {
  gsap.to(".mncircle", { opacity: 0.3 });
  gsap.to(".sec", { opacity: 0.4 });
}

// Side Menu Toggle

// Animate Homepage Elements
function animateHomepage() {
  var tl = gsap.timeline();

  // tl.to("#nav", {
  //   y: 0,
  //   opacity: 1,
  //   stagger: 0.05,
  //   ease: Expo.easeInOut,
  // })
  tl.to("#nav", {
    y: 0,
    opacity: 1,
    stagger: 0.05,
    ease: Expo.easeInOut,
    duration: 0.5,
  })
    .to(
      "#home .parent .child",
      {
        y: 0,
        stagger: 0.05,
        duration: 1,
        ease: Expo.easeInOut,
      },
      "a"
    )
    .to("#home", { backgroundPositionX: "-30vw" })
    .to(".btnsection", {
      y: 0,
      opacity: 1,
      duration: 1,
      ease: Expo.easeInOut,
    })
    .to(
      ".text img",
      {
        y: 0,
        opacity: 1,
        stagger: 0.05,
        ease: Expo.easeInOut,
      },
      "a"
    )
    .to(
      "#downarrowbox",
      {
        opacity: 1,
        y: 0,
        ease: Expo.easeInOut,
      },
      "a"
    )
    .to(
      ".row .text img",
      {
        y: 0,
        opacity: 1,
      },
      "a"
    )
    .to(
      ".web-h1 span",
      {
        stagger: 0.5,
        delay: 1,
      },
      "a"
    );
}

function openResume() {
  const resumeLink =
    "https://drive.google.com/file/d/1SiJgiljXa6nYQxTupJt3uYKDyUgSk54j/view?usp=drive_link";
  window.open(resumeLink, "_blank"); // Open in a new tab
}

function openContactForm() {
  const contactFormLink = "contactForm.html";
  window.open(contactFormLink, "_blank");
}

// Auto type text
var typed = new Typed("#auto-type", {
  strings: ["Developer", "Designer", "Programmer"],
  typeSpeed: 100,
  backSpeed: 60,
  loop: true,
  startDelay: 1500,
  backDelay: 1500,
  cursorChar: "|",
  smartBackspace: true,
});

//Locomotive js initialized as a function
function scrollTriggerFunction() {
  locoScroll.on("scroll", ScrollTrigger.update);

  ScrollTrigger.scrollerProxy("#main", {
    scrollTop(value) {
      return arguments.length
        ? locoScroll.scrollTo(value, 0, 0)
        : locoScroll.scroll.instance.scroll.y;
    },
    getBoundingClientRect() {
      return {
        top: 0,
        left: 0,
        width: window.innerWidth,
        height: window.innerHeight,
      };
    },
    pinType: document.querySelector("#main").style.transform
      ? "transform"
      : "fixed",
  });
}


function projectSectionAnimation() {
  scrollTriggerFunction();

  let workInfoItems = document.querySelectorAll(".work-photo-item");
  workInfoItems.forEach(function (item, index) {
    item.style.zIndex = workInfoItems.length - index;
  });

  gsap.set(".work-photo-item", {
    clipPath: "inset(0px 0px 0px 0px)",
  });

  const colorCodes = ['#FF6B6B', '#4ECDC4', '#45B7D1', '#FFA07A'];
  const projectsDiv = document.querySelector('#projects');
  let currentColorIndex = 0;

  const animation = gsap.to(".work-photo-item:not(:last-child)", {
    clipPath: "inset(0px 0px 100% 0px)",
    stagger: 0.5,
    ease: "none",
    onUpdate: function() {
      const progress = this.progress();
      const colorIndex = Math.floor(progress * colorCodes.length);
      if (colorIndex !== currentColorIndex) {
        currentColorIndex = colorIndex;
        gsap.to(projectsDiv, {
          backgroundColor: colorCodes[currentColorIndex],
          duration: 0.5,
          ease: 'power2.inOut'
        });
      }
    }
  });

  ScrollTrigger.create({
    trigger: ".work",
    scroller: "#main",
    start: "top top",
    end: "bottom bottom",
    pin: ".work-photo",
    animation: animation,
    scrub: 2,
    onEnter: () => {
      gsap.to(projectsDiv, {
        backgroundColor: colorCodes[0],
        duration: 0.5,
        ease: 'power2.inOut'
      });
    },
    //markers: true // Add this for debugging
  });

  // Ensure ScrollTrigger is updated when Locomotive Scroll updates
  ScrollTrigger.addEventListener("refresh", () => locoScroll.update());
  ScrollTrigger.refresh();
}

function skillsSectionAnimation() {
  scrollTriggerFunction();

  const skillContainer = document.querySelector(".skill-set-container");
  const skillHeading = document.querySelector(".skill-heading"); // Assuming the heading is an h2

  function getScrollAmount() {
    let skillContainerWidth = skillContainer.scrollWidth;
    return -(skillContainerWidth - window.innerWidth * 0.5 + window.innerWidth * 0.3);
  }

  // Animate the skill set container
  const tween = gsap.to(skillContainer, {
    x: () => getScrollAmount(),
    duration: 3,
    ease: "none",
  });

  ScrollTrigger.create({
    trigger:".skill-set-wrapper",
    scroller: "#main",
    start: "top 0%",
    end: () => `+=${-getScrollAmount()}`,
    pin: true,
    animation: tween,
    scrub: 2,
    invalidateOnRefresh: true,
    //markers: true,// Remove this line in production
  });

  // Add a small delay to update the end position after initial load
  setTimeout(() => {
    ScrollTrigger.refresh();
  }, 300);
}

projectSectionAnimation();
skillsSectionAnimation();
ScrollTrigger.addEventListener("refresh", () => locoScroll.update());
ScrollTrigger.refresh();

function showMenuNavigationDivision() {
  var menubtn = document.querySelector(".hamburger");
  var menuItems = document.querySelector("#menu");

  menubtn.addEventListener("click", function () {
    if (menuItems.style.display === "none" || menuItems.style.display === "") {
      gsap.to(menuItems, {
        x: "0%",
        duration: 1,
        ease: "power2.out",
        onStart: function () {
          menuItems.style.display = "block";
        },
      });
    } else {
      gsap.to(menuItems, {
        x: "100%",
        duration: 1,
        ease: "power2.in",
        onComplete: function () {
          menuItems.style.display = "none";
        },
      });
    }
  });
}

// Call the function to set up the event listener

// Initialize Functions
function init() {
  revealToSpan();
  showMenuNavigationDivision();
  loadingAnimation();
  sideMenuToggle();
}
init();


