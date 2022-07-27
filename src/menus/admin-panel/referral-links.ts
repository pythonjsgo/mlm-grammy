'use strict'
import { createBackMainMenuButtons, MenuMiddleware, MenuTemplate } from 'grammy-inline-menu'
import { IContext } from 'index'
import { getGlobalData } from '../../logic'
import dbManager from '../../db-manager'

const ROOT_TRIGGER: string = 'global-statistics/'

export const menu = new MenuTemplate(
  async () => {
    const db = await dbManager
    const globalData: any = getGlobalData()
    const referralLinks = await db.referralLinks.find().toArray()
    return {
      text: `<b>Создание ссылок для отслеживания трафика</b>
<b>Активных ссылок для отслеживания<b> - ${referralLinks.length}
${() => {
    let text = ''
    for (const link of referralLinks) {
        text += `${link.title} ${link.url} /delete_\n`
    }
            }}
`,
      parse_mode: 'HTML'
    }
  }
)

menu.manualRow(createBackMainMenuButtons('Назад', 'Главное меню'))
const middleware = new MenuMiddleware(ROOT_TRIGGER, menu)

export default middleware
// export {menu, middleware}
