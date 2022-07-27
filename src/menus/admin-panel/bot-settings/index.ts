'use strict'
import { createBackMainMenuButtons, MenuMiddleware, MenuTemplate } from 'grammy-inline-menu'
import inDevelopment from '../../inDevelopment'
import { randomString } from '../../../logic'

const ROOT_TRIGGER: string = 'bot-settings/'

export const menu = new MenuTemplate(
  () => 'Настройка бота'
)
menu.submenu('Воронка продажи', randomString(10), inDevelopment)
menu.submenu('Знакомство с автором', randomString(10), inDevelopment)
menu.submenu('Обучения/чеклит', randomString(10), inDevelopment)
menu.submenu('Закрытые чаты', randomString(10), inDevelopment)
menu.submenu('Мероприятия/путишествия', randomString(10), inDevelopment)
menu.submenu('Услуги экспертов', randomString(10), inDevelopment)
menu.submenu('О команде', randomString(10), inDevelopment)
menu.submenu('Cоц.сети', randomString(10), inDevelopment)
menu.submenu('Связь', randomString(10), inDevelopment)
menu.manualRow(createBackMainMenuButtons('Назад', 'Главное меню'))
export const middleware = new MenuMiddleware(ROOT_TRIGGER, menu)

export default menu
// export {menu, middleware}
