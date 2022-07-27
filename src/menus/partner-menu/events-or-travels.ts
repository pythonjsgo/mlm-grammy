'use strict'
import { createBackMainMenuButtons, MenuMiddleware, MenuTemplate } from 'grammy-inline-menu'
import { IContext } from 'index'

const ROOT_TRIGGER: string = 'events-or-travels/'

let renderOption = 'soon'
export const menu = new MenuTemplate(
  (ctx: any) => {
    if (renderOption === 'soon') {
      return { text: 'Скоро' }
    }
    if (renderOption === 'old') {
      return { text: 'Старые события' }
    }
    return { text: 'Выберете тип событий' }
  }
)
menu.interact('Скоро', 'soon', {
  do: (ctx: any) => {
    renderOption = 'soon'
    return true
  }
})
menu.interact('Состоявшиеся', 'old', {
  do: (ctx: any) => {
    renderOption = 'old'
    return true
  }
})
menu.manualRow(createBackMainMenuButtons('Назад', 'Главное меню'))
const middleware = new MenuMiddleware(ROOT_TRIGGER, menu)

export default middleware
// export {menu, middleware}
