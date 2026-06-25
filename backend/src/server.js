const http = require("http");
const app = require("./app");

const PORT = Number(process.env.PORT) || 3000;

const server = http.createServer(app);

server.listen(PORT, () => {
  console.log(`Personal Expense Tracker API running at http://localhost:${PORT}`);
  console.log(`Health check: http://localhost:${PORT}/api/health`);
});

// Shut down cleanly when the terminal process is stopped.
function shutdown(signal) {
  console.log(`\nReceived ${signal}. Closing server...`);
  server.close(() => process.exit(0));
}

process.on("SIGINT", () => shutdown("SIGINT"));
process.on("SIGTERM", () => shutdown("SIGTERM"));
