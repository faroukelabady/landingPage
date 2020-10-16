/**
 *
 * Manipulating the DOM exercise.
 * Exercise programmatically builds navigation,
 * scrolls to anchors from navigation,
 * and highlights section in viewport upon scrolling.
 *
 * Dependencies: None
 *
 * JS Version: ES2015/ES6
 *
 * JS Standard: ESlint
 *
 */

/**
 * Define Global Variables
 *
 */

let previousSelection = document.getElementById("section1");
let isScrolling;
/**
 * End Global Variables
 * Start Helper Functions
 *
 */

function createAnchorElement(id, text) {
  const anchor = document.createElement("a");
  anchor.classList.add("no__style");
  anchor.href = `#${id}`;
  anchor.textContent = text;
  return anchor;
}

function createListItemElement(anchorElement) {
  const listItem = document.createElement("li");
  listItem.appendChild(anchorElement);
  listItem.classList.add("menu__link");
  return listItem;
}

function scrollToSection(event) {
  event.preventDefault();
  const sectionname = event.target.textContent;
  const sectionElement = document.querySelector(`[data-nav="${sectionname}"]`);
  const anchorElement = document.querySelector(
    `a[href="#${sectionElement.id}"]`
  );
  const previous = document.querySelector(`a[href="#${previousSelection.id}"]`);
  if (previous.parentElement.classList.contains("selected")) {
    previous.parentElement.classList.toggle("selected");
  }

  anchorElement.parentElement.classList.toggle("selected");

  previousSelection.classList.toggle("active");
  sectionElement.classList.toggle("active");
  sectionElement.scrollIntoView({ behavior: "smooth", block: "end" });
  previousSelection = sectionElement;
}

function hideNavBarOnIdle() {
  setTimeout(() => {
    const navBar = document.getElementById("navbarMenu");
    navBar.hidden = true;
  }, 2000);
}

/**
 * End Helper Functions
 * Begin Main Functions
 *
 */

function showNavBarOnScroll() {
  const body = document.getElementById("content");
  window.addEventListener("scroll", () => {
    const navBar = document.getElementById("navbarMenu");
    window.clearTimeout(isScrolling);
    if (navBar.hidden) {
      navBar.hidden = false;
    }
    isScrolling = setTimeout(hideNavBarOnIdle, 50);
  });
}

// build the nav
function buildNavigationMenu() {
  const fragment = document.createDocumentFragment();
  const sections = document.getElementsByTagName("section");
  const navBarList = document.getElementById("navbar__list");
  navBarList.addEventListener("click", scrollToSection);
  for (let section of sections) {
    const anchor = createAnchorElement(
      section.id,
      section.getAttribute("data-nav")
    );
    const listItem = createListItemElement(anchor);
    fragment.appendChild(listItem);
  }

  let ul = document.getElementById("navbar__list");
  ul.appendChild(fragment);
  hideNavBarOnIdle();
}

/**
 * End Main Functions
 *
 */
buildNavigationMenu();
showNavBarOnScroll();
