
require('dotenv').config()
const mineflayer = require('mineflayer')
const inventoryViewer = require('mineflayer-web-inventory')
const autoeat = require('mineflayer-auto-eat').plugin

const bot = mineflayer.createBot({
  host: process.env.SERVER_HOST, // minecraft server ip
  username: process.env.MC_USERNAME, // minecraft username
  password: process.env.MC_PASSWORD, // minecraft password, comment out if you want to log into online-mode=false servers
  // port: 25565,                // only set if you need a port that isn't 25565
  version: '1.19.3',             // only set if you need a specific version or snapshot (ie: "1.8.9" or "1.16.5"), otherwise it's set automatically
  auth: 'microsoft'              // only set if you need microsoft auth, then set this to 'microsoft'
})

bot.loadPlugin(autoeat)

inventoryViewer
inventoryViewer(bot, {
 port: 3012,
})

bot.on('spawn', () => {
})


bot.on('chat', (username, message) => {
  console.log('chat', username, message)
  if (username === bot.username) return
  // bot.chat(message)
})

bot.on('message', message => {
  if (message.toAnsi()) console.log('message', message.toAnsi())
})

// Log errors and kick reasons:
bot.on('kicked', console.log)
bot.on('error', console.log)


bot.on('autoeat_started', (item, offhand) => {
  console.log(new Date(), `Eating ${item.name} in ${offhand ? 'offhand' : 'hand'}`)
})

bot.on('autoeat_error', (error) => {
  console.error(error)
})

bot.on('autoeat_finished', (item, offhand) => {
  console.log(new Date(), `Finished eating ${item.name} in ${offhand ? 'offhand' : 'hand'}`)
})

