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
    let answerSelected = getSelected();
    if(answerSelected){
        if (Qnumber < Qtotal){
            Qnumber++;
            document.getElementById("Qnumber").innerHTML = Qnumber;
        }
        if(Qnumber == Qtotal){
            Valid.style.display = "none";
            Next.style.display = 'block';
        }
        else{
            Valid.style.display = "block";
        }
        loadNextQuestion();

        Next.onclick = () =>{
            if(Qnumber == Qtotal){
                finish();
            }
        }
    }
}
function getSelected() {
    let answer;
    document.querySelectorAll('.answer').forEach(btn => {
        if (btn.classList.contains('selected')) {
            answer = btn.getAttribute('data-correct');
        }
    });
    return answer;
}
//Quitt button
QuizzQuit.onclick = window.close();


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
function nextQuestion(){
    if (!answered) {
        if (target.getAttribute("data-correct") === "true") {
            correctQuestion++;
        }
        

        document.querySelectorAll('.answer').forEach(button => {
            button.disabled = true;
        });
        answered = true;

        currentPage++;
        loadQuestion();

        if (currentPage < Qtotal) {
            loadQuestion();
        } else {
            finish();
        }        
    }
}

//Next question
function loadNextQuestion() {
    currentPage++;

    if (currentPage < Qtotal) {
        loadQuestion();
    } else {
        finish();
    }
}

function loadQuestion() {
    //Hide the button at every new question
    Valid.style.display = 'none';
    //Mélanger les questions
    if(currentPage < Qtotal){
        if (askedQuestions.length === Qtotal) {
            askedQuestions = []; // Réinitialisez le tableau si toutes les questions ont été posées
            shuffleQuestion(quizzData);
        }

        // Trouver la première question non posée
        let currentIndex = Math.floor(Math.random() * Qtotal);
        while (askedQuestions.includes(currentIndex)) {
            currentIndex = (currentIndex + 1) % Qtotal;
        }

        const item = quizzData[currentIndex];
        askedQuestions.push(currentIndex);
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
    }else{
        finish();
    }

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
        question : "Quel nom portait la coépouse de Hâjara, femme de Abraham et mère d'Ismaël ?",
        
        answers : [
            {text : "Qusay", correct : false},
            {text : "Sârata", correct : true},
            {text : "Fâtima", correct : false},
            {text : "Lubna", correct : false},
        ],
    },

    {
        question : "Comment s'appelle le prophète qui communiquait avec les animaux ?",
        
        answers : [
            {text : "Dâwûda", correct : false},
            {text : "Suleymân", correct : true},
            {text : "Idrîss", correct : false},
            {text : "Lûth", correct : false},
        ],
    },

    {
        question : "Quel nom portait le premier fils du prophète Ismaël ?",
        
        answers : [
            {text : "Xâssim", correct : false},
            {text : "Abû Hurayra", correct : false},
            {text : "Nâbith", correct : true},
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
        question : "Qui a crée la première école de jurisprudence entre ces Imâms ?",
   
        answers : [
            {text : "Abû Hanîfa", correct : false},
            {text : "Mâlick", correct : false},
            {text : "Hanbal", correct : false},
            {text : "Châfi", correct : true},
        ],
    },

    {
        question : "Dans quel sourate a été mentionné le nom de Zul Qarnayni (le Biscronu ou encore Alexandre Premier) ?",

        answers : [
            {text : "Kahfi", correct : true},
            {text : "Tâ-hâ", correct : false},
            {text : "Yûnus", correct : false},
            {text : "Mâ-ida", correct : false},
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
            {text : "Nûh", correct : true},
            {text : "Hudar", correct : false},
            {text : "Yanqûba", correct : false},
            {text : "Âdama", correct : false},
        ],
    },

    {
        question : 'Quelle femme portait le nom de "Oummoul Mouminîn" ou "Mère des croyantes" ?',

        answers : [
            {text : "Xadîja", correct : true},
            {text : "Aïcha", correct : false},
            {text : "Ummu Kalsum", correct : false},
            {text : "Âmina", correct : false},
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
            {text : "Usmân", correct : true},
            {text : "Umar", correct : false},
            {text : "Abû Bakr", correct : false},
        ],
    },

    {
        question : "Le livre Zabour a été attribué à quel prophète ?",

        answers : [
            {text : "Dâwûda", correct : true},
            {text : "Insa", correct : false},
            {text : "Mûssâ", correct : false},
            {text : "Yûsuf", correct : false},
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
            {text : "Abû Jahlin", correct : true},
            {text : "Abû Lahab", correct : true},
            {text : "Abû Hurayra", correct : false},
            {text : "Abû Thawrin", correct : false},
        ],
    },

    {
        question : "Dans quelles sourates a été mentionné le nom de Mûssâ ?",

        answers : [
            {text : "Al A'lâ", correct : true},
            {text : "Al Baqara", correct : true},
            {text : "Tâ-hâ", correct : true},
            {text : "Al Isrâ", correct : true},
        ],
    },

    {
        question : "Quel nom portait le père du prophète Abraham (Aleyhi Salâm) ?",

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
            {text : "Âli Imrân", correct : false},
            {text : "Al Baqara", correct : false},
            {text : "Ar-Ra'd", correct : false},
            {text : "Al Isrâ", correct : true},
        ],
    },

    {
        question : "Comment je m'appelle ?",

        answers : [
            {text : "Sheex", correct : false},
            {text : "Mamadu", correct : false},
            {text : "Abdu", correct : false},
            {text : "Rawaan", correct : true},
        ],
    },
]
