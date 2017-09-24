function getURLParameter(name) {
  return decodeURIComponent((new RegExp('[?|&]' + name + '=' + '([^&;]+?)(&|#|;|$)').exec(location.search) || [null, ''])[1].replace(/\+/g, '%20')) || null;
}

/*
    span.temp-dangercold { background-color: #609; color:#fff; }
    span.temp-verycold { background-color: #33c; color:#fff; }
    span.temp-cold { background-color: #66f; color:#fff; }
    span.temp-cool { background-color:#39f; color:#fff; }
    span.temp-comfy { background-color:#0c6; color:#fff; }
    span.temp-warm { background-color:#fc0;}
    span.temp-hot { background-color:#f60; color:#fff; }
    span.temp-veryhot { background-color:#f00; color:#fff; }
    span.temp-dangerhot { background-color:#c00; }
*/

var tempColorMap = function(temp) {
    if (temp < -10)
        return '#609';
    else if (temp < 20)
        return '#33c';
    else if (temp < 45)
        return '#66f';
    else if (temp < 67)
        return '#39f';
    else if (temp < 77)
        return '#0c6';
    else if (temp < 90)
        return '#fc0';
    else if (temp < 100)
        return '#f60';
    else if (temp < 110)
        return '#f00';
    else
        return '#c00';
}

let tempSpan = function(tempIn) {
    let temp = parseInt(tempIn);
    var kls = "";
    if (temp < -10)
        kls="temp-dangercold";
    else if (temp < 20)
        kls="temp-verycold";
    else if (temp < 45)
        kls="temp-cold";
    else if (temp < 67)
        kls="temp-cool";
    else if (temp < 77)
        kls="temp-comfy";
    else if (temp < 90)
        kls="temp-warm";
    else if (temp < 100)
        kls="temp-hot";
    else if (temp < 110)
        kls="temp-veryhot";
    else
        kls="temp-dangerhot";
    return `<span class="tempSpan ${kls}">${temp}</span>`;
}


/*
    span.dewp-verydry { background-color:#9cc; }
    span.dewp-dry { background-color:#3cc; }
    span.dewp-comfy { background-color:#0c6; color:#fff; }
    span.dewp-humid { background-color:#fc0;}
    span.dewp-sticky { background-color:#f60; color:#fff; }
    span.dewp-tropical { background-color:#f03; color:#fff; }
*/

var dewpColorMap = function(dewp) {
    if (dewp < 35)
        return '#add';
    else if (dewp < 50)
        return '#4dd';
    else if (dewp < 62)
        return '#0c6';
    else if (dewp < 70)
        return '#fc0';
    else if (dewp < 75)
        return '#f60';
    else
        return '#f00';
}

let dewpSpan = function(dewpIn) {
    let dewp = parseInt(dewpIn);
    if (dewp < 35)
        kls = "dewp-verydry";
    else if (dewp < 50)
        kls = "dewp-dry";
    else if (dewp < 62)
        kls = "dewp-comfy";
    else if (dewp < 70)
        kls = "dewp-humid";
    else if (dewp < 75)
        kls = "dewp-sticky";
    else
        kls = "dewp-tropical";
    return `<span class="dewpSpan ${kls}">${dewp}</span>`;
}

function divit(txt,classes="") {
    if (classes !== "") {
        return `<div class="${classes}">${txt}</div>`;
    } else {
        return `<div>${txt}</div>`;
    }
}

function windColorMap(speed) {

    windSpeeds = [
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
        [157.0,'#ff3d01']
    ];

    const offScaleColor = '#a00000';

    var retval = offScaleColor;
    
    for (level of windSpeeds) {
        if (speed<level[0]) {
            retval = level[1];
            break;
        }
    }

    // const stillColor = '#fff';
    // const stillSpeed = 2.0;
    // const breezeColor = '#c4e1ed';
    // const breezeSpeed = 5.0;
    // const lightWindColor = '#64b9dc';
    // const lightWindSpeed = 10.0;
    // const windyColor = '#64abdc';
    // const windySpeed = 15.0;
    // const veryWindyColor = '#5092dc';
    // const veryWindySpeed = 25.0;
    // const veryVeryWindyColor = '#3572e3';
    // const tropStorm1Speed = 38.0;
    // const tropStorm1Color = '#41d046';
    // const tropStorm2Speed = 50.0;
    // const tropStorm2Color = '#97e52b';
    // const tropStorm3Speed = 60.0;
    // const tropStorm3Color = '#d0fa16';
    // const cat1Speed = 73.0;
    // const cat1Color = '#ffff11';
    // const cat2Speed = 96.0;
    // const cat2Color = '#ffbb01';
    // const cat3Speed = 111.0;
    // const cat3Color = '#ff7901';
    // const cat4Speed = 130.0;
    // const cat4Color = '#ff3d01';
    // const cat5Speed = 157.0;
    // const cat5Color = '#a00000';

    // if (speed<stillSpeed) {
    //     retval = stillColor;
    // } else if (speed<breezeSpeed) {
    //     retval = breezeColor;
    // } else if (speed<lightWindSpeed) {
    //     retval = lightWindColor;
    // } else if (speed<windySpeed) {
    //     retval = windyColor;
    // } else if (speed<veryWindyColor) {
    //     retval = veryWindyColor;
    // } else if (speed<tropStorm1Speed) {
    //     retval = veryVeryWindyColor;
    // } else if (speed<tropStorm2Speed) {
    //     retval = tropStorm1Color;
    // } else if (speed<tropStorm3Speed) {
    //     retval = tropStorm2Color;
    // } else if (speed<cat1Speed) {
    //     retval = tropStorm3Color;
    // } else if (speed<cat2Speed) {
    //     retval = cat1Color;
    // } else if (speed<cat3Speed) {
    //     retval = cat2Color;
    // } else if (speed<cat4Speed) {
    //     retval = cat3Color;
    // } else if (speed<cat5Speed) {
    //     retval = cat4Color;
    // } else {
    //     retval = cat5Color;
    // }

//    console.log(speed, retval);
    return retval;
}

function popColorMap(pop) {

    pops = [
        [10.0, '#ffffff'],
        [30.0, '#64b9dc'],
        [50.0, '#3572e3'],
        [70.0, '#41d046'],
        [80.0, '#ffff11'],
        [90.0, '#ff3d01']
    ];

    const offScaleColor = '#a00000';

    var retval = offScaleColor;
    
    for (cpop of pops) {
        if (pop<cpop[0]) {
            retval = cpop[1];
            break;
        }
    }

    return retval;
}

function qpfColorMap(qpf) {

    qpfs = [
        [0.01, '#ffffff'],
        [0.1, '#dddddd'],
        [0.25, '#b2def7'],
        [0.5, '#5bb6fc'],
        [0.75, '#1430e9'],
        [1.0, '#87fd15']
        [1.5, '#4fc519'],
        [2.0, '#357237'],
        [2.5, '#fdfd07'],
        [3.0, '#fcce20'],
        [4.0, '#fc9918'],
        [5.0, '#f9261b']
        [6.0, '#c41c1c'],
        [8.0, '#7c0616'],
        [10.0, '#fe01f9'],
    ];

    const offScaleColor = '#8f38c7';

    var retval = offScaleColor;
    
    for (row of qpfs) {
        if (qpf<row[0]) {
            retval = row[1];
            break;
        }
    }

    return retval;
}

function barParams(hour) {
    console.log(hour.FCTTIME.pretty, hour.temp);
    return [
            tempColorMap(parseInt(hour.temp.english)),
            dewpColorMap(parseInt(hour.dewpoint.english)),
            `hsl(${hour.wdir.degrees},100%,50%)`,
            windColorMap(parseInt(hour.wspd.english)),
            popColorMap(parseFloat(hour.pop)),
            qpfColorMap(parseFloat(hour.qpf.english))
        ];
}


function colorbar(day) {
    const pixWidth = 6;
    const pixHeight = 6;
    const numBars = barParams(day.hours[0]).length;

    var bar = document.createElement('canvas');
    bar.width = ((day.hours.length) * pixWidth)+2;
    bar.height = (numBars*pixHeight)+2; 

    var ctx = bar.getContext('2d');
    var ctr = 0;
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

function loadConditions() {
    var container = document.getElementById("container");
    var wx = document.wx;
    var days = {};
    for (per of wx.hourly_forecast) {
        // console.log(per.FCTTIME.yday);
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
        
        var hi = tempSpan(day.high.fahrenheit);
        var lo = tempSpan(day.low.fahrenheit);
        var dp = dewpSpan(dewp);

        var cbdiv = document.createElement('div');
        cbdiv.classList.add("colorbar");
        cbdiv.appendChild(colorbar(td));
        var hl = divit(`${hi}&nbsp;${lo}&nbsp;${dp}`,"hl");
        
        newdiv.innerHTML = `${wi}${ds}${hl}`;
        newdiv.appendChild(cbdiv);

        container.appendChild(newdiv);
    }
};

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
