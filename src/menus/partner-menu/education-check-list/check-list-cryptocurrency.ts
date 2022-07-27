import { createBackMainMenuButtons, MenuMiddleware, MenuTemplate } from 'grammy-inline-menu'
import { menu as contactsMenu } from '../contacts-menu'
import { createRawApi } from 'grammy/out/core/client'

const ROOT_TRIGGER: string = 'check-list-cryptocurrency/'

const option: string = ''
export const menu = new MenuTemplate(() => {
  switch (option) {
    default:
      return `Бесплатное обучение

осталось выполнить 3 условия
подпска инст
подписка телеграм
подписка ютуб

+ в конце получишь бонус 3 книги`
  }
}
)

menu.interact('Выполнил', 'done', {
  do: async (ctx: any) => {
    const checker = async (userID: number) => {
      console.log('checking...')
      return true
    }
    const { messageId } = await ctx.reply('Проверка выполнения условий')
    if (await checker(ctx.from.id)) {
      ctx.api.editMessageText(messageId, 'Проверка подтвердила выполнение условий!\n' +
                '')
      return true
    }
    ctx.api.editMessageText(messageId, 'Проверка не подтвердила выполнение условий!\n' +
            'Проверьте правильность выполнения условий и повторите попытку.')
    return false
  }
})
menu.manualRow(createBackMainMenuButtons('Назад', ''))

const middleware = new MenuMiddleware(ROOT_TRIGGER, menu)
export default middleware
// export {menu, middleware}
