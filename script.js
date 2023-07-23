const url = "https://newsapi.org/v2/everything?q=";
const apiKey = "6866e04559ed4453a0dd131a7763989a";
const time = "2023-07-21"



window.addEventListener("load", () => fetchNews("India"));

async function fetchNews(query){
    const res = await fetch(`${url}${query}&from=${time}&apiKey=${apiKey}`);
    const data = await res.json();
    const articles = data.articles;
    console.log(articles);
    bindData(articles);
}


function bindData(articles) {
    let aa = articles;
    const cardsContainer = document.querySelector('.cards-container');
    const newsTemplate = document.querySelector('#template-news');

    cardsContainer.innerHTML = "";

    aa.forEach((article) => {
        if(!article.urlToImage) return;
        const cardClone = newsTemplate.content.cloneNode(true);

        fillDataInCard(cardClone, article);
        cardsContainer.appendChild(cardClone);
    });
}

function fillDataInCard(cardClone, article){
    const newsImg = cardClone.querySelector("#news-img");
    const newsTitle = cardClone.querySelector("#news-title");
    const newsSource = cardClone.querySelector("#news-source");
    const newsDesc = cardClone.querySelector("#news-desc");

    newsImg.src = article.urlToImage;
    newsTitle.innerHTML = article.title;
    newsDesc.innerHTML = article.description;

    const date = new Date(article.publishedAt).toLocaleString("en-US", {
        timeZone: "Asia/Jakarta",
    });

    newsSource.innerHTML = `${article.source.name} | ${date}`;

    cardClone.firstElementChild.addEventListener("click", () => {
        window.open(article.url, "blank");
    });
}


let curSelectedNav = null;
function onNavItemClick(id){
    fetchNews(id);
    const navItem = document.getElementById(id);
    curSelectedNav?.classList.remove('active');
    curSelectedNav = navItem;
    curSelectedNav.classList.add('active');
}
    const text = document.getElementById("text");
    const btn = document.getElementById("btn");

btn.addEventListener("click", () => {
    const query = text.value;
    if(!query) return;
    fetchNews(query);
    curSelectedNav?.classList.remove("active")
    curSelectedNav = null;
})
