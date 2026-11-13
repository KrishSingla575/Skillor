const fs = require('fs');
const path = require('path');

const DATA_DIR = path.join(__dirname, '../../data');
const DB_FILE = path.join(DATA_DIR, 'db.json');

// Ensure data directory exists
if (!fs.existsSync(DATA_DIR)) {
  fs.mkdirSync(DATA_DIR, { recursive: true });
}

// Initial empty structure
const initialData = {
  users: [],
  skills: [],
  userSkills: [],
  exchangeRequests: [],
  sessions: [],
  reviews: [],
  conversations: [],
  messages: [],
  notifications: [],
};

class JsonDb {
  constructor() {
    this.filePath = DB_FILE;
    this.data = this.load();
  }

  load() {
    try {
      if (fs.existsSync(this.filePath)) {
        const raw = fs.readFileSync(this.filePath, 'utf-8');
        const parsed = JSON.parse(raw);
        return { ...initialData, ...parsed };
      }
    } catch (err) {
      console.error('[DB] Error loading db.json, initializing fresh store:', err.message);
    }
    this.save(initialData);
    return { ...initialData };
  }

  save(data = this.data) {
    try {
      const tempPath = `${this.filePath}.tmp`;
      fs.writeFileSync(tempPath, JSON.stringify(data, null, 2), 'utf-8');
      fs.renameSync(tempPath, this.filePath);
      this.data = data;
    } catch (err) {
      console.error('[DB] Error saving db.json:', err.message);
    }
  }

  getCollection(name) {
    if (!this.data[name]) {
      this.data[name] = [];
    }
    return this.data[name];
  }

  find(collectionName, query = {}) {
    const list = this.getCollection(collectionName);
    return list.filter((item) => {
      for (const key of Object.keys(query)) {
        if (query[key] !== undefined && item[key] !== query[key]) {
          return false;
        }
      }
      return true;
    });
  }

  findOne(collectionName, query = {}) {
    const list = this.getCollection(collectionName);
    return list.find((item) => {
      for (const key of Object.keys(query)) {
        if (query[key] !== undefined && item[key] !== query[key]) {
          return false;
        }
      }
      return true;
    }) || null;
  }

  findById(collectionName, id) {
    const list = this.getCollection(collectionName);
    return list.find((item) => String(item.id) === String(id) || String(item._id) === String(id)) || null;
  }

  insert(collectionName, record) {
    const list = this.getCollection(collectionName);
    const newRecord = {
      id: record.id || `rec_${Date.now()}_${Math.random().toString(36).substring(2, 8)}`,
      createdAt: record.createdAt || new Date().toISOString(),
      ...record,
    };
    list.push(newRecord);
    this.save();
    return newRecord;
  }

  update(collectionName, id, updates) {
    const list = this.getCollection(collectionName);
    const index = list.findIndex((item) => String(item.id) === String(id) || String(item._id) === String(id));
    if (index === -1) return null;

    const updatedRecord = {
      ...list[index],
      ...updates,
      updatedAt: new Date().toISOString(),
    };
    list[index] = updatedRecord;
    this.save();
    return updatedRecord;
  }

  delete(collectionName, id) {
    const list = this.getCollection(collectionName);
    const index = list.findIndex((item) => String(item.id) === String(id) || String(item._id) === String(id));
    if (index === -1) return false;

    list.splice(index, 1);
    this.save();
    return true;
  }

  deleteMany(collectionName, query = {}) {
    let list = this.getCollection(collectionName);
    const initialLen = list.length;
    list = list.filter((item) => {
      for (const key of Object.keys(query)) {
        if (query[key] !== undefined && item[key] === query[key]) {
          return false;
        }
      }
      return true;
    });
    this.data[collectionName] = list;
    this.save();
    return initialLen - list.length;
  }

  count(collectionName, query = {}) {
    return this.find(collectionName, query).length;
  }
}

const db = new JsonDb();

module.exports = db;

