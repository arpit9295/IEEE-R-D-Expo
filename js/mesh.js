//sourced from arpit9295.github.io
//licenced under GNU GPL v3

(function(){
	var div=document.getElementById("mesh");
	var canvas=document.createElement("canvas");
	canvas.id="mesh_canvas";
	var context=canvas.getContext("2d");
	div.appendChild(canvas);
	canvas.height= div.clientHeight;
	canvas.width= div.clientWidth;
	var ch=canvas.height, cw=canvas.width;
	var rect = canvas.getBoundingClientRect();
	var node, mouse, number;
	var	threshold=200, velocity=5;
	var pcolor="#fff", bcolor="#111", base=255, mul=239;
	function init(){
		number=cw*ch*30/(800*600);
		node=[];
		mouse={
			x:0,
			y:0
		};
		for(var i=0 ; i<number ; i++){
			node.push({
				x:Math.floor(Math.random()*cw),
				y:Math.floor(Math.random()*ch),
				vx:Math.floor((Math.random()-0.5)*velocity),
				vy:Math.floor((Math.random()-0.5)*velocity)
			});
		}
		
		k=setInterval(draw, 35);
	}
	$(document).mousemove(function (d){
		mouse.x=d.pageX-rect.left, mouse.y=d.pageY-rect.top;
	});
	$(document).mousedown(function (d){
			node.push({
				x:mouse.x,
				y:mouse.y,
				vx:Math.floor((Math.random()-0.5)*velocity),
				vy:Math.floor((Math.random()-0.5)*velocity)
			});
			number++;
	});
	init();
	function drawLine(x1, y1, x2, y2){
		var d=Math.sqrt((x1-x2)*(x1-x2)+(y1-y2)*(y1-y2));
		if(d<threshold){
			t=base-Math.floor((d/threshold)*mul);
			context.strokeStyle="rgb(" + t + "," + t + "," + t + ")";
			context.beginPath();
			context.moveTo(x1, y1); 
			context.lineTo(x2, y2);
			context.stroke();
			context.closePath();
		}
	}
	init();
	function draw(){
	context.fillStyle=bcolor;
	context.fillRect(0,0,cw,ch);
	context.fillStyle=pcolor;
	
		for(var i=0 ; i<number ; i++){
			for(var j=i+1 ; j<number ; j++){
				drawLine(node[i].x,node[i].y,node[j].x,node[j].y);
			}
			node[i].x+=node[i].vx;
			node[i].y+=node[i].vy;
			if(node[i].x>(cw+threshold))
				node[i].x=(-threshold);	
			else if(node[i].x<(-threshold))
				node[i].x=(cw+threshold);
			if(node[i].y>(ch+threshold))
				node[i].y=(-threshold);
			else if(node[i].y<(-threshold))
				node[i].y=(ch+threshold);
		}
		for(var j=0 ; j<number ; j++){
			drawLine(mouse.x,mouse.y,node[j].x,node[j].y);
			context.fillRect(node[j].x-1,node[j].y-1,2,2);
			
		}
		context.fillRect(mouse.x-2,mouse.y-2,4,4);
	};
})();

//sourced from arpit9295.github.io
//licenced under GNU GPL v3
