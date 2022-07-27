'use strict'
import {createBackMainMenuButtons, MenuMiddleware, MenuTemplate} from 'grammy-inline-menu'
import {IContext} from 'index'

const ROOT_TRIGGER: string = 'social-media/'

export const menu = new MenuTemplate(
    () => {
        return {
            text: '<b>YouTube</b> - https://www.youtube.com/channel/UCujm2TLOx_RRARgrrVEM0sw\n' +
                '- <b>Instagram</b> - https://www.instagram.com/taras_kaskov/?hl=ru\n' +
                '<b>Telegram канал</b> - https://t.me/joinchat/UrSO9t7L6_23qcSq ',
            parse_mode: "HTML"
        }
    }
)
menu.manualRow(createBackMainMenuButtons('Назад', 'Главное меню'))
const middleware = new MenuMiddleware(ROOT_TRIGGER, menu)

export default middleware
// export {menu, middleware}
