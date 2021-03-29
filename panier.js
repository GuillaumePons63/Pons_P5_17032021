let achatParse = localStorage.getItem('achat');
let achat = JSON.parse(achatParse);
console.log(achat);
let request = new XMLHttpRequest();
const commander = document.getElementById('commande');
let products= [];
products.push(achat.produit);



document.addEventListener ('DOMContentLoaded', function() {
    request.open("GET", "http://localhost:3000/api/teddies/"+achat.produit);
    request.send();
});

request.onreadystatechange = function () {
    if (this.readyState == XMLHttpRequest.DONE && this.status == 200) {
    let response = JSON.parse(this.responseText);
    const panier = document.getElementById('panier');
    const Img = document.createElement('img');
    const nom = document.createElement('div');
    const prix = document.createElement('div');
    const quantity = document.createElement('div');
    panier.appendChild(Img);
    panier.appendChild(nom);
    panier.appendChild(prix);
    panier.appendChild(quantity);
    Img.src = response.imageUrl;
    Img.classList.add('col-3');
    nom.textContent=response.name;
    nom.classList.add('col-3');
    prix.textContent=response.price+'€';
    prix.classList.add('col-3');
    quantity.textContent='Quantité :'+achat.quantity;
    quantity.classList.add('col-3');
    const prixTotal = document.getElementById('total');
    let PrixTotal = achat.quantity * response.price;
    prixTotal.textContent = PrixTotal + '€';
    localStorage.setItem('prix',PrixTotal);
    };
};

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
        
});

