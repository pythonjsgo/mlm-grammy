import {NextFunction} from 'grammy'
import fs from 'fs'
import dbManager from "../db-manager";
import * as module from "module";
import {bot} from "../main";

export default async (ctx: any, next: any) => {
    const userID = ctx.from.id
    const text = ctx?.msg?.text
    try {

        if (ctx?.msg.text && !ctx.callbackQuery) {
            const uniq = text.split(' ')[1]

            const db = await dbManager
            // Events
            if (uniq[1] === 'e') {
                const event = await db.events.findOne({uniq})
                if (!event) {
                    return ctx.reply('<b>Событие не найдено!</b>', {parse_mode: "HTML"})
                }
                ctx.api.copyMessage(
                    userID,
                    event.message.from.id,
                    event.message.message_id
                )
                db.events.updateOne({uniq}, {$addToSet: {users: userID}}, {upsert: true})
            }
            // Referral
            if (uniq[1] === 'r') {
                const referrerID: number = Number(uniq.slice(2))
                await db.users.updateOne({userID: referrerID}, {$addToSet: {referrals: userID}})
                bot.api.sendMessage(referrerID, '<b>Новый реферал!</b>\n' +
                    `Пользователь <a href="tg://user?id=${userID}">${ctx.from.first_name}</a>`,
                    {parse_mode: "HTML"})
                next()
            }
            // Tracking
            if (uniq[1] === 't') {
                db.trackingLinks.updateOne({uniq}, {$addToSet: {users: userID}})
                next()
            }


        } else return next()
    } catch (e) {
        next()
    }
}
