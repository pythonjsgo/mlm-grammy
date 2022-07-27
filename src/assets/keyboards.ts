import {InlineKeyboard} from 'grammy'
import {COUNTRIES} from "../../config";

export const chooseLanguage = new InlineKeyboard()
    .text('Ru🇷🇺', 'ru')
    .text('Eng🇬🇧', 'en')
    .text('De🇩🇪', 'de')

export const inlineKeyboard = new InlineKeyboard()
    .text('« 1', 'first')
    .text('‹ 3', 'prev')
    .text('· 4 ·', 'stay')
    .text('5 ›', 'next')
    .text('31 »', 'last')

export const inlineKeyboardsNew = new InlineKeyboard()
    .text('ddfsjlk', 'fdfdfdfdf')

export const mlmExperience = new InlineKeyboard()
    .text('Новичок', '0')
    .text('0,5 - 1 Год', '0,5 - 1').row()
    .text('1-3 Года', '1-3')
    .text('Больше 3 лет', '>3')

export const confirmOrAgain = new InlineKeyboard()
    .text('Подтвердить', 'confirm')
    .text('Заново', 'again')

export const addSocialMedia = new InlineKeyboard()
    .text('Добавить')

export const nextButton = new InlineKeyboard()
    .text('Далее', 'next')

export const goButton = new InlineKeyboard()
    .text('поехали 🤝', 'go')

export const menuOrAboutAuthor = new InlineKeyboard()
    .text('Меню', 'menu')
    .text('Об авторе', 'about-author')

export const countriesChoicer = new InlineKeyboard()
COUNTRIES.forEach(i => countriesChoicer.text(i.title, i.techName).row())


export const offerAcceptOrDecline = (offerID: string) => new InlineKeyboard()
    .text('🟢Подтвердить', `accept|${offerID}`).row()
    .text('❌Отклонить', `decline|${offerID}`).row()
