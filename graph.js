function getURLParameter(name) {
    return decodeURIComponent((new RegExp('[?|&]' + name + '=' + '([^&;]+?)(&|#|;|$)').exec(location.search) || [null, ''])[1].replace(/\+/g, '%20')) || null;
}

function drawGraph() {
    var wx = document.wx;
    var tempData = new Array;
    var dewpData = new Array;

    for (h of wx.hourly_forecast) {
        var fct = h.FCTTIME;
        var dt = `${fct.year}-${fct.mon_padded}-${fct.mday_padded} ${fct.hour_padded}:${fct.min}`;
        tempData.push({ t: dt, y: parseInt(h.temp.english) });
        dewpData.push({ t: dt, y: parseInt(h.dewpoint.english) });
    }

    var canv = document.getElementById("chart");
    var myChart = new Chart(canv, {
        type: 'line',
        data: {
            datasets: [{
                    label: 'Temperature',
                    data: tempData,
                    borderColor: [
                        'rgba(255,99,132,1)',
                    ],
                    backgroundColor: ['rgba(255,255,255,0.0)'],
                    borderWidth: 1.5
                },
                {
                    label: 'Dewpoint',
                    data: dewpData,
                    borderColor: [
                        'rgba(54, 162, 235, 1)',
                    ],
                    backgroundColor: ['rgba(255,255,255,0.0)'],
                    borderWidth: 1.5
                },
            ]
        },
        options: {
            elements: {
                point: {
                    radius: 0
                }
            },
            scales: {
                xAxes: [{
                    type: 'time',
                    position: 'bottom',
                    time: {
                        toolTipFormat: "M/D HH:mm",
                        displayFormats: {
                            hour: 'M/D HH:mm'
                        }

                    },
                }],
                yAxes: [{
                    id: 'A',
                    type: 'linear',
                    ticks: {
                        // max: 130.0,
                        // min: -40.0, 
                    },
                    position: 'left',
                }]
            }
        }
    });
}

document.addEventListener('DOMContentLoaded', function() {
    var station = getURLParameter('station');
    if (station === null) {
        station = '';
    }
    fetch(`wx${station}.json`)
        .then((resp) => resp.json())
        .then(function(data) {
            document.wx = data;
            drawGraph();
        });
});