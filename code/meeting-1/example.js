let playerX;
let playerY;
let playerSpeed = 5;

let bulletX;
let bulletY;
let bulletVelX;
let bulletVelY;
let bulletSpeed = 15;
let isShooting = false;

let enemyX;
let enemyY;
let enemyWidth = 40;
let enemyHeight = 40;

let distance;

function setup() {
  createCanvas(windowWidth, windowHeight);

  playerX = width / 2;
  playerY = height / 2;

  bulletX = playerX;
  bulletY = playerY;

  enemyX = random(0, width);
  enemyY = random(0, height);
}

function draw() {
  background("#F1F7ED");

  // Player movement
  if (keyIsDown(65)) {
    // a
    playerX -= playerSpeed;
  }
  if (keyIsDown(68)) {
    // d
    playerX += playerSpeed;
  }
  if (keyIsDown(87)) {
    // w
    playerY -= playerSpeed;
  }
  if (keyIsDown(83)) {
    // s
    playerY += playerSpeed;
  }

  if (isShooting) {
    // Bullet Movement
    bulletX += bulletVelX;
    bulletY += bulletVelY;

    // Collision with enemy
    if (
      bulletX > enemyX &&
      bulletX < enemyX + enemyWidth &&
      bulletY > enemyY &&
      bulletY < enemyY + enemyHeight
    ) {
      enemyX = random(0, width);
      enemyY = random(0, height);

      isShooting = false;
    }
  }

  enemyX += random(-1, 1);
  enemyY += random(-1, 1);

  // Drawing
  // Bullet
  if (isShooting) {
    fill("#C0CEA6");
    noStroke();
    circle(bulletX, bulletY, 20);
  }

  // Enemy
  fill("#DD614A");
  noStroke();
  rect(enemyX, enemyY, enemyWidth, enemyHeight);

  fill("black");
  circle(enemyX, enemyY, 10);

  // Player
  fill("#7CA982");
  stroke("#243E36");
  strokeWeight(3);
  circle(playerX, playerY, 50);
}

function mousePressed() {
  isShooting = true;

  bulletX = playerX;
  bulletY = playerY;

  // velocity = target - position
  bulletVelX = mouseX - bulletX;
  bulletVelY = mouseY - bulletY;

  // normalize velocity
  distance = dist(bulletX, bulletY, mouseX, mouseY);

  // SAME AS: bulletVelX = bulletVelX / distance;
  bulletVelX /= distance;
  bulletVelY /= distance;

  // scale to bullet speed
  bulletVelX *= bulletSpeed;
  bulletVelY *= bulletSpeed;
}
