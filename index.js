require('dotenv').config(); //initialize dotenv
const { Client, Intents } = require('discord.js'); //import discord.js
const axios = require('axios')

const client = new Client({ intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES] }); //create new client

client.on('ready', () => {
  console.log(`Logged in as ${client.user.tag}!`);
});
async function getMeme() {
  const res = await axios.get('https://meme-api.herokuapp.com/gimme');
  return res.data.preview[0];
}

client.on('message', async msg => {
  switch (msg.content) {
    case "ping":
      msg.reply("Pong!");
      break;
    //our meme command below
    case "!meme":
      msg.channel.send("Here's your meme!"); //Replies to user command
      const img = await getMeme(); //fetches an URL from the API
      msg.channel.send(img); //send the image URL
      break;
  }
})

//make sure this line is the last line
client.login(process.env.CLIENT_TOKEN); //login bot using token
