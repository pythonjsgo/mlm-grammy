import dbManager from './db-manager'
import { bot } from './main'
import {PROJECT_DOMAINS} from "../config";
export function socialMedia (url: string) {
  if (url.includes('youtube')) {
    return 'youtube'
  }
  if (url.includes('facebook')) {
    return 'facebook'
  }
  if (url.includes('tiktok')) {
    return 'tiktok'
  }
  if (url.includes('twitter')) {
    return 'twitter'
  }
  if (url.includes('instagram')) {
    return 'instagram'
  }
  return 'site'
}

export async function newUserHandler (userID: number, startMessageText: string) {
  const db = await dbManager
  try {
    const referralID = Number(startMessageText.split(' ')[1])
    if (referralID) {
      await db.users.updateOne({userID: referralID}, {$addToSet: {referrals: userID}})
      await bot.api.sendMessage(referralID, `Новый реферал ${userID}`)
    }
  } catch (e) {
    console.error(e)
  }
}

export async function getGlobalData () {
  const db = await dbManager

  const usersCount = await db.users.countDocuments()
  const usersCountActive = await db.users.countDocuments({ status: 'registered' })
  return { usersCount, usersCountActive }

}

export function spamProcess (userIds: number[], message: any) {
  return new Promise(async resolve => {
    const db = await dbManager
    const users = await db.users.find().toArray()

    const spamStatistics = { messagesSent: 0, errors: 0 }
    for (const userID of userIds) {
      await bot.api.copyMessage(userID, message.from.id, message.message_id).then(() => {
        spamStatistics.messagesSent++
      }).catch(() => {
        spamStatistics.errors++
      })
      break
    }
    resolve(spamStatistics)
  })
}



export function randomString (strLength: number, charSet: any = undefined) {
  const result = []

  strLength = strLength || 5
  charSet = charSet || 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'

  while (strLength--) { // (note, fixed typo)
    result.push(charSet.charAt(Math.floor(Math.random() * charSet.length)))
  }

  return result.join('')
}

export function projectLinksValidator (text: string): Boolean {

  for (const line of text.split('\n')) {
    if (PROJECT_DOMAINS.includes(line)){

    }
  }
  // @TODO
  return true
}
