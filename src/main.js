import(/* webpackChunkName: "wsConnection" */'./wsConnection')
.then(({default: wsConnection})=>{
    let websocket = new wsConnection('ws://localhost:40512');

    websocket.connect()
    .then((ws)=>{
        console.log(ws.readyState, ws.OPEN)
        if(ws.readyState === ws.OPEN){
            ws.send('connected');

            ws.onmessage = (ev)=>{
                console.log(ev.data)
            }

            /*
            setInterval(
                () => ws.send(`${new Date()}`),
            1000 * 60 * 1) //a cada 1 min
            */
        }
    })
    .catch((err)=>{
        console.log(err)
    })
})