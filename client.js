const zmq = require('zeromq');
const request = zmq.socket('req');
const ZmqMiddlewareManager = require('./zmq.middleware');
const jsonMiddleware = require('./json.middleware');
const {server_host, server_port, duration} = require('./setup');
async function run({close=false, closeTime=0}){
    
    const result = await request.connect(`tcp://${server_host}:${server_port}`);
    
    const zmqm = new ZmqMiddlewareManager(request);
    zmqm.use(jsonMiddleware.json());
    
    zmqm.use({
        inbound: function(message, next){
            console.log(`Echoed back:`, message.data);
            // console.log(result);
            if (message.data=='close') {
                // console.log(`Echoed back:`, message.data);
                request.close()
            }
            else 
               next();
        }
    });

    setInterval(()=>{
        zmqm.send({action: `ping`, echo: Date.now()});
        // console.log(duration);
    }, duration);
    if (close&&closeTime>0) {
        setTimeout(()=> {
            zmqm.send({action:'close', echo: Date.now()});
            console.log('start close');
            request.disconnect(`tcp://${server_host}:${server_port}`);
            request.close();
            process.exit(0);
        }, closeTime);
    }
    // process.on('exit', request.close)
    return {request:result};
}
module.exports = {run};

// run();