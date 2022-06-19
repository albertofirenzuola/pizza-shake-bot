import { Context, Markup, Telegraf } from 'telegraf';
import { BotCommand, KeyboardButton, ReplyKeyboardMarkup } from 'telegraf/typings/core/types/typegram';
import { Update } from 'typegram';
import { IngredientService } from './services/ingredients-service';

const bot: Telegraf<Context<Update>> = new Telegraf(process.env.BOT_TOKEN as string);

bot.telegram.setMyCommands([
    { command: 'start', description: 'Start the bot "Pizza Shake"' } as BotCommand,
    { command: 'ingredients', description: 'View ingredients list' } as BotCommand,
    { command: 'settings', description: 'View settings' } as BotCommand,
    { command: 'shake', description: 'Generate a Pizza' } as BotCommand,
    { command: 'help', description: 'View commans list' } as BotCommand
]);

bot.start(ctx => {
    const messageText = "Hello " + ctx.from.first_name + "!";
    bot.telegram.sendMessage(ctx.chat.id, messageText, {
        reply_markup: {
            keyboard: [
                [
                    { text: '/ingredients',  } as KeyboardButton,
                    { text: '/settings' } as KeyboardButton
                ]
            ],
            resize_keyboard: true
        } as ReplyKeyboardMarkup
    });
});

bot.command('/ingredients', ctx => {
    const ingredients = new IngredientService().ingredients;
    const ingredientsName = ingredients.map(ingredient  => ingredient.name);
    const messageText = ingredientsName.join(", ");
    bot.telegram.sendMessage(ctx.chat.id, messageText);
});

bot.help(ctx => {
    ctx.reply('Send /start to start the bot "Pizza Shake"');
    ctx.reply('Send /ingredients to view ingredients list');
    ctx.reply('Send /settings to view settings');
    ctx.reply('Send /shake to generate a Pizza');
    ctx.reply('Send /help to view commans list');
});

bot.launch();

process.once('SIGINT', () => bot.stop('SIGINT'));
process.once('SIGTERM', () => bot.stop('SIGTERM'));