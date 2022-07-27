import {Router} from '@grammyjs/router'
import * as config from '../../config'
import * as keyboards from '../assets/keyboards'
import * as strings from '../assets/strings'
import partnerMenu from '../menus/partner-menu'
import {dbManager, setUserStep} from '../db-manager'
import {randomString} from '../logic'
import {configureScope} from "@sentry/node";

export const router = new Router((ctx: any) => {
    return ctx.userData?.step
})

router.route('create-checklist', async (ctx: any) => {
    const userID = ctx.from.id
    const text = ctx.msg.text
    const SOCIAL_MEDIA = [
        'instagram',
        'telegram'
    ]
    let checkList = []
    if (text.includes('-')) {
        const lines = text.split('\n')
        const checkListTitle = lines[0]
        lines.shift()
        for (const line of lines) {
            const lineData = line.split('-')
            const title = lineData[0]
            const link = lineData[1]
            const channelID = lineData[2]
            checkList.push({
                title,
                link,
                channelID
            })
        }
        if (checkList.length) {
            const db = await dbManager
            const uniq: string = '_c' + randomString(5)
            db.checkLists.insertOne({
                url: `t.me/${config.BOT_USERNAME}?start=${uniq}`,
                title: checkListTitle,
                uniq,
                media: checkList
            }).then(() => {
                ctx.reply('<b>Чек-лист успешно добавлен!</b>',
                    {parse_mode: "HTML"})
                setUserStep(userID)
            })

        }
    } else ctx.reply(
        `Отправьте сообщение в формате
        
Название чек-листа
instagram - instagram.com/xxxxxx
telegram - id - ссылка 
    `)
})
router.route('create-event', async (ctx: any) => {
    const text = ctx.msg.text
    if (text) {
        const db = await dbManager
        const uniq: string = '_e' + randomString(5)
        ctx.session.title = text
        ctx.session.uniq = uniq
        setUserStep(ctx.from.id, 'get-event-message')
        ctx.reply('Отправьте сообщение события:')
    }
})
router.route('get-event-message', async (ctx: any) => {
    const db = await dbManager
    const userID = ctx.from.id
    const title = ctx.session?.title
    const uniq = ctx.session?.uniq

    db.events.insertOne({
        title,
        uniq,
        url: `t.me/${config.BOT_USERNAME}?start=${uniq}`,
        message: ctx.msg
    }).then(() => {
        ctx.reply('Ссылка успешно создана')
        setUserStep(ctx.from.id)
    })
})


router.route('create-link', async (ctx: any) => {
    const text = ctx.msg.text

    if (text) {
        const db = await dbManager
        const uniq = '_t' + randomString(5)

        db.trackingLinks.insertOne({
            title: text.trim(),
            uniq,
            url: `t.me/${config.BOT_NAME}?start=${uniq}`
        }).then(() => {
            ctx.reply('Ссылка успешно создана')
            setUserStep(ctx.from.id)
        })
    }
})
router.route('exit-way', async (ctx: any, next: any) => {

})
