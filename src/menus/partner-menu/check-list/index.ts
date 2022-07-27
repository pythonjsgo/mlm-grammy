import {createBackMainMenuButtons, MenuMiddleware, MenuTemplate} from 'grammy-inline-menu'
import {IContext} from 'index'
import inDevelopment from "../../inDevelopment";

const ROOT_TRIGGER: string = 'check-list/'

export const menu = new MenuTemplate(
    () => ({
        text: `<b>Чек-лист</b>
например  Чек-Лист по крипте база
Описание балб ла бла блба л`,
        parse_mode: "HTML"
    })
)

menu.submenu('Купить', 'buy', inDevelopment)
menu.submenu('Бесплатно', 'available-courses', inDevelopment)
menu.manualRow(createBackMainMenuButtons('Назад', ''))
const middleware = new MenuMiddleware(ROOT_TRIGGER, menu)

export default menu
// export {menu, middleware}
