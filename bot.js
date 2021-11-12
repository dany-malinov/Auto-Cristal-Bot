const mineflayer = require('mineflayer')
const pathfinder = require('mineflayer-pathfinder').pathfinder
const { autoCrystal } = require('mineflayer-autocrystal')
const killaura = require('mineflayer-autocrystal')
const mineflayerSwarm = require('mineflayer-swarm')
const armorManager = require('mineflayer-armor-manager')
const toolPlugin = require('mineflayer-tool').plugin
const killauradan = require('mineflayer-kill-aura')



 const bot = mineflayer.createBot({
    host: 'localhost',
    username: 'DanysCristalBot',

  })

  bot.loadPlugin(armorManager);
  bot.loadPlugin(toolPlugin)

function maincpvp() {

	bot.loadPlugin(autoCrystal)

	bot.once('spawn', () => {
		bot.autoCrystal.options.logErrors = true
		console.clear()
		console.log('Spawned.')
	})

	bot.on('end', () => {
		maincpvp()
	})

	bot.on('kicked', (reason) => {
		console.log(reason)
		maincpvp()
	})

	bot.on('error', (reason) => {
		console.error(reason)
		maincpvp()
	})

	bot.on('chat', async (username, message) => {
		if (username === bot.username) return

		switch (message) {
			case 'start':
				bot.chat('AutoCrystal enabled.')
				await bot.autoCrystal.enable()
				break

			case 'stop':
				bot.chat('AutoCrystal disabled.')
				await bot.autoCrystal.disable()
				break

			case 'holes':
				const holes = await bot.autoCrystal.getHoles()
				bot.chat(`Found ${holes.length} holes made out of bedrock.`)
				break

			default:
				break
		}
	})
}

maincpvp()



