import { createBackMainMenuButtons, MenuMiddleware, MenuTemplate } from 'grammy-inline-menu'
import { IContext } from 'index'

const ROOT_TRIGGER: string = 'closed-chats/'

export const menu = new MenuTemplate(
  () => 'закрытые чаты текст + ссылки в виде кнопок'
)
menu.url('Чат проекта', 'https://google.com')
menu.url('Крипто чат', 'https://google.com')
menu.url('Закрытый канал команды', 'https://google.com')
menu.manualRow(createBackMainMenuButtons('Назад', 'Главное меню'))
const middleware = new MenuMiddleware(ROOT_TRIGGER, menu)

export default middleware
// export {menu, middleware}
