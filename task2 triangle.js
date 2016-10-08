function main() {

  	var canvas = document.getElementById('webgl');
	var gl = getWebGLContext(canvas);
	if (!gl){
		console.log('Failed to find context');
	}

	tapCoordinates = [];
	tapVertices = [];
	var program = initShaders( gl, "vertex-shader", "fragment-shader" );
	gl.useProgram (program);
	gl.program = program;

	var a_Position = gl.getAttribLocation(program, 'a_Position');
	if (a_Position < 0) { 
		console.log ("Failed to Get Position"); 
		return;	
	}
	canvas.onmousedown = function(ev) {click(ev,program, gl, canvas, a_Position,  tapCoordinates );};

	
	
			 render(gl,a_Position,tapCoordinates,program);
}

function render(gl,a_Position,tapCoordinates,program){
	gl.clearColor(0.0,0.0,0.0,1.0);
	gl.clear(gl.COLOR_BUFFER_BIT);
	
	var len = tapCoordinates.length;
	for (var i = 0; i < len; i+=1)
	{
		var loc = tapCoordinates[i];
		var vertices = [loc[0]-0.1,loc[1]-0.1,loc[0]+0.3,loc[1]-0.1,loc[0]+0.3,loc[1]+0.1,loc[0]-0.1,loc[1]+0.1 ];
		var noOfDim = 2;
		var numberOfVertices = vertices.length/noOfDim;
		tapVertices.push(vertices);
		initBuffer(gl,noOfDim,vertices,program,a_Position);
		
		
		gl.vertexAttrib3f(a_Position, loc[0], loc[1], 1.0);

		gl.drawArrays(gl.TRIANGLE_FAN,0,numberOfVertices);	
	}
	


}

function click(ev,program,gl,canvas,a_Position,tapCoordinates){

	var x = ev.clientX; // x coordinate of a mouse pointer
	var y = ev.clientY; // y coordinate of a mouse pointer
	var rect = ev.target.getBoundingClientRect();

	x = ((x - rect.left) - canvas.height/2)/(canvas.height/2);
	y = (canvas.width/2 - (y - rect.top))/(canvas.width/2);

	tapCoordinates.push([x, y]);
	render(gl,a_Position,tapCoordinates,program);
	


}
function initBuffer(gl,noOfDim,vertices,program,a_Position){
	var vertexBuffer = gl.createBuffer();
	if(!vertexBuffer){
		console.log('Failed to create');return -1;
	}

	gl.bindBuffer(gl.ARRAY_BUFFER,vertexBuffer);
	gl.bufferData(gl.ARRAY_BUFFER,flatten(vertices),gl.STATIC_DRAW);

	
	gl.vertexAttribPointer(a_Position,noOfDim,gl.FLOAT,false,0,0);
	gl.enableVertexAttribArray(a_Position);

	


}