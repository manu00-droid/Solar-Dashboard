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
    sidebar.classList.remove("close");
})

modeSwitch.addEventListener("click", () => {
    body.classList.toggle("dark");

    if (body.classList.contains("dark")) {
        modeText.innerText = "Light mode";
    } else {
        modeText.innerText = "Dark mode";

    }
});






// // // Get the canvas elements for the charts
// const moneyCanvas = document.getElementById('money-chart');
// const electricityCanvas = document.getElementById('electricity-chart');

// // Create the line charts using Chart.js
// const moneyChart = new Chart(moneyCanvas, {
//     type: 'line',
//     data: {
//         labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
//         datasets: [{
//             label: 'Money Saved',
//             data: [100, 150, 200, 250, 300, 350, 400],
//             borderColor: '#3e95cd',
//             fill: false
//         }]
//     },
//     options: {
//         responsive: true,
//         title: {
//             display: false
//         },
//         legend: {
//             display: false
//         },
//         scales: {
//             xAxis: [{
//                 scaleLabel: {
//                     display: true,
//                     labelString: 'Month'
//                 }
//             }],
//             yAxis: [{
//                 scaleLabel: {
//                     display: true,
//                     labelString: 'Money Saved'
//                 }
//             }]
//         }
//     }
// });

// const electricityChart = new Chart(electricityCanvas, {
//     type: 'line',
//     data: {
//         labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
//         datasets: [{
//             label: 'Electricity Generated',
//             data: [200, 250, 300, 350, 400, 450, 500],
//             borderColor: '#8e5ea2',
//             fill: false
//         }]
//     },
//     options: {
//         responsive: true,
//         title: {
//             display: false
//         },
//         legend: {
//             display: false
//         },
//         scales: {
//             xAxes: [{
//                 scaleLabel: {
//                     display: true,
//                     labelString: 'Month'
//                 }
//             }],
//             yAxes: [{
//                 scaleLabel: {
//                     display: true,
//                     labelString: 'Electricity Generated'
//                 }
//             }]
//         }
//     }
// });


// Get the canvas elements for the charts
// const moneyChart = document.getElementById('money-chart');
// const electricityChart = document.getElementById('electricity-chart');
// change colors of the charts when in dark mode
// if (body.classList.contains("dark")) {
//     moneyChart.data.datasets[0].borderColor = "#fff";
//     electricityChart.data.datasets[0].borderColor = "#fff";
//     moneyChart.update();
//     electricityChart.update();
// }





const moneyCanvas = document.getElementById('money-chart');
const electricityCanvas = document.getElementById('electricity-chart');

const data = {
    labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
    datasets: [{
        label: 'Money',
        data: [65, 59, 80, 81, 56, 55, 40],
        fill: false,
        borderColor: 'rgb(75, 192, 192)',
        tension: 0.1
    }]
};
// const config = {
//     type: 'line',
//     data: data,
// };

// Change these settings to change the display for different parts of the X axis
// grid configuration
const DISPLAY = true;
const BORDER = true;
const CHART_AREA = true;
const TICKS = true;

const config = {
    type: 'line',
    data: data,
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
                }
            },
            y: {
                border: {
                    display: true
                },

                grid: {
                },
            }
        }
    },
};
const moneyChart = new Chart(moneyCanvas, config);



setInterval(() => {
    const newData = [0, 10, 20, 30, 40];
    moneyChart.data.datasets[0].data = newData;
    moneyChart.update();
}, 1000); // update every 5 seconds
