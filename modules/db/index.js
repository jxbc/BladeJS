import fs from 'fs'
import path from 'path'

let select = null

function checkFileInDir(file) {
    return new Promise((resolve, reject) => {
        fs.readFile(file, 'utf8', (err, data) => {
           if(err) {
               select = errorHandler(file, err)
               resolve(select)
           }
           else {
               resolve(path.resolve(file))
           }
        })
    })
}


function errorHandler(file, code) {
    if(code.code == 'ENOENT') {
        try {
            fs.writeFileSync(code.path, '')
            return code.path
        } catch (e) {
            console.log(e)
        }
    }
    else
    {
        return file
    }
}

function Select(dbName) {
    return checkFileInDir(dbName).then(path => {
        return {
            raw: function () {
                return fs.readFileSync(path, 'utf8')
            },
            insert: function (json, mode = 'json') {
                let buffer = fs.readFileSync(path, 'utf8')

                if(mode == 'text') {
                    let mixedData = buffer + '\n' + json
                    fs.writeFileSync(path, mixedData, 'utf8')
                    return { status: 'ok', mode: mode }
                }

                if(mode == 'json') {
                    let jsonData = null
                    if(buffer.indexOf(`[`) > -1) {
                        jsonData = JSON.parse(buffer)
                    }

                    if(jsonData) {
                        jsonData.push(json)
                        let mixedData = JSON.stringify(jsonData)
                        fs.writeFileSync(path, mixedData, 'utf8')
                    }
                    else
                    {
                        jsonData = Array()
                        jsonData.push(json)
                        let mixedData = JSON.stringify(jsonData)
                        fs.writeFileSync(path, mixedData, 'utf8')
                    }
                    return { status: 'ok', mode: mode, data: jsonData }
                }
            },
            find: function (data, mode = 'json') {
                let buffer = fs.readFileSync(path, 'utf8')

                if(mode === 'json') {
                    if(buffer.indexOf('[') > -1) {
                        buffer = JSON.parse(buffer)
                        for(let obj of buffer) {
                            let ins = Object.keys(obj)
                            let out = Object.keys(data)

                            for(let key of ins) {
                                if(out.includes(key)) {
                                    if (obj[key] == data[key]) {
                                        return obj;
                                    }
                                }
                            }
                        }
                    }
                }
            },
            clear: function () {
                fs.writeFileSync(path, '', 'utf8')
            },
            update: function (keyPath, value) {
                let buffer = fs.readFileSync(path, 'utf8');

                let jsonData;
                try {
                    jsonData = JSON.parse(buffer);
                } catch (err) {
                    throw new Error('Invalid JSON format in file');
                }

                const isArray = Array.isArray(jsonData);
                if (!isArray) {
                    throw new Error('Expected JSON data to be an array');
                }

                function updateByPath(obj, pathArray, value) {
                    let current = obj;
                    for (let i = 0; i < pathArray.length - 1; i++) {
                        const key = pathArray[i];

                        if (!(key in current)) {
                            throw new Error(`Key \"${key}\" not found in path.`);
                        }

                        current = current[key];

                        if (typeof current !== 'object' || current === null) {
                            throw new Error(`Intermediate key \"${key}\" does not point to an object`);
                        }
                    }

                    const finalKey = pathArray[pathArray.length - 1];
                    if (!(finalKey in current)) {
                        throw new Error(`Final key \"${finalKey}\" not found in path`);
                    }

                    current[finalKey] = value;
                }

                const pathArray = keyPath.split('.');

                let updated = false;

                for (let item of jsonData) {
                    try {
                        updateByPath(item, pathArray, value);
                        updated = true;
                        break;
                    } catch (err) {
                        continue;
                    }
                }

                if (!updated) {
                    throw new Error(`Key path \"${keyPath}\" not found in any objects within the array.`);
                }

                fs.writeFileSync(path, JSON.stringify(jsonData, null, 2), 'utf8');

                return { status: 'ok', updated: true, data: jsonData }
            }
        }
    })
}

function wait(timex) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve();
        }, timex)
    });
}

export default { select: Select, wait: wait }