const TelegramBot = require('node-telegram-bot-api');

const token = '7245478886:AAHZiqNtmNvI_WnBiMCbioxClQSgMKt2kVQ';

const bot = new TelegramBot(token, { polling: true });

let users = {};

bot.onText(/\/start/, (msg) => {
  const chatId = msg.chat.id;
  const name = msg.from.first_name;

  const referralId = msg.text.split(' ')[1];

  if (!users[chatId]) {
    users[chatId] = { referredBy: referralId || null, balance: 0 };
    
    if (referralId && users[referralId]) {
      users[referralId].balance += 1;
      bot.sendMessage(referralId, `तपाईंले रेफर गरेर 1 रुपैयाँ कमाउनुभयो!`);
    }
  }

  const referralLink = `https://t.me/Watchtoearnmoneynp_bot?start=${chatId}`;
  bot.sendMessage(chatId, `स्वागत छ ${name}!\n\nआफ्नो रेफरल लिंक:\n${referralLink}`);
});

bot.onText(/\/balance/, (msg) => {
  const chatId = msg.chat.id;
  const balance = users[chatId] ? users[chatId].balance : 0;
  bot.sendMessage(chatId, `तपाईंको Balance: ₹${balance}`);
});
