class ZmqMiddlewareManager {
    constructor(socket) {
        this.socket = socket;
        // two empty list that contain middleware function
        this.inboundMiddleware = [];
        this.outboundMiddleware = [];

        // start listening
        socket.on('message', message => {
            this.executeMiddleware(this.inboundMiddleware, {
                data:message
            });
        });
    }
    /**
     * Executes the middleware when a new message
     * is sent through the socket
     * @param {*} data 
     */
    send(data) {
        const message = {
            data
        };
        this.executeMiddleware(this.outboundMiddleware, message, ()=>{
            this.socket.send(message.data);
        });
    }
    /**
     * Appends middleware functions to pipelines
     * 
     * @param {Array} middleware 
     */
    use(middleware) {
        if(middleware.inbound) {
            this.inboundMiddleware.push(middleware.inbound);
        }
        if(middleware.outbound) {
            this.outboundMiddleware.push(middleware.outbound);
        }
    }

    executeMiddleware(middleware, arg, finish) {
        function iterator(index) {
            if(index === middleware.length) {
                return finish && finish();
            }
            middleware[index].call(this, arg, err=>{
                if(err) {
                    return console.error(`There was an error: ${err.message}`);
                }
                iterator.call(this, ++index);
            });
        }
        iterator.call(this, 0);
    }
}

module.exports = ZmqMiddlewareManager;