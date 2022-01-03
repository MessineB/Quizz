
const api_url ='https://messineb.github.io/JASON.Json'
const Tableau = []
const Nbrquestion = 9

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
        let form = document.createElement("form")   //Je crée un form
        form.className="Formulaire"                 // Je lui donne une classe = Formulaire
        let Paragraph = document.createElement("p") //Une balise text dans laquelle j'affiche la question
        form.appendChild(Paragraph)                 //
        Paragraph.innerHTML = Tableau[u].question;  //

        for ( var i=0 ; i < Tableau[u].propositions.length ; i++) { //Dans chaque question je crée des propositions
            let Input = document.createElement("input")   //On recupere chaque input separement que l'on place dans une variable input
            Input.type="radio"     //J'attribue a mes input un type et je met en radio
            Input.name = "Input"    //J'attribue un name a mes input = Input
            Input.value = Tableau[u].propositions[i]    //On attribue une value a mes input qui me permettera de recuperé la valeur plus tard 
            let Label = document.createElement("label") //On crée des label en HTML et on le relie avec une variable Label en JS
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
    Joueur();
    BoutonJS.addEventListener("click" , Verify) 
}

init()
function Joueur() {
    var Nomdujoueur = prompt("Bienvenue, entre ton nom joueur !")
   document.getElementById('articleHeader').innerText = "Bienvenue sur mon quizz " + Nomdujoueur  
}

var Score=0



function Verify() {
    var Check = [];
    Check = document.querySelectorAll("input:checked");
    
    if ( Check.length == Nbrquestion){
    for (let v=0 ; v<9 ; v++) {
        if ( Check[v].value === Tableau[v].réponse ) {
            Score++
            
           
        }
        else {
            myFunction()
        }
        
    }
    document.getElementById("ScoreFinal").innerText = "Votre score est de : " + Score  
    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;
}
    else {
    alert("Vous devez remplir toutes les questions !")
    
}
    Score=0
}



