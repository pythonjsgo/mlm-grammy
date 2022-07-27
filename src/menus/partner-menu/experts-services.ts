import { createBackMainMenuButtons, MenuMiddleware, MenuTemplate } from 'grammy-inline-menu'

const ROOT_TRIGGER: string = 'expert-services/'

const option: string = ''
export const menu = new MenuTemplate(() => {
  switch (option) {
    default:
      return 'услуги экспертов'
  }
}
)

menu.url('SMM', 'https://google.com')
menu.url('Упаковка', 'https://google.com')
menu.url('Сайт', 'https://google.com')
menu.url('Зумы обучающие', 'https://google.com')
menu.manualRow(createBackMainMenuButtons('Назад', 'Главное меню'))

const middleware = new MenuMiddleware(ROOT_TRIGGER, menu)
export default middleware
// export {menu, middleware}
