let colors=["pink","red","orange","blue","pink","red","orange","blue"];
let gameSeq=[];
let userSeq=[];
let highestScore=0;
let started=false;
let level=0;
let h3=document.querySelector("h3");
let h2=document.querySelector("h2");

document.addEventListener("keypress",function(){
    if(started==false){
        console.log("game is started");
        started=true;
        levelUp();
    }
});
function btnFlash(btn){
    //console.log("Adding game flash class to:", btn.id);
    btn.classList.add("gameflash");

    setTimeout(function(){
        //console.log("Removing game flash class from:", btn.id);
        btn.classList.remove("gameflash");
    },250);
}

function userFlash(btn){
    //console.log("Adding userflash class to:", btn.id);
    btn.classList.add("userflash");

    setTimeout(function(){
        //console.log("Removing userflash class from:", btn.id);
        btn.classList.remove("userflash");
    },250);
}

function levelUp(){
    userSeq=[];
    level++;
    h3.innerText=`Level ${level}`;

    let idx=Math.floor(Math.random()*8);
    let id=colors[idx];
    gameSeq.push(id);
    let randbtn=document.querySelector(`#${id}`);
    btnFlash(randbtn);
    console.log(gameSeq)
};

function checkAns(idx){
    if(userSeq[idx]==gameSeq[idx]){
        if(userSeq.length==gameSeq.length){
            setTimeout(levelUp,1000);
        }
    }
    else{
        if(highestScore<level){
            highestScore=level;  
        }
        h2.innerHTML=`Simon Game <br> Highest Score is <b>${highestScore}</b>.`;
        h3.innerHTML=`Game over! Your score was <b>${level}</b> <br> Press any key to start.`;
        document.querySelector("body").style.backgroundColor="red";
        setTimeout(function(){
            document.querySelector("body").style.backgroundColor="white";
        },150);
        reset();
    }
}
function btnPress(){
    let btn=this;
    userFlash(btn);
    let userColor=btn.getAttribute("id");
    userSeq.push(userColor);
    checkAns(userSeq.length-1);
}

let buttons=document.querySelectorAll(".btn");
for(btn of buttons){
    btn.addEventListener("click",btnPress)
}

function reset(){
    started=false;
    userSeq=[];
    gameSeq=[];
    level=0;
}