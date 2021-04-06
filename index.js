let request = new XMLHttpRequest(); 


document.addEventListener ('DOMContentLoaded', function envoieRequete() {
    request.open("GET", "http://localhost:3000/api/teddies");
    request.send();
});
      
request.onload = function traitementRequete () {
        if (this.readyState == XMLHttpRequest.DONE && this.status == 200) {
            let response = JSON.parse(this.responseText);
/* Génération des élèments HTML pour chaque élèment du tableau de produit de l'API */
            for (let i in response) {
                let content = document.getElementById('mainContent');
                const main = document.createElement ("div");
                const titre = document.createElement ("div");
                const Img = document.createElement("img");
                const lienProduit = document.createElement("input");
                content.appendChild(main);
                main.classList.add("col-10","col-lg-4","mx-auto","d-block","my-5");
                main.appendChild(titre);
                titre.innerHTML = response[i].name;
                titre.classList.add("text-center");
                main.appendChild(Img);
                Img.src = response[i].imageUrl;
                Img.classList.add("col-10","img-fluid","rounded","mx-auto","d-block");
                Img.style.width = "250px";
                Img.style.height = "200px";
                main.appendChild(lienProduit);
                lienProduit.classList.add("btn","btn-info","mx-auto","d-block","col-6","my-3");
                lienProduit.value="Fiche Produit";
/* Fonction qui permet de changer de page et d'afficher la page produit*/
                lienProduit.onclick = function lienProduit () {
                    localStorage.setItem('product',i);
                    document.location.href = "produit.html";
                }
            };
        };
    };
