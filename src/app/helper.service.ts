import { Injectable } from '@angular/core';

@Injectable()
export class HelperService {
    timer;
    constructor() { }

    IsoToDMY(date:string){
        let dateSplited = date.split('-');
        return dateSplited[2]+'/'+dateSplited[1]+'/'+dateSplited[0];
    }

    pad(num, size) {
        var s = num+"";
        while (s.length < size) s = "0" + s;
        return s;
    }

    cmToPixels(cm,dpi){
        return (cm*dpi)/2.5;
    }

    pixelToCm(px,dpi){
        return (px/dpi)*2.5;
    }

    calculateDpi(px,cm){
        return (2.5*px)/cm;
    }

    debounce(func:()=>void,time){
        clearTimeout(this.timer);

        this.timer=setTimeout(()=>{
            func();
        },time)
    }

}
