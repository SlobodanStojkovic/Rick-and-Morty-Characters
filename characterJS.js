const gallery = document.querySelector('.gallery');
const imgId = localStorage.getItem("1");
let url = "https://rickandmortyapi.com/api/character/" + imgId;

/* localStorage.removeItem("1"); */

let displayInformations = () => {
    fetch(url)

        .then(response => response.json())

        .then(data => {
            gallery.innerHTML = "";

            let characterImgURL = data.image;
            let characterGender = data.gender;
            let characterName = data.name;
            let characterOrigin = data.origin.name;
            let characterSpecies = data.species;
            let characterStatus = data.status;

            let $div = document.createElement("div");
            let img = document.createElement("img");
            let $p = document.createElement("p");

            $p.setAttribute("style", "white-space: pre-wrap;"); //this is required to preserve new lines when adding text
            $div.setAttribute("class", "character text-center");
            $p.textContent = `Name: ${characterName}
Gender: ${characterGender}
Origin: ${characterOrigin}
Species: ${characterSpecies}
Status: ${characterStatus}`;

            img.setAttribute("src", characterImgURL);
            img.setAttribute("class", "charactersImg img-fluid");

            gallery.append($div);
            $div.append(img);
            $div.append($p);
        })
}
displayInformations();

let goHomeButton = document.querySelector(".goHomeBtn");

let goHome = () => window.location.replace("index.html");

goHomeButton.addEventListener("click", goHome);
