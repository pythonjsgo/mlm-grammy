import {Router} from "@grammyjs/router";
import dbManager, {setUserStep} from "../db-manager";
import {spamProcess} from "../logic";
import {ISpamStatistics} from "index";
import {setUser} from "@sentry/node";

export const router = new Router((ctx: any) => {
    return ctx.userData?.step
})

router.route('get-spam-message', async (ctx: any) => {
    const db = await dbManager
    const userID: number = ctx.from.id

    const userIdsToSpam = (await db.users.find().toArray()).map(i => i.userID)
    spamProcess(userIdsToSpam, ctx.msg).then((spamStatistics: any) => {
        ctx.reply(`<b>Рассылка заверешена</b>
<b>Статистика рассылка: </b>
    Успешно отпралвено: ${spamStatistics.messagesSent}
    Отправлено с ошибкой: ${spamStatistics.errors}`, {parse_mode: "HTML"})
        setUserStep(userID)
    })

})