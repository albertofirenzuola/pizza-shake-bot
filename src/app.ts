import { Context, Markup, Telegraf } from 'telegraf';
import { BotCommand } from 'telegraf/typings/core/types/typegram';
import { Update } from 'typegram';

const bot: Telegraf<Context<Update>> = new Telegraf(process.env.BOT_TOKEN as string);

bot.telegram.setMyCommands([
    { command: 'start', description: 'Descrizione Comando 1' } as BotCommand,
    { command: 'help', description: 'Descrizione Comando 2' } as BotCommand
]);

bot.start((ctx) => {
    ctx.reply('Hello ' + ctx.from.first_name + '!');
});

bot.help((ctx) => {
    ctx.reply('Send /start to receive a greeting');
    ctx.reply('Send /keyboard to receive a message with a keyboard');
    ctx.reply('Send /quit to stop the bot');
});

bot.command('quit', (ctx) => {
    // Explicit usage
    ctx.telegram.leaveChat(ctx.message.chat.id);
    // Context shortcut
    ctx.leaveChat();
});

bot.command('keyboard', (ctx) => {
    ctx.reply(
        'Keyboard',
        Markup.inlineKeyboard([
            Markup.button.callback('First option', 'first'),
            Markup.button.callback('Second option', 'second'),
        ])
    );
});

bot.launch();

process.once('SIGINT', () => bot.stop('SIGINT'));
process.once('SIGTERM', () => bot.stop('SIGTERM'));