import { setInWord, setNotInWord, setMatches } from "./app.js";

let GRID_VALUES = [
    {
        word : ""
    },
    {
        word : "" 
    },
    {
        word : "" 
    },
    {
        word : ""
    },
    {
        word : ""
    },
    {
        word : ""
    }
];

let CASE_STATUS = [
    {
        status : ""
    },
    {
        status : ""
    },
    {
        status : ""
    },
    {
        status : ""
    },
    {
        status : ""
    },
    {
        status : ""
    },
    {
        status : ""
    },
    {
        status : ""
    },
    {
        status : ""
    },
    {
        status : ""
    },
    {
        status : ""
    },
    {
        status : ""
    },
    {
        status : ""
    },
    {
        status : ""
    },
    {
        status : ""
    },
    {
        status : ""
    },
    {
        status : ""
    },
    {
        status : ""
    },
    {
        status : ""
    },
    {
        status : ""
    },
    {
        status : ""
    },
    {
        status : ""
    },
    {
        status : ""
    },
    {
        status : ""
    },
    {
        status : ""
    },
    {
        status : ""
    },
    {
        status : ""
    },
    {
        status : ""
    },
    {
        status : ""
    },
    {
        status : ""
    }
]

export function resetGridValues() {
    for (let i = 0; i < GRID_VALUES.length; i++) {
        GRID_VALUES[i].word = "";
    }
}

export function resetCasesStates() {
    for (let i = 0; i < CASE_STATUS.length; i++) {
        CASE_STATUS[i].status = "";
    }
}

export function printStates() {
    const gridCases = document.querySelectorAll('[data-grid-case]');
    for (const gridCase of gridCases) {
        let element = CASE_STATUS[$(gridCase).attr("data-grid-case") - 1].status;
        
        if (element == "matches") {
            setMatches(gridCase);
        }
        if (element == "isInTheWord") {
            setInWord(gridCase);
        }
        if (element == "notInTheWord") {
            setNotInWord(gridCase);
        }
    }
}

export function printGrid() {
    const rows = document.querySelectorAll('[data-grid-row]');
    for (const row of rows) {
        console.log($(row).attr("data-grid-row"));
        switch ($(row).attr("data-grid-row")) {
            case "1" :
                $(document.querySelector('[data-grid-case="1"]')).html(GRID_VALUES[$(row).attr("data-grid-row") - 1].word.charAt(0));
                $(document.querySelector('[data-grid-case="2"]')).html(GRID_VALUES[$(row).attr("data-grid-row") - 1].word.charAt(1));
                $(document.querySelector('[data-grid-case="3"]')).html(GRID_VALUES[$(row).attr("data-grid-row") - 1].word.charAt(2));
                $(document.querySelector('[data-grid-case="4"]')).html(GRID_VALUES[$(row).attr("data-grid-row") - 1].word.charAt(3));
                $(document.querySelector('[data-grid-case="5"]')).html(GRID_VALUES[$(row).attr("data-grid-row") - 1].word.charAt(4));
            break;
            case "2" : 
                $(document.querySelector('[data-grid-case="6"]')).html(GRID_VALUES[$(row).attr("data-grid-row") - 1].word.charAt(0));
                $(document.querySelector('[data-grid-case="7"]')).html(GRID_VALUES[$(row).attr("data-grid-row") - 1].word.charAt(1));
                $(document.querySelector('[data-grid-case="8"]')).html(GRID_VALUES[$(row).attr("data-grid-row") - 1].word.charAt(2));
                $(document.querySelector('[data-grid-case="9"]')).html(GRID_VALUES[$(row).attr("data-grid-row") - 1].word.charAt(3));
                $(document.querySelector('[data-grid-case="10"]')).html(GRID_VALUES[$(row).attr("data-grid-row") - 1].word.charAt(4));
            break;
            case "3" :
                $(document.querySelector('[data-grid-case="11"]')).html(GRID_VALUES[$(row).attr("data-grid-row") - 1].word.charAt(0));
                $(document.querySelector('[data-grid-case="12"]')).html(GRID_VALUES[$(row).attr("data-grid-row") - 1].word.charAt(1));
                $(document.querySelector('[data-grid-case="13"]')).html(GRID_VALUES[$(row).attr("data-grid-row") - 1].word.charAt(2));
                $(document.querySelector('[data-grid-case="14"]')).html(GRID_VALUES[$(row).attr("data-grid-row") - 1].word.charAt(3));
                $(document.querySelector('[data-grid-case="15"]')).html(GRID_VALUES[$(row).attr("data-grid-row") - 1].word.charAt(4));
            break;
            case "4" : 
                $(document.querySelector('[data-grid-case="16"]')).html(GRID_VALUES[$(row).attr("data-grid-row") - 1].word.charAt(0));
                $(document.querySelector('[data-grid-case="17"]')).html(GRID_VALUES[$(row).attr("data-grid-row") - 1].word.charAt(1));
                $(document.querySelector('[data-grid-case="18"]')).html(GRID_VALUES[$(row).attr("data-grid-row") - 1].word.charAt(2));
                $(document.querySelector('[data-grid-case="19"]')).html(GRID_VALUES[$(row).attr("data-grid-row") - 1].word.charAt(3));
                $(document.querySelector('[data-grid-case="20"]')).html(GRID_VALUES[$(row).attr("data-grid-row") - 1].word.charAt(4));
            break;
            case "5" :
                $(document.querySelector('[data-grid-case="21"]')).html(GRID_VALUES[$(row).attr("data-grid-row") - 1].word.charAt(0));
                $(document.querySelector('[data-grid-case="22"]')).html(GRID_VALUES[$(row).attr("data-grid-row") - 1].word.charAt(1));
                $(document.querySelector('[data-grid-case="23"]')).html(GRID_VALUES[$(row).attr("data-grid-row") - 1].word.charAt(2));
                $(document.querySelector('[data-grid-case="24"]')).html(GRID_VALUES[$(row).attr("data-grid-row") - 1].word.charAt(3));
                $(document.querySelector('[data-grid-case="25"]')).html(GRID_VALUES[$(row).attr("data-grid-row") - 1].word.charAt(4));
            break;
            case "6" :
                $(document.querySelector('[data-grid-case="26"]')).html(GRID_VALUES[$(row).attr("data-grid-row") - 1].word.charAt(0));
                $(document.querySelector('[data-grid-case="27"]')).html(GRID_VALUES[$(row).attr("data-grid-row") - 1].word.charAt(1));
                $(document.querySelector('[data-grid-case="28"]')).html(GRID_VALUES[$(row).attr("data-grid-row") - 1].word.charAt(2));
                $(document.querySelector('[data-grid-case="29"]')).html(GRID_VALUES[$(row).attr("data-grid-row") - 1].word.charAt(3));
                $(document.querySelector('[data-grid-case="30"]')).html(GRID_VALUES[$(row).attr("data-grid-row") - 1].word.charAt(4));
            break;
        }
    }
}

export function saveRowToArray(row) {
    const letters = document.querySelectorAll('[data-grid-row="' + row + '"]');
    let word = "";
    for (const letter of letters) {
        word += $(letter).text();
    }
    GRID_VALUES[row - 1].word = word;
    getAttributeList();
}

function saveGrid() {
    $(window).bind('beforeunload', function(e) {
        localStorage.setItem('grid', JSON.stringify(GRID_VALUES));
    })
}

function saveStates() {
    $(window).bind('beforeunload', function(e) {
        localStorage.setItem('states', JSON.stringify(CASE_STATUS));
    })
}

function setStates() {
    if (JSON.parse(localStorage.getItem('states')) != null) {
        CASE_STATUS = JSON.parse(localStorage.getItem('states'));
    }
}

function setGrid() {
    if (JSON.parse(localStorage.getItem('grid')) != null) {
        GRID_VALUES = JSON.parse(localStorage.getItem('grid'));
    } else {
        resetGridValues();
    }
}

function getAttributeList() {
    const gridCases = document.querySelectorAll('[data-grid-case]');
    for (const gridCase of gridCases) {
        if ($(gridCase).hasClass("matches")) {
            CASE_STATUS[$(gridCase).attr("data-grid-case") - 1].status = "matches";
        }
        if ($(gridCase).hasClass("isInTheWord")) {
            CASE_STATUS[$(gridCase).attr("data-grid-case") - 1].status = "isInTheWord";
        }
        if ($(gridCase).hasClass("notInTheWord")) {
            CASE_STATUS[$(gridCase).attr("data-grid-case") - 1].status = "notInTheWord";
        }
    }
}

saveGrid();
saveStates();
setGrid();
setStates();