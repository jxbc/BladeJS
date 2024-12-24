import fs from 'fs/promises'

function customViewEngine(filePath, data = {}, dev = 0) {
    return fs.readFile(filePath, 'utf8').then((content) => {
            // Вставка данных в {{placeholder}}
            Object.keys(data).forEach((key) => {
                const regex = new RegExp(`{{\\s*${key}\\s*}}`, 'g');
                content = content.replace(regex, data[key]);
            });

            if(dev) {
            content += `
            <script>
            let vDOM = '' //Abstracted DOM
            let vScript = [] //Abstracted JS
            let vCSS = [] //Abstracted CSS
            let index = 4000
            let links = Array.from(document.querySelectorAll('link'))
            let scripts = Array.from(document.querySelectorAll('script'))
            function update() {
            	links = Array.from(document.querySelectorAll('link'))
            	scripts = Array.from(document.querySelectorAll('script'))
            }

            function hotReload() {
              setInterval(() => {
                fetch(document.location.href).then(data => data.text()).then(data => {
                  if(data) {
                    if(!vDOM) vDOM = data
                    if(vDOM != data) {
                    	vDOM = data
                    	document.querySelector('html').innerHTML = data
                    	update()
                    }
                  }
                })
              }, 1800)

              setInterval(() => {
              	let vi = 0
              	for(let flc of links) {
              		index++
              		if(flc.rel != 'stylesheet') continue
              		fetch(flc.href + "?" + index).then(data => data.text()).then(data => {
              			if(!vCSS[vi]) vCSS[vi] = data
              			if(vCSS[vi] != data) {
              				vCSS[vi] = data

              				flc.setAttribute('href', flc.href)
              			}
	              		if(String(flc.href).indexOf('?') > -1) {
	              			let d = String(flc.href).indexOf('?')
	              			//flc.setAttribute('href', String(flc.href).slice(0, d))
	              		}
	        
	                  vi++
	              	})
	            }
	          }, 1800)

	          setInterval(() => {
	          	let vi = 0
              	for(let flc of scripts) {
              		index++
              		fetch(flc.src + "?" + index).then(data => data.text()).then(data => {
              		  if(!flc.getAttribute('src')) return false;
              		  if(!vScript[vi]) vScript[vi] = data
              		  if(vScript[vi] != data) {
              		  	vScript[vi] = data

              		  	if(String(flc.src).indexOf('?') > -1) {
              		  		let d = String(flc.src).indexOf('?')
              		  		let b = String(flc.src).slice(0, d)
              		  		let Script = document.createElement('script')
              		  		Script.src = b + "?" + index
              		  		Script.setAttribute('defer', '')
              		  		document.body.insertBefore(Script, document.querySelector('.main_app'));
              		  		flc.remove()
              		  		update()
              		  	}
              		  	else
              		  	{
              		  		let Script = document.createElement('script')
              		  		Script.src = flc.src + "?" + index
              		  		Script.setAttribute('defer', '')
              		  		document.body.insertBefore(Script, document.querySelector('.main_app'));
              		  		flc.remove()
              		  		update()
              		  	}	
              		  }
              		  vi++
	              	})
	            }
	          }, 1800)
                
            } hotReload()
            </script>
            `
        	}

            return content;
        });
}

export default { render: customViewEngine }