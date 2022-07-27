import { MongoClient } from 'mongodb'
import * as config from '../config'

const client = new MongoClient(config.MONGO_URI)

export const dbManager = (async () => {
  await client.connect()
  const db = client.db(config.DB_NAME)
  return {
    users: db.collection('users'),
    orders: db.collection('orders'),
    folders: db.collection('folders'),
    referralLinks: db.collection('referralLinks'),
    trackingLinks: db.collection('trackingLinks'),
    events: db.collection('events'),
    checkOffers: db.collection('checkOffers'),
    checkLists: db.collection('checkLists'),
    db
  }
})()

export default dbManager
export async function setUserStep (userID: number, step: string = '') {
  const db = await dbManager
  return db.users.updateOne({ userID }, { $set: { step } })
}
