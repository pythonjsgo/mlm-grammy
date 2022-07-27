import { createBackMainMenuButtons, MenuMiddleware, MenuTemplate } from 'grammy-inline-menu'
import { menu as contactsMenu } from './contacts-menu'
import { menu as educationCheckList } from './education-check-list'
import { menu as aboutTeam } from './about-team'
import { menu as socialMedia } from './social-media'
import { menu as closedChats } from './closed-chats'
import { menu as becomePartner } from './become-partner/'
import dbManager, { setUserStep } from '../../db-manager'
import { menu as expertsServices } from './experts-services'
import { menu as eventsOrTravels } from './events-or-travels'
import knowledgeLibrary from "./knowledge-library";
import {BOT_USERNAME} from "../../../config";
import inDevelopment from "../inDevelopment";
import education from "./education";
import checkList from "./check-list";

const ROOT_TRIGGER: string = '/'

const option: string = ''
const menu = new MenuTemplate((ctx: any) => {
  switch (option) {
    case 'sdklfjs':
      return 'sdjkhf'
    case 'registration':
      return { text: 'Рестрация' }
    default:
      return `Главное меню\n\nВаши реферралы: ${ctx.userData?.referrals?.length || 0}\nРепутация ${ctx.userData.rating || 0}
Реферальная ссылка: t.me/${BOT_USERNAME}?start=_r${ctx.from.id}`
  }
})

menu.interact('📝Регистрация', 'registration', {
  hide: async (ctx: any) => {
    return ctx.userData.registered
  },
  do: async (ctx: any) => {
    const userID: number = ctx.from.id
    console.log(userID, 'uniq')
    await ctx.reply('1) Как вас зовут?', { reply_markup: { remove_keyboard: true } })
    setUserStep(userID, 'what-is-your-name')
    ctx.editMessageText('Рестрация')
    return false
  }
})
menu.submenu('🤝Стать партнером', 'become-partner', becomePartner, {
  hide: async (ctx: any) => {
    return !ctx.userData?.registered || ctx.userData?.partner
  }
})
menu.interact('🎲Розыгрыш', 'giveaway', {
  do: async (ctx: any) => {
    ctx.answerCallbackQuery('Нет активных розыгрышей!')
    return false
  }
})
menu.submenu('🎁Чек лист', 'check-list', checkList)
menu.submenu('👨‍🎓Образование', 'education', education)
menu.submenu('💰Закрытые ресурсы', 'closed-chats', closedChats, {
  hide: async (ctx: any) => {
    return !ctx.userData?.registered || !ctx.userData?.partner
  }
})
// menu.submenu('Библиотека знаний', 'knowledge-library', knowledgeLibrary, {
//   hide: async (ctx: any) => {
//     return !ctx.userData?.registered || !ctx.userData?.partner
//   }
// })
menu.submenu('📆Мероприятия', 'events-travels', eventsOrTravels, {
  hide: async (ctx: any) => {
    return !ctx.userData?.registered || !ctx.userData?.partner
  }
})
menu.submenu('🔁CRYPTO Обменник', 'crypto-exchange', inDevelopment)
// menu.submenu('Услуги экспертов', 'experts-services', expertsServices, {
//   hide: async (ctx: any) => {
//     return !ctx.userData?.registered || !ctx.userData?.partner
//   }
// })
menu.submenu('⚙️Мастерская', 'kk', inDevelopment)
menu.submenu('О команде', 'about-team', aboutTeam, )
menu.submenu('Соц. сети', 'social-media', socialMedia, {
  joinLastRow: true
})

menu.submenu('Связь', 'contacts', contactsMenu)

const middleware = new MenuMiddleware(ROOT_TRIGGER, menu)
export default middleware

// export {menu, middleware}

/*
const submenuCity = new MenuTemplate(ctx => `You chose city `)
submenuCity.interact('Text', 'unique', {
    do: async (ctx: any) => {
        console.log('Take a look at ctx.match. It contains the chosen city', ctx.match)
        await ctx.answerCallbackQuery('You hit a button in a submenu')
        return false
    }
})
submenuCity.manualRow(createBackMainMenuButtons('Назад'))

 */
