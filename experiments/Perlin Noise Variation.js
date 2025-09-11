function setup() {
  createCanvas(windowWidth, windowHeight);
}
let rez = 0.06;

function draw() 
{
  background(220);
  noStroke();

  for(y = 0; y < height; y+=1){
    for(x = 0; x < width; x+=1){
      var n = noise(y*rez,x*rez);
      // map noise to circle size
      let r = map(n, 0, 1, 5, 30);


      //r += random(-3, 3);

      fill(n*255);
      circle(x,y,r);
    }
  }
}