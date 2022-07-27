// Для того чтобы стать партнером вы должны иметь инвестицию в одном из проектов. Тогда у вас будет инструмент для заработка.   Изучите хорошенько проект и после инвестиции нажмите кнопку готов ✅

import {createBackMainMenuButtons, MenuMiddleware, MenuTemplate} from 'grammy-inline-menu'
import {menu as registrationInstruction} from './regestration-instruction'
import {TEMPLATE_IMAGE_FILE_ID} from "../../../../config";
import {setUserStep} from "../../../db-manager";

const ROOT_TRIGGER: string = 'project-1/'

const SLIDES = [
    {
        text: 'NFT + GameFi слайд 1',
        type: 'photo',
        media: TEMPLATE_IMAGE_FILE_ID
    },
    {
        text: 'NFT + GameFi слайд 2',
        type: 'photo',
        media: TEMPLATE_IMAGE_FILE_ID
    },
    {
        text: 'NFT + GameFi слайд 3',
        type: 'photo',
        media: TEMPLATE_IMAGE_FILE_ID
    }
]

export const menu = new MenuTemplate(
    (ctx: any) => {
        return SLIDES[ctx?.session?.slide || 0]
    }
)
// menu.url('Текст + ссылки', 'https://google.com')
// menu.url('Текст + ссылки', 'https://google.com')


menu.interact('Зарегестрировался', 'done', {
    hide: ctx => {
        return ctx.session.slide !== SLIDES.length - 1
    },
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
menu.interact('Далее', 'next', {
    hide: ctx => {
        return ctx.session.slide >= SLIDES.length - 1
    },
    do: ctx => {
        ctx.session.slide++
        return true
    }
})

menu.interact('Назад', 'back', {
    hide: ctx => {
        return ctx.session.slide === 0
    },
    do: ctx => {
        ctx.session.slide--
        return true
    }
})

//menu.submenu('Регистрация', 'registration-instruction', registrationInstruction)
//menu.manualRow(createBackMainMenuButtons('Назад', 'Главное меню'))
const middleware = new MenuMiddleware(ROOT_TRIGGER, menu)

export default middleware
// export {menu, middleware}
