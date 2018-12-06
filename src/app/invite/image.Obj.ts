import { BaseObj } from './baseObj';
import { HelperService } from '../helper.service';
import { InviteService } from '../invite.service';

export class ImageObj extends BaseObj{

    image:HTMLImageElement;
    id:number;
    inviteService:InviteService;
    loaded=false;

    constructor(options:{id:number,inviteService:InviteService,x:number,y:number,width:number,height:number,ctx:CanvasRenderingContext2D,dpi,helper:HelperService,layer:number}){
        super(options);
        this.id = options.id;
        this.inviteService = options.inviteService;
        this.loadImage();
    }

    editOrMoving(){
        this.helper.debounce(()=>{
            this.inviteService.updateImage(this);
        },500)
    }

    async loadImage(){
        this.image = new Image();
        // this.image = await this.guestService.getQrCode(guest);
        // image.src = "data:image/png;base64," + await this.guestService.getQrCode(guest);
        let fileReader = new FileReader();
        fileReader.onload = (fileLoadedEvent:any)=>{
            this.image.src = fileLoadedEvent.target.result;
            this.image.onload=()=>{
                this.loaded=true;
            }
        }
        fileReader.readAsDataURL(await this.inviteService.getImage(this.id));
    }

    draw(){
        if(this.loaded){
            this.ctx.drawImage(this.image,this._x,this._y,this._width,this._height);
            super.draw();
        }
    }
}
