import * as config from '../../config'

export default async (ctx: any, next: any) => {
  const userID = ctx.from.id
  if (config.ADMINS_LIST.includes(userID)) {
    next()
  } else ctx.reply('Недостаточно прав!')
}
