const http = require("node:http")
const app = require("./app")

const PORT = process.env.PORT || 3010;

app.set("port",PORT)

const server = http.createServer(app)

server.on('listening', () => {
  const address = server.address();
  const bind = typeof address === 'string' ? 'pipe ' + address : 'port ' + PORT;
  console.log('Listening on ' + bind);
});

server.listen(PORT)