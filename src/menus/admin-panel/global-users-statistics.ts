'use strict'
import { createBackMainMenuButtons, MenuMiddleware, MenuTemplate } from 'grammy-inline-menu'
import { IContext } from 'index'
import { getGlobalData } from '../../logic'

const ROOT_TRIGGER: string = 'global-statistics/'

export const menu = new MenuTemplate(
  async () => {
    const globalData: any = getGlobalData()
    return {
      text: `<b>Общая статистика пользователей</b>

<b>Всего:</b> ${globalData?.parntersCount || 0} партнера
<b>Страны:</b> ${globalData?.m} партнера
<b>Возраст:</b> до 18 лет ... 
<b>Опыт:</b>
`,
      parse_mode: 'HTML'
    }
  }
)
menu.manualRow(createBackMainMenuButtons('Назад', 'Главное меню'))
const middleware = new MenuMiddleware(ROOT_TRIGGER, menu)

export default middleware
// export {menu, middleware}
