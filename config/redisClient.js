import Redis from "ioredis";

const client = new Redis(
  "rediss://default:AaQAAAIncDFiYTc1NTBjNThhNWY0YjE5YjA3ZTNhYTc1Y2E5NmNhNnAxNDE5ODQ@first-escargot-41984.upstash.io:6379"
);

client.on("connect", () => {
  console.log("Redis connected");
});

client.on("error", (err) => {
  console.log("Redis error: ", err);
});

export default client;
