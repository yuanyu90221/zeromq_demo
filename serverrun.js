const {run} = require('./server');
const {server_host, server_port} = require('./setup');
(async()=>{
    let {result} = await run();
    result.on('message', (message)=>{
        // console.log(`mesasge`, Buffer.from(message).toString());
        let mes =  JSON.parse(Buffer.from(message).toString());
        if (mes.action=='close') {
            result.disconnect(`tcp://${server_host}:${server_port}`);
            result.close();
        }
    })
})();