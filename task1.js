
function main() {

  	var canvas = document.getElementById('webgl');
	var gl = getWebGLContext(canvas);
	if (!gl){
		console.log('Failed to find context');
	}

	var tapCoordinates = [];
	
	canvas.onmousedown = function(ev) {click(ev, gl, canvas, a_Position,  tapCoordinates );};
	
	var program = initShaders( gl, "vertex-shader", "fragment-shader" );
	gl.useProgram (program);
	gl.program = program;

	var a_Position = gl.getAttribLocation(program, 'a_Position');
	if (a_Position < 0) { 
		console.log ("Failed to Get Position"); 
		return;	
	}
	


	
	
	gl.clearColor(0.0, 0.0, 0.0, 1.0);
	gl.clear(gl.COLOR_BUFFER_BIT);
}

function click(ev, gl, canvas, a_Position,  tapCoordinates){
	var x = ev.clientX; // x coordinate of a mouse pointer
	var y = ev.clientY; // y coordinate of a mouse pointer
	var rect = ev.target.getBoundingClientRect();

	x = ((x - rect.left) - canvas.height/2)/(canvas.height/2);
	y = (canvas.width/2 - (y - rect.top))/(canvas.width/2);
	// Store the coordinates to g_points array
	
	s = x-0.1;
	tapCoordinates.push([s, y]);
	s = x+0.1;
	tapCoordinates.push([s, y]);
	t = y+0.1;
	tapCoordinates.push([x, t]);
	t = y-0.1;
	tapCoordinates.push([x, t]);
	
	
	render(gl, a_Position,  tapCoordinates);
}

function render (gl, a_Position, tapCoordinates){
	gl.clearColor(0.0, 0.0, 0.0, 1.0);
	gl.clear(gl.COLOR_BUFFER_BIT);
	
	
	var len = tapCoordinates.length;
	for (var i = 0; i < len; i+=1){
		var loc = tapCoordinates[i];
		
		gl.vertexAttrib3f(a_Position, loc[0], loc[1], 1.0);
	
		
		gl.drawArrays(gl.Points, 0, 1);	
	}
	
}