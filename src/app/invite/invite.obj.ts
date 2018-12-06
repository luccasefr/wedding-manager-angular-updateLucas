import { environment } from '../../environments/environment';
import { ElementRef } from '@angular/core';
import { HelperService } from '../helper.service';
import { InviteService } from '../invite.service';
import { BaseObj,Cord } from './baseObj';
import { TextObj } from './text.obj';
import { ImageObj } from './image.Obj';

interface Text{
    id:number;
    text:string;
    width:number;
    height:number;
    x:number;
    y:number;
    layer:number;
    font_id:number;
    font_size:number;
    hexColor:string;
}

export class Invite{

    height=5;
    width=9;
    dpi=300;
    bg:string;
    images:Array<any>;
    texts:Array<Text>;
    ctx:CanvasRenderingContext2D;
    canvasElmt:ElementRef;
    mousePosition:Cord;
    mouseDown:Cord;
    selected:{obj:TextObj,colisionType:string};
    bgImage:HTMLImageElement;

    onTextSelected:(text)=>void;
    onSelectedNothing:()=>void;
    onImageSelected:(image)=>void;

    objs=[];


    constructor(invite,ctx,canvasElmt,fonts,private helper:HelperService,private inviteService:InviteService){
        this.bg = environment.apiUrl+'public'+invite.bg_url;
        console.log(this.bg);
        this.bgImage=new Image();
        // console.log(invite.texts);
        this.texts = invite.texts;
        this.images = invite.images;
        this.ctx = ctx;
        this.canvasElmt = canvasElmt;
        this.calculateCanvasSize();
        this.dpi = this.helper.calculateDpi(this.ctx.canvas.width,9);
        this.setTexts(fonts);
        this.setImages();
        this.loadImage();
        this.draw();
        console.log(this.objs);
    }

    getFontById(fonts,id){
        for (let i = 0; i < fonts.length; i++) {
            if(fonts[i].id==id) return fonts[i];
        }

        return null;
    }

    setTexts(fonts){
        this.texts.forEach((item)=>{
            this.objs.push(new TextObj({
                id:item.id,
                x:item.x,
                y:item.y,
                width:item.width,
                height:item.height,
                layer:item.layer,
                ctx:this.ctx,
                helper:this.helper,
                dpi:this.dpi,
                text:item.text,
                fontSize:item.font_size,
                font:this.getFontById(fonts,item.font_id),
                color:item.hexColor
            },this.inviteService));
        });
    }

    setImages(){
        this.images.forEach((item)=>{
            this.objs.push(new ImageObj({
                id:item.id,
                x:item.x,
                y:item.y,
                width:item.width,
                height:item.height,
                layer:item.layer,
                ctx:this.ctx,
                helper:this.helper,
                dpi:this.dpi,
                inviteService:this.inviteService
            }));
        });
    }

    private loadImage():Promise<any>{
        return new Promise((res,rej)=>{
            this.bgImage.src = this.bg;
            this.bgImage.onload = ()=>{
                this.bgImage.height = (this.ctx.canvas.width*this.bgImage.height)/this.bgImage.width;
                this.bgImage.width = this.ctx.canvas.width;
                // this.ctx.drawImage(image,0,0,image.width,image.height);
                res();
            }

        });
    }

    private calculateCanvasSize(){
        let w = this.helper.cmToPixels(this.width,this.dpi);
        let h = this.helper.cmToPixels(this.height,this.dpi);

        let height = (this.canvasElmt.nativeElement.parentNode.offsetWidth*h)/w;

        this.ctx.canvas.height = height;
        this.ctx.canvas.width  = this.canvasElmt.nativeElement.parentNode.offsetWidth;

        this.setEvents();
    }

    private setEvents(){
        this.canvasElmt.nativeElement.addEventListener('mousemove',(event)=>{
            this.mouseMove(event);
        });

        this.canvasElmt.nativeElement.addEventListener('mousedown',(event)=>{
            if(this.selected){
                this.selected.obj.selected=false;
            }
            this.mouseDown=new Cord(event.offsetX,event.offsetY);
            this.selected=this.checkColisions();
            console.log(this.selected);
            if(this.selected){
                this.selected.obj.selected=true;
                if(this.selected.obj instanceof TextObj){
                    this.onTextSelected(this.selected.obj);
                }
                if(this.selected.obj instanceof ImageObj){
                    this.onImageSelected(this.selected.obj);
                }
            }else{
                this.onSelectedNothing();
            }
        });

        this.canvasElmt.nativeElement.addEventListener('mouseup',(event)=>{
            this.mouseDown=undefined;
        });

        this.canvasElmt.nativeElement.addEventListener('mouseout',(event)=>{
            this.mouseDown=undefined;
        });

        this.canvasElmt.nativeElement.addEventListener('keydown',(event:KeyboardEvent)=>{
            if(this.selected.obj instanceof TextObj){
                if(event.keyCode==8){
                    this.selected.obj.backSpace();
                }
            }
        });

        this.canvasElmt.nativeElement.addEventListener('keypress',(event:KeyboardEvent)=>{
            if(this.selected.obj instanceof TextObj){
                if(event.keyCode!=13){
                    this.selected.obj.addChar(event.key);
                }
            }
        });
    }

    private mouseMove(event:MouseEvent){
        // console.log(event);
        this.mousePosition=new Cord(event.offsetX,event.offsetY);
        if(this.mouseDown!=undefined&&this.selected){
            if(this.selected.colisionType=="topLeft"){
                this.selected.obj.resizeTopLeft(new Cord(this.mousePosition.x-this.mouseDown.x,this.mousePosition.y-this.mouseDown.y));
                this.mouseDown = this.mousePosition;
            }else if(this.selected.colisionType=="topRight"){
                this.selected.obj.resizeTopRight(new Cord(this.mousePosition.x-this.mouseDown.x,this.mousePosition.y-this.mouseDown.y));
                this.mouseDown = this.mousePosition;
            }else if(this.selected.colisionType=="bottomLeft"){
                this.selected.obj.resizeBottomLeft(new Cord(this.mousePosition.x-this.mouseDown.x,this.mousePosition.y-this.mouseDown.y));
                this.mouseDown = this.mousePosition;
            }else if(this.selected.colisionType=="bottomRight"){
                this.selected.obj.resizeBottomRigh(new Cord(this.mousePosition.x-this.mouseDown.x,this.mousePosition.y-this.mouseDown.y));
                this.mouseDown = this.mousePosition;
            }else{
                this.selected.obj.translate(new Cord(this.mousePosition.x-this.mouseDown.x,this.mousePosition.y-this.mouseDown.y));
                this.mouseDown = this.mousePosition;
            }
        }
    }

    private checkColisions(){
        if(this.mousePosition){
            for (let i = 0; i < this.objs.length; i++) {
                if(this.objs[i].isColiding(this.mousePosition)!=undefined){
                    return {obj:this.objs[i],colisionType:this.objs[i].isColiding(this.mousePosition)};
                }
            }
            return null;
        }
    }

    private drawQrCodeSpace(){
        let width = this.helper.cmToPixels(3,this.dpi);
        let height = this.helper.cmToPixels(3.358,this.dpi);
        let x = this.helper.cmToPixels(5.2,this.dpi);
        let y = this.helper.cmToPixels(0.8,this.dpi);
        this.ctx.fillStyle = 'white';
        this.ctx.fillRect(x,y,width,height);
    }

    async draw(){
        this.clearCanvas();
        this.drawBG();
        this.objs.forEach((item)=>{
            // console.log(item);
            item.draw();
        });

        this.drawQrCodeSpace();
        // let baseObj = new BaseObj(100,100,100,100,this.ctx);
        // this.checkColisions(baseObj);

        requestAnimationFrame(()=>{
            this.draw();
        });
    }

    private clearCanvas(){
        this.ctx.clearRect(0, 0,this.ctx.canvas.width, this.ctx.canvas.height);
    }

    private drawBG(){
        this.ctx.drawImage(this.bgImage,0,0,this.bgImage.width,this.bgImage.height);
    }
}
