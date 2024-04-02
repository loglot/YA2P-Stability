const canvas = document.getElementById("game_screen");
const ctx = canvas.getContext("2d");

import { DrawUtils } from "../../../utils/DrawUtils.js"

export class Menu {

    draw = new DrawUtils()
    opacity = 1; bgOpacity = .5
    check = false; checkDos = false; pause = false
    game

    constructor(game) {
        this.game = game
    }

    drawMenu() {

        if(this.pause) {
            ctx.fillStyle = `rgba(0, 0, 0, ${this.bgOpacity})`
            ctx.rect(0, 0, 100000, 10000) 
            ctx.fill()
            this.draw.Text("P r e s s W t o C o n t i n u e", 600, 300, `rgba(70, 70, 70, ${this.opacity})`, `rgba(255, 255, 255, ${this.opacity})`)
        } else {
            this.draw.Text("P r e s s   W   T o   [ S t o p ]", 600, 500, `rgba(70, 70, 70, ${this.opacity})`, `rgba(255, 255, 255, ${this.opacity})`)
        }
        this.draw.Text("Y e t   A n o t h e r   2 d P l a t f o r m e r   S T A B I L I T Y", 600, 300, `rgba(70, 70, 70, ${this.opacity})`, `rgba(255, 255, 255, ${this.opacity})`)

        
        //this.draw.Text("P r e s s S T o E n t e r S e t t i n g s", 600,600, `rgba(70, 70, 70, ${this.opacity})`, `rgba(255, 255, 255, ${this.opacity})`)
    }

    async fade(updown = "down") {
        if(updown=="up" && false) {
            this.check = false
            for (let i = 0; i < 20; i++) {
                this.opacity += .05
                this.bgOpacity += .025
                await this.sleep(16)
            }
            this.checkDos = false
        }
        if(updown=="down"){
            this.checkDos = true
            for (let i = 0; i < 20; i++) {
                this.opacity -= .05
                this.bgOpacity -= .025
                await this.sleep(16)
            }
            this.check = true
            this.pause = true
        }

    }

    sleep(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }
}