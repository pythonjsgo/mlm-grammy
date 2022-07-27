import { createBackMainMenuButtons, MenuMiddleware, MenuTemplate } from 'grammy-inline-menu'
import dbManager, {setUserStep} from '../../db-manager'

const ROOT_TRIGGER: string = 'global-statistics/'

export const menu = new MenuTemplate('Выберете группу пользователей для рассылки ')



menu.interact('произвольное |ALL', 'all', {
  do: async (ctx: any) => {
    const userID = ctx.from.id
    ctx.session.spamGroup = 'all'
    ctx.reply('Отправьте сообщение для рассылки:')
    setUserStep(userID, 'get-spam-message')
    return false
  }
})
menu.interact('произвольное |p', 'p', {
  do: async ctx => {
    return false
  }
})
menu.interact('прогрев |not P', 'not-p', {
  do: async ctx => {
    return false
  }
})

menu.interact('онлайн обучение |P', 'allp', {
  do: async ctx => {
    return false
  }
})
menu.interact('онлайн обучение |P', 'allb', {
  do: async ctx => {
    return false
  }
})

menu.manualRow(createBackMainMenuButtons('Назад', 'Главное меню'))
const middleware = new MenuMiddleware(ROOT_TRIGGER, menu)

export default menu
// export {menu, middleware}
