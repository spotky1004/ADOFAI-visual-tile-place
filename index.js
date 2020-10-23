//init
canvas = document.querySelector('#canvas');
c = canvas.getContext('2d');
map = new ADOFAI();

//drawCanvas
function drawCanvas() {
  c.clearRect(0, 0, canvas.width, canvas.height);
  c.beginPath();
  c.rect(0, 0, canvas.width, canvas.height);
  c.fillStyle = '#000';
  c.fill();
  unitLeng = canvas.width/100;
  var tileLeng = 2;
  var posNow = [canvas.width/2, canvas.height/2];
  var lastDeg = 90;
  for (var i = 0; i < map.pathData.length; i++) {
    c.beginPath();
    c.lineWidth = 0.01;
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
  drawCanvas();
}, 50);

//basic function
function findIndex(arr, toFind) {
  for (var i = 0; i < arr.length; i++) {
    if (arr[i] == toFind) {
      return i;
    }
  }
  return -1;
}

//overriding!
Math.rad = function(degrees) {
  return degrees * Math.PI / 180;
};
