function sendJson(res, statusCode, payload) {
  const body = JSON.stringify(payload, null, 2);

  res.writeHead(statusCode, {
    "Content-Type": "application/json; charset=utf-8",
    "Content-Length": Buffer.byteLength(body)
  });

  res.end(body);
}

function sendStub(res, featureName) {
  sendJson(res, 501, {
    status: "not_implemented",
    feature: featureName,
    message: "The route and controller are initialized. Database logic will be added during implementation."
  });
}

module.exports = {
  sendJson,
  sendStub
};
