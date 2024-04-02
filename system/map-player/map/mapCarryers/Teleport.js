'use strict';

import { Hitbox } from "../../Hitbox.js";

export class Teleport {

    // fields
    hitboxes = new Array();

    constructor() {
        this.#createHitboxes();
    }
    
    #createHitboxes() {
        //this.hitboxes[0] = new Hitbox(
        //    0, 0, 0, 0, 
        //    false, 
        //    0, 0 
        //);

        //this.hitboxes[1] = new Hitbox(
          //  15261.658012085834,-4204.204955661158,161.99999744263914,257.00032137254675 ,
            //false,
            //-13133.575513332711,5208.204502801111)


            //13133.575513332711,-5208.204502801111

        this.hitboxes[this.hitboxes.length] = new Hitbox(
            -20131,-3306,198,1075, 
            false, 
            -1444, -7115)
 
            
        
        
    }

    draw(cameraX, cameraY, color = "#dbb000") {
        
        for (let i = 0; i < this.hitboxes.length; i++) {
            this.hitboxes[i].draw(cameraX, cameraY, color);
        }

    }
    nDraw(camera, color = "#300000") {
        
        for (let i = 0; i < this.hitboxes.length; i++) {
            this.hitboxes[i].nDraw(camera, color);
        }

    }
}
