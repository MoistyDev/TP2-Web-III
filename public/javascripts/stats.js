let playedGames = 0;
let wonGames = 0;
let lostGames = 0;
let streak = 0;
let maxStreak = 0;

export function initStats() {
    if (localStorage.getItem("playedGames") != null) {
        playedGames = localStorage.getItem("playedGames");
    }
    if (localStorage.getItem("wonGames") != null) {
        wonGames = localStorage.getItem("wonGames");
    }
    if (localStorage.getItem("lostGames") != null) {
        lostGames = localStorage.getItem("lostGames" != null);
    }
    if (localStorage.getItem("streak") != null) {
        streak = localStorage.getItem("streak");
    }
    if (localStorage.getItem("maxStreak") != null) {
        maxStreak = localStorage.getItem("maxStreak");
    }
}

export function incrementWinCounter() {
    wonGames++
    localStorage.setItem("wonGames", wonGames);
    incrementPlayedGames();
    incrementStreak();
}

export function incrementDefeatCounter() {
    lostGames++;
    localStorage.setItem("lostGames", lostGames);
    streakEnding();
    incrementPlayedGames();
}

export function addStats() {
    addPlayedGames();
    addWonPercentage();
    addCurrentStreak();
    addMaxStreak();
}

function incrementPlayedGames() {
    playedGames++;
    localStorage.setItem("playedGames", playedGames);
}

function incrementStreak() {
    streak++;
    if (streak > maxStreak) {
        maxStreak = streak;
        localStorage.setItem("maxStreak", maxStreak);
        addMaxStreak();
    }
    localStorage.setItem("streak", streak);
}

function streakEnding() {
    if (streak > maxStreak) {
        maxStreak = streak;
        localStorage.setItem("maxStreak", maxStreak);
        addMaxStreak();
    }
    streak = 0;
    localStorage.setItem("streak", streak);
}

function addPlayedGames() {
    const playedGamesElem = document.querySelector('[data-leaderboard-item="played-games"]');
    if (localStorage.getItem("playedGames") != null) {
        $(playedGamesElem).html(localStorage.getItem("playedGames"));
    }
}

function addWonPercentage() {
    const winPercentageElem = document.querySelector('[data-leaderboard-item="win-percentage"]');
    if (localStorage.getItem("wonGames") != null) { 
        if (localStorage.getItem("wonGames") > 0) {
            $(winPercentageElem).html(((localStorage.getItem("wonGames") / localStorage.getItem("playedGames")) * 100).toFixed(0));
        } else if (wonGames == 0) {
            $(winPercentageElem).html("0");
        }
    }
}

function addCurrentStreak() {
    const streakElem = document.querySelector('[data-leaderboard-item="streak"]');
    if (localStorage.getItem("streak") != null) {
        $(streakElem).html(localStorage.getItem("streak"));
    }
}

function addMaxStreak() {
    const maxStreakElem = document.querySelector('[data-leaderboard-item="max-streak"]')
    if (localStorage.getItem("maxStreak") != null) {
        $(maxStreakElem).html(localStorage.getItem("maxStreak"));
    }
}