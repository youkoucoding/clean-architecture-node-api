import makeCommentsDb from './comments-db';
import mongodb, { Db } from 'mongodb';

let cachedDb: Db;
const MongoClient = mongodb.MongoClient;
const url = process.env.DM_COMMENTS_DB_URL!;
const dbName = process.env.DM_COMMENTS_DB_NAME;
const client = new MongoClient(url, { useNewUrlParser: true });

export async function makeDb(): Promise<Db> {
  if (!client.isConnected()) {
    await client.connect();
  }
  return client.db(dbName);
}

const commentsDb = makeCommentsDb({ makeDb });
export default commentsDb;
