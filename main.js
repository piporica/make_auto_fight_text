let turnPlayer;
let nextPlayer;

let turncount = 0;
let P1 = {};
let P2 = {};
let fight_div = document.getElementById("fight")
let chDataArr
let atkPlus;
let defMinus;

init();

function init() {
    charactorSetting()
}

function charactorSetting() {
    chDataArr = chData.stats;

    for(let i = 0 ; i < chDataArr.length ; i++){
        let newOption1 = document.createElement('option');
        let newOption2 = document.createElement('option');
        newOption1.innerText = chDataArr[i].name;
        newOption2.innerText = chDataArr[i].name;
        document.getElementById('P1Select').append(newOption1);
        document.getElementById('P2Select').append(newOption2);
    }
}

function P1selected() {
    let selectbox1 = document.getElementById('P1Select')

    let nowSelect = chDataArr[selectbox1.options.selectedIndex]
    document.getElementById('Player1Name').innerHTML = (nowSelect.name + "  | ")
    document.getElementById('player1Atk').value = nowSelect.atk    
    document.getElementById('player1Def').value = nowSelect.def
    document.getElementById('player1Dex').value = nowSelect.dex
    document.getElementById('player1Str').value = nowSelect.str
    document.getElementById('player1HP').value = nowSelect.HP
}

function P2selected() {
    let selectbox2 = document.getElementById('P2Select')

    let nowSelect = chDataArr[selectbox2.options.selectedIndex]
    document.getElementById('Player2Name').innerHTML = (nowSelect.name + "  | ")
    document.getElementById('player2Atk').value = nowSelect.atk    
    document.getElementById('player2Def').value = nowSelect.def
    document.getElementById('player2Dex').value = nowSelect.dex
    document.getElementById('player2Str').value = nowSelect.str
    document.getElementById('player2HP').value = nowSelect.HP
}

function auto() {
    reset()
    BattleStart()
    while(!clearCheck()){
        BattleIsGoing()
    }    
}

function reset(){
    turncount = 0;
    atkPlus = 0;
    defMinus = 0;

    setStatEnable(true);
    setPlayBtnEnable(true);
    
    let btn = document.getElementById('battle_play_btn')
    btn.innerText = "?????? ??????";

    while(fight_div.hasChildNodes()){
        fight_div.removeChild(fight_div.firstChild); 
    }
}

function gameStart(){
    if(turncount == 0){
        let btn = document.getElementById('battle_play_btn')
        btn.innerText = "??? ??????";
        BattleStart();
    }
    else{
        BattleIsGoing();
    }
}

function PlayerSet(){
    
    let selectbox1 = document.getElementById('P1Select')
    let nowSelect = chDataArr[selectbox1.options.selectedIndex]

    P1 = {
        name : nowSelect.name ,
        atk : document.getElementById("player1Atk").value,
        def : document.getElementById("player1Def").value,
        dex : document.getElementById("player1Dex").value,
        str : document.getElementById("player1Str").value,
        HP :  document.getElementById("player1HP").value,
        speed : 0 
    }
    let selectbox2 = document.getElementById('P2Select')
    let nowSelect2 = chDataArr[selectbox2.options.selectedIndex]
    P2 = {
        name : nowSelect2.name,
        atk : document.getElementById("player2Atk").value,
        def : document.getElementById("player2Def").value,
        dex : document.getElementById("player2Dex").value,
        str : document.getElementById("player2Str").value,        
        HP :  document.getElementById("player2HP").value,
        speed : 0 
    }
}

function BattleIsGoing(){
    turncount += 1;
    playTurn();
    clearCheck();
}

function BattleStart(){
    setStatEnable(false);
    PlayerSet();
    if(!checkAllStatOk()) return;
    checkTurn();
    BattleIsGoing();
}

function checkAllStatOk(){
    function check(value){
        return '0' <= value && value <='8'
    }
    str = "";
    if(!check(P1.atk)) str += "\nP1??? atk?????? ??????????????????.";
    if(!check(P1.def)) str += "\nP1??? def?????? ??????????????????.";
    if(!check(P1.dex)) str += "\nP1??? dex?????? ??????????????????.";
    if(!check(P1.str)) str += "\nP1??? str?????? ??????????????????.";
    
    if(!check(P2.atk)) str += "\nP2??? atk?????? ??????????????????.";
    if(!check(P2.def)) str += "\nP2??? def?????? ??????????????????.";
    if(!check(P2.dex)) str += "\nP2??? dex?????? ??????????????????.";
    if(!check(P2.str)) str += "\nP2??? str?????? ??????????????????.";

    let isOk = check(P1.atk) && check(P1.def) && check(P1.dex) && check(P1.str)
    &&check(P2.atk) && check(P2.def) && check(P2.dex) && check(P2.str)
    
    if(!isOk) alert(str);

    return isOk;
}

function checkTurn(){

    let turn_div = document.createElement("div")
    fight_div.append(turn_div);

    let state = P1.name + "??? ?????? : " + P1.dex + " / " + P1.name + "??? ?????? : " + P2.dex;
    let rst = ""
    if(P1.dex > P2.dex){
        turnPlayer = P1;
        nextPlayer = P2;
        rst += " -> P1 ??????"
    }
    else if(P1.dex < P2.dex){
        turnPlayer = P2;
        nextPlayer = P1;
        rst += " -> P2 ??????"
    }
    else{
        rst += "?????? ????????? ????????? ?????? ??? "
        do{
            var p1Dice = getRandomInt(1,7)
            var p2Dice = getRandomInt(1,7)
        }while (p1Dice == p2Dice)

        rst += "P1 ????????? : " + p1Dice + " / " + "P2 ?????????" + p2Dice
        if(p1Dice > p2Dice){
            rst += " -> P1??????"
            turnPlayer = P1;
            nextPlayer = P2;
        }
        else{
            rst += " -> P2??????"
            turnPlayer = P2;
            nextPlayer = P1;
        }
    }

    turn_div.innerHTML = '<br/>' +state + '<br/>' + rst
}

function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min)) + min; //???????????? ??????, ???????????? ??????
  }

function playTurn(){
    //??????
    let play_div = document.createElement("div")
    let nowTurn = document.createElement("h3")
    nowTurn.innerText = turncount +". "+ turnPlayer.name +" ??? ??????";

    // ????????????
    let atk_div = document.createElement("div")

    //??????/?????? ????????? ??????
    if(turncount > 4){
        atkPlus += 1.3;
        defMinus -= 1.5;
    }

    //??? ??????????????? ??????, ????????? ??????      
    let damage = (Number(turnPlayer.atk) * 1.2 + ((Number(turnPlayer.str)-1)/2)) + atkPlus
    damage = damage * getRandomInt(1,51)      
    if(turnPlayer.HP <= 50) damage = damage * 1.5

    let defence = (Number(nextPlayer.def - defMinus) * 1.8  + ((Number(nextPlayer.dex)-1)/2))+ defMinus
    defence = defence * getRandomInt(1,31);
    
    //????????????
    let rstDamage = damage - defence;
    if(rstDamage < 0) {
        rstDamage = 0;
        nextPlayer.speed -= (nextPlayer.dex);
      }
    nextPlayer.HP -= rstDamage;

    //????????? ??????    
    let atk_text = turnPlayer.name + "??? ????????? : " + Math.round(damage);
    let def_text = nextPlayer.name + "??? ????????? : " + Math.round(defence);
    let rst1 = turnPlayer.name + "???/??? " + nextPlayer.name + "?????? " + Math.round((damage - defence)) + "??? ???????????? ?????????!"    
    let rst2 = nextPlayer.name + "???/??? ????????? ????????? ????????????!"
    //let hpRst = nextPlayer.name + "??? ?????? : " + nextPlayer.HP;
    let hpRst = nextPlayer.name + "??? ?????? : " + selectSentence(nextPlayer.HP)
    let rst = defence >= damage ? rst2 : rst1

    atk_div.innerHTML = rst + '<br/>' + hpRst;
    play_div.append(nowTurn)
    play_div.append(atk_div)
    fight_div.append(play_div);
    
    
    //??? ???????????? ??????
    turnPlayer.speed += 8 - turnPlayer.dex;
    if(nextPlayer.speed <= turnPlayer.speed){
        let temp = turnPlayer;
        turnPlayer = nextPlayer;
        nextPlayer = temp;
    }
    showHp();
}

function showHp() {
    let div = document.getElementById("HPshow");
    div.innerHTML = P1.name + "??? ?????? : " + Math.round(P1.HP) +'<br/>' 
                    + P2.name + "??? ?????? : "+ Math.round(P2.HP)

}

function selectSentence(hp) {
    hp = Number(hp)
    if(hp >= 200) return "?????????";
    if(hp >= 150) return "???????????????, ??????";
    if(hp >= 70) return "????????? ??????, ??????";
    if(hp >= 30) return "????????? ?????????????????? ??????, ??????";    
    if(hp > 0) return "??? ?????? ??????????????? ?????????, ??????";
    if(hp <= 0) return "??????";
}

function clearCheck(){
    if(turnPlayer.HP * nextPlayer.HP <= 0){
        let winner = turnPlayer.HP > nextPlayer.HP ? turnPlayer : nextPlayer;
        let rst = "?????? ??????!"
        let rst1 = "?????? : " + winner.name;
        turncount = 0;

        let winner_div = document.createElement("div");
        winner_div.innerHTML = rst + '<br/>' + rst1;
        fight_div.prepend(winner_div);

        setPlayBtnEnable(false);
        return true
    }
    return false
}

function setPlayBtnEnable(isEnable) {
    document.getElementById('battle_play_btn').disabled = !isEnable;   
}

function setStatEnable(isEnable) {
    document.getElementById("player1Atk").disabled = !isEnable;
    document.getElementById("player1Def").disabled = !isEnable;
    document.getElementById("player1Dex").disabled = !isEnable;
    document.getElementById("player1Str").disabled = !isEnable;
    document.getElementById("P1Select").disabled = !isEnable;

    document.getElementById("player2Atk").disabled = !isEnable;
    document.getElementById("player2Def").disabled = !isEnable;
    document.getElementById("player2Dex").disabled = !isEnable;
    document.getElementById("player2Str").disabled = !isEnable;
    document.getElementById("P2Select").disabled = !isEnable;
}
