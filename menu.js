var IdlePlayer, moveUp, moveLeft, moveRight, house, houseOutside, factory, In, out, brickH, B1, B2, B3, underConstuction, win
var playerX = 200, playerY = 300, playerSpeed = 5
var gamestate = "in house", gameMode = "play"
var slum1, slum2, slum3
var backcolur = 0, backcolur2 = 0, backcolur3 = 0
var pX, hills, guy, $ = 0.00, job$ = 0.00, subToatal = 0
var speed = 2, Day = 1, week = 0, doneJob = 0

var bricks = 0, goodGlass = 0, okGlass = 0, badGlass = 0, runTime = 10.00

var timer = 60, waitTime = 0

var x = 0
var value1 = 0
var value2 = 0
var value3 = "bad"
var value4 = 0
var value5 = 0

var bad = 200
var good = 200  
var ok = 200
var combo = 0
var comboSize = 30

function preload()
{
  runing = loadImage("run with water.gif")

  IdlePlayer = loadImage("idle Player.gif")
  moveUp = loadImage("player move up-down.gif")
  moveLeft = loadImage("player move left.gif")
  moveRight = loadImage("player move right.gif")
  house = loadImage("inside.gif")
  hills = loadImage("hills.jpg")

  //slum1 = loadImage("slum1.png")
  //slum2 = loadImage("slum2.png")
  slum3 = loadImage("slum3..png")

  guy = loadImage("guy.gif")

  houseOutside = loadImage("slumhouse2.gif")

  dirt = loadImage("dirt.jpg")

  factory = loadImage("factory.png")

  In = loadImage("player make glass2.png")
  out = loadImage("player make glass1.png")

  brickH = loadImage("brick H.png")
  B1 = loadImage("move brick-1.png")
  B2 = loadImage("move brick-2.png")
  B3 = loadImage("brick smash.png")

  underConstuction = loadImage("under construction.png")

  win = loadImage("win.png")
}

function setup() {
  createCanvas(windowWidth, windowHeight-1);
  playerX = windowWidth/2-200
}

function draw() {
  background(backcolur);
  rectMode(CENTER)
  imageMode(CENTER)
  testMode()
  push()
  fill(255)
  textSize(30)
  if(gamestate != "water")
  {
  text("$: " + $, 20, 50)
  }
  pop()
  if(gamestate == "menu")
  {
  //displayMenu("main")
  }
  if(gamestate == "in house")
  {
    image(house, windowWidth/2, windowHeight/2, windowHeight, windowHeight)
    if(!keyIsDown(87)
    && !keyIsDown(83)
    && !keyIsDown(65)
    && !keyIsDown(68)){
      image(IdlePlayer, playerX, playerY, 250, 250);
    }
    if(playerX > windowWidth/2+200-250/2
    && playerX < windowWidth/2+200+250/2
    && playerY > 200-250/2
    && playerY < 200+250/2)
    {
      push()
      fill("white")
      textSize(20)
      text("Press [E] to go to work", windowWidth/2+100, 230)
      pop()

      if(keyIsDown(69))
      {
        gamestate = "job select menu";
        pX = windowWidth+200
        //backcolur = 152
        //backcolur2 = 118
        //backcolur3 = 84
      }
    }
    if(gameMode == "test"){
      push()
      fill("red") 
      rect(playerX, playerY, 3, 3)
      noFill()
      stroke("purple") 
      rect(playerX, playerY, 250, 250)
      if(playerX > windowWidth/2+200-250/2
      && playerX < windowWidth/2+200+250/2
      && playerY > 200-250/2
      && playerY < 200+250/2)
      {
        stroke("green") 
      }
      else
      {
        stroke("lime")
      }
      noFill()
      rect(windowWidth/2+200, 200, 250, 250)
      pop()
      }

      if(doneJob == 1)
      {
        push()
        fill(255)
        strokeWeight(10)
        rect(windowWidth/2, windowHeight/2,500, 300, 15)
        textSize(30)
        textAlign(CENTER)
        fill(0)
        text("pay", windowWidth/2, windowHeight/2-100)
        textAlign(LEFT)
        text("Sub total: $" + job$, windowWidth/2-230, windowHeight/2-50)
        text("food: -$3", windowWidth/2-230, windowHeight/2)
        if(week == 1)
        {
          text("rent: -$10", windowWidth/2-230, windowHeight/2+50)
        }
        //line(windowWidth/2-250, windowWidth/2+75, windowWidth/2+250, windowWidth/2+75)
        text("Total: $" + subToatal, windowWidth/2-230, windowHeight/2+100)
        textSize(15)
        textAlign(CENTER)
        text("press [Enter] to exit", windowWidth/2, windowHeight/2+130)
        if(keyIsDown(13))
        {
          week = 0
          job$ = 0
          subToatal = 0
          doneJob = 0
        }
        pop()
      }
      else
      {
      playerControler()
      }

      if($ < 0)
      {
        background(0)
        push()
        textAlign(CENTER)
        textSize(100)
        fill("red")
        text("You lose!", windowWidth/2, windowHeight/2)
        textSize(30)
        text("You went hungry...", windowWidth/2, windowHeight/2+150)
        pop()
      }

      if($ >= 50)
      {
        background(0)
        push()
        textAlign(CENTER)
        textSize(100)
        fill("Lime")
        text("You win!", windowWidth/2, windowHeight/2)
        textSize(30)
        text("You can pay for school!", windowWidth/2, windowHeight/2+150)
        pop()
      }
    
  }
  if(gamestate == "job select menu")
  {
    image(hills, windowWidth/2, windowHeight/2, windowWidth, windowHeight+200)
    backcolur = "purple"
    backcolur2 = undefined
    backcolur3 = undefined
    fill(152, 118, 84)
    rect(windowWidth/2, windowHeight, 9000, 200)
    image(houseOutside, 500, windowHeight-300, 1000, 500)
    displayMenu("job Select")
    if(pX > 400) {pX -= 2, image(moveLeft, pX, windowHeight-160, 200, 200)}
    else{image(IdlePlayer, pX, windowHeight-160, 200, 200)}
    image(guy, 200, windowHeight-150, 120, 120)
  }
  if(gamestate == "water")
  {
    runTime -= 0.001

    fill("purple")
    rect(windowWidth/2, windowHeight/2, windowWidth, windowHeight)

    x += speed

  if(value3 == "bad"){speed = 2}
  if(value3 === "ok"){speed = 3}
  if(value3 == "good"){speed = 4}
  if(value3 == "perfect"){speed = 5}
  text(value3, 500, 250)
  
  push()
  translate(x, 0)
  for(i = 0; i <= 60; i++)
  {
  image(dirt, i*500/2-(500/2*50), 250/2, 250, 250)
  image(dirt, i*500/2-(500/2*50), 750/2, 250, 250)
  image(dirt, i*500/2-(500/2*50), 1250/2, 250, 250)
  image(dirt, i*500/2-(500/2*50), 1500/2, 250, 250)
  image(dirt, i*500/2-(500/2*50), 1750/2, 250, 250)
  image(dirt, i*500/2-(500/2*50), 2000/2, 250, 250)
  }
  stroke("red")
  strokeWeight(40)
  line(-11000, -200, -11000, 3000)
  pop()

  image(runing, 1000, windowHeight/2, 300, 300)

  fill("gray")
  rect(100, 0, 200, 3000)

  fill("red")
  rect(100, windowHeight/2, 50, 600)
  fill("lime")
  rect(100, 180, 50, 270)
  fill("green")
  rect(100, 120, 50, 80)
  fill("purple")
  rect(100, 120, 50, 10)
  push()
  strokeWeight(10)
  line(125, value1+680, 75, value1+680)
  pop()
  
  if(value1 < 0)
    {
      value1 += 1
    }
  
  if (keyIsDown(32) && value1 < 100)
    {
      value1 -= 3
    }
    
      if(value1 > 0 || value1 > -360)
    {
      console.log("bad")
      value3 = "bad"
    }
    else if(value1 < -540 && value1 > -550)
    {
      console.log("perfect") 
      value3 = "perfect"
    }
    else if(value1 < -500 && value1 > -600)
    {
      console.log("good")
      value3 = "good"
    }
    else if(value1 < -360 || value1 > -500)
    {
      console.log("ok")
      value3 = "ok"
    }

    push()
    fill(0)
    textSize(30)
    text("$" + Math.round(runTime), windowWidth/2, 30)
    pop()

    if(x >= 12000)
    {
      $ += Math.round(runTime)
      job$ = Math.round(runTime)
      runTime = 10
      doneJob = 1
      gamestate = "in house"
      timer = 60
      backcolur = 0
      day += 1
      value1 = 0
      $ -= 3
      x = 0
      subToatal = job$ - 3
      if(Day == 7)
      {
        Day = 0
        week += 1
        $ -= 10
        subToatal -= 10
      }

    }
  }
  if(gamestate == "glass")
  {
    fill("purple")
    rect(windowWidth/2, windowHeight/2, windowWidth, windowHeight)
    push()
    image(factory, windowWidth/2+50, windowHeight/2, windowWidth+100, windowHeight)
    translate(windowWidth/2, windowHeight/2)
    rectMode(CORNER);
    bad -= 1
    good -= 5
    ok -= 5
    if(value2 == 0)
      {
        if(value1 > 200)
          {
            value2 = 1
          }
        value1 += speed
      }
      if(value2 == 1)
      {
        if(value1 < 0)
          {
            value2 = 0
          }
        value1 -= speed
      }
   
    textAlign(CENTER)
    textSize(30)
    
    fill("red")
    text("bad", 200, bad)
    
    fill("lime")
    text("ok", 200, ok)
    
    fill("green")
    text("good", 200, good)
    
    fill("red")
    rect(100, 300, 200, 50)
    fill("lime")
    rect(150, 300, 100, 50)
    fill("green")
    rect(180, 300, 40, 50)
    push()
    strokeWeight(10)
    line(value1+100, 300, value1+100, 350)
    pop()
    
    if(comboSize > 30)
      {
        comboSize -= 1
      }
    
  if (keyIsDown(32)) {
    if(waitTime <= 0)
    {
    image(out, 300, 600, 200, 200)
      if(value1 < 60 || value1 > 140)
      {
        console.log("bad")
        bad = 100
        badGlass += 1
        speed = 2
        combo = 0
        waitTime = 1*getFrameRate()
      }
      else if(value1 < 80 || value1 > 120)
      {
        console.log("ok")
        ok = 100
        okGlass += 1
        speed += 0.1
        combo += 0.4
        comboSize = 40
        waitTime = 1*getFrameRate()
      }
      else if(value1 < 90 || value1 > 110)
      {
        console.log("good")
        good = 100
        goodGlass += 1
        speed += 0.2
        combo += 0.8
        comboSize = 40
        waitTime = 1*getFrameRate()
      }
    } 
  }
    else
    {
      image(out, 300, 600, 200, 200)
    }
    pop()
    textSize(comboSize)
  }
  if(gamestate == "brick")
  {
    timer -= 1/getFrameRate()

    push()
    fill("purple")
    rect(windowWidth/2, windowHeight/2, windowWidth, windowHeight)
    image(brickH, windowWidth/2, windowHeight/2, windowWidth+400, windowHeight*3)
    push()
    translate(windowWidth/2-70, windowHeight/2)
    rectMode(CORNER);

    bad += 1/getFrameRate()
    good += 1/getFrameRate()
    ok -= 5
    if(value4 == 0)
      {
        if(value5 > 200 - 40)
          {
            value4 = 1
          }
        value5 += speed
      }
      if(value4 == 1)
      {
        if(value5 < 0)
          {
            value4 = 0
          }
        value5 -= speed
      }
    
      if(value2 == 0)
      {
        if(value1 > 200)
          {
            value2 = 1
          }
        value1 += 1
      }
      if(value2 == 1)
      {
        if(value1 < 0)
          {
            value2 = 0
          }
        value1 -= 1
      }
   
    textAlign(CENTER)
    textSize(30)
    
    fill("red")
    rect(100, 300, 200, 50)
    push()
    translate(value5, 0)
    fill("green")
    rect(100, 300, 40, 50)
    pop()
    push()
    strokeWeight(10)
    line(value1+100, 300, value1+100, 350)
    pop()
    if (good < 101)
    {
      image(B1, 200, 90, 300, 300)
    }
    else if(good < 102)
    {
      image(B2, 200, 90, 300, 300)
    }
    else if(bad < 101)
    {
      image(B1, 200, 90, 300, 300)
    }
    else if(bad < 102)
    {
      image(B3, 200, 90, 300, 300)
    }
    else
    {
      image(IdlePlayer, 200, 90, 300, 300)
    }
    
    if(comboSize > 30)
      {
        comboSize -= 1
      }
    
  if (keyIsDown(32)) {
    if(waitTime <= 0)
    if(value1 > value5 && value1 < value5 + 40)
      {
        console.log("good")
        good = 100
        speed += 0.2
        bricks += 1
        comboSize = 40
        waitTime = 2*getFrameRate()
      }
      else
      {
        console.log("bad")
        bad = 100
        speed = 2
        combo = 0
        waitTime = 2*getFrameRate()
      }
    }
    pop() 
    textSize(comboSize)
    //fill("black")
    //text("combo: " + round(combo), 100, 50)
    //pop() 
    push()
    textSize(comboSize)
    fill("black")
    text("bricks: " + bricks, 100, 50)
    pop()
    fill("black")
    text("time: " + Math.round(timer), 100, 80)
    if(timer <= 0)
    {
      $ += bricks/2
      job$ = bricks/2
      bricks = 0
      doneJob = 1
      gamestate = "in house"
      timer = 60
      backcolur = 0
      day += 1
      $ -= 3
      subToatal = job$ - 3
      if(Day == 7)
      {
        Day = 0
        week += 1
        $ -= 10
        subToatal -= 10
      }

    }
  }
  waitTime -= 1
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight-1);
}

function playerControler()
{
  //arrow keys
  //if(keyIsDown(LEFT_ARROW)) {playerX -= playerSpeed};
  //if(keyIsDown(RIGHT_ARROW)) {playerX += playerSpeed};
  //if(keyIsDown(UP_ARROW)) {playerY -= playerSpeed};
  //if(keyIsDown(DOWN_ARROW)) {playerY += playerSpeed};

  // A S W D
  if(keyIsDown(87) && playerY > 140) {playerY -= playerSpeed, AFKtimer = 0};
  if(keyIsDown(87)) {image(moveUp, playerX, playerY, 250, 250)};
  if(keyIsDown(83) && playerY < windowHeight-120) {playerY += playerSpeed, AFKtimer = 0};
  if(keyIsDown(83)) {image(moveUp, playerX, playerY, 250, 250)};
  if(keyIsDown(65) && playerX > 370) {playerX -= playerSpeed, AFKtimer = 0};
  if(keyIsDown(65)) {image(moveLeft, playerX, playerY, 250, 250)};
  if(keyIsDown(68) && playerX < windowWidth-370) {playerX += playerSpeed, AFKtimer = 0, image(moveRight, playerX, playerY, 250, 250)};
  if(keyIsDown(68)) {image(moveRight, playerX, playerY, 250, 250)};
}

function displayMenu(type)
{
  push()
  textAlign(CENTER)
  textSize(32)
  if(type == "main")
  {
    push()
    fill("yellow")
    rect(windowWidth/2, windowHeight/2+200, 270, 100, 15)
    pop()

    push()
    fill("black")
    text("Play", windowWidth/2-30, windowHeight/2+210);
    pop()

    if(mouseIsPressed)
    {
    if(mouseX >= 600-(270/2)
    && mouseX <= 600+(270/2)
    && mouseY >= 350-(100/2)
    && mouseY <= 350+(100/2))
      {
        gameState = "error"
      }
    }
  }
  if(type == "job Select")
  {
    push()
    stroke(0)
    strokeWeight(5)
    fill("yellow")
    rect(windowWidth-300, windowHeight/2+130, 270, 100, 15)
    pop()

    push()
    fill(0)
    text("water hauling", windowWidth-295, windowHeight/2+170, 270, 100, 15);
    pop()

    push()
    stroke(0)
    strokeWeight(5)
    fill("yellow")
    rect(windowWidth-300, windowHeight/2, 270, 100, 15)
    pop()

    push()
    fill(0)
    text("brick hauling", windowWidth-295, windowHeight/2+40, 270, 100, 15);
    pop()

    push()
    stroke(0)
    strokeWeight(5)
    fill("yellow")
    rect(windowWidth-300, windowHeight/2-130, 270, 100, 15)
    image(underConstuction, windowWidth-300, windowHeight/2-117, 270, 200)
    pop()

    push()
    fill(255)
    text("   coming soon...", windowWidth-295, windowHeight/2-90, 270, 100, 15);
    pop()

    push()
    textSize(40)
    fill(255)
    text("select a job...", windowWidth-300, 100, 270, 100, 15);
    pop()

    if(mouseIsPressed)
    {
    if(mouseX >= windowWidth/2+300-(270/2)
    && mouseX <= windowWidth/2+300+(270/2)
    && mouseY >= windowHeight/2-(100/2)
    && mouseY <= windowHeight/2+(100/2))
      {
        console.log("brick halling")
        gamestate = "brick"
      }
      if(mouseX >= windowWidth/2+300-(270/2)
      && mouseX <= windowWidth/2+300+(270/2)
      && mouseY >= windowHeight/2+130-(100/2)
      && mouseY <= windowHeight/2+130+(100/2))
        {
          console.log("whater halling")
          gamestate = "water"
        }
        if(mouseX >= windowWidth/2+300-(270/2)
        && mouseX <= windowWidth/2+300+(270/2)
        && mouseY >= windowHeight/2-130-(100/2)
        && mouseY <= windowHeight/2-130+(100/2))
          {
            //throw("error: this scean is under construction")
            console.log("error: this scean is under construction")
          }
      }
  }
  
    if(gamestate == "error")
    {
      //rgb(255,0,255)
      backcolur = 255
      backcolur2 = 0
      backcolur3 = 255
      throw("an error acered when loading this scean")
    }
  pop()
}

function testMode()
{
  if(keyIsDown(113))
  {
    gameMode = "test"
  }
  if(keyIsDown(115))
  {
    gameMode = "play"
  }
  if(gameMode == "test")
  {
    push()
      fill("white")
      text("fps: " + int(getFrameRate()), 10, 10)
      text("gameState: "+gamestate, 10, 20)
    pop()
  }
}
