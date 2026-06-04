import menuIconImg from "./images/menu.png.webp"

// exporting function to display menu page
export function displayMenuContent() {
    const contentBox = document.querySelector("#content");
    
    const seperator = document.createElement("hr");

    const heading = document.createElement("div");
    heading.classList.add("heading");
    heading.textContent = "BurgerBun Menu";

    const frontPageImg = document.createElement("img");
    frontPageImg.src = menuIconImg;

    const bodyText = document.createElement("div");
    bodyText.classList.add("body-text", "menu-items");
    bodyText.textContent = "$15 BurgerBun Classic\n" +
                            "$20 BurgerBun Double\n" +
                            "$7 Wedge-cut Fries\n" +
                            "$12 Chicken Wings\n" +
                            "$3 Fountain Drinks\n" +
                            "$5 Vanilla Ice Cream";
    
    contentBox.appendChild(seperator);
    contentBox.appendChild(heading);
    contentBox.appendChild(frontPageImg);
    contentBox.appendChild(bodyText);
}