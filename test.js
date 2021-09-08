let count = 500;
let chDataArr = [];
setting();
let fight_div = document.getElementById('fight');
let turn_sum = 0;
let gamecount = 0;

function  setting () {
  chDataArr = chData.stats;
  chDataArr.forEach(P => {
    P.wins = 0;
    P.HP = P.str * 80
    P.speed = 0;
    P.avgturn = 0;
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

    var now_turn = 0;

    var atkPlus = 0;
    var defMinus = 0;

    while(Number(turnPL.HP * nextPL.HP) > 0){
      //공격보정치   
      if(now_turn > 4){
        atkPlus += 1.3;
        defMinus -= 1.5;
      }

      let damage = (Number(turnPL.atk)* 1.2 + ((Number(turnPL.str)-1)/2)) + atkPlus
      damage = damage * getRandomInt(1,51)
      if(turnPL.HP < 50) damage = damage * 1.5

      let defence = ((Number(nextPL.def) ) * 1.8 + ((Number(nextPL.dex)-1)/2)) + defMinus
      defence = defence * getRandomInt(1,31);

      let rstDamage = damage - defence;
      if(rstDamage < 0) {
        rstDamage = 0;
        nextPL.speed -= nextPL.dex;
      }
      nextPL.HP -= rstDamage;
      turnPL.speed += 8 - Number(turnPL.dex);
   
      if(nextPL.speed < turnPL.speed){
        let temp = turnPL;
        turnPL = nextPL;
        nextPL = temp;
      }
      now_turn += 1;
    } 

    let winner = turnPL.HP > nextPL.HP ? turnPL : nextPL;
    turn_sum += now_turn;
    gamecount += 1;
    
    if(winner.name == P1.name) {
      P1.wins += 1;
    }
    else P2.wins += 1;
    
    P1.HP = P1.str * 80;
    P2.HP = P2.str * 80;
    P1.speed = 0;
    P2.speed = 0;

    return now_turn;
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
        var p_turnsum = 0;
        chDataArr.forEach(P2 =>{
          if(P1.name != P2.name){
            for(let i = 0; i < count ; i++)
            {
              p_turnsum += fight(P1, P2);
            }
          }
        })
        P1.avgturn = p_turnsum/((count-1) * chDataArr.length);
      });
      
     fight(chDataArr[0], chDataArr[1])
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
    +'/'+ PL.atk +'/' + PL.def +'/'+ PL.dex +'/'+ PL.str +'/'+ PL.wins + '/' + Math.round(PL.avgturn) + '<br/>'
    fight_div.innerHTML += rst; 
  })

  let avgturn = turn_sum/gamecount; 
  fight_div.prepend("평균 턴수 : " + Math.round(avgturn) + "\n")
}
