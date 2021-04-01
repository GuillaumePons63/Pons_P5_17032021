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
                article.appendChild(Img);
                article.appendChild(nom);
                article.appendChild(prix);
                article.appendChild(quantity);
                Img.src = response.imageUrl;
                Img.classList.add('col-3');
                nom.textContent=response.name;
                nom.classList.add('col-3');
                prix.textContent=response.price+'€';
                prix.classList.add('col-3');
                quantity.textContent='Quantité :'+panier[i].quantity;
                quantity.classList.add('col-3');
                const prixTotal = document.getElementById('total');
                PrixTotal += (panier[i].quantity * response.price);
                prixTotal.textContent = 'Prix Total : ' + PrixTotal + '€';
                localStorage.setItem('prix',PrixTotal);
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
        const envoie = {
            contact :{
            firstName : firstName.value,
            lastName : lastName.value,            
            address : adress.value,
            city : city.value,
            email : email.value
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
            document.location.href = 'validation.html';
            
        }
    localStorage.clear();
        
});

let products= [];
    for (let i = 0; i < achat.quantity; i++) {
    products.push(achat.produit);
    }

