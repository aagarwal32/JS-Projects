import "./styles.css"
import { displayHomeContent } from "./home.js";
import { displayMenuContent } from "./menu.js";

const contentBox = document.querySelector("#content");
const homeTab = document.querySelector("#home-tab");
const menuTab = document.querySelector("#menu-tab");

homeTab.addEventListener('click', () => {
    contentBox.replaceChildren();
    displayHomeContent();
});

menuTab.addEventListener('click', () => {
    contentBox.replaceChildren();
    displayMenuContent();
});

// load home on initial page load
displayHomeContent();
