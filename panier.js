let achatParse = localStorage.getItem('achat');
let panierParse = localStorage.getItem('ajoutPanier');

let ajoutPanier = JSON.parse(panierParse);
let achat = JSON.parse(achatParse);
console.log(ajoutPanier);
console.log(achat);


let panier = [];
for (let i in ajoutPanier) {
    panier.push(ajoutPanier[i])
}

if (achat!==null) {
    panier.push(achat)
};

localStorage.setItem('ajoutPanier',JSON.stringify(panier));
localStorage.removeItem('achat');
console.log(panier);

const commander = document.getElementById('commande');
let PrixTotal=0;

let products= [];

for (let i in panier) {
    for (let j = 0; j < panier[i].quantity; j++) {
    products.push(panier[i].produit);
    }
}
console.log(products);

document.addEventListener ('DOMContentLoaded', function(){
    if(panier.length===0) {
        const total = document.getElementById('total');
        total.textContent='Votre panier est vide';
        total.classList.add('text-center');
    }
    else {
        for (let i in panier) {
            let request = new XMLHttpRequest();
            request.open("GET", "http://localhost:3000/api/teddies/"+panier[i].produit);
            request.send();
        
            request.onreadystatechange = function () {
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
                prix.textContent=response.price+'€';
                prix.classList.add('col-2','my-auto');
                quantity.textContent=panier[i].quantity;
                quantity.classList.add('col-2','my-auto');
                prixTotalProduit.classList.add('col-3','my-auto'); 
                prixTotalProduit.textContent =  panier[i].quantity*response.price+'€';
                supprimer.value='X';
                supprimer.type='button';
                supprimer.classList.add('col-1','btn','btn-danger','btn-xs','my-5','p-auto');
                supprimer.onclick = function (){
                    panier.splice(panier[i],1);
                    console.log(panier);
                    localStorage.setItem('ajoutPanier',JSON.stringify(panier));
                    document.location.reload();
                }             
                PrixTotal += (panier[i].quantity * response.price);
                prixTotal.textContent = 'Prix Total : ' + PrixTotal + '€';
                };
            };
        };
    }
});


commander.addEventListener ('click', () => {
    let lastName = document.getElementById('lastName');
    let firstName = document.getElementById('firstName');
    let adress = document.getElementById('adress');
    let city = document.getElementById('city');
    let email = document.getElementById('email');
    let erreur = document.getElementById('erreur');
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
        let requeteAchat = new XMLHttpRequest() ;
        requeteAchat.open("POST","http://localhost:3000/api/teddies/order");
        requeteAchat.setRequestHeader("Content-Type","application/json");
        requeteAchat.send(JSON.stringify(envoie));
        requeteAchat.onload = function () {
            let response = JSON.parse(requeteAchat.response);
            localStorage.setItem('nom',response.contact.lastName);
            localStorage.setItem('commande',response.orderId);
            localStorage.setItem('email',response.contact.email);
            localStorage.setItem('prix',PrixTotal);
            document.location.href = 'validation.html';
        }
    localStorage.clear();
    }
        
});



