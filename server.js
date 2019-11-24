const zmq = require('zeromq');
const ZmqMiddlewareManager = require('./zmq.middleware');
const jsonMiddleware = require('./json.middleware');
const reply = zmq.socket('rep');
const {server_host, server_port} = require('./setup');

async function run() {
    const result = await reply.bind(`tcp://${server_host}:${server_port}`);
    const zmqm = new ZmqMiddlewareManager(reply);
    zmqm.use(jsonMiddleware.json());
    
    zmqm.use({
        inbound: function(message, next) {
            console.log('Received:', message.data);
            if(message.data.action==='ping') {
                this.send({action:'pong', echo: message.data.echo});
            }
            if(message.data.action==='close') {
                this.send({action:'close', echo: message.data.echo});
                // result.close();
            }
            next();
        }
    });
    return {result};
}

module.exports = {run};