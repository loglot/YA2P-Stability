'use strict';

const canvas = document.getElementById("game_screen");
const ctx = canvas.getContext("2d")
const ballEffect = document.getElementById("balls");
const bctx = ballEffect.getContext("2d")
const postEffect = document.getElementById("PostProcessing");
const ppctx = ballEffect.getContext("2d")
const userInterface = document.getElementById("UI")
const uictx = userInterface.getContext("2d")
var scaleX = 0;
var scaleY = 0;

// import { Map }
// import { Camera }
import { DrawUtils } from "../../utils/DrawUtils.js"

export class GameDisplayer {

    gradX = -350
    gradY = 0
    gradMin = 2000
    gradMinTarget = 50
    gradMax = 2000
    gradMaxTarget = 1000

    // system
    game;
    map;
    camera;
    debug;
    player; 
    deathMap;
    teleport
    grid = new Image()
    
    // fields
    originalWidth = canvas.width;
    originalHeight = canvas.height;
    width
    height

    drawUtils = new DrawUtils();
    background
    UIFixed = false

    

    r = 167 ; rC = 1; targetR = this.r
    b = 216 ; bC = 0; targetB = this.b
    g = 199 ; gC = ((this.b - this.g) / (this.b - this.r)) * this.rC; targetG = this.g
    loops = this.b - this.r
    i = 0
    signDisplayPos = 800
    signTextPos = 800
    signText = ["","","","","","",100]
    

    // , 192, 219

    constructor(Game, Map, Camera, Player, Debug = 0, DM, BG, CPM, TP, game) {
        this.game = Game;
        this.map = Map;
        this.camera = Camera;
        this.debug = Debug
        this.player = Player
        this.background = BG
        this.grid.src = 'assets/images/grid.png'
    }

    // methods (functions)
    drawGameFrame() {
            this.resizeCanvasForWindowSize(userInterface, uictx);
        
        this.resizeCanvasForWindowSize(canvas, ctx);
        this.resizeCanvasForWindowSize(ballEffect, bctx);
        this.resizeCanvasForWindowSize(postEffect, ppctx);
        
        this.bgFade(this.targetR, this.targetG, this.targetB)
        this.r += this.rC
        this.g += this.gC
        this.b += this.bC


        if(!this.debug.backGrid) {
            ctx.fillStyle = "#afbfaf";
            ctx.rect(0, 0, 100000, 10000) 
            ctx.fill()
            this.background.Draw()
        } else {
            //ctx.drawImage(this.grid, 0, 0, 1676,1047)
            ctx.drawImage(this.grid, 0, 0, this.originalWidth,625 * (this.originalWidth / 1000))
        }

        //this.map.enabler.nDraw(this.camera)
        this.map.teleport.nDraw(this.camera)


        
        for(let i = 0; i < this.map.sign.signs.length; i++) {
            this.map.sign.signs[i].nDraw(this.camera, this.drawUtils)
        }
        this.drawTheBeanPeople()


        this.map.door.nDraw(this.camera);
        this.map.lava.nDraw(this.camera);
        this.map.checkpoint.nDraw(this.camera) 
        this.map.ground.nDraw(this.camera);
        this.drawText()

        this.debugDraw()

        
        this.game.keys.drawKeys()

        //if(this.player.anim) {
        //bctx.filter = "blur(30px) contrast(100)"
            this.orbDraw("old")
        //}



        this.PostGrad()

        this.signDraw()

    }

    signDraw() {
        for(let i = 0; i < this.map.sign.signs.length; i++){
            if(this.map.sign.signs[i].interact){
                this.signText = this.map.sign.signs[i].text
                this.signText[6] = i
                this.signDisplayPos = ((this.signDisplayPos * 9) + 0 )/ 10
                this.signTextPos = ((this.signDisplayPos * 12) + 0 )/ 13

            }else if (i == this.signText[6]){
                
                this.signDisplayPos = ((this.signDisplayPos * 9) + 800 )/ 10
                this.signTextPos = ((this.signDisplayPos * 12) + 800 )/ 13
            }
        }
        this.drawUtils.Rect(0, 675 + this.signDisplayPos, 10000, 10000, "#d8d8d8", uictx)
        this.drawUtils.Rect(0, 700 + this.signDisplayPos, 10000, 10000, "#33363f", uictx)
        for(let j = 0; j < 6; j++){
            this.drawUtils.Text(this.signText[j], 100, (800 + (100 * j)) + this.signTextPos *(j/2 + 1), "#000","#d8d8d8", uictx)
        }
    }

    orbDraw(render = "old") {
            for(let i = 0; i < this.player.orb.length; i++){
                //this.player.orb[i].update()
                this.player.orb[i].Draw(bctx)
            }
        
    }

    bgFade(r,g,b) {
        var rD = r - this.r 
        var gD = g - this.g
        var bD = b - this.b 

        if(Math.abs(rD) >= Math.abs(bD) && Math.abs(rD) >= Math.abs(gD))    {
            this.loops = Math.abs(rD)
} else  if(Math.abs(gD) >= Math.abs(bD) && Math.abs(gD) >= Math.abs(rD))    {
            this.loops = Math.abs(gD)
} else                                                                      {
            this.loops = Math.abs(bD)
}
        if(this.loops != 0) {
            this.rC = rD / this.loops
            this.gC = gD / this.loops
            this.bC = bD / this.loops
        } else {
            this.rC = 0
            this.gC = 0
            this.bC = 0
        }
    }

    PostGrad() {
        if(this.game.menu.check){
            //
            this.gradX = ((this.gradX * 12) + (this.player.x + this.camera.mouseX * 1.5)) / 13 // ((this.gradX*12) + this.player.x - 30) / 13
            this.gradY = ((this.gradY * 12) + (this.player.y + this.camera.mouseY * 1.5)) / 13 // ((this.gradY*12) + this.player.y) / 13
            this.gradMin = ((this.gradMin*12) + this.gradMinTarget) / 13
            this.gradMax = ((this.gradMax*12) + this.gradMaxTarget) / 13

        }

        var grad = ppctx.createRadialGradient(-this.gradX + this.camera.x, -this.gradY + this.camera.y, this.gradMin, -this.gradX + this.camera.x, -this.gradY + this.camera.y, this.gradMax)
        grad.addColorStop(0, "rgba(0,0,0,0)");
        grad.addColorStop(.05, "rgba(0,0,5,0)");
        grad.addColorStop(1, "rgba(	5, 5, 5,.7)");
        ppctx.fillStyle = grad
        ppctx.fillRect(0, 0, 10000000, 10000000);
    }

    drawText() { 
        this.drawUtils.Text("saved", 1100, 100, `rgba(0,0,0,${this.game.storage.saveAlpha})`, `rgba(255,255,255,${this.game.storage.saveAlpha})`)
        this.drawUtils.Text("loaded", 1100, 100, `rgba(0,0,0,${this.game.storage.loadAlpha})`, `rgba(255,255,255,${this.game.storage.loadAlpha})`)
    }
    
    // don't alter this, just ignore it
    // we don't kow how it works, it just does
    // i tried to alter it, but i failed
    
    // i altered it and i succeded this time
    resizeCanvasForWindowSize(canvas, ctx) {
        var currentWidth = canvas.width;
        var currentHeight = canvas.height;
        var windowWidth = window.innerWidth;
        var windowHeight = window.innerHeight;
        var desiredWidth = windowWidth;
        var aspectRatio = this.originalWidth / this.originalHeight;
        var desiredHeight = desiredWidth / aspectRatio;
        canvas.width = desiredWidth;
        canvas.height = desiredHeight;
        scaleX = (desiredWidth / this.originalWidth);
        scaleY = (desiredHeight / this.originalHeight);
            //if(ctx == uictx){
            //    ctx.setTransform(0.6109785202863961 * this.game.camera.zoom, 0, 0, 0.6109785202863961 * this.game.camera.zoom, 0, 0)

            //} else{
                ctx.setTransform(scaleY * this.game.camera.zoom, 0, 0, scaleX * this.game.camera.zoom, 0, 0)

            //}
        
         currentWidth = canvas.width;
         currentHeight = canvas.height;
        if (currentHeight >= windowHeight) {
           desiredHeight = windowHeight;
           aspectRatio = this.originalWidth / this.originalHeight;
           desiredWidth = desiredHeight * aspectRatio;
          canvas.width = desiredWidth;
          this.width = desiredWidth
          this.height = desiredHeight
          canvas.height = desiredHeight;
          scaleX = (desiredWidth / this.originalWidth);
          scaleY = (desiredHeight / this.originalHeight);
          //if(ctx == uictx){
          //  ctx.setTransform(0.559785202863961, 0, 0, 0.5509785202863961, 0, 0)

        //} else{
            ctx.setTransform(scaleY * this.game.camera.zoom, 0, 0, scaleX * this.game.camera.zoom, 0, 0)

        //}
          
        }
    }

    debugDraw() {
        if(this.debug.enum == true)   {this.enum()}
        if(this.debug.getPos == true) {this.getPos()}
    }

    getPos() {
        this.drawUtils.Text(Math.round(this.player.x), 100, 300, "white", "black")
        this.drawUtils.Text(Math.round(this.player.y), 100, 400, "white", "black")
    }

    drawHeld(){
        if (this.game.hook.visibility) {
            this.drawUtils.Line(
                this.game.hook.x1,
                this.game.hook.y1,
                this.game.hook.x2 + this.camera.x,
                this.game.hook.y2 + this.camera.y,/**/
                "#0f0f0f", 
                30 + -this.game.hook.length/70, 
                true, "#6b4101" )
        }

        if (this.game.hookII.visibility) {
            this.drawUtils.Line(
                this.game.hookII.x1,
                this.game.hookII.y1,
                this.game.hookII.x2 + this.camera.x,
                this.game.hookII.y2 + this.camera.y,/**/
                "#6b4101", 
                30 + -this.game.hookII.length/70, 
                true, "#0f0f0f" )
        }
    }

    enum() {
        for (let i = 0; i < this.map.ground.hitboxes.length; i++) {
            this.drawUtils.Text(i, this.map.ground.hitboxes[i].x + this.camera.x, this.map.ground.hitboxes[i].y + this.camera.y, "white", "#0f0f0f")
            if(this.debug.extraEnum){
                this.drawUtils.Text(this.map.ground.hitboxes[i].x + ", " + this.map.ground.hitboxes[i].y, this.map.ground.hitboxes[i].x + this.camera.x + 150, this.map.ground.hitboxes[i].y + this.camera.y, "white", "#0f0f0f")
            }
        }
        for (let i = 0; i < this.map.lava.hitboxes.length; i++) {
            this.drawUtils.Text(i, this.map.lava.hitboxes[i].x + this.camera.x, this.map.lava.hitboxes[i].y + this.camera.y, "white", "#500000")
        }
        for (let i = 0; i < this.map.checkpoint.hitboxes.length; i++) {
            this.drawUtils.Text(i, this.map.checkpoint.hitboxes[i].x + this.camera.x, this.map.checkpoint.hitboxes[i].y + this.camera.y, "white", "rgba(0, 255, 50, 1)")
        }
        for (let i = 0; i < this.map.teleport.hitboxes.length; i++) {
            this.drawUtils.Text(i, this.map.teleport.hitboxes[i].x + this.camera.x, this.map.teleport.hitboxes[i].y + this.camera.y, "white", "#dbb000")
        }
    }

    drawTheBeanPeople() {

        for(let i = 0; i < this.game.enemy.value.length; i++) {
            this.drawUtils.Bean(
                -this.game.enemy.value[i].x + this.camera.x, 
                -this.game.enemy.value[i].y + this.camera.y, 
                50 + (this.game.enemy.value[i].avgVelY/2), 
                100 - this.game.enemy.value[i].avgVelY, 
                "#cf9f9f")
        }

        if(this.debug.bean && !this.player.hidden) {  
        this.drawHeld()
            if (this.player.avgVelY > 20){
                this.drawUtils.Bean(-this.player.x + this.camera.x, -this.player.y + this.camera.y, 50 + (20/2), 100 - 20, `rgb(${this.r}, ${this.g}, ${this.b})`) 
            } else if (this.player.avgVelY < -20){
                this.drawUtils.Bean(-this.player.x + this.camera.x, -this.player.y + this.camera.y, 50 + (-20/2), 100 + 20, `rgb(${this.r}, ${this.g}, ${this.b})`) 
            } else{
                this.drawUtils.Bean(-this.player.x + this.camera.x, -this.player.y + this.camera.y, 50 + (this.player.avgVelY/2), 100 - this.player.avgVelY, `rgb(${this.r}, ${this.g}, ${this.b})`) 
            }
        }


 
    }

}

