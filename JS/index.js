const startMenu = document.getElementById('startMenu');
const game = document.getElementById('gameMenu');
const resultText = document.getElementById('resultText');
const nbrTry = document.getElementById('nbrTry');
const keyEnter = document.getElementById('keyEnter');
const inputNbr = document.getElementById('inputNbr');
const tries = document.getElementById('tries');
const title = document.getElementById('title');
const restartBtn = document.getElementById('restart');
const prev = document.getElementById('prev');
const prevTry = document.getElementById('previousTry');
const help = document.getElementById('help');
const fade = document.getElementById('fade');

let completeNumber = '';
let number = 0;
let isNbrFound = false;
let difficulty = '';
let previous = [];
let helpIsNeeded = false;

function startGame(id) {
    startMenu.style.display = 'none';
    game.style.display = 'flex';
    resultText.innerHTML = 'Entrez un nombre et appuyez sur Entrée.';
    keyEnter.innerHTML = 'Devinez !';
    tries.style.color = 'black';
    prev.style.display = 'none';
    prevTry.innerHTML = '';
    help.style.display = 'block';

    number = 0;
    nbrTry.innerHTML = 0;
    completeNumber = '';
    isNbrFound = false;
    difficulty = id;
    previous = [];
    helpIsNeeded = false;

    // Génération du nombre aléatoire en fonction du niveau de difficulté
    if (id === 'easy') {
        number = Math.floor(Math.random() * 20) + 1;
        nbrTry.innerHTML = 5;
        title.innerHTML = 'Facile';
    } else if (id === 'medium') {
        number = Math.floor(Math.random() * 50) + 1;
        nbrTry.innerHTML = 7;
        title.innerHTML = 'Moyen';
    } else if (id === 'hard') {
        number = Math.floor(Math.random() * 100) + 1;
        nbrTry.innerHTML = 10;
        title.innerHTML = 'Difficile';
    } else if (id === 'custom') {
        const customNbr = document.getElementById('customNbr').value;
        const customTry = document.getElementById('customTry').value;

        number = Math.floor(Math.random() * customNbr) + 1;
        nbrTry.innerHTML = customTry;
        title.innerHTML = 'Personnalisé';
    }
}

function showInput() {
    keyEnter.style.display = 'none';
    inputNbr.style.display = 'flex';
};

document.addEventListener('keypress', function (e) {
    const key = e.key;
    restartBtn.blur();

    if (!isNbrFound) {
        if (key !== 'Enter' && isFinite(key)) {
            completingNumber(key);
        } else if (key === 'Enter') {
            if (completeNumber !== '') {
                isFound(completeNumber);
                nbrTry.innerHTML = parseInt(nbrTry.innerHTML) - 1;
                previous.push(completeNumber);
                if (helpIsNeeded)
                    prevTry.innerHTML = previous.join(' - ');
                completeNumber = '';
                if (parseInt(nbrTry.innerHTML) === 0 && !isNbrFound) {
                    resultText.innerHTML = "Vous avez perdu ! Le nombre était " + number + ".";
                    isNbrFound = true;
                } else if (parseInt(nbrTry.innerHTML) === 1 && !isNbrFound) {
                    tries.style.color = 'red';
                }
            } else {
                resultText.innerHTML = "Veuillez saisir au moins un nombre.";
            }
        } else {
            resultText.innerHTML = "Veuillez entrer un nombre.";
        }
    }
});

function fadeClick() {
    showCustom();
}

function showCustom() {
    const custom = document.getElementById('customInput');

    if (custom.style.display === 'flex') {
        custom.style.display = 'none';
        fade.style.display = 'none';
    } else {
        custom.style.display = 'flex';
        fade.style.display = 'block';
    }
}

function completingNumber(key) {
    completeNumber += key.toString();
    keyEnter.innerHTML = completeNumber;
}

function showTries() {
    prev.style.display = 'block';
    help.style.display = 'none';
    helpIsNeeded = true;
}

function isFound(nbr) {
    nbr = parseInt(nbr);
    if (nbr > number) {
        resultText.innerHTML = "Le nombre est plus petit.";
    } else if (nbr < number) {
        resultText.innerHTML = "Le nombre est plus grand.";
    } else {
        resultText.innerHTML = "Bravo ! Vous avez trouvé le nombre.";
        tries.style.color = 'green';
        isNbrFound = true;
    }
}

function restart() {
    startGame(difficulty);
}

function quit() {
    startMenu.style.display = 'flex';
    game.style.display = 'none';
    resultText.innerHTML = ' ';
}

function checkInput() {
    const input = document.getElementById('input').value;
    input.focus();

    return input;
}