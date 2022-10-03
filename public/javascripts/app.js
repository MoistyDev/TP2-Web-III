import { getFile } from "./wordlist.js";
import { printGrid, printStates, resetCasesStates, resetGridValues, saveRowToArray } from "./gridCache.js";
import { initStats, incrementWinCounter, incrementDefeatCounter } from "./stats.js";
import { incrementGuessedWordRow } from "./statsGraph.js";

const WORDS = await getFile();
const toggleSwitch = document.querySelector('[data-settings-modal="toggleSwitch"]');
toggleSwitch.checked = false;
let selectedWord;
let currentCase;
let currentRow;
let wordDiscovered;

function setSelectedWord() {
    window.localStorage.setItem("selectedWord", selectedWord);
    window.localStorage.setItem("wordIsDiscovered", wordDiscovered);
}

function getSelectedWord() {
    if (window.localStorage.getItem("selectedWord") != null) {
        selectedWord = (window.localStorage.getItem("selectedWord"));
    }
    if (window.localStorage.getItem("wordIsSelected") != null) {
        wordDiscovered = (window.localStorage.getItem("wordIsSelected"));
    }
}

function defineCurrentCase() {
    currentCase = 1;
    const gridCases = document.querySelectorAll('[data-grid-case]');
    
    for (const gridCase of gridCases) {
        if (gridCase.innerHTML != "") {
            currentCase++
            console.log(currentCase);
        }
    }
}

function defineCurrentRow() {
    switch (currentCase) {
        case 6 :
            currentRow = 2;
            break;
        case 11 : 
            currentRow = 3;
            break;
        case 16 : 
            currentRow = 4;
            break;
        case 21 :
            currentRow = 5;
            break;
        case 27 : 
            currentRow = 6;
            break;

        case 31 : {
            currentRow = 6;
            verifyAnswer();
            break;
        }
        default :
            currentRow = 1;
            break;
    }
}

function initStartVariables() { 
    selectedWord = chooseRandomWord();
    wordDiscovered = false;
    defineCurrentCase();
    defineCurrentRow();
    hideReplayButton();
    showRefreshIcon();
}

function hideReplayButton() {
    const replayButton = document.querySelector('[data-replay-button]');
    $(replayButton).hide();
}

function showReplayButton() {
    const replayButton = document.querySelector('[data-replay-button]');
    replayButton.style.display = "flex";
}

function hideRefreshIcon() {
    const refreshIcon = document.querySelector('[data-refresh-icon]');
    $(refreshIcon).hide();
}

function showRefreshIcon() {
    const refreshIcon = document.querySelector('[data-refresh-icon]');
    refreshIcon.style.display = "flex";
}

function chooseRandomWord() {
    const randomNumber = Math.floor(Math.random() * WORDS.length);
    return (WORDS[randomNumber].toUpperCase());
}

function cheatModeVerification() {
    const cheatCode = "robert";
    if (prompt("Enter cheat code ") == cheatCode) {
        alert("Here is the selected word : " + (selectedWord));
    }
}

function isLetter(str) {
    return str.length === 1 && str.match(/[a-z]/i);
}

function addDarkMode() {
    const body = document.body;
    const navbar = document.querySelector('[data-page-element="navbar"]');
    const modals = document.querySelectorAll('[data-page-element="modal"]');
    const navbarIcons = document.querySelectorAll('[data-page-element="navbar-icon"]');
    const refreshIcon = document.querySelector('[data-refresh-icon=""]');
    const gridCases = document.querySelectorAll('[data-grid-case]');
    const keyboardKeys = document.querySelectorAll('[data-kbd-key]');

    $(body).removeClass("darkMode-body");
    $(navbar).removeClass("darkMode-navbar");
    for (const icon of navbarIcons) {
        $(icon).removeClass("darkMode-icons");
    }
    for (const modal of modals) {
        $(modal).removeClass("darkMode-modals");
    }
    $(refreshIcon).removeClass('darkMode-icons');

    for (const gridCase of gridCases) {
        $(gridCase).css('border-color', "#d3d6da");
    }
    for (const key of keyboardKeys) {
        $(key).removeClass("darkMode-kbd");
    }
}

function removeDarkMode() {
    const body = document.body;
    const navbar = document.querySelector('[data-page-element="navbar"]');
    const modals = document.querySelectorAll('[data-page-element="modal"]');
    const navbarIcons = document.querySelectorAll('[data-page-element="navbar-icon"]');
    const refreshIcon = document.querySelector('[data-refresh-icon=""]');
    const gridCases = document.querySelectorAll('[data-grid-case]');
    const keyboardKeys = document.querySelectorAll('[data-kbd-key]');

    $(body).addClass("darkMode-body");
    $(navbar).addClass("darkMode-navbar");
    for (const icon of navbarIcons) {
        $(icon).addClass("darkMode-icons");
    }
    for (const modal of modals) {
        $(modal).addClass("darkMode-modals");
    }
    $(refreshIcon).addClass('darkMode-icons');
    for (const gridCase of gridCases) {
        $(gridCase).css('border-color', "#3a3a3c");
    }
    for (const key of keyboardKeys) {
        if (!$(key).hasClass("notInTheWord") && !$(key).hasClass("isInTheWord") && !$(key).hasClass("matches")) {
            $(key).addClass("darkMode-kbd");
        }
    } 
}

function manageDarkMode() {
    const toggleSwitch = document.querySelector('[data-settings-modal="toggleSwitch"]');
    $(toggleSwitch).click(function(e) {
        if (toggleSwitch.checked == false) {
            addDarkMode();
        } else if (toggleSwitch.checked) {
            removeDarkMode();
        }
    });
}

function readUserInputs() {
    let letter;
    $(document).keydown(function(e) {
        if(window.event && !wordDiscovered) {                  
            letter = e.key;
            if (isLetter(letter)) {
                writeLetter(letter.toUpperCase());
                return letter;
            }
            if (letter == "Backspace") {
                resetCase();
            }
            if (letter == "Enter") {
                e.preventDefault();
                verifyAnswer();
            }
        }
    });
}

function initOnScreenKBD() {
    const KEYS = document.querySelectorAll("[data-kbd-key]");
    for (const key of KEYS) {
        if ($(key).text() != "ENTER" || $(key).text() != "DELETE") {
            $(key).click(function(e) {
                writeLetter(key.textContent);
            });
        }
        if ($(key).text() == "ENTER" && !wordDiscovered) {
            $(key).click(verifyAnswer);
        }
        if ($(key).text() == "DELETE" && !wordDiscovered) {
            $(key).click(resetCase);
        }
    }
}

function writeLetter(letter) {
    const gridCase = document.querySelector('[data-grid-case="' + currentCase + '"]');
    const gridRow = document.querySelectorAll('[data-grid-row]');
    if (currentCase < 1) {
        currentCase = 1;
    }
    if (isLetter(letter) && $(gridRow[currentCase - 1]).attr('data-grid-row') == currentRow) {
        gridCase.innerText = letter;
        ++currentCase;
    }
}

function resetCase() {
    let gridCase;
    if (currentCase == 1) {
        gridCase = document.querySelector('[data-grid-case="' + currentCase + '"]');
    } else {
        gridCase = document.querySelector('[data-grid-case="' + (currentCase - 1) + '"]');
    }
    if (gridCase.getAttribute("data-grid-row") == currentRow) {
        $(gridCase).html("");
        --currentCase;
        if (currentCase < 1) {
            currentCase = 1;
        }
    }
}

function verifyAnswer() {
    let rowOfLetters = document.querySelectorAll('[data-grid-row="' + currentRow + '"]');
    let letterToCheck = currentCase;
    let lettersMatching = 0;

    if ($(rowOfLetters[0]).text() != "" && !entryIsInList(rowOfLetters)) {
        alert("Entry Unavailable.");
    }
    if ($(rowOfLetters[0]).text() != "" && entryIsInList(rowOfLetters)) {
        for (let i = 6; i > 0; i--){
            lettersMatching += verifyLetter(letterToCheck, rowOfLetters, i);
            letterToCheck--;
        }

        saveRowToArray(currentRow);

        if(lettersMatching == rowOfLetters.length) {
            wordIsDiscovered();
        }
        if (currentRow == 6 && !wordDiscovered) {
            wordIsNotDiscovered();
        }
        incrementCurrentRow();
    }
}

function incrementCurrentRow() {
    for (let i = 5; i < 30; i += 5) {
        if (currentCase == i + 1) {
            currentRow++;
        }
    }
}

function entryIsInList(rowOfLetters) {
    let word = "";
    for (const letter of rowOfLetters) {
        word += $(letter).text();
    }
    word = word.toLowerCase();
    for (let i = 0; i < WORDS.length; i++) {
        if (WORDS.includes(word)) {
            return true;
        }
        return false;
    }
}

function wordIsDiscovered() {
    alert("Congratulations ! You discovered the word.");
    wordDiscovered = true;
    hideRefreshIcon();
    showReplayButton();
    incrementWinCounter();
    incrementGuessedWordRow(currentRow - 1);
}

function wordIsNotDiscovered() {
    alert("Nice Try ! The word was : " + selectedWord);
    hideRefreshIcon();
    showReplayButton();
    incrementDefeatCounter();
}

export function setMatches(selectedLetter) {
    matchesWord(selectedLetter);
    const keyboardKeys = document.querySelectorAll('[data-kbd-key]');
    for (const key of keyboardKeys) {
        if ($(key).attr('data-kbd-key').toUpperCase() == $(selectedLetter).text()) {
            $(key).removeClass("darkMode-kbd");
            matchesWord(key);
        }
    }
}

export function setInWord(selectedLetter) {
    inWord(selectedLetter);
    const keyboardKeys = document.querySelectorAll('[data-kbd-key]');
    for (const key of keyboardKeys) {
        if ($(key).attr('data-kbd-key').toUpperCase() == $(selectedLetter).text()) {
            $(key).removeClass("darkMode-kbd");
            inWord(key);
        }
    }
}

export function setNotInWord(selectedLetter) {
    notInWord(selectedLetter);
    const keyboardKeys = document.querySelectorAll('[data-kbd-key]');
    for (const key of keyboardKeys) {
        if ($(key).attr('data-kbd-key').toUpperCase() == $(selectedLetter).text()) {
            $(key).removeClass("darkMode-kbd");
            notInWord(key);
        }
    }
}

function verifyLetter(gridCase, rowOfLetters, index) {
    const word = selectedWord.split('');
    for (const letter of rowOfLetters) {
        if (($(letter).attr('data-grid-case')) == gridCase) {
            let selectedLetter = document.querySelector('[data-grid-case="' + gridCase + '"]');
            if ($(selectedLetter).text() == word[index - 1]) {
                setMatches(selectedLetter);
                return 1;
            } 
            if (word.includes(selectedLetter.textContent)) {
                setInWord(selectedLetter);
                return 0;
            } 
            if ($(word[index - 1]) != $(selectedLetter).text() && !word.includes($(selectedLetter).text())) {
                setNotInWord(selectedLetter);
                return 0;
            }
        }
    }
    return 0;
}

function notInWord(selectedLetter) {
    $(selectedLetter).addClass("notInTheWord");
}

function inWord(selectedLetter) {
    $(selectedLetter).addClass("isInTheWord");
}

function matchesWord(selectedLetter) {
    $(selectedLetter).addClass("matches");
}

function resetGrid() {
    const gridCases = document.querySelectorAll('[data-grid-case]');
    for (const gridCase of gridCases) {
        $(gridCase).html("");
        $(gridCase).removeClass("matches");
        $(gridCase).removeClass("isInTheWord");
        $(gridCase).removeClass("notInTheWord");
    }
}

function resetKeyboard() {
    const keyboardKeys = document.querySelectorAll('[data-kbd-key]');
    for (const key of keyboardKeys) {  
        $(key).removeClass("matches");
        $(key).removeClass("isInTheWord");
        $(key).removeClass("notInTheWord");
        if ($(key).hasClass("darkMode-kbd")) {
            for (const key of keyboardKeys) {
                $(key).addClass("darkMode-kbd");
            }
        }
    }
}

function resetGame() {
    const refreshButton = document.querySelector('[data-refresh-icon]');
    const replayButton = document.querySelector('[data-replay-button]');
    $(refreshButton).click(function(e) {
        resetGrid();
        resetKeyboard();
        initStartVariables();
        setSelectedWord();
        resetGridValues();
        resetCasesStates();
    })

    $(replayButton).click(function(e) {
        resetGrid();
        resetKeyboard();
        initStartVariables();
        setSelectedWord();
        resetGridValues();
        resetCasesStates();
    })
}

initStartVariables();
initStats();
getSelectedWord();
setSelectedWord();
hideReplayButton();
initOnScreenKBD();
cheatModeVerification();
readUserInputs();
resetGame();
manageDarkMode();
printGrid();
printStates();
defineCurrentCase();
defineCurrentRow();
console.log(currentRow + " row");
console.log(WORDS);
