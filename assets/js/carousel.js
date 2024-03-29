// ====== carousel

const root = document.documentElement;
const marqueeElementsDisplayed = getComputedStyle(root).getPropertyValue("--carousel-elements-displayed");
const marqueeContent = document.querySelector("ul.ud-carousel-content");

root.style.setProperty("--carousel-elements", marqueeContent.children.length);

for(let i=0; i<marqueeElementsDisplayed; i++) {
  marqueeContent.appendChild(marqueeContent.children[i].cloneNode(true));
}