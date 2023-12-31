class MusicQueue {
    constructor() {
      this.queue = new Map(); 
    }
  
    getQueue(guildId) {
      return this.queue.get(guildId);
    }
  
    setQueue(guildId, queueConstruct) {
      this.queue.set(guildId, queueConstruct);
    }
  
    deleteQueue(guildId) {
      return this.queue.delete(guildId);
    }
  
   
  }
  
  module.exports = new MusicQueue();
  