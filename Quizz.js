let Qtotal = 20;
let Qnumber = 1;
let Next = document.getElementById('next');
let QuizzQuit = document.getElementById('quizzQuit');
let Valid = document.getElementById('valid');
let connect = document.getElementById('connect');
let register = document.getElementById('register_page');

//Rules
let start = document.getElementById('start');
let condition = document.getElementById('condition');
let rulesContainer = document.getElementById('container_1');
let text = document.getElementById('text');

//Back and Continue
let back = document.getElementById('quit');
let continued = document.getElementById('continue');
let quizContainer = document.getElementById('container_2');
let finishing = document.getElementById('container_3');
finishing.style.display = 'none';



//Connect button
rulesContainer.style.display = 'none';
connect.onclick = () =>{
    rulesContainer.style.display = '';
    register.style.display = 'none';
}
//Suivant button
Valid.style.display = 'none';
Valid.onclick = () =>{
    if (Qnumber < Qtotal){
        Qnumber++;
        document.getElementById("Qnumber").innerHTML = Qnumber;
        nextQuestion();
        loadQuestion();

        if(Qnumber == 20){
            Valid.style.display = "none";
            Next.style.display = 'block';
        }
        else{
            Valid.style.display = "block";
        }
    }

    document.querySelectorAll('.answer').forEach(btn => {
        btn.classList.add('disabled');
    });    
}

//Précédent button
QuizzQuit.onclick = () => {
    if(Qnumber == 20){
        Valid.style.display = "inline";
    }
    else{
        Valid.style.display = "none";
    }
    window.close();
};


condition.style.display = 'none';
start.onclick = () =>{
    condition.style.display = 'block';
    start.style.display = 'none';
    text.style.display = 'none';
}


back.onclick = () =>{
    start.style.display = 'block';
    condition.style.display = 'none';
    text.style.display = 'block';
}

quizContainer.style.display = 'none';
continued.onclick = () =>{
    quizContainer.style.display = 'block';
    rulesContainer.style.display = 'none';

    loadQuestion();
}

//Réponses
let questions = document.getElementById('question');
let respond = document.getElementById('answer');
let questionContent = document.getElementById('questionContent');
let restart = document.getElementById('restart');

let currentPage = 0;
let correctQuestion = 0;
let askedQuestions = []

//Go to next question
let answered = false;
function nextQuestion(e){
    if(!answered){
        if(e.target.getAttribute("data-correct") === "true"){
            correctQuestion++;
        }

        document.querySelectorAll('.answer').forEach(button => {
            button.disabled = true;
        });
        answered = true;
    }
}


function loadQuestion() {
    //Mélanger les questions
    if (askedQuestions.length === quizzData.length) {
        askedQuestions = []; // Réinitialisez le tableau si toutes les questions ont été posées
        shuffleQuestion(quizzData);
    }

    // Trouver la première question non posée
    let currentIndex = 0;
    while (askedQuestions.includes(currentIndex)) {
        currentIndex++;
    }

    const item = quizzData[currentPage];
    respond.innerHTML = "";
    const questionElement = questionContent.querySelector('#question');
    questionElement.innerHTML = item.question;

    item.answers.forEach((answer, index) => {
        const div = document.createElement('div');
        const button = document.createElement('button');
        button.textContent = answer.text;
        button.setAttribute('data-correct', answer.correct);
        button.id = `answer${index + 1}`;
        button.classList.add('answer');

        //Button answer style
        button.style.padding = '5px 10px';
        button.style.width = '250px';
        button.style.marginBottom = '20px';
        button.style.fontSize = '17px';
        button.style.border = 'none';
        button.style.borderRadius = '5px';
        button.classList.add('answer-button');


        //Soumission de reponse
        button.addEventListener('click', function(){
            document.querySelectorAll('.answer').forEach(btn =>{
                btn.classList.remove('selected');
                btn.classList.add('disabled');
            });

            // Sélectionner la réponse actuelle
            button.classList.add('selected');

            Valid.style.display = 'block';
        });

        div.appendChild(button);
        respond.appendChild(div);
    });

    document.querySelectorAll('button').forEach((item) =>{
        item.addEventListener('click', nextQuestion);
    });
}

function initializeQuizzData(data) {
    quizzData = data;
    loadQuestion();
}



//Finishing quizz
function finish() {
    const textFinish = document.createElement('p');
    const content = document.getElementById('container_2');
    const contentFinish = document.getElementById('container_3');

    textFinish.innerHTML = `Vous avez obtenu ${correctQuestion} sur ${Qtotal}`;
    content.style.display = 'none';
    contentFinish.style.display = 'flex';
    contentFinish.appendChild(textFinish);
}


//Mélanger les questions function
function shuffleQuestion(array){
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}


//Quizz
const quizzData = [
    {
        question : "Quel nom portait la coépouse de Hadjara, femme de Abraham et mère d'Ismaël ?",
        
        answers : [
            {text : "Qusay", correct : false},
            {text : "Saarata", correct : true},
            {text : "Fatima", correct : false},
            {text : "Lubna", correct : false},
        ],
    },

    {
        question : "Comment s'appelle le prophète qui communiquait avec les animaux ?",
        
        answers : [
            {text : "Dawoud", correct : false},
            {text : "Souleymane", correct : true},
            {text : "Idriss", correct : false},
            {text : "Louth", correct : false},
        ],
    },

    {
        question : "Quel nom portait le premier fils du prophète Ismaël ?",
        
        answers : [
            {text : "Khassim", correct : false},
            {text : "Abuu Hurayra", correct : false},
            {text : "Nabith", correct : true},
            {text : "Abbas", correct : false},
        ],
    },

    {
        question : "Combien sont les piliers de la foi ?",

        answers : [
            {text : "6", correct : true},
            {text : "3", correct : false},
            {text : "7", correct : false},
            {text : "5", correct : false},
        ],
    },

    {
        question : "Qui a crée la première école de jurisprudence entre ces Imams ?",
   
        answers : [
            {text : "Abuu Hanifa", correct : false},
            {text : "Malick", correct : false},
            {text : "Hanbal", correct : false},
            {text : "Châfi", correct : true},
        ],
    },

    {
        question : "Dans quel sourate a été mentionné le nom de Zul Qarnayni (le Biscronu ou encore Alexandre Premier) ?",

        answers : [
            {text : "Kahfi", correct : true},
            {text : "Tâ-hâ", correct : false},
            {text : "Yunus", correct : false},
            {text : "Ma-ida", correct : false},
        ],
    },

    {
        question : "D'après le prophète Mouhammad (PSL), quel est le meilleur des aumônes ?",

        answers : [
            {text : "L'argent", correct : false},
            {text : "La Datte", correct : false},
            {text : "L'Eau", correct : true},
            {text : "La Viande", correct : false},
        ],
    },

    {
        question : "Quel est le nom du prophète qui a vécu le plus longtemps sur terre  ?",

        answers : [
            {text : "Nuh", correct : true},
            {text : "Hudar", correct : false},
            {text : "Yanqûba", correct : false},
            {text : "Aadama", correct : false},
        ],
    },

    {
        question : "Quelle femme portait le nom de 'Oummoul Mouminîn ou Mère des croyantes ?",

        answers : [
            {text : "Khadija", correct : true},
            {text : "Aïcha", correct : false},
            {text : "Oumou Kalsoum", correct : false},
            {text : "Amina", correct : false},
        ],
    },

    {
        question : "Combien d'années ont dormis les gens de la grotte (Ashâbul Kahfi) ?",

        answers : [
            {text : "1000", correct : false},
            {text : "309", correct : true},
            {text : "100", correct : false},
            {text : "250", correct : false},
        ],
    },

    {
        question : "Pendant le Ramadan, à quel jour a eu lieu la bataille de Badr ?",

        answers : [
            {text : "7", correct : false},
            {text : "21", correct : false},
            {text : "13", correct : false},
            {text : "17", correct : true},
        ],
    },

    {
        question : "Combien sont les obligations de l'ablution (Faratay Njàpp) ?",

        answers : [
            {text : "13", correct : false},
            {text : "5", correct : false},
            {text : "7", correct : true},
            {text : "Aucun", correct : false},
        ],
    },

    {
        question : "Qui est la deuxième personne à avoir rassembler le Saint Coran après le prophète ?",

        answers : [
            {text : "Zayd", correct : false},
            {text : "Ousmane", correct : true},
            {text : "Oumar", correct : false},
            {text : "Abuu Bakr", correct : false},
        ],
    },

    {
        question : "Le livre Zabour a été attribué à quel prophète ?",

        answers : [
            {text : "Daawuda", correct : true},
            {text : "Souleymane", correct : false},
            {text : "Moussa", correct : false},
            {text : "Youssouf", correct : false},
        ],
    },

    {
        question : "Combien de Sourates sont descendues à Medine ?",

        answers : [
            {text : "86", correct : false},
            {text : "63", correct : false},
            {text : "40", correct : false},
            {text : "28", correct : true},
        ],
    },

    {
        question : "Parmi ces noms, qui étaient des mécréants ?",

        answers : [
            {text : "Abuu Jahlin", correct : true},
            {text : "Abuu Lahab", correct : true},
            {text : "Abuu Hurayra", correct : false},
            {text : "Abuu Thawrin", correct : false},
        ],
    },

    {
        question : "Dans quelles sourates a été mentionné le nom de Moussa ?",

        answers : [
            {text : "Al A'lâ", correct : true},
            {text : "Al Baqara", correct : true},
            {text : "Tâ-hâ", correct : true},
            {text : "Al Isra", correct : true},
        ],
    },

    {
        question : "Quel nom portait le père du prophète Abraham (Aleyhi Salaam) ?",

        answers : [
            {text : "Azar", correct : true},
            {text : "Balam", correct : false},
            {text : "Haman", correct : false},
            {text : "Salma", correct : false},
        ],
    },

    {
        question : "Dans quelle Sourate a été mentionné le nom de la mosquée Al aqçâ de Jérusalem ?",

        answers : [
            {text : "Âli Imraan", correct : false},
            {text : "Al Baqara", correct : false},
            {text : "Ar-Ra'd", correct : false},
            {text : "Al Isra", correct : true},
        ],
    },

]
