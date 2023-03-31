// Money Chart =========================================================//





const moneyCanvas = document.getElementById('money-chart');

const moneyData = {
    labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
    datasets: [{
        label: 'Money',
        data: [65, 59, 80, 81, 56, 55, 40],
        fill: false,
        borderColor: 'rgb(75, 192, 192)',
        tension: 0.1
    }]
};



const DISPLAY = true;
const BORDER = true;
const CHART_AREA = true;
const TICKS = true;

const moneyConfig = {
    type: 'line',
    data: moneyData,
    options: {
        responsive: true,
        scales: {
            x: {
                border: {
                    display: true,
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
                    display: true,
                },
                grid: {
                    color: "#707070"
                }
            }
        }
    },
};
const moneyChart = new Chart(moneyCanvas, moneyConfig);




// Money Chart =========================================================//


//electricity chart =========================================================//

const electricityCanvas = document.getElementById('electricity-chart');


const electricityData = {
    labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
    datasets: [{
        label: 'Electricity Generated',
        data: [65, 59, 80, 81, 56, 55, 40],
        fill: false,
        borderColor: 'rgb(75, 192, 192)',
        tension: 0.1
    }]
};


const electricityConfig = {
    type: 'line',
    data: electricityData,
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

const electricityChart = new Chart(electricityCanvas, electricityConfig);




//electricity chart =========================================================//







// updating the data of charts =========================================================//



setInterval(() => {
    const newData = [0, 10, 20, 30, 40];
    moneyChart.data.datasets[0].data = newData;
    moneyChart.update();
}, 1000); // update every 1 seconds



// updating the data of charts =========================================================//










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
