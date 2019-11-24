const jsonMiddleware = () => ({
    /**
     * Deserializes JSON
     * @param {Object} message 
     * @param {Function} next 
     */
    inbound: function(message, next) {
        message.data = JSON.parse(message.data.toString());
        next();
    },
    /**
     * Serializes JSON
     * @param {Object} message 
     * @param {Function} next 
     */
    outbound: function(message, next) {
        message.data = new Buffer.from(JSON.stringify(message.data));
        next();
    }
 });

 module.exports.json = jsonMiddleware;