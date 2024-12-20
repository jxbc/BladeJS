import fs from 'fs/promises'

function customViewEngine(filePath, data = {}) {
    return fs.readFile(filePath, 'utf8').then((content) => {
            // Вставка данных в {{placeholder}}
            Object.keys(data).forEach((key) => {
                const regex = new RegExp(`{{\\s*${key}\\s*}}`, 'g');
                content = content.replace(regex, data[key]);
            });

            content += `
            <script>
            let vDOM = ''
            function hotReload() {
              setInterval(() => {
                fetch(document.location.href).then(data => data.text()).then(data => {
                  if(data) {
                    if(!vDOM) vDOM = data
                    if(vDOM != data) {
                    	vDOM = data
                    	document.querySelector('html').innerHTML = data
                    }
                  }
                })
              }, 1800);
            } hotReload()
            </script>
            `

            return content;
        });
}

export default { render: customViewEngine }