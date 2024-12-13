import { createClient } from 'redis';

/**
 * Class for performing operations with redis service
 */
class RedisClient {
  constructor() {
    this.client = createClient();
    this.client.on('error', (err) => console.log(`Error connecting to Redis: ${err}`));
  }

  /**
   * Checks if connection to Redis is Alive
   * @return {boolean} true if connection alive or false if not
   */
  isAlive() {
    return this.client.connected;
  }

  /**
   * gets value corresponding to key in redis
   * @key {string} key to search for in redis
   * @return {string}  value of key
   */
  async get(key) {
    return new Promise((resolve, reject) => {
      this.client.get(key, (error, value) => {
        if (error) {
          reject(error);
        } else {
          resolve(value);
        }
      });
    });
  }

  /**
   * Creates a new key in redis with a specific TTL
   * @key {string} key to be saved in redis
   * @value {string} value to be asigned to key
   * @duration {number} TTL of key
   * @return {undefined}  No return
   */
  async set(key, value, duration) {
    return new Promise((resolve, reject) => {
      this.client.set(key, value, 'EX', duration, (error) => {
        if (error) {
          reject(error);
        } else {
          resolve();
        }
      });
    });
  }

  /**
   * Deletes key in redis service
   * @key {string} key to be deleted
   * @return {undefined}  No return
   */
  async delete(key) {
    return new Promise((resolve, reject) => {
      this.client.del(key, (error, response) => {
        if (error) {
          reject(error);
        } else {
          resolve(response);
        }
      });
    });
  }
}

const redisClient = new RedisClient();
export default redisClient;
