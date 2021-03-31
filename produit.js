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
            const content = document.getElementById ('quantiteContent') ;
            const titre = document.createElement ('div');
            const input = document.createElement('input');
            const row = document.createElement('div'); 
            const bouton = document.createElement ('input');
            content.appendChild(titre);
            content.appendChild(row)
            row.appendChild(input);
            content.appendChild(bouton);
            titre.textContent = 'Quantité' ;
            titre.classList.add('fw-bold');
            row.classList.add('row','mx-auto');
            input.type = 'number' ;
            input.min = '1';
            input.classList.add('my-3','mx-auto','col-6');
            bouton.type = 'button' ;
            bouton.value = 'Ajouter au panier';
            const erreur = document.createElement('p');
            content.appendChild(erreur);
            bouton.classList.add('btn','btn-success','mx-auto','my-3','col-6');
            bouton.onclick = function () {
                if (input.value !== null && input.value !== '') {
                    let ajoutPanier = {
                        produit : response[produit]._id,
                        quantity : input.value,
                        }                    
                    localStorage.setItem('achat',JSON.stringify(ajoutPanier));
                    document.location.href = "panier.html";
                    }
                else{
                    erreur.textContent = 'Veuillez choisir une quantité' ;
                } 
            }
        }
        
    };
};
