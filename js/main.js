import scrapedData from "./scraped-text-and-links.js";

// Creat under water - grid. The data is scraped from Haaretz site.
let underwaterGrid = document.querySelector("main.underwater-grid");

function createUnderWaterGrid(location, data) {
  for (let i = 0; i < data.depthNums.length; i++) {
    // console.log(i);
    let gridItem = document.createElement("section"); // Contain: figure,article.
    let figure = document.createElement("figure"); // Contain: img.
    let img = document.createElement("img");
    let article = document.createElement("article"); // Contain: h1,title,text.
    let h1 = document.createElement("h1");
    let title = document.createElement("div");
    let text = document.createElement("div");

    gridItem.className = "grid-item";
    title.className = "title";
    text.className = "text";
    img.loading = "lazy";
    figure.setAttribute("style", `order: ${i % 2};`);

    img.src = data.imgLinks[i * 2];
    img.alt = data.imgLinks[i * 2] ? data.titles[i] : "";
    h1.innerText = data.depthNums[i];
    title.innerText = data.titles[i];
    text.innerText = data.texts[i];

    figure.append(img);
    article.append(h1, title, text);
    gridItem.append(figure, article);
    location.append(gridItem);
  }
}
createUnderWaterGrid(underwaterGrid, scrapedData);

// Animate grid item (move up).
let gridItems = document.getElementsByClassName("grid-item");
console.log(gridItems);
let options = {
  root: null,
  rootMargin: "500px",
  threshold: 0,
};
let gridItemObserver = new IntersectionObserver(moveUp, options);
function moveUp(entries, observer) {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      console.log("bb");
      entry.target.style.transform = "translateY(0px)";
    }
  });
}
[...gridItems].forEach(item => {
  gridItemObserver.observe(item);
});
