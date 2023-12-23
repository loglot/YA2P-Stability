'use strict';

import { Hitbox } from "../map-player/Hitbox.js";

export class Enemy {

    x; velX = 0; maxVelX = 100;
    y; velY = 0; maxVelY = 50; avgVelY = 0
    noclipVelChange = 10; velChange = 4;
    friction = .8; airFriction = .85; hookFriction = .95;

    jump = 0; lastJump = 0; coyoteTime = 5;
    jumpVel = 30 ; float = .35; gravity = 1.5; 

    wallJumpLeft = false; wallJumpAmmountLeft = false;
    wallJumpRight = false; wallJumpAmmountRight = false;
    wallJumpVelY = 40 ; wallJumpVelX = 60

    respawnX; respawnVelX; 
    respawnY; respawnVelY;

    extra; camera; keyManager;
    map;

    enabled

    stuck = false; death = false; hidden = false;
    playerHitbox = new Array();

    constructor(x, y, extra) {
        this.x = x;
        this.y = y;

        this.game = extra

        this.keyManager = this.game.keyManager;
        this.map = this.game.map
        this.camera = this.game.camera

        this.#buildHitbox(-25, -75, 50, 125)
        this.enabled = false
    }

    #buildHitbox(x, y, width, height) {
        this.playerHitbox[0] = new Hitbox(x + 5, y + (height - 10), width - 10, 10); // bottom of hitbox
        this.playerHitbox[1] = new Hitbox(x + 5, y, width - 10, 10) // top of hitbox
        this.playerHitbox[2] = new Hitbox(x, y + 50, 10, height - 100) // small left of hitbox
        this.playerHitbox[3] = new Hitbox(x + width - 10, y + 50, 10, height - 100) // small right of hitbox
        this.playerHitbox[4] = new Hitbox(x, y + 30, 10, height - 60) // left of hitbox
        this.playerHitbox[5] = new Hitbox(x + width - 10, y + 30, 10, height - 60) // right of hitbox

        this.playerHitbox[100] = new Hitbox(x, y, width, height)
    }

    update() {
        if(this.enabled){
            this.lastJump = this.jump
            this.#updateVelocity()
            if (this.jump > 0) {
                this.wallJumpAmmountLeft = true
                this.wallJumpAmmountRight = true
            }
            this.hidden = this.death
        }


        
    }

    sleep(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }




    #updateVelocity() {
        if (this.x < this.game.player.x) {
            this.velX -= this.velChange;
            if (Math.abs(this.velX) > this.maxVelX) {
                this.velX = -this.maxVelX;
            }
            if (this.velY < 0 && this.wallJumpRight) {
                this.velY = this.velY / 2
            }

        }
        
        if (this.keyManager.isKeyPressed("KeyA")) {
            this.velX += this.velChange;
            if (this.velX > this.maxVelX) {
                this.velX = this.maxVelX;
            }    
            if (this.velY < 0 && this.wallJumpLeft) {
                this.velY = this.velY / 2
            }
        }

        if (this.keyManager.isKeyPressed("KeyW") || this.keyManager.isKeyPressed("Space")) {
            this.velY += this.float
            this.velY += this.float
                if (this.velY <= 0 && this.jump > 0) {
                    this.velY += this.jumpVel;     
                } else if (this.keyManager.wasKeyJustPressed("KeyW") || this.keyManager.wasKeyJustPressed("Space")) {
                    if (this.jump > 0) {
                        this.velY += this.jumpVel; 
                        
                        this.game.audio.jumpSound()
                    } else if (this.wallJumpLeft) {
                        if (this.velY < 0) {
                            this.velY += (this.wallJumpVelY - 10) / (this.wallJumpAmmountLeft / 2 + .4)
                        } else {
                            this.velY += ((this.wallJumpVelY - 10) / (this.wallJumpAmmountLeft / 2 + .4)) / 1.3
                        }
                        
                        this.velX -= this.wallJumpVelX
                        this.game.audio.wallJumpSound()
                        this.wallJumpAmmountLeft += .5
                        this.wallJumpAmmountRight = 1
                    } else if (this.wallJumpRight) {
                        if (this.velY < 0) {
                            this.velY += (this.wallJumpVelY - 10) / (this.wallJumpAmmountRight / 2 + .4)
                        } else {
                            this.velY += ((this.wallJumpVelY - 10) / (this.wallJumpAmmountRight / 2 + .4)) / 1.3
                        }
                        
                        this.velX += this.wallJumpVelX
                        this.game.audio.wallJumpSound()
                        this.wallJumpAmmountRight += .5
                        this.wallJumpAmmountLeft = 1
                    }
                }
            this.jump = 0

        }

        if (this.keyManager.isKeyPressed("KeyS")) {
            this.velY -= 2
            this.avgVelY += 4
        }

        if (this.jump == 5) {
            this.velX = this.velX * this.friction
        }  else if (this.game.hook.enabled == true) {
            this.velX = this.velX * this.hookFriction
        } else {
            this.velX = this.velX * this.airFriction
        }

        if (this.game.hook.enabled && false) {
            if 
            ((  this.keyManager.isKeyPressed("KeyA")    && 
                !this.keyManager.isKeyPressed("KeyD"))  && 
                -this.x < this.game.hook.x2             && 
                -this.y > this.game.hook.y2) 
                {
                    this.velY = this.velY + ((this.game.hook.y1 - this.game.hook.y2) / 300) + .1
            }
            if 
            ((  this.keyManager.isKeyPressed("KeyA")    && 
                !this.keyManager.isKeyPressed("KeyD"))  && 
                -this.x < this.game.hook.x2             && 
                -this.y < this.game.hook.y2 ) 
                {
                    this.velY = this.velY - ((this.game.hook.y1 - this.game.hook.y2) / 300)
            }
            if 
            ((  this.keyManager.isKeyPressed("KeyD")    && 
                !this.keyManager.isKeyPressed("KeyA"))  && 
                -this.x > this.game.hook.x2             && 
                -this.y > this.game.hook.y2) 
                {
                    this.velY = this.velY + ((this.game.hook.y1 - this.game.hook.y2) / 300) + .1
            }
            if 
            ((  this.keyManager.isKeyPressed("KeyD")    && 
                !this.keyManager.isKeyPressed("KeyA"))  && 
                -this.x > this.game.hook.x2             && 
                -this.y < this.game.hook.y2 ) 
                {
                    this.velY = this.velY - ((this.game.hook.y1 - this.game.hook.y2) / 300)
            }
            this.velY = this.velY * .99
        }
        
        this.velY = this.velY - this.gravity
        this.velY = this.velY * .997

        if (this.velY > this.maxVelY + 50) {
            this.velY = this.maxVelY + 50;
        }
        if (this.velY < -this.maxVelY) {
            this.velY = -this.maxVelY;
            console.log("fixed velocity")
        }

        this.avgVelY = (this.avgVelY + this.velY + Math.abs(this.velX))/3

        /*
        if (this.keyManager.isKeyPressed("KeyS")) {
            this.velY -= this.velChange;
            if (Math.abs(this.velY) > this.maxVelY) {
                velY = -maxVelY;
            }
        }
        */


    }

    #move() {
        this.x += this.velX //* this.game.main.deltaTime;
        this.y += this.velY;
        this.jump--
        this.#colide()
        //console.log(this.x, this.y)
    }


    #collisionCheck(part, i, type) {
        if  (  
        ((  this.playerHitbox[part].y -this.y >= type.hitboxes[i].y                                                                &&
            this.playerHitbox[part].y -this.y <= type.hitboxes[i].y + type.hitboxes[i].height)                                     || 
        (   this.playerHitbox[part].y + this.playerHitbox[part].height -this.y >= type.hitboxes[i].y                               &&
            this.playerHitbox[part].y + this.playerHitbox[part].height -this.y <= type.hitboxes[i].y + type.hitboxes[i].height))   &&
        ((  this.playerHitbox[part].x -this.x >= type.hitboxes[i].x                                                                &&
            this.playerHitbox[part].x -this.x <= type.hitboxes[i].x + type.hitboxes[i].width)                                      ||
        (   this.playerHitbox[part].x + this.playerHitbox[part].width -this.x >= type.hitboxes[i].x                                &&
            this.playerHitbox[part].x + this.playerHitbox[part].width -this.x <= type.hitboxes[i].x + type.hitboxes[i].width       ))
            ) {
            var hit = true
        }
        return (hit);
    }
    async #colide() {
        var hitDown = false
        this.wallJumpRight = false
        this.wallJumpLeft = false

        for (let i = 0; i < this.map.ground.hitboxes.length; i++) /* check if stuck */ { 
            if(this.#collisionCheck(0, i, this.map.ground) && this.#collisionCheck(1, i, this.map.ground) && this.#collisionCheck(2, i, this.map.ground) && this.#collisionCheck(3, i, this.map.ground)) {
                //this.die()
                
                if(
                    Math.abs(this.velX) > Math.abs(this.velY)
                ) {
                    if(this.velX > 0) {
                        var offset = 25
                        //console.log("hit!")
                        if (this.velX > 0) {
                            this.velX = 0
                        }
                        var hitW = this.map.ground.hitboxes[i].width
                        var hitX = this.map.ground.hitboxes[i].x
        
                        this.x = (-hitX - (offset)) - hitW
                    } else {
                        var offset = 25
                        //console.log("hit!")
                        if (this.velX < 0) {
                            this.velX = 0
                        }
                        var hitW = this.map.ground.hitboxes[i].width
                        var hitX = this.map.ground.hitboxes[i].x
        
                        this.x = (-hitX + (offset))
                    }
                } else {
                    if(this.vely > 0) {
                        var offset = 75
                        //console.log("hit!")
                        if(this.velY > 0) {
                            this.velY = 0
                        }
                        var hitH = this.map.ground.hitboxes[i].height
                        var hitY = this.map.ground.hitboxes[i].y
                        this.y = (-hitY - (offset)) - hitH
                    } else {
                        var offset = 50
                        //console.log("hit!")
                        if(this.velY < 0) {
                            this.velY = 0
                        }
                        var y = this.y 
                        var hitY = this.map.ground.hitboxes[i].y
                        this.y = -hitY + offset
                        this.jump = this.coyoteTime
                        hitDown = true
                    }
                }
                return
            }
        }

        for (let i = 0; i < this.map.ground.hitboxes.length; i++) /* left hit */ { 
            if(this.#collisionCheck(2, i, this.map.ground) && !this.#collisionCheck(3, i, this.map.ground)) {
                var offset = 25
                //console.log("hit!")
                if (this.velX > 0) {
                    this.velX = 0
                }
                var hitW = this.map.ground.hitboxes[i].width
                var hitX = this.map.ground.hitboxes[i].x

                this.x = (-hitX - (offset)) - hitW
                this.wallJumpLeft = true
                //console.log("left hit")
            }
        }

        for (let i = 0; i < this.map.ground.hitboxes.length; i++) /* right hit */ { 
            if(this.#collisionCheck(3, i, this.map.ground) && !this.#collisionCheck(2, i, this.map.ground)) {
                var offset = 25
                //console.log("hit!")
                if (this.velX < 0) {
                    this.velX = 0
                }
                var hitW = this.map.ground.hitboxes[i].width
                var hitX = this.map.ground.hitboxes[i].x

                this.x = -hitX + offset
                this.wallJumpRight = true
            }
        }

        for (let i = 0; i < this.map.ground.hitboxes.length; i++) /* ground hit */ {  
            if(this.#collisionCheck(0, i, this.map.ground) && !this.#collisionCheck(1, i, this.map.ground)) {
                var offset = 50
                //console.log("hit!")
                if(this.velY < 0) {
                    this.velY = 0
                }
                var y = this.y 
                var hitY = this.map.ground.hitboxes[i].y
                this.y = -hitY + offset
                this.jump = this.coyoteTime
                hitDown = true
            }
        }

        for (let i = 0; i < this.map.ground.hitboxes.length; i++) /* ceilling hit */ { 
            if(this.#collisionCheck(1, i, this.map.ground) && !this.#collisionCheck(0, i, this.map.ground)) {
                var offset = 75
                //console.log("hit!")
                if(this.velY > 0) {
                    this.velY = 0
                }
                var hitH = this.map.ground.hitboxes[i].height
                var hitY = this.map.ground.hitboxes[i].y
                this.y = (-hitY - (offset)) - hitH
                //this.jump = true
            }
        }

        for (let i = 0; i < this.map.ground.hitboxes.length; i++) /* left hit */ { 
            if(this.#collisionCheck(4, i, this.map.ground)) {
                var offset = 25
                //console.log("hit!")
                if (this.velX > 0) {
                    this.velX = 0
                }
                var hitW = this.map.ground.hitboxes[i].width
                var hitX = this.map.ground.hitboxes[i].x

                this.x = (-hitX - (offset)) - hitW
                //this.wallJumpLeft = true
            } 
        }

        for (let i = 0; i < this.map.ground.hitboxes.length; i++) /* right hit */ { 
            if(this.#collisionCheck(5, i, this.map.ground)) {
                var offset = 25
                //console.log("hit!")
                if (this.velX > 0) {
                    this.velX = 0
                }
                var hitW = this.map.ground.hitboxes[i].width
                var hitX = this.map.ground.hitboxes[i].x

                this.x = -hitX + offset
                //this.wallJumpRight = true
            }
        }
        

        for (let i = 0; i < this.map.lava.hitboxes.length; i++) {
            if(this.#collisionCheck(100, i, this.map.lava) && !this.death) {
                this.die()
            }
        }

        for (let i = 0; i < this.map.checkpoint.hitboxes.length; i++) {
            if(this.#collisionCheck(100, i, this.map.checkpoint)) {
                this.respawnX = this.x
                this.respawnVelX = this.velX
                this.respawnY = this.y
                this.respawnVelY = this.velY
            }
        }

        for (let i = 0; i < this.map.teleport.hitboxes.length; i++) {
            if(this.#collisionCheck(100, i, this.map.teleport)) {
                this.x = this.map.teleport.hitboxes[i].extraInfoI
                this.y = this.map.teleport.hitboxes[i].extraInfoII 
                this.velX = this.map.teleport.hitboxes[i].extraInfoIII
            }
        }
    }

    die() {
        this.enabled = false
    }
}