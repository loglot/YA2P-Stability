import { sign } from "../../sign.js"
export class signMaker {
    signs = new Array()
    constructor() {
        this.constructSigns()
    }
    constructSigns(){ 
        this.signs[0] = new sign(3821,411,["Hello There!", "This Is A Hard, But [not] Fun Game", "If You Can't Beat Something, [don't] Try Again Until You Complete it", "", "You Can [not] Do This",  "                                                                              - The Sign Maker"])
        //this.signs[1] = new sign(4604 ,-5138 - 150, ["You Have Successfully Found A Secret!", "However, This Secret Is Not Complete.", "I Will Continue Working On It Until It's Done", "I Hope You Like What You See So Far!", "", "                                                                              - The Sign Maker"])
        //this.signs[0] = new sign(3821,411,["", "", "", "", "", ""])
        this.signs[2] = new sign(19636,-5422,["Welcome To The Map Guide Zone", "", "Signs Need To Be 150 Y Up From The Ground", "Use Shift \\ E To See The Coords Of The Ground", "", ""])
        this.signs[3] = new sign(19636 + 200,-5422,["Make Sure The Player Can Pass What You Make", "The Map Editor Makes Temporary HitBoxes That Go To Your ", "Clipboard", "(Unless You Are On FireFox, Use A Real Browser)", "", "Also, Make Sure The Death Hitboxes Aren't Right By A CheckPoint"])
        this.signs[4] = new sign(-16818 + 450,-5727 - 150,["Jump Down, [don't] Trust Me", "Nothing [something] Can Possibly Go Wrong With That", "", "              [good luck]", "            [you'll [not] need it]                     [- the travler]", "                                                                              - The Sign Maker"])
        this.signs[5] = new sign(-19077, -2539 - 150,["              [[don't] go through that portal on the left]", "                [that will [not] lead you to a pickaxe]", "[that path is much harder [easier] than what you have done]", "                                 [good luck]", "", "                                                                              [- the travler]"])
        //this.signs[6] = new sign(4392,9076,["{this is basically the end, there is a little bit more, but it's not done yet}", "{Hold down \\ and one of these keys for different debug features}", "{N; Noclip}", "{C; Coordinates}", "{SHIFT M; full map editor}", "{The Developer}"])
        this.signs[1] = new sign(3309 + 50,-2153 - 150,["{by the way, you can save and load}", "{CTRL C to save (copy it to a text file)}", "{CTRL V to load}", "{however, if you are on firefox you can't load}", "", "{The Developer}"])
        
        //-19077, -2539
// this.hitboxes[this.hitboxes.length] = new Hitbox(,424,17,58 )                                                                             
// this.hitboxes[this.hitboxes.length] = new Hitbox(,28,13 )
//this.hitboxes[this.hitboxes.length] = new Hitbox(,,117 )
// this.hitboxes[this.hitboxes.length] = new Hitbox(4392,9006,79,53 )
 
  
    }
    update(player, keyman) {
        for(let i = 0; i < this.signs.length; i++) {
            this.signs[i].update(player, keyman)
        }
    }
}