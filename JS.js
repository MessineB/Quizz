
const api_url ='https://messineb.github.io/JASON.Json'
const Tableau = []
const Tableauscore = []
const Nbrquestion = 1

const getJson = async() => {  
    const response = await fetch(api_url);
    const data = await response.json();
    shuffleArray(data.QUESTIONS);
    return data.QUESTIONS;
}

function shuffleArray(array) {                         // Fonction du tri aleatoire
    array.sort((a, b) => 0.5 - Math.random());          

}

 async function ReadQuestion () {     
    const MyData = await getJson();             //Je recupere mes données Json et je les envoi dans un tableau
    Tableau.push(...MyData);                    //                       
    //console.log(Tableau)
}

function AfficheQuestion() {                    //La fonction qui affiche les questions en HTML

    var Main = document.getElementsByClassName("quizz") //Je recupere mon main dans une variable Quizz

    for ( var u=0 ; u< Nbrquestion ; u++) {     //Un boucle qui crée des Form, j'en crée *Nbrquestion
        var form = document.createElement("form")   //Je crée un form
        form.className="Formulaire"                 // Je lui donne une classe = Formulaire
        var Paragraph = document.createElement("p") //Une balise text dans laquelle j'affiche la question
        form.appendChild(Paragraph)                 //
        Paragraph.innerHTML = Tableau[u].question;  //

        for ( var i=0 ; i < Tableau[u].propositions.length ; i++) { //Dans chaque question je crée des propositions
            var Input = document.createElement("input")   //On recupere chaque input separement que l'on place dans une variable input
            Input.type="radio"     //J'attribue a mes input un type et je met en radio
            Input.name = "Input"    //J'attribue un name a mes input = Input
            Input.value = Tableau[u].propositions[i]    //On attribue une value a mes input qui me permettera de recuperé la valeur plus tard 
            var Label = document.createElement("label") //On crée des label en HTML et on le relie avec une variable Label en JS
            Label.innerHTML = Tableau[u].propositions[i] //Dans mon Label je met les propositions
            form.appendChild(Input)   
            form.appendChild(Label)           
    }
    Main[0].appendChild(form)
    }
}

const BoutonJS = document.getElementById('bouton')
const BoutonJS2 = document.getElementById('bouton2')
async function init() {
    await ReadQuestion();
    AfficheQuestion();
    BoutonJS.addEventListener("click" , Verify) 
    BoutonJS2.addEventListener("click",effacestorage)
    

}
init()


var Score=0;

function Verify() {
    var debut = document.getElementById("debut");
    var Check = [];
    Check = document.querySelectorAll("input:checked");
    if ( Check.length == Nbrquestion){
    for (let v=0 ; v<1 ; v++) {
        if ( Check[v].value === Tableau[v].réponse ) {
            Score++   
        }
    }
    document.getElementById("ScoreFinal").innerText = "Votre score est de : " + Score  
    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;
    var Nomdujoueur = prompt("Bienvenue, entre ton nom joueur !")
document.getElementById('articleHeader').innerText = "Merci d'avoir joué a mon quizz " + Nomdujoueur  
  localStorage.setItem(Nomdujoueur , Score);
    stockage = localStorage;
    console.log(stockage)
    for ( let s=0; s<5 ;s++ ) {
    var best = stockage.key(s);
    bestscore = localStorage.getItem(best);
    var affichescore = document.createElement("article");
    const variar = document.createTextNode(best)
    const variar2 = document.createTextNode(bestscore)
    affichescore.appendChild(variar)
    affichescore.appendChild(variar2)
    debut.appendChild(affichescore);
    affichescore.innerHTML = " Numero "+s+" est " + best +" avec un score de : "  +bestscore ;
}
}
    else {
    alert("Vous devez remplir toutes les questions !")
    
}

    Score=0
}

function effacestorage(stockage) {
    localStorage.clear(stockage);
}


