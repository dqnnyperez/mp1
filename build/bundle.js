/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "../node_modules/css-loader/dist/runtime/api.js"
/*!******************************************************!*\
  !*** ../node_modules/css-loader/dist/runtime/api.js ***!
  \******************************************************/
(module) {

"use strict";


/*
  MIT License http://www.opensource.org/licenses/mit-license.php
  Author Tobias Koppers @sokra
*/
module.exports = function (cssWithMappingToString) {
  var list = [];

  // return the list of modules as css string
  list.toString = function toString() {
    return this.map(function (item) {
      var content = "";
      var needLayer = typeof item[5] !== "undefined";
      if (item[4]) {
        content += "@supports (".concat(item[4], ") {");
      }
      if (item[2]) {
        content += "@media ".concat(item[2], " {");
      }
      if (needLayer) {
        content += "@layer".concat(item[5].length > 0 ? " ".concat(item[5]) : "", " {");
      }
      content += cssWithMappingToString(item);
      if (needLayer) {
        content += "}";
      }
      if (item[2]) {
        content += "}";
      }
      if (item[4]) {
        content += "}";
      }
      return content;
    }).join("");
  };

  // import a list of modules into the list
  list.i = function i(modules, media, dedupe, supports, layer) {
    if (typeof modules === "string") {
      modules = [[null, modules, undefined]];
    }
    var alreadyImportedModules = {};
    if (dedupe) {
      for (var k = 0; k < this.length; k++) {
        var id = this[k][0];
        if (id != null) {
          alreadyImportedModules[id] = true;
        }
      }
    }
    for (var _k = 0; _k < modules.length; _k++) {
      var item = [].concat(modules[_k]);
      if (dedupe && alreadyImportedModules[item[0]]) {
        continue;
      }
      if (typeof layer !== "undefined") {
        if (typeof item[5] === "undefined") {
          item[5] = layer;
        } else {
          item[1] = "@layer".concat(item[5].length > 0 ? " ".concat(item[5]) : "", " {").concat(item[1], "}");
          item[5] = layer;
        }
      }
      if (media) {
        if (!item[2]) {
          item[2] = media;
        } else {
          item[1] = "@media ".concat(item[2], " {").concat(item[1], "}");
          item[2] = media;
        }
      }
      if (supports) {
        if (!item[4]) {
          item[4] = "".concat(supports);
        } else {
          item[1] = "@supports (".concat(item[4], ") {").concat(item[1], "}");
          item[4] = supports;
        }
      }
      list.push(item);
    }
  };
  return list;
};

/***/ },

/***/ "../node_modules/css-loader/dist/runtime/sourceMaps.js"
/*!*************************************************************!*\
  !*** ../node_modules/css-loader/dist/runtime/sourceMaps.js ***!
  \*************************************************************/
(module) {

"use strict";


module.exports = function (item) {
  var content = item[1];
  var cssMapping = item[3];
  if (!cssMapping) {
    return content;
  }
  if (typeof btoa === "function") {
    var base64 = btoa(unescape(encodeURIComponent(JSON.stringify(cssMapping))));
    var data = "sourceMappingURL=data:application/json;charset=utf-8;base64,".concat(base64);
    var sourceMapping = "/*# ".concat(data, " */");
    return [content].concat([sourceMapping]).join("\n");
  }
  return [content].join("\n");
};

/***/ },

/***/ "./js/main.js"
/*!********************!*\
  !*** ./js/main.js ***!
  \********************/
() {

var header = document.querySelector('.site-header');
var navLinks = document.querySelectorAll('.nav-link');
var sections = document.querySelectorAll('main section[id]');
var carouselSlides = document.querySelectorAll('.slide');
var prevButton = document.querySelector('.carousel-btn.prev');
var nextButton = document.querySelector('.carousel-btn.next');
var modalButtons = document.querySelectorAll('.open-modal');
var modalOverlays = document.querySelectorAll('.modal-overlay');
var modalCloses = document.querySelectorAll('.modal-close');
function updateHeaderState() {
  if (window.scrollY > 32) {
    header.classList.add('scrolled');
  } else {
    header.classList.remove('scrolled');
  }
}
function updateActiveNav() {
  var scrollPosition = window.scrollY + 150;
  var currentId = 'home';
  sections.forEach(function (section) {
    var sectionTop = section.offsetTop;
    if (scrollPosition >= sectionTop) {
      currentId = section.id;
    }
  });
  if (window.innerHeight + window.scrollY >= document.body.scrollHeight - 20) {
    currentId = sections[sections.length - 1].id;
  }
  navLinks.forEach(function (link) {
    var isActive = link.getAttribute('href') === "#".concat(currentId);
    link.classList.toggle('active', isActive);
  });
}
function showSlide(index) {
  carouselSlides.forEach(function (slide, slideIndex) {
    slide.classList.toggle('active', slideIndex === index);
  });
}
var activeSlideIndex = 0;
if (prevButton && nextButton) {
  prevButton.addEventListener('click', function () {
    activeSlideIndex = (activeSlideIndex - 1 + carouselSlides.length) % carouselSlides.length;
    showSlide(activeSlideIndex);
  });
  nextButton.addEventListener('click', function () {
    activeSlideIndex = (activeSlideIndex + 1) % carouselSlides.length;
    showSlide(activeSlideIndex);
  });
}
modalButtons.forEach(function (button) {
  button.addEventListener('click', function () {
    var target = document.getElementById(button.dataset.modal);
    if (target) {
      target.classList.add('open');
      target.setAttribute('aria-hidden', 'false');
    }
  });
});
modalCloses.forEach(function (closeButton) {
  closeButton.addEventListener('click', function () {
    var overlay = closeButton.closest('.modal-overlay');
    if (overlay) {
      overlay.classList.remove('open');
      overlay.setAttribute('aria-hidden', 'true');
    }
  });
});
modalOverlays.forEach(function (overlay) {
  overlay.addEventListener('click', function (event) {
    if (event.target === overlay) {
      overlay.classList.remove('open');
      overlay.setAttribute('aria-hidden', 'true');
    }
  });
});
document.addEventListener('keydown', function (event) {
  if (event.key === 'Escape') {
    modalOverlays.forEach(function (overlay) {
      overlay.classList.remove('open');
      overlay.setAttribute('aria-hidden', 'true');
    });
  }
});
window.addEventListener('scroll', function () {
  updateHeaderState();
  updateActiveNav();
});
window.addEventListener('load', function () {
  updateHeaderState();
  updateActiveNav();
  showSlide(activeSlideIndex);
});

/***/ },

/***/ "../node_modules/css-loader/dist/cjs.js!../node_modules/postcss-loader/dist/cjs.js!../node_modules/sass-loader/dist/cjs.js!./css/main.scss"
/*!*************************************************************************************************************************************************!*\
  !*** ../node_modules/css-loader/dist/cjs.js!../node_modules/postcss-loader/dist/cjs.js!../node_modules/sass-loader/dist/cjs.js!./css/main.scss ***!
  \*************************************************************************************************************************************************/
(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../node_modules/css-loader/dist/runtime/sourceMaps.js */ "../node_modules/css-loader/dist/runtime/sourceMaps.js");
/* harmony import */ var _node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../node_modules/css-loader/dist/runtime/api.js */ "../node_modules/css-loader/dist/runtime/api.js");
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__);
// Imports


var ___CSS_LOADER_EXPORT___ = _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default()((_node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default()));
// Module
___CSS_LOADER_EXPORT___.push([module.id, `html {
  scroll-behavior: smooth;
}

* {
  box-sizing: border-box;
}

body {
  margin: 0;
  font-family: "Helvetica Neue", Helvetica, Arial, sans-serif;
  background: #ffffff;
  color: #111111;
  line-height: 1.45;
}

a {
  text-decoration: none;
  color: inherit;
}

img,
video {
  display: block;
  max-width: 100%;
}

button {
  font: inherit;
}

.site-header {
  position: sticky;
  top: 0;
  z-index: 40;
}

.navbar {
  position: sticky;
  top: 0;
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  min-height: 76px;
  padding: 0 5vw;
  background: rgba(255, 255, 255, 0.94);
  backdrop-filter: blur(12px);
  border-bottom: 1px solid #111111;
  transition: min-height 0.35s ease, background 0.35s ease, box-shadow 0.35s ease;
}

.site-header.scrolled .navbar {
  min-height: 62px;
  box-shadow: none;
  background: rgba(255, 255, 255, 0.98);
}

.nav-brand {
  font-size: 0.85rem;
  font-weight: 800;
  letter-spacing: 0.16em;
  color: #111111;
}

.nav-links {
  display: flex;
  align-items: center;
  gap: 1.8rem;
  position: relative;
}

.nav-link {
  position: relative;
  color: #666666;
  font-size: 0.7rem;
  font-weight: 700;
  letter-spacing: 0.12em;
  transition: color 0.25s ease;
}
.nav-link.active, .nav-link:hover {
  color: #111111;
}
.nav-link::after {
  content: "";
  position: absolute;
  left: 0;
  bottom: -0.35rem;
  width: 100%;
  height: 1px;
  background: #111111;
  transform: scaleX(0);
  transform-origin: center;
  transition: transform 0.25s ease;
}
.nav-link.active::after, .nav-link:hover::after {
  transform: scaleX(1);
}

.section {
  position: relative;
  width: 100%;
  padding: 5rem 0;
}

.section-shell {
  width: min(1200px, calc(100% - 64px));
  margin: 0 auto;
}

.hero {
  background: #ffffff;
  color: #111111;
  min-height: calc(100vh - 76px);
  display: flex;
  align-items: center;
  padding-top: 3rem;
  padding-bottom: 3rem;
}

.hero-grid {
  display: grid;
  grid-template-columns: 1fr 0.8fr;
  align-items: center;
  gap: 2rem;
}

.hero-copy {
  max-width: 700px;
}

.eyebrow,
.section-tag {
  margin: 0 0 1rem;
  color: #777777;
  text-transform: uppercase;
  letter-spacing: 0.14em;
  font-size: 0.65rem;
  font-weight: 800;
}

.hero h1,
.section-shell h2 {
  margin: 0 0 1.2rem;
  line-height: 1.04;
  letter-spacing: -0.07em;
}

.hero h1 {
  font-size: clamp(3.5rem, 8vw, 7rem);
  color: #111111;
  line-height: 0.88;
}

.lead {
  max-width: 510px;
  margin-top: 2rem;
  font-size: 1rem;
  color: #444444;
}

.chip-row {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  margin-top: 2.2rem;
}

.chip {
  display: inline-flex;
  align-items: center;
  padding: 0.4rem 0.6rem;
  border: 1px solid #cccccc;
  border-radius: 0;
  background: #ffffff;
  color: #555555;
  font-size: 0.62rem;
  font-weight: 700;
  letter-spacing: 0.08em;
}

.cta-group {
  display: flex;
  flex-wrap: wrap;
  gap: 0.6rem;
  margin-top: 2.3rem;
}

.btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  min-height: 42px;
  padding: 0 1rem;
  border-radius: 0;
  font-size: 0.68rem;
  font-weight: 800;
  letter-spacing: 0.08em;
  border: 1px solid #111111;
  transition: transform 0.2s ease, background 0.2s ease, color 0.2s ease;
}
.btn:hover {
  transform: translateY(-1px);
  box-shadow: none;
}

.btn-primary {
  background: #111111 url("https://images.unsplash.com/photo-1516280440614-37939bbacd81?auto=format&fit=crop&w=1600&q=80") center/cover fixed;
  color: #ffffff;
}

.btn-secondary {
  border-color: #111111;
  color: #111111;
  background: #ffffff;
}

.profile-card {
  width: min(100%, 320px);
  margin-left: auto;
  background: #f2f2f2;
  border: 1px solid #111111;
  border-radius: 0;
  overflow: hidden;
  box-shadow: none;
}

.profile-card img {
  width: 100%;
  height: 380px;
  -o-object-fit: cover;
     object-fit: cover;
}

.profile-meta {
  display: flex;
  align-items: baseline;
  justify-content: space-between;
  gap: 1rem;
  padding: 0.8rem 0.9rem;
}

.profile-meta h2 {
  margin: 0 0 0.25rem;
  font-size: 0.8rem;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  color: #111111;
}

.profile-meta p {
  margin: 0;
  color: #777777;
  font-size: 0.7rem;
}

.alt-section,
.services-section,
.media-section {
  background: #f5f5f5;
}

.alt-section .section-shell,
.showcase-section .section-shell,
.services-section .section-shell,
.media-section .section-shell,
.footer-section .section-shell {
  width: min(1200px, calc(100% - 64px));
  margin: 0 auto;
}

.section-shell h2 {
  font-size: clamp(2rem, 4vw, 4rem);
  color: #111111;
}

.about-grid {
  display: grid;
  grid-template-columns: 1fr;
  gap: 2.5rem;
  align-items: center;
  margin-top: 3rem;
}

.about-copy p {
  color: #444444;
  font-size: 1rem;
  margin: 0 0 1rem;
}

.about-panel {
  background: #ffffff;
  border: 1px solid #111111;
  border-radius: 0;
  padding: 1.5rem;
  box-shadow: none;
}

.about-panel ul {
  list-style: none;
  padding: 0;
  margin: 0;
  display: grid;
  gap: 1rem;
  color: #111111;
  font-weight: 700;
  font-size: 0.82rem;
}

.about-panel li {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  line-height: 1.5;
}

.about-panel i {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 1rem;
  height: 1rem;
  border-radius: 0;
  color: #111111;
  background: transparent;
  font-size: 0.65rem;
}

.showcase-section {
  background: #ffffff;
}

.carousel {
  position: relative;
  display: grid;
  grid-template-columns: 52px minmax(0, 1fr) 52px;
  align-items: center;
  gap: 1rem;
  margin-top: 3rem;
}

.carousel-track {
  position: relative;
  min-height: 500px;
}

.slide {
  position: absolute;
  inset: 0;
  opacity: 0;
  pointer-events: none;
  transform: translateY(8px);
  transition: opacity 0.4s ease, transform 0.4s ease;
  background: #ffffff;
  border-radius: 0;
  overflow: hidden;
  border: 1px solid #111111;
  box-shadow: none;
}
.slide.active {
  opacity: 1;
  pointer-events: auto;
  transform: translateY(0);
}

.slide img {
  width: 100%;
  height: 360px;
  -o-object-fit: cover;
     object-fit: cover;
}

.slide-copy {
  padding: 1.2rem 1.4rem 1.5rem;
  background: #ffffff;
  color: #111827;
}

.slide-copy span {
  display: inline-block;
  color: #777777;
  font-size: 0.72rem;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  font-weight: 700;
  margin-bottom: 0.5rem;
}

.slide-copy h3 {
  margin: 0 0 0.5rem;
  font-size: clamp(1.5rem, 2vw, 2rem);
  text-transform: uppercase;
}

.slide-copy p {
  margin: 0;
  color: #444444;
}

.feed-heading {
  display: flex;
  align-items: end;
  justify-content: space-between;
  gap: 1rem;
  margin-top: 4rem;
  border-bottom: 1px solid #111111;
}

.feed-heading h3 {
  margin: 0 0 1rem;
  font-size: 1.4rem;
  text-transform: uppercase;
}

.feed-heading .section-tag {
  margin-bottom: 0.35rem;
}

.feed-status {
  padding-bottom: 1rem;
  color: #777777;
  font-size: 0.62rem;
  font-weight: 800;
  letter-spacing: 0.08em;
  text-transform: uppercase;
}

.news-feed {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  border-left: 1px solid #111111;
}

.news-item {
  min-height: 170px;
  padding: 1rem;
  border-right: 1px solid #111111;
  border-bottom: 1px solid #111111;
  transition: background 0.2s ease, color 0.2s ease;
}

.news-item:hover {
  background: #111111;
  color: #ffffff;
}

.news-source,
.news-item time {
  display: block;
  color: #777777;
  font-size: 0.62rem;
  font-weight: 800;
  letter-spacing: 0.08em;
  text-transform: uppercase;
}

.news-item:hover .news-source,
.news-item:hover time {
  color: #bbbbbb;
}

.news-item h4 {
  margin: 1.2rem 0 2rem;
  font-size: 0.95rem;
  line-height: 1.25;
}

.feed-message {
  grid-column: 1/-1;
  margin: 0;
  padding: 1.2rem 1rem;
  border-bottom: 1px solid #111111;
  color: #777777;
  font-size: 0.8rem;
}

.carousel-btn {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 42px;
  height: 42px;
  border: 1px solid #111111;
  border-radius: 0;
  background: #ffffff;
  color: #111111;
  cursor: pointer;
  transition: transform 0.2s ease, background 0.2s ease;
}
.carousel-btn:hover {
  transform: translateY(-1px);
  background: #111111;
  color: #ffffff;
}

.services-grid {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 1rem;
  margin-top: 2rem;
}

.service-card {
  background: #ffffff;
  border: 1px solid #111111;
  border-radius: 0;
  padding: 1.25rem;
  box-shadow: none;
  transition: transform 0.25s ease, box-shadow 0.25s ease;
}
.service-card:hover {
  transform: translateY(-2px);
  box-shadow: none;
}

.service-card i {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 2rem;
  height: 2rem;
  font-size: 1.2rem;
  border-radius: 0;
  background: transparent;
  color: #111111;
  margin-bottom: 1rem;
}

.service-card h3 {
  margin: 0 0 0.6rem;
  font-size: 1.1rem;
  text-transform: uppercase;
}

.service-card p {
  margin: 0;
  color: #555555;
}

.source-list {
  display: flex;
  flex-wrap: wrap;
  gap: 0.35rem;
  margin-top: 1.1rem;
}

.source-list span {
  padding: 0.35rem 0.45rem;
  border: 1px solid #cccccc;
  color: #555555;
  font-size: 0.62rem;
  font-weight: 700;
  line-height: 1.2;
}

.combined-notes {
  margin-top: 4rem;
  padding-top: 1.5rem;
  border-top: 1px solid #111111;
}

.combined-notes > h3 {
  margin: 0 0 1.2rem;
  font-size: 1.4rem;
  text-transform: uppercase;
}

.parallax-section {
  position: relative;
  min-height: 440px;
  background: #111111;
  overflow: hidden;
}

.archive-video {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  -o-object-fit: cover;
     object-fit: cover;
  filter: grayscale(1) contrast(1.2);
}

.parallax-overlay {
  position: absolute;
  inset: 0;
  background: rgba(0, 0, 0, 0.42);
}

.parallax-copy {
  position: relative;
  z-index: 1;
  min-height: 440px;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;
  color: #f9fafb;
}

.parallax-copy h2,
.light {
  color: #f9fafb;
}

.parallax-copy p:last-child {
  max-width: 580px;
  font-size: 1.04rem;
  color: rgba(249, 250, 251, 0.82);
}

.media-grid {
  display: grid;
  grid-template-columns: 1.2fr 0.8fr;
  gap: 2.25rem;
  align-items: center;
}

.video-column video {
  width: 100%;
  border: 1px solid #111111;
  border-radius: 0;
  box-shadow: none;
}

.motion-frame {
  position: relative;
  overflow: hidden;
  background: #111111;
  border: 1px solid #111111;
}

.motion-frame::after {
  content: "";
  position: absolute;
  inset: 0;
  pointer-events: none;
  background: repeating-linear-gradient(0deg, rgba(255, 255, 255, 0.06) 0, rgba(255, 255, 255, 0.06) 1px, transparent 1px, transparent 4px);
  mix-blend-mode: screen;
  opacity: 0.35;
  animation: scan 8s linear infinite;
}

.motion-frame video {
  display: block;
  width: 100%;
  aspect-ratio: 16/9;
  -o-object-fit: cover;
     object-fit: cover;
  filter: grayscale(1) contrast(1.15);
}

.notes-shell {
  max-width: 760px;
}

.motion-label {
  position: absolute;
  right: 0.75rem;
  bottom: 0.65rem;
  z-index: 1;
  color: #ffffff;
  font-size: 0.6rem;
  font-weight: 800;
  letter-spacing: 0.12em;
}

@keyframes scan {
  from {
    transform: translateY(-12%);
  }
  to {
    transform: translateY(12%);
  }
}
.live-frame {
  width: 100%;
  aspect-ratio: 16/9;
  border: 1px solid #111111;
  background: #111111;
}

.live-frame iframe {
  width: 100%;
  height: 100%;
  border: 0;
}

.html5-video {
  margin-top: 1.5rem;
}

.html5-video video {
  max-height: 180px;
  -o-object-fit: cover;
     object-fit: cover;
}

.video-label {
  margin: 0 0 0.5rem;
  color: #777777;
  font-size: 0.62rem;
  font-weight: 800;
  letter-spacing: 0.1em;
  text-transform: uppercase;
}

.modal-cards {
  display: grid;
  gap: 1.1rem;
  margin-top: 1.6rem;
}

.mini-card {
  background: #ffffff;
  border: 1px solid #111111;
  border-radius: 0;
  padding: 1rem;
}

.mini-card h3 {
  margin: 0 0 1rem;
  font-size: 1rem;
  text-transform: uppercase;
}

.open-modal {
  border: 1px solid #111111;
  border-radius: 0;
  background: #ffffff;
  color: #111111;
  padding: 0.55rem 0.75rem;
  cursor: pointer;
  font-size: 0.65rem;
  font-weight: 800;
  letter-spacing: 0.08em;
}

.footer-section {
  background: #111827;
  color: #f9fafb;
  padding-bottom: 1.5rem;
}

.contact-shell {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1rem;
  padding: 2rem 0 0;
}

.contact-copy h2 {
  color: #f9fafb;
  margin: 0;
}

.site-footer {
  background: #111827;
  border-top: 1px solid rgba(255, 255, 255, 0.08);
}

.footer-inner {
  width: min(1200px, calc(100% - 64px));
  margin: 0 auto;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 1.5rem 0;
  color: rgba(249, 250, 251, 0.8);
}

.socials {
  display: flex;
  align-items: center;
  gap: 0.8rem;
}

.socials a {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 2.5rem;
  height: 2.5rem;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.06);
  color: #f9fafb;
  transition: transform 0.2s ease, background 0.2s ease, box-shadow 0.2s ease;
}
.socials a:hover {
  transform: translateY(-2px);
  background: rgba(255, 255, 255, 0.12);
  box-shadow: 0 0 20px rgba(255, 255, 255, 0.12);
}

.modal-overlay {
  position: fixed;
  inset: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 2rem;
  background: rgba(17, 24, 39, 0.7);
  opacity: 0;
  visibility: hidden;
  transition: opacity 0.2s ease, visibility 0.2s ease;
  z-index: 100;
}

.modal-overlay.open {
  opacity: 1;
  visibility: visible;
}

.modal-content {
  position: relative;
  width: min(500px, 100%);
  background: #ffffff;
  color: #111827;
  border-radius: 18px;
  padding: 2rem 1.5rem 1.5rem;
  box-shadow: 0 18px 32px rgba(17, 24, 39, 0.12);
}

.modal-content h3 {
  margin-top: 0;
  font-size: 2rem;
}

.modal-content p {
  margin-bottom: 0;
  color: #4b5563;
}

.modal-close {
  position: absolute;
  top: 1rem;
  right: 1rem;
  width: 2.5rem;
  height: 2.5rem;
  border: 0;
  border-radius: 50%;
  background: rgba(17, 24, 39, 0.08);
  color: #111827;
  cursor: pointer;
}

@keyframes fadeUp {
  from {
    opacity: 0;
    transform: translateY(18px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
@media (max-width: 930px) {
  .hero-grid,
.about-grid,
.media-grid,
.services-grid {
    grid-template-columns: 1fr;
  }

  .profile-card {
    margin: 0 auto;
  }

  .contact-shell {
    flex-direction: column;
    align-items: flex-start;
  }

  .news-feed {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
}
@media (max-width: 720px) {
  .navbar {
    padding: 0 1rem;
    min-height: 82px;
    flex-direction: column;
    justify-content: center;
    gap: 0.6rem;
  }

  .site-header.scrolled .navbar {
    min-height: 74px;
  }

  .nav-links {
    gap: 0.9rem;
    flex-wrap: wrap;
    justify-content: center;
  }

  .nav-link {
    font-size: 0.78rem;
  }

  .section {
    padding: 5.5rem 0;
  }

  .hero h1 {
    font-size: 2.8rem;
  }

  .profile-card img {
    height: 360px;
  }

  .slide img {
    height: 300px;
  }

  .carousel {
    grid-template-columns: 1fr;
  }

  .carousel-btn {
    display: none;
  }

  .feed-heading {
    align-items: flex-start;
    flex-direction: column;
    gap: 0;
  }

  .feed-status {
    padding-bottom: 0.8rem;
  }

  .news-feed {
    grid-template-columns: 1fr;
  }

  .footer-inner {
    flex-direction: column;
    align-items: flex-start;
    gap: 0.8rem;
  }
}`, "",{"version":3,"sources":["webpack://./css/main.scss"],"names":[],"mappings":"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","sourcesContent":["$dark: #0b1020;\n$dark-soft: #151d2d;\n$muted: #a1adbf;\n$light: #eef4ff;\n$cream: #f7f2eb;\n$gold: #ffc857;\n$accent: #79d2c0;\n$violet: #8f7cff;\n$card: rgba(255, 255, 255, 0.06);\n$shadow: rgba(8, 12, 22, 0.5);\n\n@mixin flex-center {\n  display: flex;\n  align-items: center;\n  justify-content: center;\n}\n\n@mixin section-shell {\n  width: min(1200px, calc(100% - 64px));\n  margin: 0 auto;\n}\n\nhtml {\n  scroll-behavior: smooth;\n}\n\n* {\n  box-sizing: border-box;\n}\n\nbody {\n  margin: 0;\n  font-family: \"Helvetica Neue\", Helvetica, Arial, sans-serif;\n  background: #ffffff;\n  color: #111111;\n  line-height: 1.45;\n}\n\na {\n  text-decoration: none;\n  color: inherit;\n}\n\nimg,\nvideo {\n  display: block;\n  max-width: 100%;\n}\n\nbutton {\n  font: inherit;\n}\n\n.site-header {\n  position: sticky;\n  top: 0;\n  z-index: 40;\n}\n\n.navbar {\n  position: sticky;\n  top: 0;\n  display: flex;\n  align-items: center;\n  justify-content: space-between;\n  width: 100%;\n  min-height: 76px;\n  padding: 0 5vw;\n  background: rgba(255, 255, 255, 0.94);\n  backdrop-filter: blur(12px);\n  border-bottom: 1px solid #111111;\n  transition: min-height 0.35s ease, background 0.35s ease, box-shadow 0.35s ease;\n}\n\n.site-header.scrolled .navbar {\n  min-height: 62px;\n  box-shadow: none;\n  background: rgba(255, 255, 255, 0.98);\n}\n\n.nav-brand {\n  font-size: 0.85rem;\n  font-weight: 800;\n  letter-spacing: 0.16em;\n  color: #111111;\n}\n\n.nav-links {\n  display: flex;\n  align-items: center;\n  gap: 1.8rem;\n  position: relative;\n}\n\n.nav-link {\n  position: relative;\n  color: #666666;\n  font-size: 0.7rem;\n  font-weight: 700;\n  letter-spacing: 0.12em;\n  transition: color 0.25s ease;\n\n  &.active,\n  &:hover {\n    color: #111111;\n  }\n\n  &::after {\n    content: \"\";\n    position: absolute;\n    left: 0;\n    bottom: -0.35rem;\n    width: 100%;\n    height: 1px;\n    background: #111111;\n    transform: scaleX(0);\n    transform-origin: center;\n    transition: transform 0.25s ease;\n  }\n\n  &.active::after,\n  &:hover::after {\n    transform: scaleX(1);\n  }\n}\n\n.section {\n  position: relative;\n  width: 100%;\n  padding: 5rem 0;\n}\n\n.section-shell {\n  @include section-shell;\n}\n\n.hero {\n  background: #ffffff;\n  color: #111111;\n  min-height: calc(100vh - 76px);\n  display: flex;\n  align-items: center;\n  padding-top: 3rem;\n  padding-bottom: 3rem;\n}\n\n.hero-grid {\n  display: grid;\n  grid-template-columns: 1fr 0.8fr;\n  align-items: center;\n  gap: 2rem;\n}\n\n.hero-copy {\n  max-width: 700px;\n}\n\n.eyebrow,\n.section-tag {\n  margin: 0 0 1rem;\n  color: #777777;\n  text-transform: uppercase;\n  letter-spacing: 0.14em;\n  font-size: 0.65rem;\n  font-weight: 800;\n}\n\n.hero h1,\n.section-shell h2 {\n  margin: 0 0 1.2rem;\n  line-height: 1.04;\n  letter-spacing: -0.07em;\n}\n\n.hero h1 {\n  font-size: clamp(3.5rem, 8vw, 7rem);\n  color: #111111;\n  line-height: 0.88;\n}\n\n.lead {\n  max-width: 510px;\n  margin-top: 2rem;\n  font-size: 1rem;\n  color: #444444;\n}\n\n.chip-row {\n  display: flex;\n  flex-wrap: wrap;\n  gap: 0.5rem;\n  margin-top: 2.2rem;\n}\n\n.chip {\n  display: inline-flex;\n  align-items: center;\n  padding: 0.4rem 0.6rem;\n  border: 1px solid #cccccc;\n  border-radius: 0;\n  background: #ffffff;\n  color: #555555;\n  font-size: 0.62rem;\n  font-weight: 700;\n  letter-spacing: 0.08em;\n}\n\n.cta-group {\n  display: flex;\n  flex-wrap: wrap;\n  gap: 0.6rem;\n  margin-top: 2.3rem;\n}\n\n.btn {\n  display: inline-flex;\n  align-items: center;\n  justify-content: center;\n  min-height: 42px;\n  padding: 0 1rem;\n  border-radius: 0;\n  font-size: 0.68rem;\n  font-weight: 800;\n  letter-spacing: 0.08em;\n  border: 1px solid #111111;\n  transition: transform 0.2s ease, background 0.2s ease, color 0.2s ease;\n\n  &:hover {\n    transform: translateY(-1px);\n    box-shadow: none;\n  }\n}\n\n.btn-primary {\n  background: #111111 url(\"https://images.unsplash.com/photo-1516280440614-37939bbacd81?auto=format&fit=crop&w=1600&q=80\") center/cover fixed;\n  color: #ffffff;\n}\n\n.btn-secondary {\n  border-color: #111111;\n  color: #111111;\n  background: #ffffff;\n}\n\n.profile-card {\n  width: min(100%, 320px);\n  margin-left: auto;\n  background: #f2f2f2;\n  border: 1px solid #111111;\n  border-radius: 0;\n  overflow: hidden;\n  box-shadow: none;\n}\n\n.profile-card img {\n  width: 100%;\n  height: 380px;\n  object-fit: cover;\n}\n\n.profile-meta {\n  display: flex;\n  align-items: baseline;\n  justify-content: space-between;\n  gap: 1rem;\n  padding: 0.8rem 0.9rem;\n}\n\n.profile-meta h2 {\n  margin: 0 0 0.25rem;\n  font-size: 0.8rem;\n  letter-spacing: 0.1em;\n  text-transform: uppercase;\n  color: #111111;\n}\n\n.profile-meta p {\n  margin: 0;\n  color: #777777;\n  font-size: 0.7rem;\n}\n\n.alt-section,\n.services-section,\n.media-section {\n  background: #f5f5f5;\n}\n\n.alt-section .section-shell,\n.showcase-section .section-shell,\n.services-section .section-shell,\n.media-section .section-shell,\n.footer-section .section-shell {\n  @include section-shell;\n}\n\n.section-shell h2 {\n  font-size: clamp(2rem, 4vw, 4rem);\n  color: #111111;\n}\n\n.about-grid {\n  display: grid;\n  grid-template-columns: 1fr;\n  gap: 2.5rem;\n  align-items: center;\n  margin-top: 3rem;\n}\n\n.about-copy p {\n  color: #444444;\n  font-size: 1rem;\n  margin: 0 0 1rem;\n}\n\n.about-panel {\n  background: #ffffff;\n  border: 1px solid #111111;\n  border-radius: 0;\n  padding: 1.5rem;\n  box-shadow: none;\n}\n\n.about-panel ul {\n  list-style: none;\n  padding: 0;\n  margin: 0;\n  display: grid;\n  gap: 1rem;\n  color: #111111;\n  font-weight: 700;\n  font-size: 0.82rem;\n}\n\n.about-panel li {\n  display: flex;\n  align-items: center;\n  gap: 0.75rem;\n  line-height: 1.5;\n}\n\n.about-panel i {\n  @include flex-center;\n  width: 1rem;\n  height: 1rem;\n  border-radius: 0;\n  color: #111111;\n  background: transparent;\n  font-size: 0.65rem;\n}\n\n.showcase-section {\n  background: #ffffff;\n}\n\n.carousel {\n  position: relative;\n  display: grid;\n  grid-template-columns: 52px minmax(0, 1fr) 52px;\n  align-items: center;\n  gap: 1rem;\n  margin-top: 3rem;\n}\n\n.carousel-track {\n  position: relative;\n  min-height: 500px;\n}\n\n.slide {\n  position: absolute;\n  inset: 0;\n  opacity: 0;\n  pointer-events: none;\n  transform: translateY(8px);\n  transition: opacity 0.4s ease, transform 0.4s ease;\n  background: #ffffff;\n  border-radius: 0;\n  overflow: hidden;\n  border: 1px solid #111111;\n  box-shadow: none;\n\n  &.active {\n    opacity: 1;\n    pointer-events: auto;\n    transform: translateY(0);\n  }\n}\n\n.slide img {\n  width: 100%;\n  height: 360px;\n  object-fit: cover;\n}\n\n.slide-copy {\n  padding: 1.2rem 1.4rem 1.5rem;\n  background: #ffffff;\n  color: #111827;\n}\n\n.slide-copy span {\n  display: inline-block;\n  color: #777777;\n  font-size: 0.72rem;\n  letter-spacing: 0.1em;\n  text-transform: uppercase;\n  font-weight: 700;\n  margin-bottom: 0.5rem;\n}\n\n.slide-copy h3 {\n  margin: 0 0 0.5rem;\n  font-size: clamp(1.5rem, 2vw, 2rem);\n  text-transform: uppercase;\n}\n\n.slide-copy p {\n  margin: 0;\n  color: #444444;\n}\n\n.feed-heading {\n  display: flex;\n  align-items: end;\n  justify-content: space-between;\n  gap: 1rem;\n  margin-top: 4rem;\n  border-bottom: 1px solid #111111;\n}\n\n.feed-heading h3 {\n  margin: 0 0 1rem;\n  font-size: 1.4rem;\n  text-transform: uppercase;\n}\n\n.feed-heading .section-tag {\n  margin-bottom: 0.35rem;\n}\n\n.feed-status {\n  padding-bottom: 1rem;\n  color: #777777;\n  font-size: 0.62rem;\n  font-weight: 800;\n  letter-spacing: 0.08em;\n  text-transform: uppercase;\n}\n\n.news-feed {\n  display: grid;\n  grid-template-columns: repeat(3, minmax(0, 1fr));\n  border-left: 1px solid #111111;\n}\n\n.news-item {\n  min-height: 170px;\n  padding: 1rem;\n  border-right: 1px solid #111111;\n  border-bottom: 1px solid #111111;\n  transition: background 0.2s ease, color 0.2s ease;\n}\n\n.news-item:hover {\n  background: #111111;\n  color: #ffffff;\n}\n\n.news-source,\n.news-item time {\n  display: block;\n  color: #777777;\n  font-size: 0.62rem;\n  font-weight: 800;\n  letter-spacing: 0.08em;\n  text-transform: uppercase;\n}\n\n.news-item:hover .news-source,\n.news-item:hover time {\n  color: #bbbbbb;\n}\n\n.news-item h4 {\n  margin: 1.2rem 0 2rem;\n  font-size: 0.95rem;\n  line-height: 1.25;\n}\n\n.feed-message {\n  grid-column: 1 / -1;\n  margin: 0;\n  padding: 1.2rem 1rem;\n  border-bottom: 1px solid #111111;\n  color: #777777;\n  font-size: 0.8rem;\n}\n\n.carousel-btn {\n  @include flex-center;\n  width: 42px;\n  height: 42px;\n  border: 1px solid #111111;\n  border-radius: 0;\n  background: #ffffff;\n  color: #111111;\n  cursor: pointer;\n  transition: transform 0.2s ease, background 0.2s ease;\n\n  &:hover {\n    transform: translateY(-1px);\n    background: #111111;\n    color: #ffffff;\n  }\n}\n\n.services-grid {\n  display: grid;\n  grid-template-columns: repeat(3, minmax(0, 1fr));\n  gap: 1rem;\n  margin-top: 2rem;\n}\n\n.service-card {\n  background: #ffffff;\n  border: 1px solid #111111;\n  border-radius: 0;\n  padding: 1.25rem;\n  box-shadow: none;\n  transition: transform 0.25s ease, box-shadow 0.25s ease;\n\n  &:hover {\n    transform: translateY(-2px);\n    box-shadow: none;\n  }\n}\n\n.service-card i {\n  @include flex-center;\n  width: 2rem;\n  height: 2rem;\n  font-size: 1.2rem;\n  border-radius: 0;\n  background: transparent;\n  color: #111111;\n  margin-bottom: 1rem;\n}\n\n.service-card h3 {\n  margin: 0 0 0.6rem;\n  font-size: 1.1rem;\n  text-transform: uppercase;\n}\n\n.service-card p {\n  margin: 0;\n  color: #555555;\n}\n\n.source-list {\n  display: flex;\n  flex-wrap: wrap;\n  gap: 0.35rem;\n  margin-top: 1.1rem;\n}\n\n.source-list span {\n  padding: 0.35rem 0.45rem;\n  border: 1px solid #cccccc;\n  color: #555555;\n  font-size: 0.62rem;\n  font-weight: 700;\n  line-height: 1.2;\n}\n\n.combined-notes {\n  margin-top: 4rem;\n  padding-top: 1.5rem;\n  border-top: 1px solid #111111;\n}\n\n.combined-notes > h3 {\n  margin: 0 0 1.2rem;\n  font-size: 1.4rem;\n  text-transform: uppercase;\n}\n\n.parallax-section {\n  position: relative;\n  min-height: 440px;\n  background: #111111;\n  overflow: hidden;\n}\n\n.archive-video {\n  position: absolute;\n  inset: 0;\n  width: 100%;\n  height: 100%;\n  object-fit: cover;\n  filter: grayscale(1) contrast(1.2);\n}\n\n.parallax-overlay {\n  position: absolute;\n  inset: 0;\n  background: rgba(0, 0, 0, 0.42);\n}\n\n.parallax-copy {\n  position: relative;\n  z-index: 1;\n  min-height: 440px;\n  display: flex;\n  flex-direction: column;\n  align-items: flex-start;\n  justify-content: center;\n  color: #f9fafb;\n}\n\n.parallax-copy h2,\n.light {\n  color: #f9fafb;\n}\n\n.parallax-copy p:last-child {\n  max-width: 580px;\n  font-size: 1.04rem;\n  color: rgba(249, 250, 251, 0.82);\n}\n\n.media-grid {\n  display: grid;\n  grid-template-columns: 1.2fr 0.8fr;\n  gap: 2.25rem;\n  align-items: center;\n}\n\n.video-column video {\n  width: 100%;\n  border: 1px solid #111111;\n  border-radius: 0;\n  box-shadow: none;\n}\n\n.motion-frame {\n  position: relative;\n  overflow: hidden;\n  background: #111111;\n  border: 1px solid #111111;\n}\n\n.motion-frame::after {\n  content: \"\";\n  position: absolute;\n  inset: 0;\n  pointer-events: none;\n  background: repeating-linear-gradient(\n    0deg,\n    rgba(255, 255, 255, 0.06) 0,\n    rgba(255, 255, 255, 0.06) 1px,\n    transparent 1px,\n    transparent 4px\n  );\n  mix-blend-mode: screen;\n  opacity: 0.35;\n  animation: scan 8s linear infinite;\n}\n\n.motion-frame video {\n  display: block;\n  width: 100%;\n  aspect-ratio: 16 / 9;\n  object-fit: cover;\n  filter: grayscale(1) contrast(1.15);\n}\n\n.notes-shell {\n  max-width: 760px;\n}\n\n.motion-label {\n  position: absolute;\n  right: 0.75rem;\n  bottom: 0.65rem;\n  z-index: 1;\n  color: #ffffff;\n  font-size: 0.6rem;\n  font-weight: 800;\n  letter-spacing: 0.12em;\n}\n\n@keyframes scan {\n  from {\n    transform: translateY(-12%);\n  }\n\n  to {\n    transform: translateY(12%);\n  }\n}\n\n.live-frame {\n  width: 100%;\n  aspect-ratio: 16 / 9;\n  border: 1px solid #111111;\n  background: #111111;\n}\n\n.live-frame iframe {\n  width: 100%;\n  height: 100%;\n  border: 0;\n}\n\n.html5-video {\n  margin-top: 1.5rem;\n}\n\n.html5-video video {\n  max-height: 180px;\n  object-fit: cover;\n}\n\n.video-label {\n  margin: 0 0 0.5rem;\n  color: #777777;\n  font-size: 0.62rem;\n  font-weight: 800;\n  letter-spacing: 0.1em;\n  text-transform: uppercase;\n}\n\n.modal-cards {\n  display: grid;\n  gap: 1.1rem;\n  margin-top: 1.6rem;\n}\n\n.mini-card {\n  background: #ffffff;\n  border: 1px solid #111111;\n  border-radius: 0;\n  padding: 1rem;\n}\n\n.mini-card h3 {\n  margin: 0 0 1rem;\n  font-size: 1rem;\n  text-transform: uppercase;\n}\n\n.open-modal {\n  border: 1px solid #111111;\n  border-radius: 0;\n  background: #ffffff;\n  color: #111111;\n  padding: 0.55rem 0.75rem;\n  cursor: pointer;\n  font-size: 0.65rem;\n  font-weight: 800;\n  letter-spacing: 0.08em;\n}\n\n.footer-section {\n  background: #111827;\n  color: #f9fafb;\n  padding-bottom: 1.5rem;\n}\n\n.contact-shell {\n  display: flex;\n  align-items: center;\n  justify-content: space-between;\n  gap: 1rem;\n  padding: 2rem 0 0;\n}\n\n.contact-copy h2 {\n  color: #f9fafb;\n  margin: 0;\n}\n\n.site-footer {\n  background: #111827;\n  border-top: 1px solid rgba(255, 255, 255, 0.08);\n}\n\n.footer-inner {\n  @include section-shell;\n  display: flex;\n  align-items: center;\n  justify-content: space-between;\n  padding: 1.5rem 0;\n  color: rgba(249, 250, 251, 0.8);\n}\n\n.socials {\n  display: flex;\n  align-items: center;\n  gap: 0.8rem;\n}\n\n.socials a {\n  @include flex-center;\n  width: 2.5rem;\n  height: 2.5rem;\n  border-radius: 50%;\n  background: rgba(255, 255, 255, 0.06);\n  color: #f9fafb;\n  transition: transform 0.2s ease, background 0.2s ease, box-shadow 0.2s ease;\n\n  &:hover {\n    transform: translateY(-2px);\n    background: rgba(255, 255, 255, 0.12);\n    box-shadow: 0 0 20px rgba(255, 255, 255, 0.12);\n  }\n}\n\n.modal-overlay {\n  position: fixed;\n  inset: 0;\n  @include flex-center;\n  padding: 2rem;\n  background: rgba(17, 24, 39, 0.7);\n  opacity: 0;\n  visibility: hidden;\n  transition: opacity 0.2s ease, visibility 0.2s ease;\n  z-index: 100;\n}\n\n.modal-overlay.open {\n  opacity: 1;\n  visibility: visible;\n}\n\n.modal-content {\n  position: relative;\n  width: min(500px, 100%);\n  background: #ffffff;\n  color: #111827;\n  border-radius: 18px;\n  padding: 2rem 1.5rem 1.5rem;\n  box-shadow: 0 18px 32px rgba(17, 24, 39, 0.12);\n}\n\n.modal-content h3 {\n  margin-top: 0;\n  font-size: 2rem;\n}\n\n.modal-content p {\n  margin-bottom: 0;\n  color: #4b5563;\n}\n\n.modal-close {\n  position: absolute;\n  top: 1rem;\n  right: 1rem;\n  width: 2.5rem;\n  height: 2.5rem;\n  border: 0;\n  border-radius: 50%;\n  background: rgba(17, 24, 39, 0.08);\n  color: #111827;\n  cursor: pointer;\n}\n\n@keyframes fadeUp {\n  from {\n    opacity: 0;\n    transform: translateY(18px);\n  }\n\n  to {\n    opacity: 1;\n    transform: translateY(0);\n  }\n}\n\n@media (max-width: 930px) {\n  .hero-grid,\n  .about-grid,\n  .media-grid,\n  .services-grid {\n    grid-template-columns: 1fr;\n  }\n\n  .profile-card {\n    margin: 0 auto;\n  }\n\n  .contact-shell {\n    flex-direction: column;\n    align-items: flex-start;\n  }\n\n  .news-feed {\n    grid-template-columns: repeat(2, minmax(0, 1fr));\n  }\n}\n\n@media (max-width: 720px) {\n  .navbar {\n    padding: 0 1rem;\n    min-height: 82px;\n    flex-direction: column;\n    justify-content: center;\n    gap: 0.6rem;\n  }\n\n  .site-header.scrolled .navbar {\n    min-height: 74px;\n  }\n\n  .nav-links {\n    gap: 0.9rem;\n    flex-wrap: wrap;\n    justify-content: center;\n  }\n\n  .nav-link {\n    font-size: 0.78rem;\n  }\n\n  .section {\n    padding: 5.5rem 0;\n  }\n\n  .hero h1 {\n    font-size: 2.8rem;\n  }\n\n  .profile-card img {\n    height: 360px;\n  }\n\n  .slide img {\n    height: 300px;\n  }\n\n  .carousel {\n    grid-template-columns: 1fr;\n  }\n\n  .carousel-btn {\n    display: none;\n  }\n\n  .feed-heading {\n    align-items: flex-start;\n    flex-direction: column;\n    gap: 0;\n  }\n\n  .feed-status {\n    padding-bottom: 0.8rem;\n  }\n\n  .news-feed {\n    grid-template-columns: 1fr;\n  }\n\n  .footer-inner {\n    flex-direction: column;\n    align-items: flex-start;\n    gap: 0.8rem;\n  }\n}\n\n"],"sourceRoot":""}]);
// Exports
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (___CSS_LOADER_EXPORT___);


/***/ },

/***/ "./index.html"
/*!********************!*\
  !*** ./index.html ***!
  \********************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
// Module
var code = "<!DOCTYPE html>\n<html lang=\"en\">\n  <head>\n    <meta charset=\"utf-8\" />\n    <meta http-equiv=\"x-ua-compatible\" content=\"ie=edge\" />\n    <meta name=\"viewport\" content=\"width=device-width, initial-scale=1.0\" />\n    <meta name=\"description\" content=\"Danny Perez is a Computer Science and Economics student, DJ, and curious person.\" />\n    <title>Danny Perez</title>\n    <link rel=\"preconnect\" href=\"https://fonts.googleapis.com\" />\n    <link rel=\"preconnect\" href=\"https://fonts.gstatic.com\" crossorigin />\n    <link href=\"https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800;900&display=swap\" rel=\"stylesheet\" />\n    <link rel=\"stylesheet\" href=\"https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.2/css/all.min.css\" crossorigin=\"anonymous\" referrerpolicy=\"no-referrer\" />\n  </head>\n  <body>\n    <header class=\"site-header\">\n      <nav class=\"navbar\" aria-label=\"Main navigation\">\n        <div class=\"nav-brand\">DANNY PEREZ</div>\n        <div class=\"nav-links\">\n          <a href=\"#home\" class=\"nav-link active\">INDEX</a>\n          <a href=\"#about\" class=\"nav-link\">ABOUT</a>\n          <a href=\"#work\" class=\"nav-link\">ARCHIVE</a>\n          <a href=\"#contact\" class=\"nav-link\">CONTACT</a>\n        </div>\n      </nav>\n    </header>\n\n    <main>\n      <section id=\"home\" class=\"section hero\">\n        <div class=\"section-shell hero-grid\">\n          <div class=\"hero-copy\">\n            <p class=\"eyebrow\">STUDENT / DJ / CURIOUS PERSON</p>\n            <h1>DANNY<br />PEREZ</h1>\n            <p class=\"lead\">\n              CS and Economics student at UIUC. I make music, follow markets, and think about a lot of things.\n            </p>\n            <div class=\"cta-group\">\n              <a href=\"#work\" class=\"btn btn-primary\">ARCHIVE <i class=\"fa-solid fa-arrow-down\"></i></a>\n              <a href=\"#contact\" class=\"btn btn-secondary\">CONTACT <i class=\"fa-solid fa-arrow-right\"></i></a>\n            </div>\n          </div>\n\n          <div class=\"profile-card\" aria-label=\"Danny Perez profile card\">\n            <img src=\"https://dqnnyperez.github.io/mp0/assets/danny.jpeg\" alt=\"Danny Perez portrait\" />\n            <div class=\"profile-meta\">\n              <h2>Danny Perez</h2>\n            </div>\n          </div>\n        </div>\n      </section>\n\n      <section id=\"about\" class=\"section alt-section\">\n        <div class=\"section-shell\">\n          <p class=\"section-tag\">About</p>\n          <h2>A few things about me.</h2>\n          <div class=\"about-grid\">\n            <div class=\"about-copy\">\n              <p>\n                I’m Danny, a rising senior at the University of Illinois Urbana-Champaign studying Computer Science and Economics.\n              </p>\n              <p>\n                Outside of school, I like poker, chess, philosophy, macro trading, and DJing.\n              </p>\n            </div>\n          </div>\n        </div>\n      </section>\n\n      <section id=\"work\" class=\"section showcase-section\">\n        <div class=\"section-shell\">\n          <p class=\"section-tag\">Archive / 01</p>\n          <div class=\"carousel\" aria-label=\"Danny Perez archive carousel\">\n            <button class=\"carousel-btn prev\" aria-label=\"Previous slide\">\n              <i class=\"fa-solid fa-chevron-left\"></i>\n            </button>\n            <div class=\"carousel-track\">\n              <article class=\"slide active\">\n                <img src=\"https://images.unsplash.com/photo-1516321165247-4aa89a48be28?auto=format&fit=crop&w=1200&q=80\" alt=\"Laptop and notebook on a desk\" />\n                <div class=\"slide-copy\">\n                  <span>School / 01</span>\n                  <h3>School.</h3>\n                  <p>Computer Science and Economics at UIUC.</p>\n                </div>\n              </article>\n              <article class=\"slide\">\n                <img src=\"https://images.unsplash.com/photo-1526304640581-d334cdbbf45e?auto=format&fit=crop&w=1200&q=80\" alt=\"Market chart on a screen\" />\n                <div class=\"slide-copy\">\n                  <span>Markets / 02</span>\n                  <h3>Markets.</h3>\n                  <p>Interested in macro, probability, and how people make decisions with incomplete information.</p>\n                </div>\n              </article>\n              <article class=\"slide\">\n                <img src=\"https://images.unsplash.com/photo-1511379938547-c1f69419868d?auto=format&fit=crop&w=1200&q=80\" alt=\"Music and DJ setup\" />\n                <div class=\"slide-copy\">\n                  <span>Music / 03</span>\n                  <h3>Music.</h3>\n                  <p>Poker, chess, philosophy, macro, and music.</p>\n                </div>\n              </article>\n            </div>\n            <button class=\"carousel-btn next\" aria-label=\"Next slide\">\n              <i class=\"fa-solid fa-chevron-right\"></i>\n            </button>\n          </div>\n        </div>\n      </section>\n\n      <section id=\"services\" class=\"section services-section\">\n        <div class=\"section-shell\">\n          <div class=\"services-grid\">\n            <article class=\"service-card\">\n              <i class=\"fa-solid fa-graduation-cap\"></i>\n              <h3>School</h3>\n              <p>Computer Science and Economics at UIUC.</p>\n            </article>\n            <article class=\"service-card\">\n              <i class=\"fa-solid fa-arrow-trend-up\"></i>\n              <h3>Markets</h3>\n              <p>Interested in macro, probability, and how people make decisions with incomplete information.</p>\n            </article>\n            <article class=\"service-card\">\n              <i class=\"fa-solid fa-headphones\"></i>\n              <h3>Music</h3>\n              <p>Poker, chess, philosophy, macro, and music.</p>\n            </article>\n          </div>\n          <div class=\"combined-notes\">\n            <div class=\"modal-cards\">\n              <article class=\"mini-card\">\n                <h3>Probability</h3>\n                <button class=\"open-modal\" data-modal=\"modal-1\">Read more</button>\n              </article>\n              <article class=\"mini-card\">\n                <h3>Pressure</h3>\n                <button class=\"open-modal\" data-modal=\"modal-2\">Read more</button>\n              </article>\n              <article class=\"mini-card\">\n                <h3>Curiosity</h3>\n                <button class=\"open-modal\" data-modal=\"modal-3\">Read more</button>\n              </article>\n            </div>\n          </div>\n        </div>\n      </section>\n\n      <section id=\"gallery\" class=\"section parallax-section\">\n        <video class=\"archive-video\" autoplay muted loop playsinline poster=\"https://images.unsplash.com/photo-1516280440614-37939bbacd81?auto=format&fit=crop&w=1600&q=80\">\n          <source src=\"https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.mp4\" type=\"video/mp4\" />\n        </video>\n        <div class=\"parallax-overlay\"></div>\n        <div class=\"section-shell parallax-copy\">\n          <p class=\"section-tag light\">Archive / 03</p>\n          <h2>Keep asking questions.</h2>\n          <p>\n            I like things that make me slow down and look again.\n          </p>\n        </div>\n      </section>\n\n      <section id=\"contact\" class=\"section footer-section\">\n        <div class=\"section-shell contact-shell\">\n          <div class=\"contact-copy\">\n            <p class=\"section-tag\">Let’s connect</p>\n            <h2>Say hi.</h2>\n          </div>\n          <div class=\"cta-group compact\">\n            <a href=\"https://github.com/dqnnyperez\" class=\"btn btn-primary\" target=\"_blank\" rel=\"noreferrer\">GitHub</a>\n            <a href=\"https://www.linkedin.com/in/dqnnyperez\" class=\"btn btn-secondary\" target=\"_blank\" rel=\"noreferrer\">LinkedIn</a>\n          </div>\n        </div>\n      </section>\n    </main>\n\n    <footer class=\"site-footer\">\n      <div class=\"footer-inner\">\n        <p>© 2026 Danny Perez</p>\n        <div class=\"socials\" aria-label=\"Social media links\">\n          <a href=\"https://github.com/dqnnyperez\" aria-label=\"GitHub\" target=\"_blank\" rel=\"noreferrer\"><i class=\"fa-brands fa-github\"></i></a>\n          <a href=\"https://www.linkedin.com/in/dqnnyperez\" aria-label=\"LinkedIn\" target=\"_blank\" rel=\"noreferrer\"><i class=\"fa-brands fa-linkedin-in\"></i></a>\n          <a href=\"https://twitter.com/g32\" aria-label=\"Twitter\" target=\"_blank\" rel=\"noreferrer\"><i class=\"fa-brands fa-x-twitter\"></i></a>\n          <a href=\"https://soundcloud.com/moscow\" aria-label=\"SoundCloud\" target=\"_blank\" rel=\"noreferrer\"><i class=\"fa-brands fa-soundcloud\"></i></a>\n        </div>\n      </div>\n    </footer>\n\n    <div class=\"modal-overlay\" id=\"modal-1\" aria-hidden=\"true\">\n      <div class=\"modal-content\" role=\"dialog\" aria-modal=\"true\" aria-labelledby=\"modal-title-1\">\n        <button class=\"modal-close\" aria-label=\"Close modal\"><i class=\"fa-solid fa-xmark\"></i></button>\n        <h3 id=\"modal-title-1\">Probability</h3>\n        <p>Markets, poker, and strategy all come down to the same thing: making the best decision with incomplete information.</p>\n      </div>\n    </div>\n\n    <div class=\"modal-overlay\" id=\"modal-2\" aria-hidden=\"true\">\n      <div class=\"modal-content\" role=\"dialog\" aria-modal=\"true\" aria-labelledby=\"modal-title-2\">\n        <button class=\"modal-close\" aria-label=\"Close modal\"><i class=\"fa-solid fa-xmark\"></i></button>\n        <h3 id=\"modal-title-2\">Pressure</h3>\n        <p>When the stakes go up, I think the real skill is staying calm enough to process what actually matters.</p>\n      </div>\n    </div>\n\n    <div class=\"modal-overlay\" id=\"modal-3\" aria-hidden=\"true\">\n      <div class=\"modal-content\" role=\"dialog\" aria-modal=\"true\" aria-labelledby=\"modal-title-3\">\n        <button class=\"modal-close\" aria-label=\"Close modal\"><i class=\"fa-solid fa-xmark\"></i></button>\n        <h3 id=\"modal-title-3\">Curiosity</h3>\n        <p>Philosophy, music, and games all push me to think more carefully about people, systems, and the way the world works.</p>\n      </div>\n    </div>\n  </body>\n</html>\n";
// Exports
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (code);

/***/ },

/***/ "./css/main.scss"
/*!***********************!*\
  !*** ./css/main.scss ***!
  \***********************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! !../../node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js */ "../node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! !../../node_modules/style-loader/dist/runtime/styleDomAPI.js */ "../node_modules/style-loader/dist/runtime/styleDomAPI.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! !../../node_modules/style-loader/dist/runtime/insertBySelector.js */ "../node_modules/style-loader/dist/runtime/insertBySelector.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! !../../node_modules/style-loader/dist/runtime/setAttributesWithoutAttributes.js */ "../node_modules/style-loader/dist/runtime/setAttributesWithoutAttributes.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! !../../node_modules/style-loader/dist/runtime/insertStyleElement.js */ "../node_modules/style-loader/dist/runtime/insertStyleElement.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! !../../node_modules/style-loader/dist/runtime/styleTagTransform.js */ "../node_modules/style-loader/dist/runtime/styleTagTransform.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var _node_modules_css_loader_dist_cjs_js_node_modules_postcss_loader_dist_cjs_js_node_modules_sass_loader_dist_cjs_js_main_scss__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! !!../../node_modules/css-loader/dist/cjs.js!../../node_modules/postcss-loader/dist/cjs.js!../../node_modules/sass-loader/dist/cjs.js!./main.scss */ "../node_modules/css-loader/dist/cjs.js!../node_modules/postcss-loader/dist/cjs.js!../node_modules/sass-loader/dist/cjs.js!./css/main.scss");

      
      
      
      
      
      
      
      
      

var options = {};

options.styleTagTransform = (_node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5___default());
options.setAttributes = (_node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3___default());

      options.insert = _node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2___default().bind(null, "head");
    
options.domAPI = (_node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1___default());
options.insertStyleElement = (_node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4___default());

var update = _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default()(_node_modules_css_loader_dist_cjs_js_node_modules_postcss_loader_dist_cjs_js_node_modules_sass_loader_dist_cjs_js_main_scss__WEBPACK_IMPORTED_MODULE_6__["default"], options);




       /* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_node_modules_css_loader_dist_cjs_js_node_modules_postcss_loader_dist_cjs_js_node_modules_sass_loader_dist_cjs_js_main_scss__WEBPACK_IMPORTED_MODULE_6__["default"] && _node_modules_css_loader_dist_cjs_js_node_modules_postcss_loader_dist_cjs_js_node_modules_sass_loader_dist_cjs_js_main_scss__WEBPACK_IMPORTED_MODULE_6__["default"].locals ? _node_modules_css_loader_dist_cjs_js_node_modules_postcss_loader_dist_cjs_js_node_modules_sass_loader_dist_cjs_js_main_scss__WEBPACK_IMPORTED_MODULE_6__["default"].locals : undefined);


/***/ },

/***/ "../node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js"
/*!*****************************************************************************!*\
  !*** ../node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js ***!
  \*****************************************************************************/
(module) {

"use strict";


var stylesInDOM = [];
function getIndexByIdentifier(identifier) {
  var result = -1;
  for (var i = 0; i < stylesInDOM.length; i++) {
    if (stylesInDOM[i].identifier === identifier) {
      result = i;
      break;
    }
  }
  return result;
}
function modulesToDom(list, options) {
  var idCountMap = {};
  var identifiers = [];
  for (var i = 0; i < list.length; i++) {
    var item = list[i];
    var id = options.base ? item[0] + options.base : item[0];
    var count = idCountMap[id] || 0;
    var identifier = "".concat(id, " ").concat(count);
    idCountMap[id] = count + 1;
    var indexByIdentifier = getIndexByIdentifier(identifier);
    var obj = {
      css: item[1],
      media: item[2],
      sourceMap: item[3],
      supports: item[4],
      layer: item[5]
    };
    if (indexByIdentifier !== -1) {
      stylesInDOM[indexByIdentifier].references++;
      stylesInDOM[indexByIdentifier].updater(obj);
    } else {
      var updater = addElementStyle(obj, options);
      options.byIndex = i;
      stylesInDOM.splice(i, 0, {
        identifier: identifier,
        updater: updater,
        references: 1
      });
    }
    identifiers.push(identifier);
  }
  return identifiers;
}
function addElementStyle(obj, options) {
  var api = options.domAPI(options);
  api.update(obj);
  var updater = function updater(newObj) {
    if (newObj) {
      if (newObj.css === obj.css && newObj.media === obj.media && newObj.sourceMap === obj.sourceMap && newObj.supports === obj.supports && newObj.layer === obj.layer) {
        return;
      }
      api.update(obj = newObj);
    } else {
      api.remove();
    }
  };
  return updater;
}
module.exports = function (list, options) {
  options = options || {};
  list = list || [];
  var lastIdentifiers = modulesToDom(list, options);
  return function update(newList) {
    newList = newList || [];
    for (var i = 0; i < lastIdentifiers.length; i++) {
      var identifier = lastIdentifiers[i];
      var index = getIndexByIdentifier(identifier);
      stylesInDOM[index].references--;
    }
    var newLastIdentifiers = modulesToDom(newList, options);
    for (var _i = 0; _i < lastIdentifiers.length; _i++) {
      var _identifier = lastIdentifiers[_i];
      var _index = getIndexByIdentifier(_identifier);
      if (stylesInDOM[_index].references === 0) {
        stylesInDOM[_index].updater();
        stylesInDOM.splice(_index, 1);
      }
    }
    lastIdentifiers = newLastIdentifiers;
  };
};

/***/ },

/***/ "../node_modules/style-loader/dist/runtime/insertBySelector.js"
/*!*********************************************************************!*\
  !*** ../node_modules/style-loader/dist/runtime/insertBySelector.js ***!
  \*********************************************************************/
(module) {

"use strict";


var memo = {};

/* istanbul ignore next  */
function getTarget(target) {
  if (typeof memo[target] === "undefined") {
    var styleTarget = document.querySelector(target);

    // Special case to return head of iframe instead of iframe itself
    if (window.HTMLIFrameElement && styleTarget instanceof window.HTMLIFrameElement) {
      try {
        // This will throw an exception if access to iframe is blocked
        // due to cross-origin restrictions
        styleTarget = styleTarget.contentDocument.head;
      } catch (e) {
        // istanbul ignore next
        styleTarget = null;
      }
    }
    memo[target] = styleTarget;
  }
  return memo[target];
}

/* istanbul ignore next  */
function insertBySelector(insert, style) {
  var target = getTarget(insert);
  if (!target) {
    throw new Error("Couldn't find a style target. This probably means that the value for the 'insert' parameter is invalid.");
  }
  target.appendChild(style);
}
module.exports = insertBySelector;

/***/ },

/***/ "../node_modules/style-loader/dist/runtime/insertStyleElement.js"
/*!***********************************************************************!*\
  !*** ../node_modules/style-loader/dist/runtime/insertStyleElement.js ***!
  \***********************************************************************/
(module) {

"use strict";


/* istanbul ignore next  */
function insertStyleElement(options) {
  var element = document.createElement("style");
  options.setAttributes(element, options.attributes);
  options.insert(element, options.options);
  return element;
}
module.exports = insertStyleElement;

/***/ },

/***/ "../node_modules/style-loader/dist/runtime/setAttributesWithoutAttributes.js"
/*!***********************************************************************************!*\
  !*** ../node_modules/style-loader/dist/runtime/setAttributesWithoutAttributes.js ***!
  \***********************************************************************************/
(module, __unused_webpack_exports, __webpack_require__) {

"use strict";


/* istanbul ignore next  */
function setAttributesWithoutAttributes(styleElement) {
  var nonce =  true ? __webpack_require__.nc : 0;
  if (nonce) {
    styleElement.setAttribute("nonce", nonce);
  }
}
module.exports = setAttributesWithoutAttributes;

/***/ },

/***/ "../node_modules/style-loader/dist/runtime/styleDomAPI.js"
/*!****************************************************************!*\
  !*** ../node_modules/style-loader/dist/runtime/styleDomAPI.js ***!
  \****************************************************************/
(module) {

"use strict";


/* istanbul ignore next  */
function apply(styleElement, options, obj) {
  var css = "";
  if (obj.supports) {
    css += "@supports (".concat(obj.supports, ") {");
  }
  if (obj.media) {
    css += "@media ".concat(obj.media, " {");
  }
  var needLayer = typeof obj.layer !== "undefined";
  if (needLayer) {
    css += "@layer".concat(obj.layer.length > 0 ? " ".concat(obj.layer) : "", " {");
  }
  css += obj.css;
  if (needLayer) {
    css += "}";
  }
  if (obj.media) {
    css += "}";
  }
  if (obj.supports) {
    css += "}";
  }
  var sourceMap = obj.sourceMap;
  if (sourceMap && typeof btoa !== "undefined") {
    css += "\n/*# sourceMappingURL=data:application/json;base64,".concat(btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap)))), " */");
  }

  // For old IE
  /* istanbul ignore if  */
  options.styleTagTransform(css, styleElement, options.options);
}
function removeStyleElement(styleElement) {
  // istanbul ignore if
  if (styleElement.parentNode === null) {
    return false;
  }
  styleElement.parentNode.removeChild(styleElement);
}

/* istanbul ignore next  */
function domAPI(options) {
  if (typeof document === "undefined") {
    return {
      update: function update() {},
      remove: function remove() {}
    };
  }
  var styleElement = options.insertStyleElement(options);
  return {
    update: function update(obj) {
      apply(styleElement, options, obj);
    },
    remove: function remove() {
      removeStyleElement(styleElement);
    }
  };
}
module.exports = domAPI;

/***/ },

/***/ "../node_modules/style-loader/dist/runtime/styleTagTransform.js"
/*!**********************************************************************!*\
  !*** ../node_modules/style-loader/dist/runtime/styleTagTransform.js ***!
  \**********************************************************************/
(module) {

"use strict";


/* istanbul ignore next  */
function styleTagTransform(css, styleElement) {
  if (styleElement.styleSheet) {
    styleElement.styleSheet.cssText = css;
  } else {
    while (styleElement.firstChild) {
      styleElement.removeChild(styleElement.firstChild);
    }
    styleElement.appendChild(document.createTextNode(css));
  }
}
module.exports = styleTagTransform;

/***/ }

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	const __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		const cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		const module = __webpack_module_cache__[moduleId] = {
/******/ 			id: moduleId,
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		if (!(moduleId in __webpack_modules__)) {
/******/ 			delete __webpack_module_cache__[moduleId];
/******/ 			const e = new Error("Cannot find module '" + moduleId + "'");
/******/ 			e.code = 'MODULE_NOT_FOUND';
/******/ 			throw e;
/******/ 		}
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/compat get default export */
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = (module) => {
/******/ 		const getter = module && module.__esModule ?
/******/ 			() => (module['default']) :
/******/ 			() => (module);
/******/ 		__webpack_require__.d(getter, { a: getter });
/******/ 		return getter;
/******/ 	};
/******/ 	
/******/ 	/* webpack/runtime/define property getters */
/******/ 	// define getter/value functions for harmony exports
/******/ 	__webpack_require__.d = (exports, definition) => {
/******/ 		for(var key in definition) {
/******/ 			if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 				Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 			}
/******/ 		}
/******/ 	};
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop));
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = (exports) => {
/******/ 		Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/ 	
/******/ 	/* webpack/runtime/nonce */
/******/ 	__webpack_require__.nc = undefined;
/******/ 	
/************************************************************************/
let __webpack_exports__ = {};
// This entry needs to be wrapped in an IIFE because it needs to be in strict mode.
(() => {
"use strict";
/*!******************!*\
  !*** ./index.js ***!
  \******************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _index_html__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./index.html */ "./index.html");
/* harmony import */ var _css_main_scss__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./css/main.scss */ "./css/main.scss");
/* harmony import */ var _js_main_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./js/main.js */ "./js/main.js");
/* harmony import */ var _js_main_js__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_js_main_js__WEBPACK_IMPORTED_MODULE_2__);
/*
 * This is the main entry point for Webpack, the compiler & dependency loader.
 * All files that are necessary for your web page and need to be 'watched' for changes should be included here!
 */

// HTML Files


// Stylesheets


// Scripts

})();

/******/ })()
;
//# sourceMappingURL=bundle.js.map