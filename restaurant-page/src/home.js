// exporting function for homepage content
export function displayHomeContent() {
    const contentBox = document.querySelector("#content");

    const seperator = document.createElement("hr");

    const heading = document.createElement("div");
    heading.classList.add("heading");
    heading.textContent = "The Tastiest Burgers in your Area!";

    const bodyText = document.createElement("div");
    bodyText.classList.add("body-text");
    bodyText.textContent = "Take a bite into our handcrafted signature golden brown buns, tasting \
                            the juicy patty or the pickles that add a bit of tang. This is flavor \
                            you just cannot resist. Try it now at your closest BurgerBun restaurant!"
    
    contentBox.appendChild(seperator);
    contentBox.appendChild(heading);
    contentBox.appendChild(bodyText);
}

