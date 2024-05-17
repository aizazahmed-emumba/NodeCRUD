import client from "../config/redisClient";

const CACHE_LIMIT = 2;

export const addToCache = async (key, value) => {
  await client.zincrby("cache", 1, key);
  await client.set(key, value);

  client.zcard("cache", (err, length) => {
    if (err) {
      console.error(err);
      return;
    }
    if (length > CACHE_LIMIT) {
      console.log("Cache limit reached, removing least used item");
      client.zrange("cache", 0, length, (err, keys) => {
        if (err) {
          console.error(err);
          return;
        }
        console.log("Removing key: ", keys[1]);
        client.del(keys[1]);
        client.zrem("cache", keys[1]);
      });
    }
  });
};

export const getFromCache = async (key) => {
  const value = await client.get(key);
  if (value) {
    client.zincrby("cache", 1, key);
  }
  return value;
};
