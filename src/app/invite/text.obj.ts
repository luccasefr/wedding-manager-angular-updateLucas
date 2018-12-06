import { BaseObj } from './baseObj';
import { HelperService } from '../helper.service';
import { InviteService } from '../invite.service';

export class TextObj extends BaseObj{

    text:string;
    id:number;
    fontSize:number;
    font:{id:number,name:string};
    time=0;
    textColor="#000000";

    constructor(options:{id:number,x:number,y:number,width:number,height:number,ctx:CanvasRenderingContext2D,helper:HelperService,font:{id:number,name:string},layer:number,dpi:number,color?:string,text?:string,fontSize?:number},private inviteService:InviteService){
        super(options);
        this.id = options.id;
        this.textColor = options.color;
        this.text = options.text ? options.text : 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras ullamcorper ante a diam pulvinar, accumsan maximus mauris venenatis.';
        this.fontSize = options.fontSize ? options.fontSize : 2;
        this.font = options.font;
    }

    private removeWordFromText(text:string){
        let lastIndex = text.lastIndexOf(" ");
        if(lastIndex==-1) return null;
        // console.log('splited into',[text.substring(0,lastIndex),text.substring(lastIndex,text.length)]);
        return [text.substring(0,lastIndex),text.substring(lastIndex,text.length)];
    }

    editOrMoving(){
        this.helper.debounce(()=>{
            this.inviteService.updateText(this,this.font.id);
        },500)
    }

    private breakText(text){
        // console.log('break this text: '+text);
        let textWidth = this.ctx.measureText(text).width;
        let stringLeft='';
        while(textWidth>=this._width){
            let separatedWord = this.removeWordFromText(text);
            if(separatedWord==null) return [text];

            if(separatedWord[0]==""){
                return [text,stringLeft];
            }
            text = separatedWord[0];
            stringLeft = separatedWord[1]+stringLeft;
            textWidth = this.ctx.measureText(text).width;
            // console.log(text);
            // console.log(stringLeft);
        };
        if(stringLeft==''){
            return [text];
        }else{
            if(this.ctx.measureText(stringLeft).width>=this._width){
                return [text].concat(this.breakText(stringLeft));
            }
            return [text,stringLeft];
        }
    }

    private cleanFirstSpaces(texts){
        for (let i = 0; i < texts.length; i++) {
            if(texts[i][0]==' '){

                texts[i] = texts[i].substring(1,texts[i].length);
            }
        }
    }

    backSpace(){
        this.text=this.text.substring(0,this.text.length-1);
        this.editOrMoving();
    }

    addChar(char){
        if(char){
            this.text+=char;
            this.editOrMoving();
        }
    }

    draw(){
        let text = this.text;
        let fontInPx = this.helper.cmToPixels(this.fontSize/10,this.dpi);
        this.ctx.font= fontInPx+"px "+this.font.name;
        let texts = this.breakText(this.text);
        this.cleanFirstSpaces(texts);
        if(this.selected){
            this.time++;
            if(this.time>30){
                texts[texts.length-1]+='|';
            }
            if(this.time>60){
                this.time = 0;
            }
        }
        this.ctx.fillStyle = this.textColor;
        this.ctx.strokeStyle = this.textColor;
        for (let i = 0; i < texts.length; i++) {
            this.ctx.fillText(texts[i],this._x,this._y+(fontInPx*(i+1)));
        }
        super.draw();
    }
}
