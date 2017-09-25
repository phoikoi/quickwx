const tempColorRange = [
    [-10, '#609'],
    [ 20, '#33c'],
    [ 45, '#66f'],
    [ 67, '#39f'],
    [ 77, '#0c6'],
    [ 90, '#fc0'],
    [100, '#f60'],
    [110, '#f00'],
    [999, '#c00']
];

const tempSpanRange = [
    [-10, 'temp-dangercold'],
    [ 20, 'temp-verycold'],
    [ 45, 'temp-cold'],
    [ 67, 'temp-cool'],
    [ 77, 'temp-comfy'],
    [ 90, 'temp-warm'],
    [100, 'temp-hot'],
    [110, 'temp-veryhot'],
    [999, 'temp-dangerhot']
];

const dewpColorRange = [
    [35, '#add'],
    [50, '#4dd'],
    [62, '#0c6'],
    [70, '#fc0'],
    [75, '#f60'],
    [999,'#f00']
];

const dewpSpanRange = [
    [35, "dewp-verydry"],
    [50, "dewp-dry"],
    [62, "dewp-comfy"],
    [70, "dewp-humid"],
    [75, "dewp-sticky"],
    [999, "dewp-tropical"]
];

const windSpeedRange = [
    [2.0,  '#ffffff'],
    [5.0,  '#c4e1ed'],
    [10.0, '#64b9dc'],
    [15.0, '#64abdc'],
    [25.0, '#5092dc'],
    [38.0, '#3572e3'],
    [50.0, '#41d046'],
    [60.0, '#97e52b'],
    [73.0, '#d0fa26'],
    [96.0, '#ffff11'],
    [111.0,'#ffbb01'],
    [130.0,'#ff7901'],
    [157.0,'#ff3d01'],
    [999.0,'#a00000']
];

const popRange = [
    [10.0, '#ffffff'],
    [30.0, '#64b9dc'],
    [50.0, '#3572e3'],
    [70.0, '#41d046'],
    [80.0, '#ffff11'],
    [90.0, '#ff3d01'],
    [999,  '#a00000'],
];

const qpfRange = [
    [0.01, '#ffffff'],
    [0.1,  '#dddddd'],
    [0.25, '#b2def7'],
    [0.5,  '#5bb6fc'],
    [0.75, '#1430e9'],
    [1.0,  '#87fd15']
    [1.5,  '#4fc519'],
    [2.0,  '#357237'],
    [2.5,  '#fdfd07'],
    [3.0,  '#fcce20'],
    [4.0,  '#fc9918'],
    [5.0,  '#f9261b']
    [6.0,  '#c41c1c'],
    [8.0,  '#7c0616'],
    [10.0, '#fe01f9'],
    [999,  '#8f38c7']
];

function rangeMap(value, rangeArray) {
    /* rangeArray must be an array of two-item arrays */
    var retval;
    for (rangeItem of rangeArray) {
        if (value < rangeItem[0]) {
            retval = rangeItem[1];
            break;
        }
    }

    return retval;
}

function barParams(hour) {
    return [
            rangeMap(parseInt(hour.temp.english), tempColorRange),
            rangeMap(parseInt(hour.dewpoint.english), dewpColorRange),
            `hsl(${hour.wdir.degrees},100%,50%)`, // wind direction
            rangeMap(parseInt(hour.wspd.english), windSpeedRange),
            rangeMap(parseFloat(hour.pop), popRange),
            rangeMap(parseFloat(hour.qpf.english), qpfRange)
        ];
}

function colorbar(day) {
    const pixWidth = 6;
    const pixHeight = 6;
    const numTracks = barParams(day.hours[0]).length;

    var bar = document.createElement('canvas');
    bar.width = ((day.hours.length) * pixWidth)+2;
    bar.height = (numTracks*pixHeight)+2; 

    var ctx = bar.getContext('2d');

    const w = pixWidth;
    const h = pixHeight;
    
    ctx.fillStyle = '#999'
    ctx.fillRect(0,0,bar.width,bar.height);
    
    for (var k=0; k<day.hours.length; k++) {
        var hour = day.hours[k];

        var x = (k*pixWidth) + 1;
        var y = pixHeight;

        var params = barParams(hour);

        for (var i=0; i<params.length; i++) {
            ctx.fillStyle = params[i];
            ctx.fillRect(x, (y*i)+1, w, h);
        }
    }
    return bar;
}

function divit(txt,classes="") {
    if (classes !== "") {
        return `<div class="${classes}">${txt}</div>`;
    } else {
        return `<div>${txt}</div>`;
    }
}

function loadConditions() {
    var container = document.getElementById("container");
    var wx = document.wx;

    var days = {};
    for (per of wx.hourly_forecast) {
        if (!days.hasOwnProperty(per.FCTTIME.yday)) {
            days[per.FCTTIME.yday] = { hours: [per] };
        } else {
            days[per.FCTTIME.yday].hours.push(per);
        }
    }

    for (day of wx.forecast.simpleforecast.forecastday) {
        var td = days[`${day.date.yday}`];
        td.day = day;

        var dewps = new Array;
        for (hour of td.hours) {
            dewps.push(parseInt(hour.dewpoint.english));
        }
        var dewp = Math.round(dewps.reduce((t,s) => t+s) / dewps.length);

        var newdiv = document.createElement('div');
        newdiv.classList.add("fc-row");

        var dobj = day.date;
        var ds = divit(`${dobj.weekday_short} ${dobj.month}/${dobj.day}`,"ds");
        
        var wi = divit(`<img src="icons/${day.icon}-16.png" />`,"wi");
        
        var wt = divit(`${day.conditions}`,"wt");
        
        var tempClassText = rangeMap(day.high.fahrenheit, tempSpanRange);
        var hi = `<span class="tempSpan ${tempClassText}">${day.high.fahrenheit}</span>`;
        
        tempClassText = rangeMap(day.low.fahrenheit, tempSpanRange);
        var lo = `<span class="tempSpan ${tempClassText}">${day.low.fahrenheit}</span>`

        var dewpClassText = rangeMap(dewp, dewpSpanRange);
        var dp = `<span class="dewpSpan ${dewpClassText}">${dewp}</span>`;

        var cbdiv = document.createElement('div');
        cbdiv.classList.add("colorbar");
        cbdiv.appendChild(colorbar(td));
        var hl = divit(`${hi}&nbsp;${lo}&nbsp;${dp}`,"hl");
        
        newdiv.innerHTML = `${wi}${ds}${hl}`;
        newdiv.appendChild(cbdiv);

        container.appendChild(newdiv);
    }
};

function getURLParameter(name) {
  return decodeURIComponent((new RegExp('[?|&]' + name + '=' + '([^&;]+?)(&|#|;|$)').exec(location.search) || [null, ''])[1].replace(/\+/g, '%20')) || null;
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
            loadConditions();
        });
});
