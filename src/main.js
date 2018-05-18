import('./wsConnection').then(({default: wsConnection})=>{
    let websocket = new wsConnection('ws://localhost:40512');

    websocket.connect()
    .then((ws)=>{
        if(ws.readyState === ws.OPEN){
            ws.send('connected');
        }

        ws.onmessage = (ev)=>{
            console.log(ev.data);
        }
    })
    .catch((err)=>{
        console.log(err)
    })
})