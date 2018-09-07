var mic;
var song;
var fft;
var button;
var volhistory = [];
var w;
var amp;
var Color = [
    "#ECDB54",
    "#E94B3C",
    "#EC9787",
    "#00A591",
    "#BFD641",
    "#95DEE3",
    "#CE3175",
    "#F7786B",
    "#FAE03C",
    "#79C753",
    "#DD4124", ];

var eq_color = [
    "#99b433",
    "#FAE03C",
    "#00aba9",
  "#EC9787",
    "#E94B3C",
    "#ee1111",   
];


var color_prevent = 100;

function preload() {




    // song = loadSound('./music.mp3');
    amp = new p5.Amplitude();
    fft = new p5.FFT(0.8);
   Use_Mic();

}


function Use_Mic() {
    mic = new p5.AudioIn();
    mic.start();
    fft.setInput(mic);
    amp.setInput(mic);

}


function Get_color() {
    var col = Math.round(Math.random() * 10);
    return color(Color[col]);
}






function setup() {
            // song.play();


    angleMode(DEGREES);
    createCanvas(windowWidth-20, windowHeight-200);
    w = window.innerWidth / 150;

}



function windowResized() {
    w = window.innerWidth / 180;
    resizeCanvas(windowWidth-20, windowHeight-200);
}





function draw() {




    var spectrum = fft.analyze();
    var amp_data = amp.getLevel();
    volhistory.push(amp_data);
    var middle_y = (windowHeight - 200) / 2;
    var middle_x = (windowWidth - 20) / 2;
    amp_data *= 100;



    background(0);

    beginShape();
    for (var i = 0; i < 360; i++) {
        var r = (volhistory[i] * width / 4) + 50;
        fill(Get_color());
        var x = middle_x + r * cos(i);
        var y = middle_y / 2 + r * sin(i);
        vertex(x, y);
    }
    endShape();







    if (volhistory.length > 360) {
        volhistory.shift();
    }

    noStroke();
    for (var i = 50; i < 200; i++) {
        var AMP = spectrum[i];
        if (i<180){var y = map(AMP, 0, 500, height, 0); }
        else{var y = map(AMP, 0, 150, height, 0); }
        
        var plot = w * (i-50);
        var c = Math.round(map(y, height, height/4, 0, 4));

        fill(color(eq_color[c]));
        rect(plot + 10, y, w, height - y);
    }
}
