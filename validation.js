let nom =  localStorage.getItem('nom');
let commande = localStorage.getItem('commande');
let prix = localStorage.getItem('prix');
let email = localStorage.getItem('email');

document.addEventListener ('DOMContentLoaded', function() {
    const nomm = document.getElementById('nom');
    nomm.innerHTML = nom;
    const numero = document.getElementById('numero');
    numero.innerHTML = commande;
    const Prix = document.getElementById('prix');
    Prix.innerHTML=prix+'€';
    const Email = document.getElementById('email');
    Email.innerHTML = email;
});