// // Common options for display
const DISPLAY = true;
const CHART_AREA = true;
const BORDER = true;
const TICKS = true;

//predicted voltage chart=============================//

document.addEventListener('DOMContentLoaded', function () {
    // Initialize empty arrays to store fetched data
    var timeLabels = [];
    var predictedVoltageData = [];

    // Get the canvas element and create a 2D rendering context
    var ctx = document.getElementById('predicted-chart').getContext('2d');

    // Create the combined chart (initially with empty data)
    var predictedChart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: timeLabels,
            datasets: [
                {
                    label: 'Predicted Power',
                    borderColor: 'rgba(75, 192, 192, 1)',
                    data: predictedVoltageData,
                    fill: false,
                },
            ],
        },
        options: {
            scales: {
                x: {
                    type: 'category',
                    position: 'bottom',
                    title: {
                        display: true,
                        text: 'Time',
                    },
                },
                y: {
                    title: {
                        display: true,
                        text: 'Power',
                    },
                },
            },
        },
    });


    // Function to fetch data from Django microservice and update chart
    function fetchData() {

        fetch('https://ruling-kindly-porpoise.ngrok-free.app/getPrediction/', {
            method: 'GET', // or 'POST' or any other HTTP method
            headers: {
                'ngrok-skip-browser-warning': 'true'
            }
        })

            .then(response => {
                return response.json();
            })
            .then(data => {
                data = data['1']
                console.log(data)
                let categories = [];
                let wattage = [];

                for (let key in data) {
                    if (data.hasOwnProperty(key)) {
                        let entry = data[key];
                        // Limit the length of the label to 6 characters
                        let label = entry[0].substring(0, 10);
                        categories.push(label);
                        wattage.push(entry[1]);
                    }
                }

                labels = categories;
                predictedVoltageData = wattage;

                // Update the chart with the new data
                predictedChart.data.labels = labels;
                predictedChart.data.datasets[0].data = predictedVoltageData;

                // Update the chart
                predictedChart.update();
            })
            .catch(error => console.error('Error fetching data:', error));
    }
    fetchData();
});

// requesting for the voltage from the servers============================================//


document.addEventListener('DOMContentLoaded', function () {
    // Initialize empty arrays to store fetched data
    var timeLabels = [];
    var staticVoltageData = [];
    var rotationalVoltageData = [];
    console.log("hello");
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
        fetch('https://ruling-kindly-porpoise.ngrok-free.app/getVoltage/', {
            method: 'GET', // or 'POST' or any other HTTP method
            headers: {
                'ngrok-skip-browser-warning': 'true'
            }
        })
            .then(response => {
                return response.json()
            })
            .then(data => {
                // Update the voltage card
                console.log(data);
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
                if (staticVoltageData.length > 20) {
                    staticVoltageData.shift();
                }
                if (rotationalVoltageData.length > 20) {
                    rotationalVoltageData.shift();
                }
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

    // Fetch data and update chart every 5 seconds
    setInterval(fetchData, 5000);
});


// requesting for weather data=============================================//

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


