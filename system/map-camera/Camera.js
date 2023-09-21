'use strict';

export class Camera {

    // System
    keyManager;

    // Variables
    velX = 0;
    velY = 0;
    x;
    y;

    // Constant
    maxVelX = 100;
    maxVelY = 100;
    velChange = 10;

    constructor(x, y, keyManager) {
        this.keyManager = keyManager;
        this.x = x;
        this.y = y;
    }

    update() {
        this.#updateVelocity();
        this.#move();
    }
    
    #updateVelocity() {
        if (this.keyManager.isKeyPressed("KeyD")) {
            this.velX -= this.velChange;
            if (Math.abs(this.velX) > this.maxVelX) {
                velX = -maxVelX;
            }

        }
        if (this.keyManager.isKeyPressed("KeyA")) {
              this.velX += this.velChange;
              if (this.velX > this.maxVelX) {
                velX = maxVelX;
            }
              
        }
        if (this.keyManager.isKeyPressed("KeyW")) {
            this.velY += this.velChange;
            if (this.velY > this.maxVelY) {
              velY = maxVelY;
          }
            
        }
        if (this.keyManager.isKeyPressed("KeyS")) {
            this.velY -= this.velChange;
            if (Math.abs(this.velY) > this.maxVelY) {
                velY = -maxVelY;
            }

        }
    }

    #move() {
        this.x += this.velX;
        this.y += this.velY;
        this.velX = this.velX * .8
        this.velY = this.velY * .8
    }
    
}