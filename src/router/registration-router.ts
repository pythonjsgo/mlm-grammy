import {Router} from '@grammyjs/router'
import isUrl from 'is-url'
import {IContext} from 'index'
import * as keyboards from '../assets/keyboards'
import {socialMedia} from '../logic'
import {setUserStep} from '../db-manager'
import partnerMenu from '../menus/partner-menu'
import {COUNTRIES} from "../../config";

export const router = new Router((ctx: any) => {
    return ctx.userData?.step
})

router.route('what-is-your-name', (ctx: any, next: any) => {
    const text = ctx.msg.text

    ctx.userData.registrationData = ctx.userData?.registrationData || {}

    if (text.length >= 2) {
        ctx.userData.name = text
        ctx.userData.step = 'where-are-you-from'
        ctx.reply('2) Выберете. Из какой вы страны?', {
            reply_markup: keyboards.countriesChoicer
        })
        next()
    } else ctx.reply('Неверное значение')
})
router.route('where-are-you-from', (ctx: any, next: any) => {
    const data = ctx?.callbackQuery?.data
    if (!data) return ctx.reply('Выберете один из предложенных вариантов')

    if (COUNTRIES.map(i => i.techName).includes(data)) {
        ctx.userData.country = data
        ctx.reply('3) Сколько вам лет?')
        ctx.userData.step = 'how-old-are-you'
        next()
    }
    // if (text.length >= 3) {
    //   ctx.userData.country = text
    //   ctx.userData.step = 'how-old-are-you'
    //   ctx.reply('3) Сколько вам лет?')
    //   next()
    // } else ctx.reply('Неверное значение')
})
router.route('how-old-are-you', (ctx: any, next: any) => {
    const text = ctx.msg.text

    if (!isNaN(text)) {
        ctx.reply('4) Укажите опыт в сфере МЛМ ?', {reply_markup: keyboards.mlmExperience})
        ctx.userData.step = 'enter-your-mlm-experience'
        next()
    } else ctx.reply('Неверное значение')
})
router.route('enter-your-mlm-experience', (ctx: any, next: any) => {
    console.log(ctx.callbackQuery)
    if (ctx.callbackQuery) {
        const data = ctx.callbackQuery.data

        switch (data) {
            case '0':
                ctx.userData.experience = 'Новичок'
                break
            case '0,5 - 1':
                ctx.userData.experience = '0.5 - 1'
                break
            case '1-3':
                ctx.userData.experience = '1 - 3'
                break
            case '>3':
                ctx.userData.experience = 'Больше 3'
                break
        }
        ctx.userData.step = 'your-social-media'
        ctx.editMessageText('5) Укажите ваши публичные площадки ?  (Instagram, YouTube, Telegram, Tik-Tok, Сайт). Отправьте хотя-бы одну соц. сеть')
        next()
    } else ctx.reply('Неверное значение')
})
router.route('your-social-media', async (ctx: any, next: any) => {
    if (ctx.callbackQuery) {
        const data = ctx.callbackQuery.data

        if (data === 'next') {
            ctx.userData.step = 'check-and-confirm'
            const r = ctx.userData
            ctx.editMessageText(`
Имя: ${r.name}
Страны: ${r.country}
Возраст ${r.age}
Опыт в MLM: ${r.experience}
Публичные страницы:
Instagram -  ${r.links.instagram || 'нет'}
YouTube - ${r.links.youtube || 'нет'}
Сайт - ${r.links.site || 'нет'}
`, {reply_markup: keyboards.confirmOrAgain})
        }
    }
    if (ctx.msg.text && !ctx.callbackQuery) {
        const text = ctx.msg.text
        if (isUrl(text)) {
            ctx.userData.links = ctx.userData.links || {}
            ctx.userData.links[socialMedia(text)] = text
            const jsonString = JSON.stringify(ctx.userData.links, null, 2)
            ctx.reply(jsonString, {reply_markup: keyboards.nextButton})
        } else await ctx.reply('Неверная ссылка!')
    }

    next()
})
router.route('check-and-confirm', (ctx: any, next: any) => {
    const data = ctx?.callbackQuery?.data
    if (data) {
        if (data === 'confirm') {
            ctx.userData.registered = true
            ctx.editMessageText('Поздравляем - вы зарегистрированы ✅', {reply_markup: keyboards.goButton})
        }
        if (data === 'again') {
            ctx.editMessageText('Рестрация')
            ctx.reply('1) Как вас зовут?', {reply_markup: {remove_keyboard: true}})
            ctx.userData.step = 'what-is-your-name'
        }

        if (data === 'go') {
            ctx.userData.step = ''
            ctx.deleteMessage()
            partnerMenu.replyToContext(ctx)
        }
    }
    next()
})
