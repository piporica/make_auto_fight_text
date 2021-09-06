let count = 30;
let chDataArr = [];
setting();
let fight_div = document.getElementById('fight');

function  setting () {
  chDataArr = chData.stats;
  chDataArr.forEach(P1 => {
    P1.wins = 0;
    P1.HP = P1.str * 120
    P1.speed = 0;
  })
}

function reset(){
  while(fight_div.hasChildNodes()){
      fight_div.removeChild(fight_div.firstChild); 
  }
  setting();
}

  function fight(P1, P2) {
    let turnPL;
    let nextPL;
    //턴결정
    if(checkP1Turn(P1, P2)){
      turnPL = P1
      nextPL = P2
    }
    else
    {
      turnPL = P2
      nextPL = P1
    }

    while(Number(turnPL.HP * nextPL.HP) > 0){
      let damage = ((turnPL.atk) + ((turnPL.str))) * getRandomInt(1,71)
      let defence = (nextPL.def + (nextPL.dex) ) * getRandomInt(1,71);
      let rstDamage = damage - defence;
      if(rstDamage < 0) rstDamage = 0;
      
      nextPL.HP -= rstDamage;

        let temp = turnPL;
        turnPL = nextPL;
        nextPL = temp;
    } 

    let winner = turnPL.HP > nextPL.HP ? turnPL : nextPL;
    
    if(winner.name == P1.name) {
      P1.wins += 1;
    }
    else P2.wins += 1;
    
    P1.HP = P1.str * 120;
    P2.HP = P2.str * 120;
    P1.speed = 0;
    P2.speed = 0;

    console.log(P1.name, P2.name, winner.name)
  }

function checkP1Turn(P1, P2){
  if(P1.dex > P2.dex) return true;
  else if(P1.dex < P2.dex) return false;
  else {
    let p1Dice;
    let p2Dice;
    do{
      p1Dice = getRandomInt(1,7) 
      p2Dice = getRandomInt(1,7) 
    }while(p1Dice != p2Dice)

    let rst = p1Dice > p2Dice ? true : false;
    return rst;
  }
}

function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min)) + min; //최댓값은 제외, 최솟값은 포함
}

function simulate(params) {
  
var _promise = function (param) {

    return new Promise(function (resolve) {
      
      chDataArr.forEach(P1 => {
        chDataArr.forEach(P2 =>{
          if(P1.name != P2.name)
          for(let i = 0; i < count ; i++)
          {
            fight(P1, P2);
          }
        })
      });
      resolve("해결 완료");
    });
  };

  //Promise 실행
  _promise(true)
  .then(function (text) {
    // 성공시
    console.log(text);
    showRst()

  });
}

function showRst () {
  chDataArr.forEach(PL => {  
    let rst = ""
    rst += (PL.name).padEnd(17, ' ') 
    +'/'+ PL.atk +'/' + PL.def +'/'+ PL.dex +'/'+ PL.str +'/'+ PL.wins + '<br/>'
    fight_div.innerHTML += rst; 
  })
}
