const mineflayer = require('mineflayer')
const pathfinder = require('mineflayer-pathfinder').pathfinder
const { autoCrystal } = require('mineflayer-autocrystal')
const killaura = require('mineflayer-autocrystal')
const mineflayerSwarm = require('mineflayer-swarm')
const armorManager = require('mineflayer-armor-manager')
const toolPlugin = require('mineflayer-tool').plugin
const killauradan = require('mineflayer-kill-aura')
const pathfinder = require('mineflayer-pathfinder').pathfinder
const Movements = require('mineflayer-pathfinder').Movements
const { GoalNear } = require('mineflayer-pathfinder').goals




 const bot = mineflayer.createBot({
    host: 'localhost',
    username: 'DanysCristalBot',

  })

  bot.loadPlugin(armorManager);
  bot.loadPlugin(toolPlugin)
  bot.loadPlugin(pathfinder)
  
  bot.once('spawn', () => {

	const mcData = require('minecraft-data')(bot.version)
  
	const defaultMove = new Movements(bot, mcData)

	bot.on('chat', function(username, message) {
  
		if (username === bot.username) return
	
		const target = bot.players[username] ? bot.players[username].entity : null
		if (message === 'come') {
		  if (!target) {
			bot.chat('I don\'t see you !')
			return
		  }
		  const p = target.position
	
		  bot.pathfinder.setMovements(defaultMove)
		  bot.pathfinder.setGoal(new GoalNear(p.x, p.y, p.z, 1))
		} 
	  })
	})
    
     

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



