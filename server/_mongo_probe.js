const net = require('net')

const s = net.createConnection(27017, '127.0.0.1')
s.on('connect', () => { console.log('mongo_up'); s.end() })
s.on('error', () => { console.log('mongo_down'); s.end() })