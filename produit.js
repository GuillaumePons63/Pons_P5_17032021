let produit = localStorage.getItem('product');
let request = new XMLHttpRequest();


document.addEventListener ('DOMContentLoaded', function() {
    request.open("GET", "http://localhost:3000/api/teddies");
    request.send();
});

request.onreadystatechange = function () {
    if (this.readyState == XMLHttpRequest.DONE && this.status == 200) {
        let response = JSON.parse(this.responseText);
        const titre = document.getElementById('titre');
        const image = document.getElementById('image');
        const description = document.getElementById('description');
        const couleur = document.getElementById('couleur');
        const Img =document.createElement('img');
        const price = document.getElementById('prix');
        const commande = document.getElementById('commander');
        image.appendChild(Img);
        titre.textContent = response[produit].name;
        titre.classList.add("text-center");
        Img.src = response[produit].imageUrl;
        Img.classList.add("d-block","mx-auto","img-fluid");
        description.textContent =response[produit].description;
        for (let i in response[produit].colors) {
            let choix = document.createElement('option');
            couleur.appendChild(choix);
            choix.textContent = response[produit].colors[i];
        price.textContent = response[produit].price + '€';
        };
        commande.onclick = function () {
            document.location.href = "panier.html";
            localStorage.setItem('achat',response[produit]._id);
        };
    };
};
