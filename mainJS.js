const score = document.querySelector(".score"),
      start = document.querySelector(".start"),
      gameArea = document.querySelector(".gameArea"),
      musik = document.querySelector(".audio");
      car = document.createElement("div"),
      game = document.querySelector('.game');

let embed = document.createElement('embed');
    
const keys = {
    ArrowUp: false,
    ArrowDown: false,
    ArrowRight: false,
    ArrowLeft: false,
};  

const settings = {
    start: false,
    score: 0,
    speed: 6,
    traffic: 3,
};

const enemys = [
    "./image/x60_06.png",
    "./image/porshe.png",
    "./image/car-top-view-png.png",
    "./image/auto-himchistka.png",
];

let indxSpeed = 0;

start.addEventListener("click", startGame);

document.addEventListener("keydown", startRun);
document.addEventListener("keyup", stopRun);

function getQuantityElements(heightElement){
    return document.documentElement.clientHeight / heightElement /*сюда +1 , если шо*/;
}

function addScore(){
    settings.score ++;
}

function startGame(){
    embed.setAttribute('autostart', 'true');
    // embed.setAttribute('src', './audio/fonovaya-muzyka-dlya-igr-1.mp3');
    
    game.append(embed);
    start.classList.add("hide");
    gameArea.innerHTML = "";
    car.style.left = "125px";
    car.style.top = "auto";
    car.style.bottom = "10px";
    for(let i = 0; i < getQuantityElements(100); i++){
       const line = document.createElement("div");
       line.classList.add("line");
       line.style.top = (i * 105) + "px";
       line.y = i * 103;
       gameArea.appendChild(line);
    }

    for(let i = 0; i <  getQuantityElements(100 * settings.traffic); i++){
        const enemy = document.createElement("div");
        enemy.classList.add("enemy");
        let indx = (Math.floor(Math.random() * 4));
        enemy.style.backgroundImage = "url(" + (enemys[indx]) + ")";
        enemy.y = -100 * settings.traffic * (i + 1);
        enemy.style.left = Math.floor(Math.random() * (gameArea.offsetWidth - 50)) + "px";
        enemy.style.top = enemy.y + "px";
        gameArea.appendChild(enemy);
    }


    settings.score = 0;
    settings.start = true;
    car.classList.add("car");
    gameArea.appendChild(car);
    settings.x = car.offsetLeft;
    settings.y = car.offsetTop;
    requestAnimationFrame(playGame);
    
}

function playGame(){

    if(settings.start){
        addScore();
        score.innerHTML = "SCORE<br/>" + settings.score;
        moveRoad();
        moveEnemy();

        if(keys.ArrowLeft && settings.x > 0){
            settings.x -= settings.speed;
        }

        if(keys.ArrowRight && settings.x < (gameArea.offsetWidth - (car.offsetWidth + 10))){
            settings.x += settings.speed;
        }

        if(keys.ArrowUp && settings.y > 0){
            settings.y -= settings.speed;
        }

        if(keys.ArrowDown && settings.y < (gameArea.offsetHeight - car.offsetHeight)){
            settings.y += settings.speed;
        }

       
        if(settings.score == 500){
            settings.speed += 2;
        }

        if(settings.score == 1000){
            settings.speed += 2;
        }

        if(settings.score == 1500){
            settings.speed += 2;
        }

        if(settings.score == 2000){
            settings.traffic -= 2;
        }
        
    car.style.left = settings.x + "px";
    car.style.top = settings.y + "px";

       
    requestAnimationFrame(playGame);
}
}

function startRun(event){  
  keys[event.key] = true;
}

function stopRun(event){
    keys[event.key] = false;
}

function moveRoad(){
    let lines = document.querySelectorAll(".line");
    lines.forEach(function(line){
        line.y += settings.speed;
        line.style.top = line.y + "px";

        if(line.y > document.documentElement.clientHeight){
            line.y = -100;
        }
    });

}

function moveEnemy(){
    let enemy = document.querySelectorAll(".enemy");
    enemy.forEach(function(item){
        let carRect = car.getBoundingClientRect();
        let enemyRect = item.getBoundingClientRect();

        if(carRect.top <= enemyRect.bottom &&
            carRect.right >= enemyRect.left  &&
            carRect.left <= enemyRect.right &&
            carRect.bottom >= enemyRect.top
            ){
            settings.start = false;
            start.classList.remove("hide");
            start.style.top = "60px";
            settings.speed = 6;
            settings.traffic = 3;
            embed.remove();
        }

     
        item.y += settings.speed - item.id;
        item.style.top = item.y + "px";
        /*if(item.mark == 3 && (enemyRect.top >= 120 && enemyRect.top <= 200)){
            let x = 50;
                    item.style.left = (item.x + 2) + "px";
             console.log(x);
        }*/

        if(item.y > document.documentElement.clientHeight){
            /*item.style.left = Math.floor(Math.random() * (gameArea.offsetWidth - 50)) + "px";*/
            item.style.backgroundImage = "url()";
            let indx = (Math.floor(Math.random() * 4));
            item.y = -100 * settings.traffic * (indx);
            indxId = (Math.floor(Math.random() * 4));
            item.id = indx;

            switch(indx){
                case 0:
                    item.style.left = 10 + "px";
                    break;
                
                case 1:
                    item.style.left = 80 + "px";
                    break;  
                    
                case 2:
                    item.style.left = 160 + "px";
                    break; 

                case 3:
                    item.style.left = 240 + "px";
                    break;      
            }
            indxIdBackgrow = (Math.floor(Math.random() * 4));
            item.style.backgroundImage = "url(" + (enemys[indxIdBackgrow]) + ")";
        }
    });
}

