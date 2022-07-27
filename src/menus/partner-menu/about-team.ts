'use strict'
import { createBackMainMenuButtons, MenuMiddleware, MenuTemplate } from 'grammy-inline-menu'
import { IContext } from 'index'

const ROOT_TRIGGER: string = 'about-team/'

export const menu = new MenuTemplate(
  () => 'https://www.youtube.com/watch?v=h2N5qL4sSn8'
)
menu.manualRow(createBackMainMenuButtons('Назад', 'Главное меню'))
const middleware = new MenuMiddleware(ROOT_TRIGGER, menu)

export default middleware
// export {menu, middleware}
