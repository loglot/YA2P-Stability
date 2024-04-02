'use strict';

import { Hitbox } from "../../Hitbox.js";
import { DrawUtils } from "../../../../utils/DrawUtils.js"

export class Map {

    // fields
    hitboxes = new Array();
    drawU = new DrawUtils()

    constructor() {
        this.#createHitboxes();
    }
    
    #createHitboxes() {

  //this.hitboxes[24] = new Hitbox(1451.1362846604356,-2156.2176276689797,208,262.00046251742333,false )

        this.hitboxes[0] = new Hitbox(-1010, 561, 3496, 1550, false);
        this.hitboxes[1] = new Hitbox(-2452,-3521,2564,5660 )
        this.hitboxes[2] = new Hitbox(-101,-1800,2239,1985 )
        this.hitboxes[3] = new Hitbox(3244,562,2582,1485 )
        this.hitboxes[4] = new Hitbox(2030,-1824,2437,1555 )
        this.hitboxes[5] = new Hitbox(3617,-1733,1672,1917 )
        this.hitboxes[6] = new Hitbox(5606,-89,2138,249 )
        this.hitboxes[7] = new Hitbox(5169,-1733,1066,1321 )
        this.hitboxes[8] = new Hitbox(6191,558,245,79 )
        this.hitboxes[9] = new Hitbox(7018,558,217,79 )
        this.hitboxes[10] = new Hitbox(7667,558,2156,1518 )                      // 10
        this.hitboxes[this.hitboxes.length] = new Hitbox(6499,-1985,1244,1922 )
        this.hitboxes[this.hitboxes.length] = new Hitbox(8065,-646,2658,1329 )
        this.hitboxes[this.hitboxes.length] = new Hitbox(7632,-2009,2159,989 )
        this.hitboxes[this.hitboxes.length] = new Hitbox(10364,-1212,339,724 )
        this.hitboxes[this.hitboxes.length] = new Hitbox(10365,-2024,300,442 )
        //this.hitboxes[this.hitboxes.length] = new Hitbox(9742,-1604,208,381 )
        this.hitboxes[this.hitboxes.length] = new Hitbox(9742,-1604,355,381 )
        this.hitboxes[this.hitboxes.length] = new Hitbox(10578,-2023,1973,2610 )
        this.hitboxes[this.hitboxes.length] = new Hitbox(7075,-3870,2971,1894 )
        this.hitboxes[this.hitboxes.length] = new Hitbox(12419,-3870,1701,1459 )
        this.hitboxes[this.hitboxes.length] = new Hitbox(12526,-2022,3058,1316 ) // 20
        this.hitboxes[this.hitboxes.length] = new Hitbox(14539,-2723,2425,1956 )
        this.hitboxes[this.hitboxes.length] = new Hitbox(13836,-4016,1493,941 )
        this.hitboxes[this.hitboxes.length] = new Hitbox(13836,-4016,3113,585 )
        this.hitboxes[this.hitboxes.length] = new Hitbox(11522,-5009,942,2038 )
        this.hitboxes[this.hitboxes.length] = new Hitbox(9396,-5008,1822,2037 )
        this.hitboxes[this.hitboxes.length] = new Hitbox(16795,-2728,1436,1098 )
       this.hitboxes[this.hitboxes.length] = new Hitbox(17495,-4866,1456,3134 )
       this.hitboxes[this.hitboxes.length] = new Hitbox(16603,-4433,338,447 )
       this.hitboxes[this.hitboxes.length] = new Hitbox(16599,-5520,311,636 )
       this.hitboxes[this.hitboxes.length] = new Hitbox(16608,-5595,2815,462 ) // 30
       this.hitboxes[this.hitboxes.length] = new Hitbox(17493,-5276,2048,647 )
       this.hitboxes[this.hitboxes.length] = new Hitbox(14298,-6426,5484,973 )
       this.hitboxes[this.hitboxes.length] = new Hitbox(14661,-4986,242,404 )
       this.hitboxes[this.hitboxes.length] = new Hitbox(13833,-4650,381,739 )
       this.hitboxes[this.hitboxes.length] = new Hitbox(13836,-6650,491,1311 )
       this.hitboxes[this.hitboxes.length] = new Hitbox(10947,-6899,3139,1454 )
       this.hitboxes[this.hitboxes.length] = new Hitbox(9094,-6888,2174,1923 )
       
       this.hitboxes[this.hitboxes.length] = new Hitbox(5067,-3245,2030,1282 )
       this.hitboxes[this.hitboxes.length] = new Hitbox(-751,-1997,5509,297 )
       
       this.hitboxes[this.hitboxes.length] = new Hitbox(4405,-2402,351,96 ) // 40
       this.hitboxes[this.hitboxes.length] = new Hitbox(4433,-2328,294,406 )
       this.hitboxes[this.hitboxes.length] = new Hitbox(4307,-2759,937,85 )
       this.hitboxes[this.hitboxes.length] = new Hitbox(4333,-5138,2548,2403 ) //
       this.hitboxes[this.hitboxes.length] = new Hitbox(3309,-2153,314,89 )
       this.hitboxes[this.hitboxes.length] = new Hitbox(3333,-2088,270,220 )
       this.hitboxes[this.hitboxes.length] = new Hitbox(2931,-2600,307,111 )
       this.hitboxes[this.hitboxes.length] = new Hitbox(3289,-2992,262,114 )
       this.hitboxes[this.hitboxes.length] = new Hitbox(3001,-2958,155,404 )
       this.hitboxes[this.hitboxes.length] = new Hitbox(3338,-4004,174,1035 )
       this.hitboxes[this.hitboxes.length] = new Hitbox(3001,-4004,155,815 ) // 50
       this.hitboxes[this.hitboxes.length] = new Hitbox(3092,-4004,307,731 )
       this.hitboxes[this.hitboxes.length] = new Hitbox(1557,-5504 + 374,1955,1731-374 ) //
       this.hitboxes[this.hitboxes.length] = new Hitbox(3838,-4779,224,118 )
 
       this.hitboxes[this.hitboxes.length] = new Hitbox(2189,-2489,190,557 )
       this.hitboxes[this.hitboxes.length] = new Hitbox(2143,-2545,297,96 )
       this.hitboxes[this.hitboxes.length] = new Hitbox(2648,-2882,170,83 )
       this.hitboxes[this.hitboxes.length] = new Hitbox(2683,-3603,102,745 )
       this.hitboxes[this.hitboxes.length] = new Hitbox(2682,-3962,347,707 )
       this.hitboxes[this.hitboxes.length] = new Hitbox(2146,-2878,284,114 )
       this.hitboxes[this.hitboxes.length] = new Hitbox(2200,-3894,157,806 ) // 60
       this.hitboxes[this.hitboxes.length] = new Hitbox(2274,-3945,480,741 )
 
       this.hitboxes[this.hitboxes.length] = new Hitbox(1522,-2498,275,90 )
       this.hitboxes[this.hitboxes.length] = new Hitbox(1557,-3642,185,1180 ) 
       this.hitboxes[this.hitboxes.length] = new Hitbox(1557,-3794,723,397 )
       this.hitboxes[this.hitboxes.length] = new Hitbox(1132,-2063,210,151 )
       this.hitboxes[this.hitboxes.length] = new Hitbox(1110,-2114,264,69 )
       this.hitboxes[this.hitboxes.length] = new Hitbox(-133,-2847 - 300,1047,172 )
       this.hitboxes[this.hitboxes.length] = new Hitbox(889,-2872  - 300,59,222 )
       this.hitboxes[this.hitboxes.length] = new Hitbox(661,-2693  - 300,125,165 )
       this.hitboxes[this.hitboxes.length] = new Hitbox(627,-2391  - 300,197,77 ) // 70
       this.hitboxes[this.hitboxes.length] = new Hitbox(358,-5487  - 300,1246,2332 )
       this.hitboxes[this.hitboxes.length] = new Hitbox(-712,-4997,1168,1216 )
       this.hitboxes[this.hitboxes.length] = new Hitbox(-3460,-4900,1784,1419 )
       this.hitboxes[this.hitboxes.length] = new Hitbox(-3828 + 377,-3551,1449 - 377,1590 )
       // this.hitboxes[this.hitboxes.length] = new Hitbox(-3831,-3569,377,81 )
 
       this.hitboxes[this.hitboxes.length] = new Hitbox(-1761,-4335,355,113 )
       this.hitboxes[this.hitboxes.length] = new Hitbox(-1307,-3944,264,78 )
       this.hitboxes[this.hitboxes.length] = new Hitbox(-940,-4685,235,102 )
       this.hitboxes[this.hitboxes.length] = new Hitbox(-1246,-4360,159,76 )
       this.hitboxes[this.hitboxes.length] = new Hitbox(-1726,-4974,305,137 )
       this.hitboxes[this.hitboxes.length] = new Hitbox(-557,-6521,949,1623 ) // 80
       this.hitboxes[this.hitboxes.length] = new Hitbox(249,-6858,1620,1220 )
       this.hitboxes[this.hitboxes.length] = new Hitbox(-660,-6514,188,991 )
       this.hitboxes[this.hitboxes.length] = new Hitbox(-3633,-5029,2210,169 )
       this.hitboxes[this.hitboxes.length] = new Hitbox(-2347,-6626,1852,913 )
       this.hitboxes[this.hitboxes.length] = new Hitbox(-3575,-7153,1297,1441 )
       this.hitboxes[this.hitboxes.length] = new Hitbox(-710,-5856,288,996 )
       this.hitboxes[this.hitboxes.length] = new Hitbox(-4104,-5652,150,146 )
       this.hitboxes[this.hitboxes.length] = new Hitbox(-5056,-5397,192,166 )
       this.hitboxes[this.hitboxes.length] = new Hitbox(-6117,-5604,185,179 )
       this.hitboxes[this.hitboxes.length] = new Hitbox(-7324,-5823,240,222 ) // 90
       this.hitboxes[this.hitboxes.length] = new Hitbox(-10355,-5617,2054,7900 )
       this.hitboxes[this.hitboxes.length] = new Hitbox(-10360,-13149,2053,7052 )
       this.hitboxes[this.hitboxes.length] = new Hitbox(-8776,-6140,196,94 )
       this.hitboxes[this.hitboxes.length] = new Hitbox(-9844,-6153,168,113 )
       this.hitboxes[this.hitboxes.length] = new Hitbox(-9334,-5671,174,81 )
       this.hitboxes[this.hitboxes.length] = new Hitbox(-8381,-5666,79,70 )
       this.hitboxes[this.hitboxes.length] = new Hitbox(-8383,-6141,76,87 )
       this.hitboxes[this.hitboxes.length] = new Hitbox(-10359,-6100,89,63 )
       this.hitboxes[this.hitboxes.length] = new Hitbox(-10355,-5669,92,142 ) 
       this.hitboxes[this.hitboxes.length] = new Hitbox(-15675,-7362,5330,1255 ) // 100
       this.hitboxes[this.hitboxes.length] = new Hitbox(-13149,-5589,437,100 )
       this.hitboxes[this.hitboxes.length] = new Hitbox(-14243,-5621,527,101 )      
       this.hitboxes[this.hitboxes.length] = new Hitbox(-14890,-6204,115,167 )
       this.hitboxes[this.hitboxes.length] = new Hitbox(-15436,-6149,144,118 )
       this.hitboxes[this.hitboxes.length] = new Hitbox(-16818,-5727,1007,117 )
       this.hitboxes[this.hitboxes.length] = new Hitbox(-16746,-5676,856,3301 )
       this.hitboxes[this.hitboxes.length] = new Hitbox(-3575,-11459,1835,4388 )
       this.hitboxes[this.hitboxes.length] = new Hitbox(-8816,-11478,5596,3550 )
       this.hitboxes[this.hitboxes.length] = new Hitbox(-20176,-2539,632,74 )
       this.hitboxes[this.hitboxes.length] = new Hitbox(-22480,-5512,2463,6390 ) // 110
       this.hitboxes[this.hitboxes.length] = new Hitbox(-22480,-5512,2416,2544 )
       this.hitboxes[this.hitboxes.length] = new Hitbox(-19077,-2539,370,3098 )
       this.hitboxes[this.hitboxes.length] = new Hitbox(-20025,-2469,986,2413 )
       this.hitboxes[this.hitboxes.length] = new Hitbox(-448,5652,1397,3095 )
       this.hitboxes[this.hitboxes.length] = new Hitbox(741,5634,2111,930 )
       this.hitboxes[this.hitboxes.length] = new Hitbox(1904,5621,1586,3117 )
       this.hitboxes[this.hitboxes.length] = new Hitbox(932,9586,2691,1040 )
       this.hitboxes[this.hitboxes.length] = new Hitbox(-1274,8632,2221,2010 )
       this.hitboxes[this.hitboxes.length] = new Hitbox(1255,7165,367,147 )
 
       this.hitboxes[this.hitboxes.length] = new Hitbox(3597,9589,1797,1052 ) // 120
       this.hitboxes[this.hitboxes.length] = new Hitbox(3480,5003,1204,3732 )
       
       this.hitboxes[this.hitboxes.length] = new Hitbox(-25932,3293,29407,2499 )
       this.hitboxes[this.hitboxes.length] = new Hitbox(-18940,-1681,9010,5522 )
       this.hitboxes[this.hitboxes.length] = new Hitbox(-12588,5559,12533,4923 )
       this.hitboxes[this.hitboxes.length] = new Hitbox(-8779,-2143,8487,6454 )
       this.hitboxes[this.hitboxes.length] = new Hitbox(-10222,2243,1725,1168 )

       this.hitboxes[this.hitboxes.length] = new Hitbox(5388,9589,2620,2495 )
       this.hitboxes[this.hitboxes.length] = new Hitbox(4659,6867,2131,1867 )
       this.hitboxes[this.hitboxes.length] = new Hitbox(7119,9142,178,66 )
       this.hitboxes[this.hitboxes.length] = new Hitbox(7366,9269,128,66 ) // 130
       this.hitboxes[this.hitboxes.length] = new Hitbox(7514,8836,220,92 )
       this.hitboxes[this.hitboxes.length] = new Hitbox(7300,8506,176,79 )
       this.hitboxes[this.hitboxes.length] = new Hitbox(7568,7696,75,151 )
       this.hitboxes[this.hitboxes.length] = new Hitbox(7680,9505,124,147 )
       this.hitboxes[this.hitboxes.length] = new Hitbox(7947,9590,2832,2471 )
       this.hitboxes[this.hitboxes.length] = new Hitbox(8259,6263,1992,3361 )
       this.hitboxes[this.hitboxes.length] = new Hitbox(5579,8994,522,289 )
       this.hitboxes[this.hitboxes.length] = new Hitbox(7592,6936,90,147 )
       this.hitboxes[this.hitboxes.length] = new Hitbox(6368,6238,810,111 )
       this.hitboxes[this.hitboxes.length] = new Hitbox(4322,6328,2380,720 ) // 140
       this.hitboxes[this.hitboxes.length] = new Hitbox(7480,5727,1042,97 )
       this.hitboxes[this.hitboxes.length] = new Hitbox(8349,5725,1897,691 )
       this.hitboxes[this.hitboxes.length] = new Hitbox(4593,6240,1858,140 )
       this.hitboxes[this.hitboxes.length] = new Hitbox(4139,4675,2952,1602 )
       this.hitboxes[this.hitboxes.length] = new Hitbox(7517,5079,120,136 )
       this.hitboxes[this.hitboxes.length] = new Hitbox(7723,6261,536,1811 )
       this.hitboxes[this.hitboxes.length] = new Hitbox(7670,7429,58,643 )
       this.hitboxes[this.hitboxes.length] = new Hitbox(7396,7429,279,46 )
       this.hitboxes[this.hitboxes.length] = new Hitbox(7666,6936,106,144 )
       this.hitboxes[this.hitboxes.length] = new Hitbox(7609,7699,134,149 )
       this.hitboxes[this.hitboxes.length] = new Hitbox(6749,7181,373,117 )
       this.hitboxes[this.hitboxes.length] = new Hitbox(7811,4490,540,160 )
       this.hitboxes[this.hitboxes.length] = new Hitbox(8982,4071,206,194 )
       this.hitboxes[this.hitboxes.length] = new Hitbox(3702,1932,3380,2815 )
       this.hitboxes[this.hitboxes.length] = new Hitbox(8316,3495,711,199 )
       this.hitboxes[this.hitboxes.length] = new Hitbox(7679,2497,161,619 )
       this.hitboxes[this.hitboxes.length] = new Hitbox(8247,2637,676,202 )
       this.hitboxes[this.hitboxes.length] = new Hitbox(9601,2605,338,199 )
       this.hitboxes[this.hitboxes.length] = new Hitbox(9188,1991,121,872 )
       this.hitboxes[this.hitboxes.length] = new Hitbox(10159,1102,2989,4663 )
       this.hitboxes[this.hitboxes.length] = new Hitbox(10607,294,1946,387 )
       this.hitboxes[this.hitboxes.length] = new Hitbox(10210,5649,2833,4342 )
       this.hitboxes[this.hitboxes.length] = new Hitbox(5158,1073,2640,1005 )
       this.hitboxes[this.hitboxes.length] = new Hitbox(3331,-6327,371,208 )
       this.hitboxes[this.hitboxes.length] = new Hitbox(4132,-6998,210,123 )
       this.hitboxes[this.hitboxes.length] = new Hitbox(4132,-6998,318,191 )
       this.hitboxes[this.hitboxes.length] = new Hitbox(3968,-5760,347,175 )
       this.hitboxes[this.hitboxes.length] = new Hitbox(4826,-7545,2705,2497 )
       this.hitboxes[this.hitboxes.length] = new Hitbox(1556,-8316,1247,2849 )
       this.hitboxes[this.hitboxes.length] = new Hitbox(1505,-5644,1297,680 )
       this.hitboxes[this.hitboxes.length] = new Hitbox(4456,-6173,408,65 )
       this.hitboxes[this.hitboxes.length] = new Hitbox(2720,-6194,178,475 )
       this.hitboxes[this.hitboxes.length] = new Hitbox(4765,-6933,303,788 )
       this.hitboxes[this.hitboxes.length] = new Hitbox(3902,-7632,181,309 )
       this.hitboxes[this.hitboxes.length] = new Hitbox(2942,-10251,3673,2149 )
       this.hitboxes[this.hitboxes.length] = new Hitbox(1575,-10057,1440,1401 )
       this.hitboxes[this.hitboxes.length] = new Hitbox(7120,-8331,412,808 )
       this.hitboxes[this.hitboxes.length] = new Hitbox(6441,-10250,1549,1283 )
       this.hitboxes[this.hitboxes.length] = new Hitbox(7522,-8331,1681,1057 )
       this.hitboxes[this.hitboxes.length] = new Hitbox(8512,-9238,1830,1919 )
       this.hitboxes[this.hitboxes.length] = new Hitbox(5334,-10657,4393,953 )
       this.hitboxes[this.hitboxes.length] = new Hitbox(6545,-8122,71,142 )
 
       
       
       

       //this.hitboxes[this.hitboxes.length] = new Hitbox(3018,-4004,931,139 )
 
       
        //this.hitboxes[this.hitboxes.length] = new Hitbox(7425,-2104,3888,1728 )
        //this.hitboxes[this.hitboxes.length] = new Hitbox(9811,-540,1520,2483 )
        
        // this.hitboxes[this.hitboxes.length] = new Hitbox(4193,9570,106,54 )
        this.stairs(4193 - 200, 9589 + 1, 994, 91, 360, 1)
        this.stairs(10860, -2024 + 1, 994, 91, 360, 1) 

        this.hitboxes[this.hitboxes.length] = new Hitbox(-20450,-7934,2391,4702 ) // main path temp block
        this.hitboxes[this.hitboxes.length] = new Hitbox(-18314,-8384,2738,1673 ) // main path temp block
        
        //this.hitboxes[this.hitboxes.length] = new Hitbox(2999,-5069 - 800,2055,1597) // secret blockage

        /**/   

        // testing zone

        this.hitboxes[this.hitboxes.length] = new Hitbox(89,3267,2945,1002 )
        this.stairs(416, 3267 + 4, 800, 71, 50, 4)
        this.stairs(1402, 3267 + 4, 800, 71, 50, 4)

        //this.hitboxes[this.hitboxes.length] = new Hitbox(,3235,38,35 )
        //this.hitboxes[this.hitboxes.length] = new Hitbox(,3238,29,32 )
        
    }

    stairs(x, y, width, height, step, stepH){
        for(let i = 0; i < step; i++){
            this.hitboxes[this.hitboxes.length] = new Hitbox(x + stepH * (i),y - stepH * (i),width - stepH * (i * (2)),height)
        }
    }

    draw(cameraX, cameraY, color = "#0f0f0f") {
        
        for (let i = 0; i < this.hitboxes.length; i++) {
            this.hitboxes[i].draw(cameraX, cameraY, color);
        }

    }
    nDraw(camera, color = "#500000") {
        
        for (let i = 0; i < this.hitboxes.length; i++) {
            this.hitboxes[i].nDraw(camera, color);
        }

    }


}
