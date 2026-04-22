const { createClient } = require("redis");

const client = createClient();

client.on("error", (err) => {
  console.log("Redis Error:", err);
});

client.on("connect", () => {
  console.log("Redis Connected Successfully");
});

(async () => {
  try {
    await client.connect();
  } catch (err) {
    console.log("Redis Connection Failed:", err);
  }
})();

module.exports = client;
