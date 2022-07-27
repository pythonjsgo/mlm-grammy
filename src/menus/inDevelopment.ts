import { createBackMainMenuButtons, MenuMiddleware, MenuTemplate } from 'grammy-inline-menu'
import { setUserStep } from '../db-manager'

const ROOT_TRIGGER = 'in-development/'
export async function inDevelopmentHandler (ctx: any) {
  if (ctx.callBackQuery) {
    ctx.answerCallbackQuery('Функция в разработке!')
    return false
  }
  ctx.reply('Функция в разработке!')
  return false
}

export const menu = new MenuTemplate(ctx => 'В разработке')
menu.manualRow(createBackMainMenuButtons('Назад', ''))

const middleware = new MenuMiddleware(ROOT_TRIGGER, menu)
export default menu

/*

submenuCity.interact('Text', 'unique', {
    do: async (ctx: any) => {
        console.log('Take a look at ctx.match. It contains the chosen city', ctx.match)
        await ctx.answerCallbackQuery('You hit a button in a submenu')
        return false
    }
})

 */
