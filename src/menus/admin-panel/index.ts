import { MenuMiddleware, MenuTemplate } from 'grammy-inline-menu'
import { getGlobalData } from '../../logic'
import { menu as globalUsersStatistics } from './global-users-statistics'
import { menu as inDevelopment } from '../inDevelopment'
import linksCreation from './links-creation'
import botSettings from './bot-settings'
import eventsCreation from "./events-creation";
import spamProcess from "./spam-process";
import checkListCreation from './check-list-creation'

const ROOT_TRIGGER: string = 'admin-panel/'

const option: string = ''
export const menu = new MenuTemplate(async (ctx: any) => {
  const globalData = await getGlobalData()
  return `Меню для админа
    
    Всего участников в боте: ${globalData?.usersCount || 0}
    Партнеров: ${globalData?.usersCountActive || 0}
    `
})
menu.submenu('Рассылка', 'spam-process', spamProcess)
menu.submenu('Создание ссылок', 'links-creation', linksCreation)
menu.submenu('Создание событий', 'events-creation', eventsCreation)
menu.submenu('Создание чек листов', 'checklists-creation', checkListCreation)
menu.submenu('Настройка бота', 'bot-settings', botSettings)
menu.submenu('Общая статистика пользователей', 'global-statistics', globalUsersStatistics)
menu.submenu('Реф. ссылки', 'referral-links', inDevelopment)
const middleware = new MenuMiddleware(ROOT_TRIGGER, menu)
export default middleware
