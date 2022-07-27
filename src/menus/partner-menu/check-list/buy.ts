import {createBackMainMenuButtons, MenuMiddleware, MenuTemplate} from 'grammy-inline-menu'
import {IContext} from 'index'
import inDevelopment from "../../inDevelopment";
import {setUserStep} from "../../../db-manager";

const ROOT_TRIGGER: string = 'check-list/'

export const menu = new MenuTemplate(
    () => ({
        text: `<b>Оплата</b>
Реквизиты:  
Карта -  
USDT - 
BTC -
<b>Загрузите скриншот оплаты и нажмите "оплатил"</b>`,
        parse_mode: "HTML"
    })
)

menu.interact('Оплатил', 'payment-sent', {
    do: (ctx: any) => {
        setUserStep(ctx?.from?.id, 'payment-check')
        ctx.reply('Ожидание скриншота оплаты!')
        return false
    }
})
menu.submenu('Бесплатно', 'available-courses', inDevelopment)
menu.manualRow(createBackMainMenuButtons('Назад', ''))
const middleware = new MenuMiddleware(ROOT_TRIGGER, menu)

export default menu
// export {menu, middleware}
