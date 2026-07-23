const { URL } = require("url");
const routes = require("./routes");
const { findRoute } = require("./utils/routeMatcher");
const { sendJson } = require("./utils/response");

async function app(req, res) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, PATCH, DELETE, OPTIONS"
  );
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Content-Type, Authorization"
  );
  if (req.method === "OPTIONS") {
    res.writeHead(204);
    res.end();
    return;
  }
  if (req.method === "POST" || req.method === "PUT") {
    let body = "";
    for await (const chunk of req) {
      body += chunk;
    }
    try {
      req.body = JSON.parse(body);
    } catch (error) {
      req.body = {};
    }
  }
  const requestUrl = new URL(
    req.url,
    `http://${req.headers.host || "localhost"}`
  );
  const pathname = requestUrl.pathname;
  const match = findRoute(
    routes,
    req.method,
    pathname
  );
  console.log(
    `${new Date().toISOString()} ${req.method} ${pathname}`
  );
  if (!match) {
    sendJson(res, 404, {
      status: "error",
      message: `No route found for ${req.method} ${pathname}`,
      hint: "Open GET /api to see the initialized API routes."
    });
    return;
  }

  req.params = match.params;
  req.query = Object.fromEntries(
    requestUrl.searchParams.entries()
  );
  req.pathname = pathname;

  try {
    await match.route.handler(req, res);
  } catch (error) {
    console.error(error);

    sendJson(res, 500, {
      status: "error",
      message: "An unexpected server error occurred."
    });
  }
}
module.exports = app;
