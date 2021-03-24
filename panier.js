let achat = localStorage.getItem('achat');
let request = new XMLHttpRequest();
const commander = document.getElementById('commande');

document.addEventListener ('DOMContentLoaded', function() {
    request.open("GET", "http://localhost:3000/api/teddies/"+achat);
    request.send();
});

request.onreadystatechange = function () {
    if (this.readyState == XMLHttpRequest.DONE && this.status == 200) {
    let response = JSON.parse(this.responseText);
    const panier = document.getElementById('panier');
    const Img = document.createElement('img');
    const nom = document.createElement('div');
    const prix = document.createElement('div');
    panier.appendChild(Img);
    panier.appendChild(nom);
    panier.appendChild(prix);
    Img.src = response.imageUrl;
    Img.classList.add('col-3');
    nom.textContent=response.name;
    nom.classList.add('col-4');
    prix.textContent=response.price+'€';
    prix.classList.add('col-5');
    const prixTotal = document.getElementById('total');
    prixTotal.textContent = response.price + '€';
    };
};