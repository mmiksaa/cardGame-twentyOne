const { Telegraf } = require('telegraf');
const axios = require('axios').default;
require('dotenv').config(); //токен

const bot = new Telegraf(process.env.TELEGRAM_TOKEN);

bot.command('db', async (ctx) => {
  const response = await axios.get('https://vklogbd-default-rtdb.firebaseio.com/log.json');

  if (response.status != 200) {
    return ctx.reply("❗️произошла ошибка \n\n🔄 повторите еще раз");
  }
  
  res = `
| Tables        | Are           | Cool  |
| ------------- |:-------------:| -----:|
| col 3 is      | right-aligned | $1600 |
| col 2 is      | centered      |   $12 |
| zebra stripes | are neat      |    $1 |
  `;

  return ctx.reply(res);
});

// Запуск бота
bot.launch();