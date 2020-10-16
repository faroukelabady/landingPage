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

/**
 * End Global Variables
 * Start Helper Functions
 *
 */

function createAnchorElement(id, text) {
  const anchor = document.createElement("a");
  anchor.classList.add('nostyle');
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
  previousSelection.classList.toggle("active");
  sectionElement.classList.toggle("active");
  sectionElement.scrollIntoView({ behavior: "smooth", block: "end" });
  previousSelection = sectionElement;
}

/**
 * End Helper Functions
 * Begin Main Functions
 *
 */

// build the nav
function buildNavigationMenu() {
  const fragment = document.createDocumentFragment();
  const sections = document.getElementsByTagName("section");
  document.getElementById('navbar__list').addEventListener("click", scrollToSection);
  for (let section of sections) {
    const anchor = createAnchorElement(section.id, section.getAttribute("data-nav"));
    const listItem = createListItemElement(anchor);
    fragment.appendChild(listItem);
  }

  let ul = document.getElementById("navbar__list");
  ul.appendChild(fragment);
}

/**
 * End Main Functions
 * 
 */
buildNavigationMenu();