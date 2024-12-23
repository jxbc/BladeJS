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
            let vDOM = ''
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
              	for(let flc of links) {
              		index++
              		if(flc.rel != 'stylesheet') continue
              		fetch(flc.href + "?" + index).then(data => data.text()).then(data => {
              		  if(String(flc.href).indexOf('?') > -1) {
              		  	let d = String(flc.href).indexOf('?')
              		  	//flc.setAttribute('href', String(flc.href).slice(0, d))
              		  }
	                  if(data) {
	                    flc.setAttribute('href', flc.href)
	                  }
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