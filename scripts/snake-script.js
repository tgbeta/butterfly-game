const cvs = document.getElementById("snake");
const ctx = cvs.getContext("2d");

// Cria a caixa onde andara a cobra
const box = 32;

// Carrega imagens
const ground = new Image();
ground.src = "images/ground.png";

const foodImg = new Image();
foodImg.src = "images/food.png";

// Carrega audio
let dead = new Audio();
let eat = new Audio();
let up = new Audio();
let right = new Audio();
let left = new Audio();
let down = new Audio();

dead.src = "audio/dead.mp3";
eat.src = "audio/eat.mp3";
up.src = "audio/up.mp3";
right.src = "audio/right.mp3";
left.src = "audio/left.mp3";
down.src = "audio/down.mp3";

// Cria a cobra
let snake = [];

snake[0] = {
    x : 9 * box,
    y : 10 * box
};

// Cria a comida
let food = {
    x : Math.floor(Math.random()*17+1) * box,
    y : Math.floor(Math.random()*15+3) * box
}

// Cria a pontuacao
let score = 0;

//Controla a cobra baseada na numeracao das teclas pressionadas
let d;

document.addEventListener("keydown",direction);

function direction(event){
    let key = event.keyCode;
    if( key == 37 && d != "RIGHT"){
        left.play();
        d = "LEFT";
    }else if(key == 38 && d != "DOWN"){
        d = "UP";
        up.play();
    }else if(key == 39 && d != "LEFT"){
        d = "RIGHT";
        right.play();
    }else if(key == 40 && d != "UP"){
        d = "DOWN";
        down.play();
    }
}

// Checa se ha colisao
function collision(head,array){
    for(let i = 0; i < array.length; i++){
        if(head.x == array[i].x && head.y == array[i].y){
            return true;
        }
    }
    return false;
}

// Funcao que desenha tudo no canvas
function draw(){   
    ctx.drawImage(ground,0,0);   
    for( let i = 0; i < snake.length ; i++){
        ctx.fillStyle = ( i == 0 )? "green" : "white";
        ctx.fillRect(snake[i].x,snake[i].y,box,box);
        
        ctx.strokeStyle = "red";
        ctx.strokeRect(snake[i].x,snake[i].y,box,box);
    }  
    //Desenha a comida em locais aleatorios
    ctx.drawImage(foodImg, food.x, food.y);
    
    // Antiga posicao da cabeca da cobra
    let snakeX = snake[0].x;
    let snakeY = snake[0].y;
    
    // Desenha a cobra de acordo com a direcao
    if( d == "LEFT") snakeX -= box;
    if( d == "UP") snakeY -= box;
    if( d == "RIGHT") snakeX += box;
    if( d == "DOWN") snakeY += box;
    
    // Se a cobra come comida, aumenta a pontuacao, cria a comida em um novo lugar e aumenta a cobra adicionando nova cabeca
    if(snakeX == food.x && snakeY == food.y){
        score++;
        eat.play();
        food = {
            x : Math.floor(Math.random()*17+1) * box,
            y : Math.floor(Math.random()*15+3) * box
        }
    }else{
        snake.pop();
    }
    
    // Adiciona nova cabeca
    let newHead = {
        x : snakeX,
        y : snakeY
    }
    
    // Fim do jogo se colisao
    if(snakeX < box || snakeX > 17 * box || snakeY < 3*box || snakeY > 17*box || collision(newHead,snake)){
        clearInterval(game);
        dead.play();
    }  
    snake.unshift(newHead);
    
    ctx.fillStyle = "white";
    ctx.font = "45px Changa one";
    ctx.fillText(score,2*box,1.6*box);
}

// Chama a funcao que desenha tudo a cada 100ms
let game = setInterval(draw,100);
