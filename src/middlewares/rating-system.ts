import dbManager from "../db-manager";
import {NextFunction} from "grammy";

export default async (ctx: any, next: NextFunction) => {
    const chatID = ctx.chat.id
    if (chatID < 0){
        if (ctx.msg.reply_to_message){
            const db = await dbManager
            const text = ctx.msg.text
            if (text.includes('+')){
                const userToUp = ctx.msg.reply_to_message.from
                const response = await db.users.findOneAndUpdate({userID: userToUp.id}, {$inc: {rating: 1}}, {upsert: true})
                ctx.reply(`<b>Рейтинг пользователя <a href="tg://user?id=${userToUp.id}">${userToUp.first_name}</a> увеличен!\n  Рейтинг [${response?.value?.rating}]</b>`, {parse_mode: "HTML"})
            }
            if (text.includes('-')){
                const userToUp = ctx.msg.reply_to_message.from
                const response = await db.users.findOneAndUpdate({userID: userToUp.id}, {$inc: {rating: -1}}, {upsert: true})
                ctx.reply(`<b>Рейтинг пользователя <a href="tg://user?id=${userToUp.id}">${userToUp.first_name}</a> уменьшен!\n  Рейтинг [${response?.value?.rating}]</b>`, {parse_mode: "HTML"})

            }
        }
    } else return next()
}