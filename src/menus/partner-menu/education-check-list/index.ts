import { createBackMainMenuButtons, MenuMiddleware, MenuTemplate } from 'grammy-inline-menu'
import { menu as contactsMenu } from '../contacts-menu'
import { menu as checkListCryptocurrency } from './check-list-cryptocurrency'
import * as strings from '../../../assets/strings'

const ROOT_TRIGGER: string = 'education-check-list/'

let option: string = ''
export const menu = new MenuTemplate(() => {
  switch (option) {
    case 'mlm':
      return {
        type: 'video',
        media:
                        'BAACAgUAAxkBAAIIdGJqHzBg_AVtuNM856srBy-yAU-bAAIUBQACgrJRV4h8vNCqKBBoJAQ',
        text: 'видео + текст + ссылка'
      }
    case 'crypto-expert':
      return {
        type: 'video',
        media:
                        'BAACAgUAAxkBAAIIdGJqHzBg_AVtuNM856srBy-yAU-bAAIUBQACgrJRV4h8vNCqKBBoJAQ',
        text: 'видео + текст + ссылка'
      }
    default:
      return 'Меню'
  }
}
)

menu.submenu('Чек-лист Криптовалюты', 'check-list-cryptocurrency', checkListCryptocurrency)
menu.interact('MLM', 'mlm', {
  do: async (ctx: any) => {
    option = 'mlm'
    return true
  }
})
menu.interact('Курс "Эксперт в крипте"', 'crypto-expert', {
  do: async (ctx: any) => {
    option = 'crypto-expert'
    return true
  }
})
menu.manualRow(createBackMainMenuButtons(strings.backButtonText, strings.mainMenuButtonText))

const middleware = new MenuMiddleware(ROOT_TRIGGER, menu)
export default middleware
// export {menu, middleware}
