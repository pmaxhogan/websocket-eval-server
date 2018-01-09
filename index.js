const WebSocket = require("ws");
const readline = require("readline");

console.log("Loaded dependencies");

const wss = new WebSocket.Server({ port: 8080 });

// Broadcast to all.
wss.broadcast = function broadcast(data) {
  wss.clients.forEach(function each (client) {
    if (client.readyState === WebSocket.OPEN) {
      client.send(data);
    }
  });
};

wss.on("connection", ws => {
  ws.on("message", function incoming(message) {
    console.log("< " + message);
  });
  process.stdout.write("New client connected!\n");
});

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
  terminal: process.stdin.isTTY
});

rl.on("line", function(line){
    wss.broadcast(line);
})

wss.on("message", x=>console.log(x.data))

//wss.on("ready", () => process.stdout.write("Ready!"));
