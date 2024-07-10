(function () {
  "use strict";

  // ======= Sticky
  window.onscroll = function () {
    const ud_header = document.querySelector(".ud-header");
    const sticky = ud_header.offsetTop;
    const logo = document.querySelector(".navbar-brand img");
    const getStartedButton = document.querySelector(".ud-nav-btn");

    
    if (window.pageYOffset > sticky) {
      ud_header.classList.add("sticky");
      getStartedButton.classList.add("ud-nav-btn-scroll");
    } else {
      ud_header.classList.remove("sticky");
      getStartedButton.classList.remove("ud-nav-btn-scroll");
    }
    document.getElementById("currentYear").innerHTML = new Date().getFullYear();

    // // === logo change
    // if (ud_header.classList.contains("sticky")) {
    //   logo.src = "assets/images/logo/adaptivescale1.svg";
    // } else {
    //   logo.src = "assets/images/logo/adaptivescale2.svg";
    // }

    // show or hide the back-to-top button
    const backToTop = document.querySelector(".back-to-top");
    if (
      document.body.scrollTop > 50 ||
      document.documentElement.scrollTop > 50
    ) {
      backToTop.style.display = "flex";
    } else {
      backToTop.style.display = "none";
    }
  };

  //===== close navbar-collapse when a clicked
  let navbarToggler = document.querySelector(".navbar-toggler");
  const navbarCollapse = document.querySelector(".navbar-collapse");

  document.querySelectorAll(".ud-menu-scroll").forEach((e) =>
    e.addEventListener("click", () => {
      navbarToggler.classList.remove("active");
      navbarCollapse.classList.remove("show");
    })
  );
  navbarToggler.addEventListener("click", function () {
    navbarToggler.classList.toggle("active");
    navbarCollapse.classList.toggle("show");
  });

  // ===== submenu
  const submenuButton = document.querySelectorAll(".nav-item-has-children");
  submenuButton.forEach((elem) => {
    elem.querySelector("a").addEventListener("click", () => {
      elem.querySelector(".ud-submenu").classList.toggle("show");
    });
  });

  // ===== wow js
  new WOW().init();

// Dropdown on hover for Resources
document.getElementById("resourcesDropdown").addEventListener("mouseenter", function() {
  this.querySelector(".resources-dropdown-menu").classList.add("show");
});

document.getElementById("resourcesDropdown").addEventListener("mouseleave", function() {
  this.querySelector(".resources-dropdown-menu").classList.remove("show");
});

// Dropdown on hover for Products
document.getElementById("productsDropdown").addEventListener("mouseenter", function() {
  this.querySelector(".products-dropdown-menu").classList.add("show");
});

document.getElementById("productsDropdown").addEventListener("mouseleave", function() {
  this.querySelector(".products-dropdown-menu").classList.remove("show");
});



  // ====== scroll top js
  function scrollTo(element, to = 0, duration = 500) {
    const start = element.scrollTop;
    const change = to - start;
    const increment = 20;
    let currentTime = 0;

    const animateScroll = () => {
      currentTime += increment;

      const val = Math.easeInOutQuad(currentTime, start, change, duration);

      element.scrollTop = val;

      if (currentTime < duration) {
        setTimeout(animateScroll, increment);
      }
    };

    animateScroll();
  }

  Math.easeInOutQuad = function (t, b, c, d) {
    t /= d / 2;
    if (t < 1) return (c / 2) * t * t + b;
    t--;
    return (-c / 2) * (t * (t - 2) - 1) + b;
  };

  document.querySelector(".back-to-top").onclick = () => {
    scrollTo(document.documentElement, 0); // Scroll to the top of the page
  };
})();
