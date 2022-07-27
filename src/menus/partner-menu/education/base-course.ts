import {createBackMainMenuButtons, MenuMiddleware, MenuTemplate} from 'grammy-inline-menu'
import {IContext} from 'index'
import inDevelopment from "../../inDevelopment";

const ROOT_TRIGGER: string = 'education/'

const SLIDES = [
    {
        text: `<b>курс - основа MLM</b>

Описание курса  бла бла бла бла бла`
    },
    {
        text: `
<b>Темы</b>
          1 модуль вступ
          2 модуль продажи
          3 модуль марктинг
          4 модуль общение с клиентом
          5 модуль упаковка6 модуль прокачка команды`,
        parse_mode: 'HTML'
    },
    {
        text: `
        <b>1 модуль ВСТУП</b>
        описание про модуль  и ссылка на статью или видео для изучения
        `
    }


]

export const menu = new MenuTemplate(
    () => ({
        text: `<b>курс - основа MLM</b>

Описание курса  бла бла бла бла бла`
    })
)

menu.interact('Старт курса', 'start-course', )
menu.manualRow(createBackMainMenuButtons('Назад', ''))
const middleware = new MenuMiddleware(ROOT_TRIGGER, menu)

export default menu
// export {menu, middleware}
