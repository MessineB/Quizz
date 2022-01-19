
const api_url ='https://messineb.github.io/JASON.Json'
const Tableau = []
var tableauscore = []
const Nbrquestion = 3
var aff = 0;

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
            var Label = document.createElement("label")
            Label.className="Label"; //On crée des label en HTML et on le relie avec une variable Label en JS
            Label.innerHTML = Tableau[u].propositions[i] //Dans mon Label je met les propositions
            form.appendChild(Input)   
            form.appendChild(Label)           
    }
    Main[0].appendChild(form)
    }
}

const BoutonJS = document.getElementById('bouton')          


async function init() {
    await ReadQuestion();
    AfficheQuestion();
    BoutonJS.addEventListener("click" , Verify) 
}
init()

var Score=0;

function Verify() {
   var Lab = document.getElementsByClassName("Label");
    var debut = document.getElementById("debut");
    var Check = [];
    Check = document.querySelectorAll("input:checked");
    if ( Check.length == Nbrquestion){
    for (let v=0 ; v<Nbrquestion ; v++) {
        if ( Check[v].value === Tableau[v].réponse ) {
            Score++   
        }
    }
    document.getElementById("ScoreFinal").innerText = "Votre score est de : " + Score  
    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;
    var Nomdujoueur = prompt("Bienvenue, entre ton nom joueur !")
document.getElementById('articleHeader').innerText = "Merci d'avoir joué a mon quizz " + Nomdujoueur  
// localStorage.setItem(Nomdujoueur , Score);
    stockage = localStorage;
    

    var obj = {
        nom: Nomdujoueur,
        score: Score
    }
    
    var scores = JSON.parse(localStorage.getItem("users"));
    
    if(scores === null) {
        scores = []
    }
    scores.push(obj)
    
    localStorage.setItem("users", JSON.stringify(scores))
    scores.sort((a, b) =>   b.score - a.score);
    


    // tableauscore.sort((a, b) => a.value - b.value);

    if (aff==0) {
    for ( let s=0; s<5 ;s++ ) {
    var affichescore = document.createElement("article");
    const variar = document.createTextNode(scores[s].nom)
    const variar2 = document.createTextNode(scores[s].score)
    affichescore.appendChild(variar)
    affichescore.appendChild(variar2)
    debut.appendChild(affichescore);


    var c = s+1

    affichescore.innerHTML = " La  "+c+" place appartient a " + scores[s].nom +" avec un score de : "  +scores[s].score ;
    }
    
}
}
    else {
    alert("Vous devez remplir toutes les questions !")   
}
    Score=0
    aff=1
}





