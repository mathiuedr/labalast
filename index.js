const { Telegraf,Markup } = require('telegraf')

const bot = new Telegraf('6680885927:AAGKRTDv9C8BwbDzCg9TdgDivzIiDeEDLCY')
bot.start((ctx) => {
    return ctx.reply('Привет, выбери нужную тебе инфу',
      Markup.keyboard([
        Markup.button.text('Лекции'),
        Markup.button.text('Семинары'),
        Markup.button.text('Доп инфа')
      ])
    )
})

bot.hears('Лекции', ctx => {
    let msg = `Выбери интересующий тебя предмет`;
    ctx.deleteMessage();
    bot.telegram.sendMessage(ctx.chat.id, msg, {
        reply_markup: {
            inline_keyboard: [
                [{
                    text: "Прога",
                    callback_data: 'proga'
                },
                {
                    text: "Линал",
                    callback_data: 'linal'
                },
                {
                    text: "Дискра",
                    callback_data: 'discra'
                },
                {
                    text: "Матан",
                    callback_data: 'matan'
                }
                ],

            ]
        }
    })
})

bot.hears('Семинары', ctx => {
    let msg = `Выбери интересующий тебя предмет`;
    ctx.deleteMessage();
    bot.telegram.sendMessage(ctx.chat.id, msg, {
        reply_markup: {
            inline_keyboard: [
                [{
                    text: "Прога",
                    callback_data: 'progasem'
                },
                {
                    text: "Линал",
                    callback_data: 'linalsem'
                },
                {
                    text: "Дискра",
                    callback_data: 'discrasem'
                },
                {
                    text: "Матан",
                    callback_data: 'matansem'
                }
                ],

            ]
        }
    })
})
bot.hears('Доп инфа', ctx => {
    let msg = `Выбери интересующий тебя предмет`;
    ctx.deleteMessage();
    bot.telegram.sendMessage(ctx.chat.id, msg, {
        reply_markup: {
            inline_keyboard: [
                [{
                    text: "Прога",
                    callback_data: 'progadop'
                },
                {
                    text: "Линал",
                    callback_data: 'linaldop'
                },
                {
                    text: "Дискра",
                    callback_data: 'discradop'
                },
                {
                    text: "Матан",
                    callback_data: 'matandop'
                }
                ],

            ]
        }
    })
})


bot.launch()