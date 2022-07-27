import { createBackMainMenuButtons, MenuMiddleware, MenuTemplate } from 'grammy-inline-menu'
import { IContext } from 'index'

const ROOT_TRIGGER: string = 'contacts/'

export const menu = new MenuTemplate(
  () => 'Контакты для связи:\n\n @1234hjh5679'
)
menu.manualRow(createBackMainMenuButtons('Назад', 'Главное меню'))
const middleware = new MenuMiddleware(ROOT_TRIGGER, menu)

export default middleware
// export {menu, middleware}
