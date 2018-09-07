var canvas = document.getElementById("draw");
var ctx = canvas.getContext("2d");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
ctx.textAlign = "center";
ctx.imageSmoothingEnabled= true;


function color_Linear(ctx) {
    var grd = ctx.createLinearGradient(0, 0, parseInt(Math.random() * 400),parseInt(Math.random() * 400), parseInt(Math.random() * 400), parseInt(Math.random() * 400));
    var color = get_Color();
    var name = Object.keys(color)[0];
    var value = Object.values(color)[0];
    var plus = 1/value.length,start=0;
    for(var i in value){
        grd.addColorStop(start, value[i]);
        start+= plus;
    }
    ctx.fillStyle = grd;
    ctx.fillRect(0, 0, canvas.width, canvas.height);
}



function color_Radial(ctx) {
    var grd = ctx.createRadialGradient(parseInt(Math.random() * canvas.width ), parseInt(Math.random() * canvas.width), parseInt(Math.random() * 400),parseInt(Math.random() * 400), parseInt(Math.random() * 400), parseInt(Math.random() * 400));
    var color = get_Color();
    var name = Object.keys(color)[0];
    var value = Object.values(color)[0];
    var plus = 1 / value.length,
        start = 0;
    for (var i in value) {
        grd.addColorStop(start, value[i]);
        start += plus;
    }
    ctx.fillStyle = grd;
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    ctx.fillRect(parseInt(Math.random() *  canvas.width), parseInt(Math.random() *canvas.height), canvas.width, canvas.height);
    

    
    
    
}

var text;


function generate(){
	text = get_quotes();
    draw(text);}
    


setInterval(function () {draw(text);},500);




function draw_rect(data,x,y,temp_font){
	ctx.beginPath();
	let wid = ctx.measureText(data).width/2+temp_font;
	ctx.rect(x-wid,y,ctx.measureText(data).width+2*temp_font,temp_font+10);
	ctx.fillStyle = "gold";
	ctx.shadowColor="black";
	ctx.fill();
	ctx.globalAlpha = 1;
	       
}



function draw(text) {
    color_Linear(ctx)
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    var loop = parseInt(Math.random()*10);
    for(var s=0;s<loop;s++){
    	ctx.shadowColor="black";
        ctx.shadowBlur=parseInt(Math.random()*40);
        color_Radial(ctx);
        ctx.shadowBlur = 0;
        
    }
    let splitter = 9;
    var counter = 0,
    data = "";
    let word = text.split(" ");
    let text_width = text.length;
    let font_size = canvas.width/100;
    let x = canvas.width / 2,
        y = canvas.height / 2;
    y -= parseInt(((word.length / splitter) * font_size))+100;

    for (let i in word) {
        ctx.font = `${font_size}px 'Josefin Slab'`;
        var temp_font = font_size;
        counter += 1;
        data += word[i] + " ";
        if (counter === splitter) {

            while (canvas.width - 200 > ctx.measureText(data).width) {
				ctx.font = `${temp_font}px 'Josefin Slab'`;
                temp_font += 1;
            }
      		
            // draw_rect(data,x,y,temp_font);
            ctx.fillStyle = "black";
            y += temp_font/1.2;
            ctx.shadowColor="white";
            ctx.shadowBlur=20;
            ctx.fillText(data, x, y);
            ctx.shadowBlur=0;
            counter = 0;
            data = "";
        }

        if (i == word.length - 1) {
        	temp_font = font_size;
            while (canvas.width - ctx.measureText(data).width*2 > ctx.measureText(data).width && ctx.measureText(data).width > 1) {
                ctx.font = `${temp_font}px 'Josefin Slab'`;
                temp_font += 1;
            }
            	
            // draw_rect(data,x,y,temp_font);
            ctx.fillStyle = "black";
            ctx.shadowColor="white";
            ctx.shadowBlur=20;
            ctx.fillText(data, x, y + temp_font);
            	ctx.shadowBlur=0;
        }
    }

    	
}






































// var image = new Image();
// // image.src = `https://source.unsplash.com/${canvas.width}x${canvas.height}/?nature`;
// image.src = "image1.jpg";
// image.onload = function () {
//     draw("Just Click And Type then save it as Image - Ashvini JAngid");
// }