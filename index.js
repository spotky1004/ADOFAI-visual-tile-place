//init
canvas = document.querySelector('#canvas');
c = canvas.getContext('2d');
map = new ADOFAI();
univScale = 1;
absPos = [0, 0];

//drawCanvas
function drawCanvas() {
  c.clearRect(0, 0, canvas.width, canvas.height);
  c.beginPath();
  c.rect(0, 0, canvas.width, canvas.height);
  c.fillStyle = '#000';
  c.fill();
  unitLeng = canvas.width/100*univScale;
  var tileLeng = 2;
  var posNow = [canvas.width/2+canvas.width*absPos[0], canvas.height/2+canvas.width*absPos[1]];
  var lastDeg = 90;
  for (var i = 0; i < map.pathData.length; i++) {
    c.beginPath();
    c.lineWidth = 0.00001;
    c.strokeStyle = "#debb7b";
    c.arc(posNow[0], posNow[1], unitLeng, 0, Math.PI*2);
    c.stroke();
    c.fillStyle = "#debb7b";
    c.fill();
    c.beginPath();
    c.moveTo(posNow[0], posNow[1]);
    c.lineTo(posNow[0]+tileLeng*Math.sin(Math.rad((lastDeg+180)%360))*unitLeng, posNow[1]-tileLeng*Math.cos(Math.rad((lastDeg+180)%360))*unitLeng);
    c.lineWidth = unitLeng*2;
    c.stroke();
    c.beginPath();
    c.moveTo(posNow[0], posNow[1]);
    c.lineTo(posNow[0]+tileLeng*Math.sin(Math.rad((map.pathData[i].absoluteAngle+270)%360))*unitLeng, posNow[1]-tileLeng*Math.cos(Math.rad((map.pathData[i].absoluteAngle+270)%360))*unitLeng);
    c.lineWidth = unitLeng*2;
    c.stroke();
    posNow = [posNow[0]+(tileLeng*2+0.2)*Math.sin(Math.rad((map.pathData[i].absoluteAngle+270)%360))*unitLeng, posNow[1]-(tileLeng*2+0.2)*Math.cos(Math.rad((map.pathData[i].absoluteAngle+270)%360))*unitLeng];
    lastDeg = (map.pathData[i].absoluteAngle+270)%360;
  }
}

//loop
setInterval( function () {
  canvas.width = innerWidth;
  canvas.height = innerHeight;
  keyLoop();
  drawCanvas();
}, 50);

//functions
function zoom(event) {
  univScale *= (1+-Math.sign(event.deltaY)/33);
}
window.onwheel = zoom;
function keyLoop() {
  var screenSpeed = 0.005;
  if (keyCode[37]) absPos[0] += screenSpeed;
  if (keyCode[39]) absPos[0] -= screenSpeed;
  if (keyCode[38]) absPos[1] += screenSpeed;
  if (keyCode[40]) absPos[1] -= screenSpeed;
}

//basic function
function findIndex(arr, toFind) {
  for (var i = 0; i < arr.length; i++) {
    if (arr[i] == toFind) {
      return i;
    }
  }
  return -1;
}

keyCode = {};
(function(){
  document.addEventListener('keydown', function(e){
    keyCode[e.keyCode] = 1;
    keyNow = e.keyCode;
    if (keyNow == 49) map.pathData.push(new ADOFAI.PathData(ADOFAI.PathData.ABSOLUTE_ANGLE_LIST[findIndex(ADOFAI.PathData.ABSOLUTE_ANGLE_LIST, 90)]));
    if (keyNow == 50) map.pathData.push(new ADOFAI.PathData(ADOFAI.PathData.ABSOLUTE_ANGLE_LIST[findIndex(ADOFAI.PathData.ABSOLUTE_ANGLE_LIST, 180)]));
    if (keyNow == 51) map.pathData.push(new ADOFAI.PathData(ADOFAI.PathData.ABSOLUTE_ANGLE_LIST[findIndex(ADOFAI.PathData.ABSOLUTE_ANGLE_LIST, 270)]));
    if (keyNow == 52) map.pathData.push(new ADOFAI.PathData(ADOFAI.PathData.ABSOLUTE_ANGLE_LIST[findIndex(ADOFAI.PathData.ABSOLUTE_ANGLE_LIST, 360)]));
    if (keyNow == 53) map.pathData.push(new ADOFAI.PathData(ADOFAI.PathData.ABSOLUTE_ANGLE_LIST[findIndex(ADOFAI.PathData.ABSOLUTE_ANGLE_LIST, 45)]));
    if (keyNow == 54) map.pathData.push(new ADOFAI.PathData(ADOFAI.PathData.ABSOLUTE_ANGLE_LIST[findIndex(ADOFAI.PathData.ABSOLUTE_ANGLE_LIST, 135)]));
    if (keyNow == 55) map.pathData.push(new ADOFAI.PathData(ADOFAI.PathData.ABSOLUTE_ANGLE_LIST[findIndex(ADOFAI.PathData.ABSOLUTE_ANGLE_LIST, 225)]));
    if (keyNow == 56) map.pathData.push(new ADOFAI.PathData(ADOFAI.PathData.ABSOLUTE_ANGLE_LIST[findIndex(ADOFAI.PathData.ABSOLUTE_ANGLE_LIST, 315)]));
  })
  document.addEventListener('keyup', function(e){
    keyCode[e.keyCode] = 0;
  })
})();

//overriding!
Math.rad = function(degrees) {
  return degrees * Math.PI / 180;
};
