// Money Chart =========================================================//



// Get the canvas element for the chart
// Get the canvas element for the chart
const combinedCanvas = document.getElementById('combined-chart');

// Combined data for Money and Electricity Generated
const combinedData = {
    labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
    datasets: [
        {
            label: 'Static Solar',
            data: [65, 59, 80, 81, 56, 55, 40],
            fill: false,
            borderColor: 'rgb(75, 192, 192)', // Color for Money
            tension: 0.1
        },
        {
            label: 'Dynamic Solar',
            data: [30, 40, 50, 60, 70, 80, 90], // Different data for Electricity
            fill: false,
            borderColor: 'rgb(192, 75, 75)', // Different color for Electricity
            tension: 0.1
        }
    ]
};

// Common options for display
const DISPLAY = true;
const CHART_AREA = true;
const BORDER = true;
const TICKS = true;

// Configuration for the combined chart
const combinedConfig = {
    type: 'line',
    data: combinedData,
    options: {
        responsive: true,
        scales: {
            x: {
                grid: {
                    display: DISPLAY,
                    drawOnChartArea: CHART_AREA,
                    drawTicks: TICKS,
                    color: "#707070"
                }
            },
            y: {
                grid: {
                    color: "#707070"
                }
            }
        }
    },
};

// Create the combined chart
const combinedChart = new Chart(combinedCanvas, combinedConfig);






const predictedCanvas = document.getElementById('predicted-chart');


const predictedData = {
    labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
    datasets: [{
        label: 'Predicted Power',
        data: [65, 59, 80, 81, 56, 55, 40],
        fill: false,
        borderColor: 'rgb(75, 192, 192)',
        tension: 0.1
    }]
};


const predictedConfig = {
    type: 'line',
    data: predictedData,
    options: {
        responsive: true,
        scales: {
            x: {
                border: {
                    display: BORDER
                },

                grid: {
                    display: DISPLAY,
                    drawOnChartArea: CHART_AREA,
                    drawTicks: TICKS,
                    color: "#707070"
                }
            },
            y: {
                border: {
                    display: true
                },
                grid: {
                    color: "#707070"
                }
            }
        }
    },
};

const predictedChart = new Chart(predictedCanvas, predictedConfig);




setInterval(() => {
    const newData = [0, 10, 20, 30, 40];
    moneyChart.data.datasets[0].data = newData;
    moneyChart.update();
}, 1000); // update every 1 seconds



// updating the data of charts =========================================================//




// requesting for the voltage from the servers============================================//


document.addEventListener('DOMContentLoaded', function () {
    // Function to fetch data from Django microservice
    function fetchData() {
        fetch('http://127.0.0.1:8000/getVoltage/')
            .then(response => response.json())
            .then(data => {
                // Update the content of the voltage card
                // console.log(data);
                const voltageElement = document.getElementById('staticVoltageValue');
                voltageElement.innerHTML = `Static Voltage Generated:<br>${data} volts`;
            })
            .catch(error => console.error('Error fetching data:', error));
    }

    // Fetch data initially
    fetchData();

    // Fetch data every X milliseconds (e.g., every 5000 milliseconds or 5 seconds)
    setInterval(fetchData, 2000);
});

// requesting for the voltage from the servers============================================//


// requesting for the current from the servers============================================//

document.addEventListener('DOMContentLoaded', function () {
    // Function to fetch data from Django microservice
    function fetchData() {
        fetch('http://127.0.0.1:8000/getCurrent/')
            .then(response => response.json())
            .then(data => {
                // Update the content of the current card
                // console.log(data);
                const voltageElement = document.getElementById('rotationalVoltageValue');
                voltageElement.innerText = `Rotational Voltage Generated: ${data} volts`;
            })
            .catch(error => console.error('Error fetching data:', error));
    }

    // Fetch data initially
    fetchData();

    // Fetch data every X milliseconds (e.g., every 5000 milliseconds or 5 seconds)
    setInterval(fetchData, 2000);
});


// requesting for the current from the servers============================================//

// requesting for weather data

document.addEventListener("DOMContentLoaded", function () {
    // Replace the API key and location in the URL
    const weatherAPI = 'http://api.weatherapi.com/v1/current.json?key=93c1efde3d1449f3a99130655231712&q=Patiala&aqi=no';

    // Fetch weather data
    fetch(weatherAPI)
        .then(response => response.json())
        .then(data => {
            // Extract required information
            const conditionText = data.current.condition.text;
            const iconUrl = `http:${data.current.condition.icon}`;
            const temperatureCelsius = data.current.temp_c;

            // Update DOM elements
            document.getElementById('weather-condition').textContent = conditionText;
            document.getElementById('weather-icon').src = iconUrl;
            document.getElementById('temperature').textContent = `${temperatureCelsius} °C`;
            document.getElementById('city').textContent = "Patiala";
        })
        .catch(error => console.error('Error fetching weather data:', error));
});


//Toggling dark mode and sidebar =========================================================//




const body = document.querySelector('body'),
    sidebar = body.querySelector('nav'),
    toggle = body.querySelector(".toggle"),
    searchBtn = body.querySelector(".search-box"),
    modeSwitch = body.querySelector(".toggle-switch"),
    modeText = body.querySelector(".mode-text");


toggle.addEventListener("click", () => {
    sidebar.classList.toggle("close");
})

searchBtn.addEventListener("click", () => {
    if (sidebar.classList.contains("close")) {
        sidebar.classList.remove("close");
    }
    else {
        sidebar.classList.add("close");
    }
})

modeSwitch.addEventListener("click", () => {
    body.classList.toggle("dark");

    if (body.classList.contains("dark")) {
        modeText.innerText = "Light mode";
        // moneyChart.options.scales.x.grid.color = "#707070";
        // moneyChart.options.scales.y.grid.color = "#707070";
        // electricityChart.options.scales.x.grid.color = "#707070";
        // electricityChart.options.scales.y.grid.color = "#707070";
    } else {
        modeText.innerText = "Dark mode";
        // moneyChart.options.scales.x.grid.color = "#707070";
        // moneyChart.options.scales.y.grid.color = "#707070";
        // electricityChart.options.scales.x.grid.color = "#707070";
        // electricityChart.options.scales.y.grid.color = "#707070";

    }
});


//Toggling dark mode and sidebar =========================================================//
