'use strict';

import { Hitbox } from "../../Hitbox.js";

export class Door {

    // fields
    hitboxes = new Array();

    constructor() {
        this.#createHitboxes();
    }
    
    #createHitboxes() {
        //this.hitboxes[ 0 ] = new Hitbox( 0 , 0 , 0 , 0 , false )
        this.hitboxes[this.hitboxes.length] = new Hitbox(7671, 574, 66, 415, 7671, 156 )
 
        /**/
        
    }

    draw(cameraX, cameraY, color = "#505050") {
        
        for (let i = 0; i < this.hitboxes.length; i++) {
            this.hitboxes[i].draw(cameraX, cameraY, color);
        }

    }
}