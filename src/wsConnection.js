import { promisify } from "util";

export default class wsConnection {
    constructor(url){
        this.url = url;
    }

    connect(){
        return new Promise((resolve, reject)=>{
            let websocket = new WebSocket(this.url);
            websocket.onopen = ()=>{
                resolve(websocket);
            };
            
            websocket.onerror = (err)=>{
                reject(err);
            };
        })
    }
}