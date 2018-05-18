export default class wsConnection {
    constructor(url){
        this.url = url;
        this.websocket = {}
    }
    connect(){
        return new Promise((resolve, reject)=>{
            
            this.websocket = new WebSocket(this.url);
            let websocket = this.websocket;

            websocket.onopen = ()=>{
                resolve(websocket);
            };
            
            websocket.onerror = (err)=>{
                reject(err);
            };
        });
    }
}