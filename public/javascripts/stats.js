let playedGames = 0;
let wonGames = 0;
let lostGames = 0;
let streak = 0;
let maxStreak = 0;

function checkNullUndefined(value) {
    if (isNaN(value)) {
        return true;
    }
    return false;
}

export function initStats() {
    playedGames = localStorage.getItem('playedGames');
    wonGames = localStorage.getItem('wonGames');
    lostGames = localStorage.getItem('lostGames');
    streak = localStorage.getItem('streak');
    maxStreak = localStorage.getItem('maxStreak');
    if (checkNullUndefined(playedGames)) {
        playedGames = 0;
    }
    if (checkNullUndefined(wonGames)) {
        wonGames = 0;
    }
    if (checkNullUndefined(lostGames)) {
        lostGames - 0;
    }
    if (checkNullUndefined(streak)) {
        streak = 0;
    }
    if (checkNullUndefined(maxStreak)) {
        maxStreak = 0;
    }

    addStats();
}

export function incrementWinCounter() {
    wonGames++
    localStorage.setItem("wonGames", wonGames);
    incrementPlayedGames();
    incrementStreak();
    addStats();
}

export function incrementDefeatCounter() {
    lostGames++;
    localStorage.setItem("lostGames", lostGames);
    streakEnding();
    incrementPlayedGames();
    addStats();
}

function incrementPlayedGames() {
    playedGames++;
    localStorage.setItem("playedGames", playedGames);
    addStats();
}

function incrementStreak() {
    streak++;
    if (streak > maxStreak) {
        maxStreak = streak;
        localStorage.setItem("maxStreak", maxStreak);
    }
    localStorage.setItem("streak", streak);
    addStats();
}

function streakEnding() {
    if (streak > maxStreak) {
        maxStreak = streak;
        localStorage.setItem("maxStreak", maxStreak);
    }
    streak = 0;
    localStorage.setItem("streak", streak);
    addStats();
}

function addStats() {
    addPlayedGames();
    addWonPercentage();
    addCurrentStreak();
    addMaxStreak();
}

function addPlayedGames() {
    const playedGamesElem = document.querySelector('[data-leaderboard-item="played-games"]');
    playedGamesElem.innerHTML = playedGames;
}

function addWonPercentage() {
    const winPercentageElem = document.querySelector('[data-leaderboard-item="win-percentage"]');
    if (localStorage.getItem("wonGames") > 0) {
        $(winPercentageElem).html(((wonGames / playedGames) * 100).toFixed(0));
    } else if (wonGames == 0) {
        $(winPercentageElem).html("0");
    } else {
        $(winPercentageElem).html("100");
    }

}

function addCurrentStreak() {
    const streakElem = document.querySelector('[data-leaderboard-item="streak"]');
    $(streakElem).html(streak);
}

function addMaxStreak() {
    const maxStreakElem = document.querySelector('[data-leaderboard-item="max-streak"]')
    $(maxStreakElem).html(maxStreak);
}

addStats();