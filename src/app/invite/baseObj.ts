import { HelperService } from '../helper.service';

export class Cord{
    x;
    y;

    constructor(x,y){
        this.x= x;
        this.y = y;
    }

    dist(cord:Cord){
        return Math.sqrt(Math.pow(this.x-cord.x,2)+Math.pow(this.y-cord.y,2));
    }
}


export class BaseObj{

    protected _width:number;
    width:number;
    protected _height:number;
    height:number;
    protected _x:number;
    x:number;
    protected _y:number;
    y:number;
    topLeft:Cord;
    topRight:Cord;
    bottomLeft:Cord;
    bottomRight:Cord;
    ctx:CanvasRenderingContext2D;
    selected=false;
    layer=0;
    dpi;
    helper:HelperService

    constructor(options:{x:number,y:number,width:number,height:number,ctx:CanvasRenderingContext2D,dpi,helper:HelperService,layer:number}){
        this.helper = options.helper;
        this.dpi = options.dpi;
        this.helper = options.helper;
        this.height = options.height;
        this._height = options.helper.cmToPixels(options.height,options.dpi);
        this.width = options.width;
        this._width = options.helper.cmToPixels(options.width,options.dpi);
        this.ctx = options.ctx;
        this.x = options.x;
        this._x = options.helper.cmToPixels(options.x,options.dpi);
        this.y = options.y;
        this._y = options.helper.cmToPixels(options.y,options.dpi);
        this.calculatePoints();
    }

    calculatePoints(){
        this.topLeft = new Cord(this._x,this._y);
        this.topRight = new Cord(this._x+this._width,this._y);
        this.bottomLeft = new Cord(this._x,this._y+this._height);
        this.bottomRight = new Cord(this._x+this._width,this._y+this._height);

    }

    isColiding(position:Cord){
        if(this.bottomLeft.dist(position)<5){
            return 'bottomLeft';
        }
        else if(this.bottomRight.dist(position)<5){
            return 'bottomRight';
        }
        else if(this.topLeft.dist(position)<5){
            return 'topLeft';
        }
        else if(this.topRight.dist(position)<5){
            return 'topRight';
        }
        else if(this.bottomLeft.x<=position.x && this.bottomRight.x>=position.x && this.bottomLeft.y>=position.y && this.topLeft.y<=position.y){
            console.log('test')
            return 'inside';
        }
        return undefined;
    }

    editOrMoving(){

    }

    recalculateSizes(){
        this.width = this.helper.pixelToCm(this._width,this.dpi);
        this.height = this.helper.pixelToCm(this._height,this.dpi);
        this.x = this.helper.pixelToCm(this._x,this.dpi);
        this.y = this.helper.pixelToCm(this._y,this.dpi);
    }

    resizeTopLeft(cord:Cord){
        this._width-=cord.x;
        this._height-=cord.y;
        this._x+=cord.x;
        this._y+=cord.y;
        this.calculatePoints();
        this.editOrMoving();
        this.recalculateSizes();
    }

    resizeTopRight(cord:Cord){
        this._width+=cord.x;
        this._height-=cord.y;
        this._y+=cord.y;
        this.calculatePoints();
        this.editOrMoving();
        this.recalculateSizes();
    }

    resizeBottomLeft(cord:Cord){
        this._width-=cord.x;
        this._height+=cord.y;
        this._x+=cord.x;
        this.calculatePoints();
        this.editOrMoving();
        this.recalculateSizes();
    }

    resizeBottomRigh(cord:Cord){
        this._width+=cord.x;
        this._height+=cord.y;
        this.calculatePoints();
        this.editOrMoving();
        this.recalculateSizes();
    }

    translate(cord:Cord){
        this._x+=cord.x;
        this._y+=cord.y;
        this.calculatePoints();
        this.editOrMoving();
        this.recalculateSizes();
    }

    private drawEditorButons(){
        this.ctx.fillStyle = "#3da8c3";
        this.ctx.strokeStyle = '#f0c7bd';
        this.ctx.beginPath();
        this.ctx.rect(this.topLeft.x,this.topLeft.y,this._width,this._height);
        this.ctx.stroke();

        this.ctx.beginPath();
        this.ctx.arc(this.topLeft.x, this.topLeft.y, 5, 0, 2 * Math.PI);
        this.ctx.fill();

        this.ctx.beginPath();
        this.ctx.arc(this.topRight.x, this.topRight.y, 5, 0, 2 * Math.PI);
        this.ctx.fill();

        this.ctx.beginPath();
        this.ctx.arc(this.bottomLeft.x, this.bottomLeft.y, 5, 0, 2 * Math.PI);
        this.ctx.fill();

        this.ctx.beginPath();
        this.ctx.arc(this.bottomRight.x, this.bottomRight.y, 5, 0, 2 * Math.PI);
        this.ctx.fill();

    }

    draw(){
        this.ctx.strokeStyle = '#000000';

        if(this.selected){
            this.drawEditorButons();
        }
    }
}
