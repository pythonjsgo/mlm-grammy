import {createBackMainMenuButtons, MenuMiddleware, MenuTemplate} from 'grammy-inline-menu'
import {IContext} from 'index'
import inDevelopment from "../../inDevelopment";

const ROOT_TRIGGER: string = 'education/'

export const menu = new MenuTemplate(
    () => 'Образование 👨‍🎓       описание фото+ текст'
)

menu.submenu('Базовый курс', 'base-course', inDevelopment)
menu.submenu('Доступные курсы', 'available-courses', inDevelopment)
menu.submenu('Библиотека знаний', 'knowledge-library', inDevelopment)
menu.manualRow(createBackMainMenuButtons('Назад', ''))
const middleware = new MenuMiddleware(ROOT_TRIGGER, menu)

export default menu
// export {menu, middleware}
