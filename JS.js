
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
    const MyData = await getJson();             //
    Tableau.push(...MyData);                    //                       //
    console.log(MyData[0])

}

function AfficheQuestion() {
    var question1 = MyData[0].question;       //  
    var text1 = document.getElementById('1quest');      //
    text1.innerHTML = question1;           
}

ReadQuestion ();
AfficheQuestion();


 
 