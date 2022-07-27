// Для того чтобы стать партнером вы должны иметь инвестицию в одном из проектов. Тогда у вас будет инструмент для заработка.   Изучите хорошенько проект и после инвестиции нажмите кнопку готов ✅

import {createBackMainMenuButtons, MenuMiddleware, MenuTemplate} from 'grammy-inline-menu'
import {IContext} from 'index'
import {menu as project1} from './project-1'
import dbManager, {setUserStep} from "../../../db-manager";
import {MANAGER_ID} from "../../../../config";

const ROOT_TRIGGER: string = 'become-partner/'

export const menu = new MenuTemplate(
    () => 'Для того чтобы стать партнером вы должны иметь инвестицию в одном из проектов. Тогда у вас будет инструмент для заработка.   Изучите хорошенько проект и после инвестиции нажмите кнопку готов ✅'
)
menu.submenu('Проект 1', 'project-1', project1)
menu.interact('Проект 2', 'project-2', {
    do: async (ctx: any) => {
        ctx.answerCallbackQuery('В разработке!')
        return false
    }
})
menu.interact('Готово ✅', 'done', {
    do: async (ctx: any) => {
        // Проверка на инвестиции
        const userID = ctx.from.id
        ctx.reply('<b>🔗Отправьте ссылки на свои проекты: </b>', {
            parse_mode: "HTML"
        })
        setUserStep(userID, 'get-project-links')
        //ctx.answerCallbackQuery('Поздравляем,теперь вы партнер!')

        // db.users.updateOne({userID},
        //     {$set: {partner: true}},
        //     {upsert: true})

        return '/'
    }
})
menu.manualRow(createBackMainMenuButtons('Назад', 'Главное меню'))
const middleware = new MenuMiddleware(ROOT_TRIGGER, menu)

export default middleware
// export {menu, middleware}
