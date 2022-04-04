var cvs = document.getElementById("canvas");
var ctx = cvs.getContext("2d");

//Carregar imagens
var butterfly = new Image();
var bg = new Image();
var fg = new Image();
var pipeNorth = new Image();
var pipeSouth = new Image();

butterfly.src = "images/butterfly.png";
bg.src = "images/bg.png";
fg.src = "images/fg.png";
pipeNorth.src = "images/treeNorth.png";
pipeSouth.src = "images/treeSouth.png";

//Variaves de intervalo, posicao, pontuacao e queda
var gap = 85;
var constant;

var bX = 10;
var bY = 150;

var gravity = 1;

var score = 0;

var fly = new Audio();
var scor = new Audio();

fly.src = "sounds/fly.mp3";
scor.src = "sounds/score.mp3";

//Se pressionar qualquer tecla, sobe
document.addEventListener("keydown",moveUp);

function moveUp(){
    bY -= 25;
    fly.play();
}

//Coordenadas da arvore
var tree = [];

tree[0] = {
    x : cvs.width,
    y : 0
};

//Funcao que posiciona as imagens
function draw(){
    
    ctx.drawImage(bg,0,0);
    
    
    for(var i = 0; i < tree.length; i++){
        
        constant = pipeNorth.height+gap;
        ctx.drawImage(pipeNorth,tree[i].x,tree[i].y);
        ctx.drawImage(pipeSouth,tree[i].x,tree[i].y+constant);
             
        tree[i].x--;
        
        if( tree[i].x == 125 ){
            tree.push({
                x : cvs.width,
                y : Math.floor(Math.random()*pipeNorth.height)-pipeNorth.height
            }); 
        }

        //Colisao, recarrega a pagina
        if( bX + butterfly.width >= tree[i].x && bX <= tree[i].x + pipeNorth.width && (bY <= tree[i].y + pipeNorth.height || bY+butterfly.height >= tree[i].y+constant) || bY + butterfly.height >=  cvs.height - fg.height){
            location.reload();
        }
        
        if(tree[i].x == 5){
            score++;
            scor.play();
        }
        
        
    }

    ctx.drawImage(fg,0,cvs.height - fg.height);
    
    ctx.drawImage(butterfly,bX,bY);
    
    bY += gravity;
    
    ctx.fillStyle = "#000";
    ctx.font = "20px Arial";
    ctx.fillText("Score : "+score,10,cvs.height-20);
    
    requestAnimationFrame(draw);
    
}

draw();
