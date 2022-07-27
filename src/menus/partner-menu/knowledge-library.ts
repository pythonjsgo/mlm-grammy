import { createBackMainMenuButtons, MenuMiddleware, MenuTemplate } from 'grammy-inline-menu'
import { IContext } from 'index'

const ROOT_TRIGGER: string = 'knowledge-library/'

export const menu = new MenuTemplate(
  () => 'библиотека текст + ссылки в виде кнопок'
)
menu.url('Курсы по маркетингу', 'https://google.com')
menu.url('Курсы по продажам', 'https://google.com')
menu.url('Курсы по трейдингу', 'https://google.com')
menu.url('зумы обучающие', 'https://google.com')
menu.manualRow(createBackMainMenuButtons('Назад', ''))
export const middleware = new MenuMiddleware(ROOT_TRIGGER, menu)
export default menu
// export {menu, middleware}
