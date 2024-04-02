'use strict';

import { Hitbox } from ".././Hitbox.js";
import { Orb } from "./orbAnim.js";

export class Player {

    x; velX = -25; maxVelX = 200000000;
    y; velY = 50; maxVelY = 200; avgVelY = 0
    noclipVelChange = 10; velChange = 2;
    friction = 1.1; airFriction = 1.1; hookFriction = .95;

    jump = 0; lastJump = 0; coyoteTime = 5;
    jumpVel = 37 ; float = .79567; gravity = 1.9; 

    wallJumpLeft = false; wallJumpAmmountLeft = false;
    wallJumpRight = false; wallJumpAmmountRight = false;
    wallJumpVelY = 27 ; wallJumpVelX = 74

    respawnX; respawnVelX; 
    respawnY; respawnVelY;

    debug; extra; camera; keyManager;
    map;

    stuck = false; death = false; hidden = false;
    playerHitbox = new Array();

    hookHeld = false; hookHeldII = false
    change
    orb = new Array(); anim = false; animFrames = 0; orbAlpha = 1

    constructor(x, y, keyManager, debug, map, camera, DM, CPM, TPM, extra) {
        this.keyManager = keyManager;
        this.x = x;
        this.y = y;
        this.debug = debug
        this.map = map
        this.camera = camera
        this.#buildHitbox(-25, -75, 50, 125)
        this.respawnX = x
        this.respawnVelX = 0
        this.respawnY = y
        this.respawnVelY = 0
        this.game = extra
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
        this.lastJump = this.jump
        if(this.debug.noClip) {
            this.#updateVelocityNoclip();
            this.#moveNoclip();
        } else if (!this.death){
            this.#updateVelocity()
            this.#move()
        }
        if (!this.game.debug.freeCam) {

        /*    this.camera.x = this.x + 900
            this.camera.y = this.y + 500 /**/

        /*    this.camera.x -=((((this.camera.x - this.camera.midX) - this.x) / 10))
            this.camera.y -= (((this.game.timeUtils.speedFactor* (this.camera.y - this.camera.midY) - this.y) / 10)) /**/
        }
        if (this.jump > 0) {
            this.wallJumpAmmountLeft = true
            this.wallJumpAmmountRight = true
        }
        if (this.keyManager.wasKeyJustPressed("KeyR") && (!this.keyManager.isKeyPressed("ShiftLeft") && !this.keyManager.isKeyPressed("AltLeft"))){
            this.die()
        }
        this.hidden = this.death
        //console.log(this.velY)
        this.orbAlpha -= .001
        if(this.anim == true && this.orbAlpha >= 0) {
            /*this.orb[this.orb.length] = new Orb(this.x - 1000, this.y+ 1000, 20, this, `rgba(255,255,255,${this.orbAlpha})`)
            this.orb[this.orb.length] = new Orb(this.x - 0, this.y+ 1500, 20, this, `rgba(255,255,255,${this.orbAlpha})`)
            this.orb[this.orb.length] = new Orb(this.x - 0, this.y- 1500, 20, this, `rgba(255,255,255,${this.orbAlpha})`)
            this.orb[this.orb.length] = new Orb(this.x - 1000, this.y- 1000, 20, this, `rgba(255,255,255,${this.orbAlpha})`)
            this.orb[this.orb.length] = new Orb(this.x - 1500, this.y- 0, 20, this, `rgba(255,255,255,${this.orbAlpha})`)
            this.orb[this.orb.length] = new Orb(this.x + 1500, this.y- 0, 20, this, `rgba(255,255,255,${this.orbAlpha})`)
            this.orb[this.orb.length] = new Orb(this.x + 1000, this.y- 1000, 20, this, `rgba(255,255,255,${this.orbAlpha})`)
            this.orb[this.orb.length] = new Orb(this.x + 1000, this.y+ 1000, 20, this, `rgba(255,255,255,${this.orbAlpha})`)*/
            this.orb[this.orb.length] = new Orb(this.x - 1000, this.y+ 1000, 20, this, `rgba(255,255,255,1)`)
            this.orb[this.orb.length] = new Orb(this.x - 0, this.y+ 1500, 20, this, `rgba(255,255,255,1)`)
            this.orb[this.orb.length] = new Orb(this.x - 0, this.y- 1500, 20, this, `rgba(255,255,255,1)`)
            this.orb[this.orb.length] = new Orb(this.x - 1000, this.y- 1000, 20, this, `rgba(255,255,255,1)`)
            this.orb[this.orb.length] = new Orb(this.x - 1500, this.y- 0, 20, this, `rgba(255,255,255,1)`)
            this.orb[this.orb.length] = new Orb(this.x + 1500, this.y- 0, 20, this, `rgba(255,255,255,1)`)
            this.orb[this.orb.length] = new Orb(this.x + 1000, this.y- 1000, 20, this, `rgba(255,255,255,1)`)
            this.orb[this.orb.length] = new Orb(this.x + 1000, this.y+ 1000, 20, this, `rgba(255,255,255,1)`)
            this.orbAlpha -= .01
        }

        if(this.orbAlpha <= 0 && this.anim == true && this.hookHeld == false && this.change == "hook") {
            this.hookHeld = true
            this.game.gameDisplayer.targetR = 167
            this.game.gameDisplayer.targetG = 199
            this.game.gameDisplayer.targetB = 216
            this.game.gameDisplayer.gradMinTarget = 300
            this.game.gameDisplayer.gradMaxTarget = 1500
            this.anim = false
        }
        
        if(this.orbAlpha <= 0 && this.anim == true && this.hookHeldII == false && this.change == "hookII") {
            this.hookHeldII = true
            this.game.gameDisplayer.targetR = 216
            this.game.gameDisplayer.targetG = 199
            this.game.gameDisplayer.targetB = 167
            this.game.gameDisplayer.gradMinTarget = 700
            this.game.gameDisplayer.gradMaxTarget = 2000
            this.anim = false
        }


        
    }

    sleep(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }
    
    #updateVelocityNoclip() {
        if (this.keyManager.isKeyPressed("KeyD")) {
            this.velX -= this.noclipVelChange //*18 * (;
            //if (Math.abs(this.velX) > this.maxVelX) {
            //    this.velX = -this.maxVelX;
            //}

        }
        if (this.keyManager.isKeyPressed("KeyA")) {
              this.velX += this.noclipVelChange //;
            //  if (this.velX > this.maxVelX) {
            //    this.velX = this.maxVelX;
            //}
              
        }
        if (this.keyManager.isKeyPressed("KeyW") || this.keyManager.isKeyPressed("Space")) {
            this.velY += this.noclipVelChange //;
            if (this.velY > this.maxVelY) {
                this.velY = this.maxVelY;
          }
            
        }
        
        if (this.keyManager.isKeyPressed("KeyS") && (!this.keyManager.isKeyPressed("ShiftLeft") && !this.keyManager.isKeyPressed("ShiftRight") && !this.keyManager.isKeyPressed("AltLeft"))) {
            this.velY -= this.noclipVelChange //;
            if (Math.abs(this.velY) > this.maxVelY) {
                this.velY = -this.maxVelY;
            }

        }
        if (this.velY < -this.maxVelY) {
            this.velY = -this.maxVelY;
        }
    }

    #moveNoclip() {
        this.x += this.velX ;
        this.y += this.velY ;
        this.velX = this.velX * .8
        this.velY = this.velY * .8
    }

    #updateVelocity() {
        if (this.keyManager.isKeyPressed("KeyD")) {
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
                console.log("wallslide")
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
        }  else if (this.game.hook.enabled == true || this.game.hookII.enabled == true) {
            this.velX = this.velX * this.hookFriction
        } else {
            this.velX = this.velX * this.airFriction
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

    }

    #move() {
        this.x += this.velX //* this.game.main.deltaTime;
        this.y += this.velY ;
        this.jump--
        this.#colide()
        //console.log(this.x, this.y)
    }

    async die() {
        this.death = true
        this.game.hook.enabled = false
        this.game.hook.visible = false
        this.game.hookII.enabled = false
        this.game.hookII.visible = false
        this.game.audio.hurtSound()
        await this.sleep(500)
        this.x = this.respawnX
        this.velX = 0
        this.y = this.respawnY
        this.velY = 0
        this.death = false
        this.game.hook.enabled = false
        this.game.hook.visibility = false
        this.game.hookII.enabled = false
        this.game.hookII.visibility = false

    }

    async check(valC, valS) {
        if(valC == "hook") {
            if(this.anim == false && this.hookHeld != true){
                this.orbAlpha = 1
                this.anim = true
                await this.sleep(750)
                this.game.audio.powerUpSound()
                await this.sleep(750)
                this.change = "hook"
            }
        }
        if(valC == "hookII") {
            if(this.anim == false && this.hookHeldII != true){
                this.orbAlpha = 1
                this.anim = true
                await this.sleep(1500)
                this.game.audio.powerUpSound()
                this.change = "hookII"
            }
        }
    }

    drawHitbox() {
        this.playerHitbox[100].draw(-this.x + this.camera.x, -this.y + this.camera.y, "#909090");

        this.playerHitbox[4].draw(-this.x + this.camera.x, -this.y + this.camera.y, "#c0c0c0");
        this.playerHitbox[5].draw(-this.x + this.camera.x, -this.y + this.camera.y, "#c0c0c0");
        this.playerHitbox[0].draw(-this.x + this.camera.x, -this.y + this.camera.y, "#f0f0f0");
        this.playerHitbox[1].draw(-this.x + this.camera.x, -this.y + this.camera.y, "#f0f0f0");
        this.playerHitbox[2].draw(-this.x + this.camera.x, -this.y + this.camera.y, "#f0f0f0");
        this.playerHitbox[3].draw(-this.x + this.camera.x, -this.y + this.camera.y, "#f0f0f0");
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
                    if(this.velY > 0) {
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

        for (let i = 0; i < this.map.enabler.hitboxes.length; i++) {
            if(this.#collisionCheck(100, i, this.map.enabler)) {
                this.check(this.map.enabler.hitboxes[i].extraInfoI, this.map.enabler.hitboxes[i].extraInfoII)
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

    
}