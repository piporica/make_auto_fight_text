let turn;
let P1 = {};
let P2 = {};

function PlayerSet(){
    P1 = {
        name : "P1",
        atk : document.getElementById("player1Atk").value,
        def : document.getElementById("player1Def").value,
        dex : document.getElementById("player1Dex").value,
        str : document.getElementById("player1Str").value,
    }
    P2 = {
        name : "P2",
        atk : document.getElementById("player2Atk").value,
        def : document.getElementById("player2Def").value,
        dex : document.getElementById("player2Dex").value,
        str : document.getElementById("player2Str").value,
    }
}

function checkAllStatOk(){
    function check(value){
        return "0" <= value && value <= "8"
    }
    if(!check(P1.atk)) alert("P1의 atk값을 확인해주세요.");
    if(!check(P1.def)) alert("P1의 def값을 확인해주세요.");
    if(!check(P1.dex)) alert("P1의 dex값을 확인해주세요.");
    if(!check(P1.str)) alert("P1의 str값을 확인해주세요.");
    
    if(!check(P2.atk)) alert("P2의 atk값을 확인해주세요.");
    if(!check(P2.def)) alert("P2의 def값을 확인해주세요.");
    if(!check(P2.dex)) alert("P2의 dex값을 확인해주세요.");
    if(!check(P2.str)) alert("P2의 str값을 확인해주세요.");
}

function checkTurn(){
    let rst = p1.name + "의 민첩 : " + P1.dex + " " + p1.name + "의 민첩 : " + P2.dex;
    if(P1.dex > P2.dex){
        turn = P1;
        rst += " -> P1 선공"
    }
    else if(P1.dex < P2.dex){
        turn = P2;
        rst += " -> P2 선공"
    }
    else{
        rst += "\n 선공결정 다이스 : "
        do{
            var p1Dice = Math.getRandomInt(1,7)
            var p2Dice = Math.getRandomInt(1,7)
        }while (p1Dice != p2Dice)

        rst += "P1 다이스 : " + p1Dice + " " + "P2 다이스" + p2Dice
        if(p1Dice > p2Dice){
            rst += " -> P1선공"
            turn = P1;
        }
        else{
            rst += " -> P2선공"
            turn = P2;
        }
    }
}
