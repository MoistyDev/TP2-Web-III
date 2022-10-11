let GUESSES = [
    {
        wonGames: 0
    }, 
    {
        wonGames : 0
    },
    {
        wonGames : 0
    },
    {
        wonGames: 0
    }, 
    {
        wonGames : 0
    },
    {
        wonGames : 0
    }
]

export function incrementGuesses(row) {
    GUESSES[row].wonGames++;
    updateGraphRows();
}

function saveGuesses() {
    $(window).bind('beforeunload', function(e) {
        localStorage.setItem('guesses', JSON.stringify(GUESSES));
    })
}

export function setGuesses() {
    if (JSON.parse(localStorage.getItem('guesses')) != null) {
        GUESSES = JSON.parse(localStorage.getItem('guesses'));
        updateGraphRows();
    } else {
        resetGuesses();
    }
}

function resetGuesses() {
    for (const guess of GUESSES) {
        guess.wonGames = 0;
    }
}

function updateGraphRows() {
    const rows = document.querySelectorAll('[data-graph-row]');
    for (const row of rows) {
        const wonGames = GUESSES[$(row).attr('data-graph-row')].wonGames;
        if (wonGames == 1) {
            $(row).css('width', '15%');
            $(row).text(wonGames);
            return;
        }
        if (wonGames == 2) {
            $(row).css('width', '25%');
            $(row).text(wonGames);
            return;
        }
        if (wonGames > 2 && wonGames <= 4) {
            $(row).css('width', '40%');
            $(row).text(wonGames);
            return;
        }
        if (wonGames > 4 && wonGames <= 6) {
            $(row).css('width', '60%');
            $(row).text(wonGames);
            return;
        }
        if (wonGames > 6 && wonGames <= 8) {
            $(row).css('width', '80%');
            $(row).text(wonGames);
            return;
        }
        if (wonGames > 8 && wonGames <= 10) {
            $(row).css('width', '100%');
            $(row).text(wonGames);
            return;
        }
    }
}

saveGuesses();