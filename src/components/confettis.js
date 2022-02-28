let nouvelle,
  ancienne,
  pression;

let themeCouleur = [
  '#f44336', '#e91e63', '#9c27b0', '#673ab7', '#3f51b5',
  '#2196f3', '#03a9f4', '#00bcd4', '#009688', '#4CAF50',
  '#8BC34A', '#CDDC39', '#FFEB3B', '#FFC107', '#FF9800',
  '#FF5722'
];
class Particule {
  constructor(parent, p5) {
    this.parent = parent;
    this.gravite = parent.gravite;
    this.reinit(p5);
    this.forme = p5.round(p5.random(0, 1));
    this.etape = 0;
    this.prise = 0;
    this.priseFacteur = p5.random(-0.02, 0.02);
    this.multFacteur =p5.random(0.01, 0.08);
    this.priseAngle = 0;
    this.priseVitesse = 0.05;
  }
  reinit(p5) {

    this.position = this.parent.position.copy();
    this.position.y = p5.random(-20, -100);
    this.position.x = p5.random(0, width);
    this.velocite = p5.createVector(p5.random(-6, 6), p5.random(-10, 2));
    this.friction = p5.random(0.995, 0.98);
    this.taille = p5.round(p5.random(5, 15));
    this.moitie = this.taille / 2;
    this.couleur = p5.color(p5.random(themeCouleur));

  }
  dessiner() {

    this.etape = 0.5 + Math.sin(this.velocite.y * 20) * 0.5;

    this.prise = this.priseFacteur + Math.cos(this.priseAngle) * this.multFacteur;
    this.priseAngle += this.priseVitesse;
    translate(this.position.x, this.position.y);
    rotate(this.velocite.x * 2);
    scale(1, this.etape);
    noStroke();
    fill(this.couleur);

    if (this.forme === 0) {
      rect(-this.moitie, -this.moitie, this.taille, this.taille);
    } else {
      ellipse(0, 0, this.taille, this.taille);
    }

    resetMatrix();
  }
  integration() {
    this.velocite.add(this.gravite);
    this.velocite.x += this.prise;
    this.velocite.mult(this.friction);
    this.position.add(this.velocite);
    if (this.position.y > height) {
      this.reinit(p5);
    }

    if (this.position.x < 0) {
      this.reinit(p5);
    }
    if (this.position.x > width + 10) {
      this.reinit(p5);
    }
  }
  rendu() {
    this.integration();
    this.dessiner();

  }
}
class SystemeDeParticules {
  constructor(nombreMax, position, gravite, creatVector, p5) {
    this.position = position.copy();
    this.nombreMax = nombreMax;
    this.gravite =creatVector;
    this.friction = 0.98;
    // le tableau 
    this.particules = [];
    for (var i = 0; i < this.nombreMax; i++) {
      this.particules.push(new Particule(this, p5));
    }
  }
  rendu(p5) {
    if (pression) {
      var force = p5.Vector.sub(nouvelle, ancienne);
      this.gravite.x = force.x / 20;
      this.gravite.y = force.y / 20;
    }

    this.particules.forEach(particules => particules.rendu(p5));
  }
}
let confettis;

export function setup(p5) {
  p5.createCanvas(p5.windowWidth, p5.windowHeight);
  p5.frameRate(60);
  ancienne = p5.createVector(0, 0);
  nouvelle = p5.createVector(0, 0);
  confettis = new SystemeDeParticules(500, p5.createVector(p5.width / 2, -20), p5.createVector(0, 0.1));
}

export function draw(p5) {
  
  //background(color("#111"));
  nouvelle.x = mouseX;
  nouvelle.y = mouseY;
  confettis.rendu(p5);
  ancienne.x = nouvelle.x;
  ancienne.y = nouvelle.y;
}

function windowResized(p5) {
  p5.resizeCanvas(p5.windowWidth, p5.windowHeight);
  confettis.position = p5.createVector(p5.width / 2, -40);
}

function mousePressed() {
  next = 0;
  pression = true;
}

function mouseReleased() {
  pression = false;
  confettis.gravite.y = 0.1;
  confettis.gravite.x = 0;
}