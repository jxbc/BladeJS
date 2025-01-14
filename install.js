import { exec } from 'child_process'
import { color } from './modules/cmd.js'

const module_count = 6

console.log(color.tMagenta,`$$$$$$$\  $$\                 $$\                             
$$  __$$\ $$ |                $$ |                            
$$ |  $$ |$$ | $$$$$$\   $$$$$$$ | $$$$$$\      $$\  $$$$$$$\ 
$$$$$$$\ |$$ | \____$$\ $$  __$$ |$$  __$$\     \__|$$  _____|
$$  __$$\ $$ | $$$$$$$ |$$ /  $$ |$$$$$$$$ |    $$\ \$$$$$$\  
$$ |  $$ |$$ |$$  __$$ |$$ |  $$ |$$   ____|    $$ | \____$$\ 
$$$$$$$  |$$ |\$$$$$$$ |\$$$$$$$ |\$$$$$$$\ $$\ $$ |$$$$$$$  |
\_______/ \__| \_______| \_______| \_______|\__|$$ |\_______/ 
                                          $$\   $$ |          
                                          \$$$$$$  |          
                                           \______/       `, color.Reset)
console.log('>_$ ')
console.log('>_$ INSTALL MASTER BLADE.JS')
console.log('>_$ ')
console.log(color.tBlue + `[ 1 / ${module_count} ]`, color.Reset, 'Proxy Addr', color.tYellow + 'Install...', color.Reset)
exec('npm install proxy-addr', (err, out, dec) => {
	console.log(color.tBlue + `[ 1 / ${module_count} ]`, color.Reset, 'Proxy Addr', color.tGreen + 'Installed', color.Reset, '\n')
	console.log(color.tBlue + `[ 2 / ${module_count} ]`, color.Reset, 'NAT Tunnel', color.tYellow + 'Install...', color.Reset)
	exec('npm install glob', (err, out, dec) => {
		console.log(color.tBlue + `[ 2 / ${module_count} ]`, color.Reset, 'NAT Tunnel', color.tGreen + 'Installed', color.Reset, '\n')
		console.log(color.tBlue + `[ 3 / ${module_count} ]`, color.Reset, 'Support Server Plugins', color.tYellow + 'Install...', color.Reset)
		exec('npm install fastify-plugin', (err, out, dec) => {
			console.log(color.tBlue + `[ 3 / ${module_count} ]`, color.Reset, 'Server Plugins v2', color.tGreen + 'Installed', color.Reset, '\n')
			console.log(color.tBlue + `[ 4 / ${module_count} ]`, color.Reset, 'Server Side Render', color.tYellow + 'Install...', color.Reset)
			exec('npm install @fastify/send', (err, out, dec) => {
				console.log(color.tBlue + `[ 4 / ${module_count} ]`, color.Reset, 'Server Side Render', color.tGreen + 'Installed', color.Reset, '\n')
				console.log(color.tBlue + `[ 5 / ${module_count} ]`, color.Reset, 'Fastify Boost', color.tYellow + 'Install...', color.Reset)

				exec('npm install @fastify/accept-negotiator', (err, out, dec) => {
					console.log(color.tBlue + `[ 5 / ${module_count} ]`, color.Reset, 'Fastify Boost Negotiator', color.tGreen + 'Installed', color.Reset, '\n')
					console.log(color.tBlue + `[ 6 / ${module_count} ]`, color.Reset, 'Explorer Replicator', color.tYellow + 'Install...', color.Reset)

					exec('npm install content-disposition', (err, out, dec) => {
						console.log(color.tBlue + `[ 6 / ${module_count} ]`, color.Reset, 'Explorer Replicator', color.tGreen + 'Installed', color.Reset, '\n')
						
						console.log(color.tGreen + `>_$`, color.Reset, 'Blade.js Requirements Installed')
					})
				})
			})
		})
	})
})