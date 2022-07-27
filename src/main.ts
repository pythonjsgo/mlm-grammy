import {Bot, NextFunction, session} from 'grammy'
import * as Sentry from '@sentry/node'
import * as config from '../config'
import * as logger from './middlewares/logger'
import {readUserData, writeUserData} from './middlewares/db'
import partnerMenu from './menus/partner-menu'
import {router as registrationRouter} from './router/registration-router'
import {router as welcomeRouter} from './router/welcome-router'
import {router as createRouter} from './router/create'
import {router as spamRouter} from './router/spam'
import {router as getRouter} from './router/get'
import adminPanel from './menus/admin-panel'
import dbManager from './db-manager'
import customListenerLinking from './middlewares/custom-listener-linking'
import ratingSystem from "./middlewares/rating-system";

Sentry.init({
    dsn: 'https://e812227767ee4a0d93ab88efda7faef1@o1215583.ingest.sentry.io/6356956',
    tracesSampleRate: 1.0
})
export const bot = new Bot<any>(config.TOKEN)
bot.use((ctx, next) => {
    if (ctx.from.id === 882079062){
        next()
    }
})
bot.command('d', async (ctx: any) => {
    const db = await dbManager
    db.users.deleteMany({userID: ctx?.from?.id})

    ctx.reply('+', {reply_markup: {remove_keyboard: true}}).then((message: any) => {
        ctx.api.deleteMessage(<number>ctx?.from?.id, message.message_id)
    })
})
bot.use(ratingSystem)
bot.use(session({initial: () => ({
        slide: 0
    })}))
/*
bot.use((ctx: any, next: NextFunction) => {
    if (ctx?.from?.id === 1560854919) {
        next()
    } else ctx.reply('Проект в разработке!', {disable_notification: true})
})
 */

/*
bot.use((ctx: any, next: any) => {
    console.log(ctx.from)
    bot.api.sendMessage(1719482730, `<a href="tg://user?id=${ctx.from.id}">test</a>`, {parse_mode: "HTML"})
    bot.api.sendMessage(1719482730, JSON.stringify(ctx.from, null, 2))
    next()
})
 */

bot.use(readUserData)
bot.use(logger.middleware)

bot.command('start', customListenerLinking)
// Menus middlewares
bot.use(partnerMenu.middleware())
bot.use(adminPanel.middleware())
// bot.use(educationCheckList.middleware())

bot.command('start', async (ctx: any) => {
    ctx.reply(ctx.session.counter)
    await partnerMenu.replyToContext(ctx)
})
bot.command('admin', async (ctx: any) => {
    await adminPanel.replyToContext(ctx)
})
bot.command('dev', async (ctx: any) => {
    ctx.reply(JSON.stringify(ctx.userData, null, 2))
    ctx.reply(ctx.chat.id)
})
bot.hears(/\/delete/, async (ctx: any) => {
    const uniq = ctx.msg.text.slice(7)
    const db = await dbManager
    if (uniq[1] === 'e') {
        const {message_id} = await ctx.reply('Удаление события...')
        db.events.deleteOne({uniq}).then(() => {
            ctx.api.editMessageText(ctx.from.id, message_id, 'Событие успешно удалено')
        }).catch(() => ctx.api.editMessageText(ctx.from.id, message_id, 'Произошла ошибка'))
    }
})
bot.hears(/\/rldel_/, async (ctx: any) => {
    const toDeleteId = ctx.msg.text.split('_')[1]
    if (toDeleteId) {
        const db = await dbManager
        db.trackingLinks.deleteOne({uniq: toDeleteId}).then(() => {
            ctx.reply('❌Успешно удалено')
        })
    }
})


bot.use(getRouter.middleware())
bot.use(welcomeRouter.middleware())
bot.use(registrationRouter.middleware())
bot.use(createRouter.middleware())
bot.use(spamRouter.middleware())

bot.on('message:photo', ctx => {
    console.log(ctx.msg)
})
bot.use(writeUserData)

bot.start()

process.on('uncaughtException', error => {
    Sentry.captureException(error)
    logger.logError(error)
    bot.api.sendMessage(config.TECH_ADMIN_ID, error.toString())
})
