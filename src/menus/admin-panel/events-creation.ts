'use strict'
import {createBackMainMenuButtons, MenuMiddleware, MenuTemplate} from 'grammy-inline-menu'
import {IContext} from 'index'
import {getGlobalData} from '../../logic'
import dbManager, {setUserStep} from '../../db-manager'

const ROOT_TRIGGER: string = 'links-creation/'

function itemsTextRender(items: any) {
    let text = ''
    for (const item of items) {
        text += `<b>${item?.title}</b> <code>${item?.url}</code> /delete${item?.uniq}\n` +
            `  <b>Статистика события:</b> ${item?.users?.length || 0} пользователей\n`
    }
    return text
}

export const menu = new MenuTemplate(
    async () => {
        const db = await dbManager
        const events = await db.events.find().toArray()
        return {
            text: `<b>События</b>
${itemsTextRender(events)}
`,
            parse_mode: 'HTML'
        }
    }
)

menu.interact('Создать событие', 'create-event', {
    do: (ctx: any) => {
        const userID = ctx.from.id
        ctx.reply('Отправьте название для нового события:')
        setUserStep(userID, 'create-event')
        return false
    }
})
menu.interact('Обновить', 'update', {
    do: () => true
})
menu.manualRow(createBackMainMenuButtons('Назад', 'Главное меню'))
export const middleware = new MenuMiddleware(ROOT_TRIGGER, menu)
export default menu
// export {menu, middleware}
