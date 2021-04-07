/* Partie du code qui sert à générer le panier */
function objetParse (objet) {
    let getObjet = localStorage.getItem(objet);
    let parse = JSON.parse(getObjet);
    return parse;
}
let nouveauProduit = objetParse ('achat');
let ajoutPanier = objetParse ('ajoutPanier');
let panier = [];
for (let i in ajoutPanier) {
    if (nouveauProduit == null) {
        panier.push(ajoutPanier[i]);
    } else if (nouveauProduit.produit == ajoutPanier[i].produit) {
    let doublon = {
    produit : ajoutPanier[i].produit,
    quantity : Number(nouveauProduit.quantity) + Number(ajoutPanier[i].quantity),
    }
    nouveauProduit=[];
    panier.push(doublon);
    } else {
        panier.push(ajoutPanier[i]);
    }    
}
if (nouveauProduit!==null) {
    panier.push(nouveauProduit)
};
localStorage.setItem('ajoutPanier',JSON.stringify(panier));
localStorage.removeItem('achat');

/* construction du tableau de produit pour l'envoie à l'API */
let products= [];
for (let i in panier) {
    for (let j = 0; j < panier[i].quantity; j++) {
    products.push(panier[i].produit);
    }
};

const commander = document.getElementById('commande');
let PrixTotal=0;

/* Element à charger après le chargement du DOM*/
document.addEventListener ('DOMContentLoaded', function(){
/* Vérifie si le panier est vide */
    if(panier.length===0) {
        const total = document.getElementById('total');
        total.textContent='Votre panier est vide';
        total.classList.add('text-center');
    }
/* Si le panier n'est pas vide, le script génére les éléments HTML du panier */
    else {
        for (let i in panier) {
            let request = new XMLHttpRequest();
            request.open("GET", "http://localhost:3000/api/teddies/"+panier[i].produit);
            request.send();
        
            request.onload = function () {
                if (this.readyState == XMLHttpRequest.DONE && this.status == 200) {
                let response = JSON.parse(this.responseText);
                const article = document.getElementById('panier');
                const Img = document.createElement('img');
                const nom = document.createElement('div');
                const prix = document.createElement('div');
                const quantity = document.createElement('div');
                const supprimer = document.createElement('input');
                const prixTotal = document.getElementById('total');
                const prixTotalProduit = document.createElement('div');
                article.appendChild(Img);
                article.appendChild(nom);
                article.appendChild(prix);
                article.appendChild(quantity);
                article.appendChild(prixTotalProduit);
                article.appendChild(supprimer);                
                Img.src = response.imageUrl;
                Img.classList.add('col-2','d-block','h-75','my-auto');
                nom.textContent=response.name;
                nom.classList.add('col-2','my-auto');
                prix.textContent=response.price/100+'€';
                prix.classList.add('col-2','my-auto');
                quantity.textContent=panier[i].quantity;
                quantity.classList.add('col-2','my-auto');
/* Calcul et affichage du prix du panier */
                prixTotalProduit.classList.add('col-3','my-auto'); 
                prixTotalProduit.textContent =  panier[i].quantity*response.price/100+'€';
                PrixTotal += (panier[i].quantity * response.price/100);
                prixTotal.textContent = 'Prix Total : ' + PrixTotal + '€';
/* Suppression d'un produit dans le panier */
                supprimer.value='X';
                supprimer.type='button';
                supprimer.classList.add('col-1','btn','btn-danger','btn-xs','my-5','p-auto');
                    supprimer.onclick = function (){
                        panier.splice(Number(panier[i]),1);
                        console.log(panier);
                        localStorage.setItem('ajoutPanier',JSON.stringify(panier));
                        document.location.reload();
                    };             
                };
            };
        };
    };
});

commander.addEventListener ('click', (event) => {
/* Validation des inputs utilisateurs */
    let lastName = document.getElementById('lastName');
    let firstName = document.getElementById('firstName');
    let adress = document.getElementById('adress');
    let city = document.getElementById('city');
    let email = document.getElementById('email');
    let erreur = document.getElementById('erreur');
    event.preventDefault();
    if (lastName.validity.valueMissing) {
        erreur.textContent = 'Veuillez renseigner un Nom';
    } else if (firstName.validity.valueMissing) {
        erreur.textContent = 'Veuillez renseigner un prénom';
    } else if (adress.validity.valueMissing) {
        erreur.textContent = 'veuillez renseigner une adresse';
    } else if (city.validity.valueMissing) {
        erreur.textContent = 'veuillez renseigner une ville';
    } else if (email.validity.valueMissing) {
        erreur.textContent = 'veuillez renseigner un Email';
    } else if (!email.checkValidity()) {
        erreur.textContent = 'veuillez rentrer un Email valide';
    } else if (products.length==0) {
        erreur.textContent = 'votre panier est vide';
    } else {
/* Création de l'objet en envoyer à l'api */
        const envoie = {
            contact :{
            firstName : firstName.value,
            lastName : lastName.value,            
            address : adress.value,
            city : city.value,
            email : email.value,
        },
        products,
    };
/* Envoie si tous les inputs sont valides à l'API */
        let requeteAchat = new XMLHttpRequest() ;
        requeteAchat.open("POST","http://localhost:3000/api/teddies/order");
        requeteAchat.setRequestHeader("Content-Type","application/json");
        requeteAchat.send(JSON.stringify(envoie));
        
        requeteAchat.onload = function () {
            if (this.readyState == XMLHttpRequest.DONE && this.status == 201) {
                let reponse = JSON.parse(this.responseText);
                localStorage.clear();
/* Enregistre les données pour la page validation avant d'y acceder */
                localStorage.setItem('nom',reponse.contact.lastName);
                localStorage.setItem('commande',reponse.orderId);
                localStorage.setItem('email',reponse.contact.email);
                localStorage.setItem('prix',PrixTotal);
                document.location.href = 'validation.html';
            }
    }
        
/* Pour réinitialiser le panier */
    
    }        
});



