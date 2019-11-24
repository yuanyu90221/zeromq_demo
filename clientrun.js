const {run} = require('./client');
const {server_host, server_port} = require('./setup');
(async()=>{
    let {request} = await run({close:true, closeTime:4000});
})();