const gallery = document.querySelector('.gallery');
const leftPages = document.querySelector('.leftArrows');
const rightPages = document.querySelector('.rightArrows');
const selectLi = document.querySelectorAll(".page");

const page1 = document.querySelector(".page1");
const page2 = document.querySelector(".page2");
const page3 = document.querySelector(".page3");
const page4 = document.querySelector(".page4");
const page5 = document.querySelector(".page5");


let pageNumber = 5;


const pageNumbers = () => {
    page1.textContent = pageNumber - 4;
    page2.textContent = pageNumber - 3;
    page3.textContent = pageNumber - 2;
    page4.textContent = pageNumber - 1;
    page5.textContent = pageNumber;
}
pageNumbers();


const getRickAndMorty = url => {
    fetch(url)
        .then(response => response.json())

        .then(data => {
            gallery.innerHTML = "";

            data.results.forEach(element => {

                let characterImgURL = element.image;
                let characterDetails = element.name;
                let characterId = element.id;

                let $div = document.createElement("div");
                let img = document.createElement("img");
                let $p = document.createElement("p");
                let button = document.createElement("button");
                let likeButtonImg = document.createElement("img");

                $div.setAttribute("class", "oneCharacter text-center border card container-fluid m-3 mb-5");
                $p.textContent = characterDetails;
                $p.setAttribute("class", "card-text characterName");
                img.setAttribute("src", characterImgURL);
                img.setAttribute("class", "charactersImg img-fluid");
                img.setAttribute("id", characterId);
                likeButtonImg.setAttribute("src", "./assets/hand-thumbs-up.svg");
                likeButtonImg.setAttribute("class", "likeImageButton");
                button.textContent = "Like";
                button.setAttribute("class", "btn card-link mb-3");
                button.prepend(likeButtonImg);

                gallery.append($div);
                $div.append(img);
                $div.append($p);
                $div.append(button);

                const greenOnClick = () => button.classList.toggle("greenOnClick");     //this toggles class greenOnClick to like button whenever its clicked

                button.addEventListener("click", greenOnClick);
            });

            const $characterImages = document.querySelectorAll(".charactersImg");

            $characterImages.forEach(element => {
                element.addEventListener("click", function () {
                    let img = this;
                    let imgId = img.getAttribute("id");

                    localStorage.setItem("1", imgId);
                    window.location.replace("./characterPage.html");
                })
            });
        })
}
getRickAndMorty("https://rickandmortyapi.com/api/character");


const removeGreen = page => {
    selectLi.forEach(element => {
        element.classList.remove("bg-success");
    });
    let li = document.querySelector(page);
    li.classList.add("bg-success");
}


page1.addEventListener("click", function () {
    getRickAndMorty("https://rickandmortyapi.com/api/character?page=" + (pageNumber - 4));
    removeGreen(".page1");
})

page2.addEventListener("click", function () {
    getRickAndMorty("https://rickandmortyapi.com/api/character?page=" + (pageNumber - 3));
    removeGreen(".page2");
})

page3.addEventListener("click", function () {
    getRickAndMorty("https://rickandmortyapi.com/api/character?page=" + (pageNumber - 2));
    removeGreen(".page3");
})

page4.addEventListener("click", function () {
    getRickAndMorty("https://rickandmortyapi.com/api/character?page=" + (pageNumber - 1));
    removeGreen(".page4");
})

page5.addEventListener("click", function () {
    if (pageNumber !== 35) {
        getRickAndMorty("https://rickandmortyapi.com/api/character?page=" + (pageNumber));
        removeGreen(".page5");
    }
})



leftPages.addEventListener("click", function () {
    if (pageNumber > 5) {
        pageNumber -= 5;
        pageNumbers();
    }
    selectLi.forEach(element => {
        element.classList.remove("bg-success");
    });
})


rightPages.addEventListener("click", function () {
    if (pageNumber < 35) {
        pageNumber += 5;
        pageNumbers();
    }
    selectLi.forEach(element => {
        element.classList.remove("bg-success");
    });
})

