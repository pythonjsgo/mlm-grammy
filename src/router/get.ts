import {Router} from '@grammyjs/router'
import * as config from '../../config'
import * as keyboards from '../assets/keyboards'
import * as strings from '../assets/strings'
import partnerMenu from '../menus/partner-menu'
import {dbManager, setUserStep} from '../db-manager'
import {projectLinksValidator, randomString} from '../logic'
import {configureScope} from "@sentry/node";
import {MANAGER_ID} from "../../config";

export const router = new Router((ctx: any) => {
    return ctx.userData?.step
})

router.route('get-project-links', async (ctx: any) => {
    console.log('92347234787234878923789')
    const userID = ctx.from.id
    const text = ctx.msg.text
    const db = await dbManager
    if (projectLinksValidator(text)){
        ctx.api.sendMessage(MANAGER_ID, '<b>Новая заявка на проверку\n</b>' +
            `<i>Данные -</i> \n ${text}`, {parse_mode: "HTML"})
        ctx.reply('🟢<b>Ваша заявка успешно отправлено, ожидайте рассмотрения!</b>', {
            parse_mode: "HTML"
        })
        db.checkOffers.insertOne({
            userID,
            status: 'waiting',
        })
    } else {
        setUserStep(userID)
        ctx.reply('❌Неверные ссылки')
    }
})
router.route('exit-way', async (ctx: any, next: any) => {

})
