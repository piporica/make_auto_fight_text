let turnPlayer;
let nextPlayer;

let turncount = 0;
let P1 = {};
let P2 = {};
let fight_div = document.getElementById("fight")
let chDataArr

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


function reset(){
    turncount = 0;
    setStatEnable(true);
    setPlayBtnEnable(true);
    
    while(fight_div.hasChildNodes()){
        fight_div.removeChild(fight_div.firstChild); 
    }
}

function gameStart(){
    if(turncount == 0){
        let btn = document.getElementById('battle_play_btn')
        btn.innerText = "턴 진행";

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
    if(!check(P1.atk)) str += "\nP1의 atk값을 확인해주세요.";
    if(!check(P1.def)) str += "\nP1의 def값을 확인해주세요.";
    if(!check(P1.dex)) str += "\nP1의 dex값을 확인해주세요.";
    if(!check(P1.str)) str += "\nP1의 str값을 확인해주세요.";
    
    if(!check(P2.atk)) str += "\nP2의 atk값을 확인해주세요.";
    if(!check(P2.def)) str += "\nP2의 def값을 확인해주세요.";
    if(!check(P2.dex)) str += "\nP2의 dex값을 확인해주세요.";
    if(!check(P2.str)) str += "\nP2의 str값을 확인해주세요.";

    let isOk = check(P1.atk) && check(P1.def) && check(P1.dex) && check(P1.str)
    &&check(P2.atk) && check(P2.def) && check(P2.dex) && check(P2.str)
    
    if(!isOk) alert(str);

    return isOk;
}

function checkTurn(){

    let turn_div = document.createElement("div")
    fight_div.append(turn_div);

    let state = P1.name + "의 민첩 : " + P1.dex + " / " + P1.name + "의 민첩 : " + P2.dex;
    let rst = ""
    if(P1.dex > P2.dex){
        turnPlayer = P1;
        nextPlayer = P2;
        rst += " -> P1 선공"
    }
    else if(P1.dex < P2.dex){
        turnPlayer = P2;
        nextPlayer = P1;
        rst += " -> P2 선공"
    }
    else{
        rst += "동일 속도로 다이스 굴림 ▶ "
        do{
            var p1Dice = getRandomInt(1,7)
            var p2Dice = getRandomInt(1,7)
        }while (p1Dice == p2Dice)

        rst += "P1 다이스 : " + p1Dice + " / " + "P2 다이스" + p2Dice
        if(p1Dice > p2Dice){
            rst += " -> P1선공"
            turnPlayer = P1;
            nextPlayer = P2;
        }
        else{
            rst += " -> P2선공"
            turnPlayer = P2;
            nextPlayer = P1;
        }
    }

    turn_div.innerHTML = '<br/>' +state + '<br/>' + rst
}

function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min)) + min; //최댓값은 제외, 최솟값은 포함
  }

function playTurn(){
    //헤더
    let play_div = document.createElement("div")
    let nowTurn = document.createElement("h3")
    nowTurn.innerText = turncount +". "+ turnPlayer.name +" 의 공격";

    // 공격처리
    let atk_div = document.createElement("div")

    //턴 플레이어가 공격, 상대가 방어      
    let damage = (Number(turnPlayer.atk) + ((Number(turnPlayer.str)-1)/2)) 
    damage = damage * getRandomInt(1,61)      
    if(turnPlayer.HP <= 30) damage = damage * 1.5

    let defence = (Number(nextPlayer.def)*1.5 + ((Number(nextPlayer.dex)+1)/2))
    defence = defence * getRandomInt(1,41);
    
    //체력감소
    
    let rstDamage = damage - defence;
    if(rstDamage < 0) {
        rstDamage = 0;
        nextPlayer.speed -= nextPlayer.dex;
      }
    nextPlayer.HP -= rstDamage;

    //텍스트 출력    
    let atk_text = turnPlayer.name + "의 데미지 : " + damage;
    let def_text = nextPlayer.name + "의 방어값 : " + defence;
    let rst1 = turnPlayer.name + "은/는 " + nextPlayer.name + "에게 " + (damage - defence) + "의 데미지를 주었다!"    
    let rst2 = nextPlayer.name + "은/는 공격을 완전히 방어했다!"
    //let hpRst = nextPlayer.name + "의 체력 : " + nextPlayer.HP;
    let hpRst = nextPlayer.name + "의 상태 : " + selectSentence(nextPlayer.HP)
    let rst = defence >= damage ? rst2 : rst1

    atk_div.innerHTML = atk_text + '<br/>' + def_text + '<br/>' + rst + '<br/>' + hpRst;
    play_div.append(nowTurn)
    play_div.append(atk_div)

    fight_div.append(play_div);
    
    //턴 플레이어 변경
    turnPlayer.speed += 8 - turnPlayer.dex;
    if(nextPlayer.speed <= turnPlayer.speed){
        let temp = turnPlayer;
        turnPlayer = nextPlayer;
        nextPlayer = temp;
    }

}

function selectSentence(hp) {
    hp = Number(hp)
    if(hp >= 200) return "건강함";
    if(hp >= 150) return "어질어질함, 경상";
    if(hp >= 70) return "무릎이 꺾임, 중상";
    if(hp >= 30) return "무언가 잘못되었음을 느낌, 중상";    
    if(hp > 0) return "눈 앞이 어두워지기 시작함, 빈사";
    if(hp <= 0) return "기절";
}

function clearCheck(){
    if(turnPlayer.HP * nextPlayer.HP <= 0){
        let winner = turnPlayer.HP > nextPlayer.HP ? turnPlayer : nextPlayer;
        let rst = "게임 종료!"
        let rst1 = "승자 : " + winner.name;
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

    document.getElementById("player2Atk").disabled = !isEnable;
    document.getElementById("player2Def").disabled = !isEnable;
    document.getElementById("player2Dex").disabled = !isEnable;
    document.getElementById("player2Str").disabled = !isEnable;
}