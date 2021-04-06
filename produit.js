let produit = localStorage.getItem('product');
let request = new XMLHttpRequest();

document.addEventListener ('DOMContentLoaded', function envoieRequête () {
    request.open("GET", "http://localhost:3000/api/teddies");
    request.send();
});

request.onload = function traitementRequête () {
    if (this.readyState == XMLHttpRequest.DONE && this.status == 200) {
        let response = JSON.parse(this.responseText);
/* Partie qui génére le code HTMl d'affichage de la fiche produit */
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
        price.textContent = response[produit].price + '€';
/* Permet de charger le tableau de couleur du produit et de l'afficher */
        for (let i in response[produit].colors) {
            let choix = document.createElement('option');
            couleur.appendChild(choix);
            choix.textContent = response[produit].colors[i];       
        };
/* Permet d'afficher le choix de la quantité */
        const content = document.getElementById ('quantiteContent') ;
        const sousTitre = document.createElement ('div');
        const input = document.createElement('input');
        const row = document.createElement('div'); 
        const bouton = document.createElement ('input');
        const erreur = document.createElement('p');
            commande.onclick = function () {
                content.appendChild(sousTitre);
                content.appendChild(row);
                row.appendChild(input);
                content.appendChild(bouton);
                sousTitre.textContent = 'Quantité' ;
                sousTitre.classList.add('fw-bold');
                row.classList.add('row','mx-auto');
                input.type = 'number' ;
                input.min = '1';
                input.step = '1';
                input.classList.add('my-3','mx-auto','col-6');
                bouton.type = 'button' ;
                bouton.value = 'Ajouter au panier';
                content.appendChild(erreur);
                bouton.classList.add('btn','btn-success','mx-auto','my-3','col-6');
/* Pour vérifier que l'input de quantité soit valide */
                bouton.onclick = function () {
                    console.log(input.value);
                    if (input.value === null || input.value === '') {
                        erreur.textContent = 'Veuillez choisir une quantité' ;
                    } 
                    else if ((parseFloat(input.value) == parseInt(input.value)) && !isNaN(input.value)){
                        let ajoutPanier = {
                            produit : response[produit]._id,
                            quantity : input.value,
                            }                    
                        localStorage.setItem('achat',JSON.stringify(ajoutPanier));
                        document.location.href = "panier.html";                  
                    }                   
                    else{                
                        erreur.textContent = 'Veuillez rentrer une quantité valide';
                    }
                }
        }
        
    };
};
