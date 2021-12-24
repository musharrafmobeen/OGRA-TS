// import mongoose from "mongoose";
// import * as redis from "redis";

// const redisUrl: any = "redis://127.0.0.1:6379";
// const redisClient = redis.createClient(redisUrl);
// redisClient.connect();

// const exec = mongoose.Query.prototype.exec;

// //@ts-ignore
// mongoose.Query.prototype.cache = function (options = {}) {
//   //@ts-ignore
//   this.cacheQuery = true;
//   //@ts-ignore
//   this.hashKey = JSON.stringify(options.key || "");

//   return this;
// };

// mongoose.Query.prototype.exec = async function () {
//   const args: any = arguments;
//   //@ts-ignore
//   if (!this.cacheQuery) {
//     return await exec.apply(this, args);
//   }
//   const that: any = this;
//   const key = JSON.stringify(
//     Object.assign({}, this.getQuery(), {
//       collection: that.mongooseCollection.name,
//     })
//   );
//   const cacheValue = await redisClient.get(key);

//   if (cacheValue) {
//     return JSON.parse(cacheValue);
//   }

//   const result = await exec.apply(this, args);
//   redisClient.set(key, JSON.stringify(result));
//   return result;
// };

// const clearHash = (hashKey: any) => {
//   redisClient.del(JSON.stringify(hashKey));
// };

// export { clearHash };
