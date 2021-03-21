let request = new XMLHttpRequest();
let produit = 0;

document.addEventListener ('DOMContentLoaded', function() {
    request.open("GET", "http://localhost:3000/api/teddies");
    request.send();
});
      
request.onreadystatechange = function () {
        if (this.readyState == XMLHttpRequest.DONE && this.status == 200) {
            let response = JSON.parse(this.responseText);
            console.log(response);
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
                main.appendChild(lienProduit);
                lienProduit.classList.add("btn","btn-info","mx-auto","d-block","col-6");
                lienProduit.value="Fiche Produit";
                lienProduit.onclick = function (produit) {
                    produit=i;
                    console.log(produit);
                }

            };
        };
    };
