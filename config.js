
module.exports = {
    "dev": {
        "server_host": process.env.server_host,
        "server_port": process.env.server_port,
        "duration": process.env.duration
    },
    "prod": {
        "server_host": process.env.server_host,
        "server_port": process.env.server_port,
        "duration": process.env.duration
    },
    "test": {
        "server_host": process.env.server_host,
        "server_port": process.env.server_port,
        "duration": process.env.duration
    }
}