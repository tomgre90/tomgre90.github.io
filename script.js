function showForm() {
    document.getElementById('settingsForm').style.display = 'block';
}

function closeForm() {
    document.getElementById('settingsForm').style.display = 'none';
}

var form = document.getElementById('sheetdb-form');
form.addEventListener("submit", e => {
e.preventDefault();
fetch(form.action, {
    method : "POST",
    body: new FormData(document.getElementById("sheetdb-form")),
}).then(
    response => response.json()
).then((html) => {
    // you can put any JS code here
    alert('success')
});
});

//Fetching data from SheetDB and rendering the chart
const apiUrl = "https://sheetdb.io/api/v1/pbtdo1j0ccm7v";

fetch(apiUrl)
    .then(response => response.json())
    .then(data => {
    const date = data.map(row => row.date);
    const number_of_pushups = data.map(row => parseInt(row.number_of_pushups));
    const ctx = document.getElementById('push_up_chart').getContext('2d');
    
    new Chart(ctx, {
        type: 'line',
        data: {
        labels: date,
        datasets: [{
            label: 'Push Ups',
            data: number_of_pushups,
            backgroundColor: 'rgba(54, 162, 235, 0.6)',
            borderColor: 'rgba(54, 162, 235, 1)',
            borderWidth: 1,
            tension: 0.1,
            fill: true,
            pointRadius: 5,
            pointHoverRadius: 7,
            datalabels: {
                display: true,
                align: 'top',
                color: 'black',
                font: {
                    size: 12
                },
                formatter: (value, context) => {
                    return value + ' push ups';
                }
            }
        }]
        },
        options: {
                responsive: true,
        plugins: {
            legend: {
                display: false
            },
                  datalabels: {
        anchor: 'end',
        align: 'top'
      },
            scales: {
                x: {
                    ticks: {
                        maxRotation: 45,
                        minRotation: 45
                    },
                },
                y: {
                    beginAtZero: true
                    
                }
            }
        }
    }
    });
    })
    .catch(error => console.error('Error fetching data:', error));


// default date
document.addEventListener('DOMContentLoaded', function () {
    const dateInput = document.getElementById('date');
    const today = new Date().toISOString().split('T')[0]; // format: YYYY-MM-DD
dateInput.value = today;
});