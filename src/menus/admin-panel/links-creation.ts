'use strict'
import { createBackMainMenuButtons, MenuMiddleware, MenuTemplate } from 'grammy-inline-menu'
import { IContext } from 'index'
import { getGlobalData } from '../../logic'
import dbManager, { setUserStep } from '../../db-manager'

const ROOT_TRIGGER: string = 'links-creation/'

function trackingLinksTextRender (trackingLinks: any) {
  let text = ''
  for (const link of trackingLinks) {
    text += `<b>${link?.title}</b> <code>${link?.url}</code> /rldel_${link?.uniq}\n` +
            `  <b>Статистика ссылки:</b> ${link?.statistics?.usersCount || 0} пользователей`
  }
  return text
}

export const menu = new MenuTemplate(
  async () => {
    const db = await dbManager
    const trackingLinks = await db.trackingLinks.find().toArray()
    return {
      text: `<b>Создание ссылок для отслеживания трафика</b>
<b>Активных ссылок для отслеживания</b> - ${trackingLinks.length}
${trackingLinksTextRender(trackingLinks)}
`,
      parse_mode: 'HTML'
    }
  }
)

menu.interact('Создать ссылку', 'create-link', {
  do: (ctx: any) => {
    const userID = ctx.from.id
    ctx.reply('Отправьте название для новой ссылки:')
    setUserStep(userID, 'create-link')
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
