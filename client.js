const zmq = require('zeromq');
const request = zmq.socket('req');
const ZmqMiddlewareManager = require('./zmq.middleware');
const jsonMiddleware = require('./json.middleware');
const {server_host, server_port, duration} = require('./setup');
async function run(){
    await request.connect(`tcp://${server_host}:${server_port}`);

    const zmqm = new ZmqMiddlewareManager(request);
    zmqm.use(jsonMiddleware.json());

    zmqm.use({
        inbound: function(message, next){
            console.log(`Echoed back:`, message.data);
            next();
        }
    });

    setInterval(()=>{
        zmqm.send({action: `ping`, echo: Date.now()});
        // console.log(duration);
    }, duration);

}


run();