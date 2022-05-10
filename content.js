/*Code insipired by elibretto's extension at: https://chrome.google.com/webstore/detail/nba-timezone-extension/lpbnlpmmjelgjabfaopaalpficcbinjj?hl=en-GB
I only updated his extension to work in 2022 out of necessity since it wasnt update since 2018*/

//ScoreboardGame_gameStatusText__wwj1V | Div Home Page
//h9 text-xs uppercase  | Div Games
//ScheduleStatusText_base__R5PI0  |  Div Schedule

//maybe regex will be needed in the future if Div class changes, example: document.querySelectorAll('div[class^="ScoreboardGame_gameStatusText"]');

function change(x){
  for(var i = 0; i < x.length; i++){
    t = x[i].innerHTML

    bits = t.split(/[\s]+/);

    if(bits[0] != 'Q1' && bits[0] != 'Q2' && bits[0] != 'Q3' && bits[0] != 'Q4' && bits [0] != 'End' && bits [0] != 'Half'){ // Making so the algorithm wont run if the game is already live.
      t = bits[0];
      split = t.split(/[:]+/);

      t = parseInt(split[0]) - offset;

      if(t >= 12 && bits[1] == "PM") {
        bits[1] = "AM";
        if (t > 12) {
          t = t - 12;
        }
      }
          
      if(t >= 12 && bits[1] == "AM") {
        bits[1] = "PM";
        if (t > 12) {
          t = t - 12;
        }
      }
      x[i].innerHTML = t + ":" + split[1] + " " + bits[1];
    }
  }
}

window.onload =
function run() {

  ETOffset = -240;
  offset = (new Date().getTimezoneOffset() + ETOffset) / 60;
  ct = new Date().toString().split(/[\s]+/);
  localExtension = ct[5];

  timesRun = 0;

  x=document.querySelectorAll('div[class^="ScoreboardGame_gameStatusText"]'); // Home Page
  change(x);

  y=document.getElementsByClassName('h9 text-xs uppercase'); //Games Tab
  change(y);

  z=document.getElementsByClassName('ScheduleStatusText_base__R5PI0'); // Schedule Tab
  change(z);

  //window.addEventListener('click', setTimeout(run, 2000));   trying to make Games Tab update every time you see a different date.
}