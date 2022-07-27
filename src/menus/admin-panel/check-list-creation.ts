'use strict'
import {createBackMainMenuButtons, MenuMiddleware, MenuTemplate} from 'grammy-inline-menu'
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
        const checkLists = await db.checkLists.find().toArray()
        return {
            text: `<b>Чек-листы</b>
${itemsTextRender(checkLists)}
`,
            parse_mode: 'HTML'
        }
    }
)

menu.interact('Создать чек-лист', 'create-event', {
    do: (ctx: any) => {
        const userID = ctx.from.id
        ctx.reply('<b>Отправьте данные нового чек-листа:</b>\n' +
            'В формате \n\n' +
            'instagram - instagram.com/xxxxxx\ntelegram - id - ссылка ', {
            parse_mode: "HTML"
            }
        )
        setUserStep(userID, 'create-checklist')
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
