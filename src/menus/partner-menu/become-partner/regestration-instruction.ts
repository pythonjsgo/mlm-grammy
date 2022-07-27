// Для того чтобы стать партнером вы должны иметь инвестицию в одном из проектов. Тогда у вас будет инструмент для заработка.   Изучите хорошенько проект и после инвестиции нажмите кнопку готов ✅

import { createBackMainMenuButtons, MenuMiddleware, MenuTemplate } from 'grammy-inline-menu'

const ROOT_TRIGGER: string = 'registration-instruction/'

export const menu = new MenuTemplate(
  ctx => {
    return {
      text: 'инструкция регистрации'
    }
  }
)
menu.url('Текст + ссылки', 'https://google.com')
menu.manualRow(createBackMainMenuButtons('Назад', 'Главное меню'))
const middleware = new MenuMiddleware(ROOT_TRIGGER, menu)

export default middleware
// export {menu, middleware}
