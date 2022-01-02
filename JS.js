
const api_url ='https://messineb.github.io/JASON.Json'
const Tableau = []
const Nbrquestion = 9

const getJson = async() => {  
    const response = await fetch(api_url);
    const data = await response.json();
    shuffleArray(data.QUESTIONS);
    return data.QUESTIONS;
}

function shuffleArray(array) {                         // Fonction du tri aleatoir de ses morts
    array.sort((a, b) => 0.5 - Math.random());          

}

 async function ReadQuestion () {     
    const MyData = await getJson();             //Je recupere mes données Json et je les envoi dans un tableau
    Tableau.push(...MyData);                    //                       
    //console.log(Tableau)
}

function AfficheQuestion() {

    var Main = document.getElementsByClassName("quizz")

    for ( var u=0 ; u< Nbrquestion ; u++) {
        let form = document.createElement("form")
        form.className="Formulaire"
        let Paragraph = document.createElement("p")
        form.appendChild(Paragraph)
        Paragraph.innerHTML = Tableau[u].question;


        for ( var i=0 ; i < Tableau[u].propositions.length ; i++) {
            let Input = document.createElement("input")
            Input.setAttribute("type", "radio")
            Input.name = "Input"
            Input.value = Tableau[u].propositions[i]
            let Label = document.createElement("label")
            Label.innerHTML = Tableau[u].propositions[i]
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




