import { Router } from '@grammyjs/router'
import * as config from '../../config'
import * as keyboards from '../assets/keyboards'
import * as strings from '../assets/strings'
import partnerMenu from '../menus/partner-menu'
import { setUserStep } from '../db-manager'

async function chooseLanguageMessage (ctx: any) {
  ctx.reply('Choose language', { reply_markup: keyboards.chooseLanguage })
}

export const router = new Router((ctx: any) => {
  return ctx.userData?.step
})

router.route('choose-language', async (ctx: any) => {
  const data = ctx?.callbackQuery?.data
  if (data) {
    if (['en', 'de', 'ru'].includes(data)) {
      ctx.editMessageText('Язык успшено установлен')

      setTimeout(() => {
        ctx.editMessageText(`Добро пожаловать ${ctx.from.name}, вы попали в бот ${config.BOT_NAME}`, {
          media: { photo: { url: 'https://wallpaperaccess.com/full/39608.jpg' } },
          reply_markup: keyboards.menuOrAboutAuthor
        })
      }, 500)
      setUserStep(ctx.from.id, 'exit-way')
    } else ctx.reply('Неизвестное значение!')
  } else {
    ctx.reply('Выберете язык!', { reply_markup: keyboards.chooseLanguage })
  }
})
router.route('exit-way', async (ctx: any, next: any) => {
  const data = ctx?.callbackQuery?.data
  if (data === 'menu') {
    await partnerMenu.replyToContext(ctx)
    setUserStep(ctx.from.id, '')
  }
  if (data === 'about-author') {
    const delayInMs = 5000
    await ctx.editMessageText(strings.author.firstText)
    await new Promise(resolve => setTimeout(resolve, delayInMs))
    await ctx.editMessageText(strings.author.secondText)
    await new Promise(resolve => setTimeout(resolve, delayInMs))
    await ctx.editMessageText(strings.author.thirdText)
    ctx.deleteMessage()
    await partnerMenu.replyToContext(ctx)
    setUserStep(ctx.from.id, '')
  }
})
