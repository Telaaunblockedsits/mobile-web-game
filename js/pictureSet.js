import {loadImage} from "./loaders.js";
export default class pictureSet{
    constructor(){
        this.pictures = new Map();
    }
    store(name,url){
        const buffer = document.createElement('canvas');
        let imgTemp;
        return loadImage(url).then(image=>{
            imgTemp=image;
        }).then(()=>{
            buffer.height=imgTemp.height;
            buffer.width=imgTemp.width;
            buffer.getContext("2d").drawImage(imgTemp,0,0);
            this.pictures.set(name,buffer);


        });


        }
    draw(name,context,x,y){
        const buffer = this.pictures.get(name);
        context.drawImage(buffer,x,y);
    }

    drawWithChange(name,context,x,y,w,h,dx,dy,dw,dh){
        const buffer = this.pictures.get(name);
        w=buffer.width;
        h=buffer.height;
        context.drawImage(buffer,x,y,w,h,dx,dy,dw,dh);
    }
    drawTile(name,context,xBlock,yBlock){
        const buffer = this.pictures.get(name);
        context.drawImage(buffer, xBlock*buffer.width,yBlock );
    }
    addEventLis(name,func,boolean){
        const buffer = this.pictures.get(name);
        buffer.addEventListener("click",func,true);
        console.log("add event listener");
    }
}