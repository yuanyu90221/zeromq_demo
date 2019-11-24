const dotenv = require('dotenv');
dotenv.config();


test('server_test', async()=>{
    try {
        console.log(`server_host`, process.env.server_host);
        console.log('server_port', process.env.server_port);
    } catch (err) {
        console.log(err);
    }
});