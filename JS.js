
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
    await ReadQuestion()
    AfficheQuestion();
    BoutonJS.addEventListener("click" , Verify)
    
}

init()


var Score=0
var ScoreFinal = document.getElementById("Score Final")


function Verify() {
    var Check = [];
    Check = document.querySelectorAll("input:checked");
    
    if ( Check.length == Nbrquestion){
    for (let v=0 ; v<9 ; v++) {
       console.log(Check[v].value)
       console.log(Tableau[v].réponse)
      
        if ( Check[v].value === Tableau[v].réponse ) {
            Score++
           
        }
    }
    alert ("Votre score est de :", Score ,"")  
}
    else {
    alert("Vous devez remplir toutes les questions !")
    
}
    
}
