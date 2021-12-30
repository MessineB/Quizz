
const api_url ='https://messineb.github.io/JASON.Json'
const Tableau = []

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
    console.log(Tableau)

}


function AfficheQuestion() {
    console.log(Tableau)
    var question1 = Tableau[0].question;                  //   J'affiche la premiere question de mon tableau dans mon html
    var text1 = document.getElementById('1quest');      //
    text1.innerHTML = question1;           
}

async function init() {
    await ReadQuestion()
    AfficheQuestion();
}

init()



 
 