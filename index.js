// // Common options for display
const DISPLAY = true;
const CHART_AREA = true;
const BORDER = true;
const TICKS = true;



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







// updating the data of charts =========================================================//




// requesting for the voltage from the servers============================================//


document.addEventListener('DOMContentLoaded', function () {
    // Initialize empty arrays to store fetched data
    var timeLabels = [];
    var staticVoltageData = [];
    var rotationalVoltageData = [];

    // Get the canvas element and create a 2D rendering context
    var ctx = document.getElementById('combined-chart').getContext('2d');

    // Create the combined chart (initially with empty data)
    var combinedChart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: timeLabels,
            datasets: [
                {
                    label: 'Static Voltage',
                    borderColor: 'rgba(75, 192, 192, 1)',
                    data: staticVoltageData,
                    fill: false,
                },
                {
                    label: 'Rotational Voltage',
                    borderColor: 'rgba(255, 99, 132, 1)',
                    data: rotationalVoltageData,
                    fill: false,
                },
            ],
        },
        options: {
            scales: {
                x: {
                    type: 'linear',
                    position: 'bottom',
                    title: {
                        display: true,
                        text: 'Time',
                    },
                },
                y: {
                    title: {
                        display: true,
                        text: 'Voltage',
                    },
                },
            },
        },
    });

    let currentTime = 0;

    // Function to fetch data from Django microservice and update chart
    function fetchData() {
        fetch('http://127.0.0.1:8000/getVoltage/')
            .then(response => response.json())
            .then(data => {
                // Update the voltage card
                const staticVoltageElement = document.getElementById('staticVoltageValue');
                staticVoltageElement.innerHTML = `Static Voltage Generated:<br>${data['staticVoltage']} volts`;

                const rotationalVoltageElement = document.getElementById('rotationalVoltageValue'); // Corrected typo here
                rotationalVoltageElement.innerHTML = `Rotational Voltage Generated:<br>${data['rotationalVoltage']} volts`;

                // Add the current time and voltages to the arrays
                // var currentTime = new Date().toLocaleTimeString();
                // console.log(currentTime);
                currentTime += 2;
                timeLabels.push(currentTime);
                staticVoltageData.push(data['staticVoltage']);
                rotationalVoltageData.push(data['rotationalVoltage']);
                // Update the chart with the new data
                combinedChart.data.labels = timeLabels;
                combinedChart.data.datasets[0].data = staticVoltageData;
                combinedChart.data.datasets[1].data = rotationalVoltageData;

                // Update the chart
                combinedChart.update();
                combinedChart.render();
            })
            .catch(error => console.error('Error fetching data:', error));
    }

    // Fetch data and update chart every 2 seconds
    setInterval(fetchData, 2000);
});


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
