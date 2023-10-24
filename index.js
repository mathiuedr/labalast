const { Telegraf, Markup } = require('telegraf')
const fs = require('fs');

var selectedGroup;
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
                    text: "Программирование",
                    callback_data: 'proga'
                },
                {
                    text: "Линейная алгебра",
                    callback_data: 'linal'
                },
                {
                    text: "Дескретная математика",
                    callback_data: 'discra'
                },
                {
                    text: "Мат анализ",
                    callback_data: 'matan'
                }
                ],

            ]
        }
    })
})

bot.hears('Семинары', ctx => {
    let msg = `Выбери интересующий тебя предмет`;
    ctx.reply('Выбери свою группу',
        Markup.keyboard([
            Markup.button.text('7'),
            Markup.button.text('8'),
            Markup.button.text('9'),
            Markup.button.text('Вернуться в меню')
        ])
    )
    bot.on('message', async (ctx) => {
        ans = ctx.update.message.text
        console.log(ans)
        if (ans == '7' || ans == '8' || ans == '9') {
            selectedGroup = ans
            bot.telegram.sendMessage(ctx.chat.id, msg, {
                reply_markup: {
                    inline_keyboard: [
                        [{
                            text: "Программирование",
                            callback_data: 'progasem'
                        },
                        {
                            text: "Линейная алгебра",
                            callback_data: 'linalsem'
                        },
                        {
                            text: "Дескретная математика",
                            callback_data: 'discrasem'
                        },
                        {
                            text: "Мат анализ",
                            callback_data: 'matansem'
                        }
                        ],

                    ]
                }
            })
        } else {
            ctx.reply(`Your answer was: incorrect`);
        }



    })

})

bot.hears('Вернуться в меню', ctx=>{
    return ctx.reply('Выбери нужную тебе инфу',
        Markup.keyboard([
            Markup.button.text('Лекции'),
            Markup.button.text('Семинары'),
            Markup.button.text('Доп инфа')
        ])
    )
})

bot.hears('Доп инфа', ctx => {
    let msg = `Выбери интересующий тебя предмет`;
    bot.telegram.sendMessage(ctx.chat.id, msg, {
        reply_markup: {
            inline_keyboard: [
                [{
                    text: "Программирование",
                    callback_data: 'progadop'
                },
                {
                    text: "Линейная алгебра",
                    callback_data: 'linaldop'
                },
                {
                    text: "Дескретная математика",
                    callback_data: 'discradop'
                },
                {
                    text: "Мат анализ",
                    callback_data: 'matandop'
                }
                ],

            ]
        }
    })
})

bot.action('progadop', ctx => {
    let myfiles = fs.readFileSync(__dirname + '/res/dopinfo/proga.txt', { encoding: 'utf-8' })
    bot.telegram.sendMessage(ctx.chat.id, myfiles)
})

bot.action('linaldop', ctx => {
    let myfiles = fs.readFileSync(__dirname + '/res/dopinfo/linal.txt', { encoding: 'utf-8' })
    bot.telegram.sendMessage(ctx.chat.id, myfiles)
})
bot.action('discradop', ctx => {
    let myfiles = fs.readFileSync(__dirname + '/res/dopinfo/discra.txt', { encoding: 'utf-8' })
    bot.telegram.sendMessage(ctx.chat.id, myfiles)
})

bot.action('matandop', ctx => {
    let myfiles = fs.readFileSync(__dirname + '/res/dopinfo/matan.txt', { encoding: 'utf-8' })
    bot.telegram.sendMessage(ctx.chat.id, myfiles)
})



bot.action('progasem', ctx => {
    console.log('called')
    console.log(selectedGroup)
    let myfiles = listallfiles('sems/proga/' + selectedGroup)
    console.log(myfiles)
    for (let f of myfiles) {
        bot.telegram.sendDocument(ctx.chat.id, {
            source: "res/sems/proga/" + selectedGroup + '/' + f
        })
    }
})

bot.action('linalsem', ctx => {
    let myfiles = listallfiles('sems/linal/' + selectedGroup)
    console.log(myfiles)
    for (let f of myfiles) {
        bot.telegram.sendDocument(ctx.chat.id, {
            source: "res/sems/linal/" + selectedGroup + '/' + f
        })
    }
})
bot.action('discrasem', ctx => {
    let myfiles = listallfiles('sems/discra/' + selectedGroup)
    console.log(myfiles)
    for (let f of myfiles) {
        bot.telegram.sendDocument(ctx.chat.id, {
            source: "res/sems/discra/" + selectedGroup + '/' + f
        })
    }
})

bot.action('matansem', ctx => {
    let myfiles = listallfiles('sems/matan/' + selectedGroup)
    console.log(myfiles)
    for (let f of myfiles) {
        bot.telegram.sendDocument(ctx.chat.id, {
            source: "res/sems/matan/" + selectedGroup + '/' + f
        })
    }
})

bot.action('linal', ctx => {
    let myfiles = listallfiles('lects/linal')
    console.log(myfiles)
    for (let f of myfiles) {
        bot.telegram.sendDocument(ctx.chat.id, {
            source: "res/lects/linal/" + f
        })
    }
})
bot.action('discra', ctx => {
    let myfiles = listallfiles('lects/discra')
    console.log(myfiles)
    for (let f of myfiles) {
        bot.telegram.sendDocument(ctx.chat.id, {
            source: "res/lects/discra/" + f
        })
    }
})
bot.action('matan', ctx => {
    let myfiles = listallfiles('lects/matan')
    console.log(myfiles)
    for (let f of myfiles) {
        bot.telegram.sendDocument(ctx.chat.id, {
            source: "res/lects/matan/" + f
        })
    }
})

function listallfiles(a) {
    console.log(__dirname + "/res/" + a)
    let b = fs.readdirSync(__dirname + "/res/" + a, function (err, files) {
        if (err) {
            return console.log('Unable to scan directory: ' + err);
        }
        return files
    });
    return b
}



bot.launch()