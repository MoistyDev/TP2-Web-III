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

const labels = [
    'First Row',
    'Second Row',
    'Third Row',
    'Fourth Row',
    'Fifth Row',
    'Sixth Row',
  ];

  const data = {
    labels: labels,
    datasets: [{
      axis: 'y',
      label: 'Guesses repartion by rows',
      data: [GUESSES[0], GUESSES[1], GUESSES[2], GUESSES[3], GUESSES[4], GUESSES[5]],
      backgroundColor: [
        'rgba(255, 99, 132, 0.2)',
        'rgba(255, 159, 64, 0.2)',
        'rgba(255, 205, 86, 0.2)','rgba(75, 192, 192, 0.2)',
        'rgba(54, 162, 235, 0.2)',
        'rgba(153, 102, 255, 0.2)',
        'rgba(201, 203, 207, 0.2)'
      ],
      borderColor: [
        'rgb(255, 99, 132)',
        'rgb(255, 159, 64)',
        'rgb(255, 205, 86)',
        'rgb(75, 192, 192)',
        'rgb(54, 162, 235)',
        'rgb(153, 102, 255)',
        'rgb(201, 203, 207)'
      ],
      borderWidth: 1,
      fill : true
    }]
  };

  const config = {
    type: 'bar',
    data: data,
    options: {
        indexAxis: 'y'
    }
  };

export function incrementGuessedWordRow(row) {
    GUESSES[row].wonGames++;
}

//const myChart = new Chart (document.querySelector('[data-leaderboard-item="graph"]', config));
const ctx = $('#myChart');
const myChart = new Chart(ctx, {config});
$(ctx).html(myChart);