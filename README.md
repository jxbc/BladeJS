
# Blade.js - super fast webserver with hot reload/auto reload
![Fastify](https://img.shields.io/badge/fastify-%23000000.svg?style=for-the-badge&logo=fastify&logoColor=white) ![Nodejs](https://img.shields.io/badge/NodeJS->=_v20-green?style=flat) ![Nodejs](https://img.shields.io/badge/NodeJS_Legacy_Support->=_v16-blue?style=flat)

## Что такое Blade.js?
Blade это библиотека для создания быстрых веб-серверов. В основном рекомендуема для тестирования или разработки небольших сайтов/приложений. Под капотом Blade.js скрывается производительный веб-сервер от Fastify.

В случае, если вам нужен небольшой сайт с набором нужных функций в виде SSR и тд, Blade решает проблему тяжелых библиотек/фреймворков (Next, Nest), у которых много нужных, но и зачастую ненужных методов, а еще миллионы зависимостей из-за которых может что-то сломаться в самый неподходящий момент. 

У Blade.js все просто - из коробки вы получаете всё самое основное для быстрой разработки. По сути Blade.js это обертка над Fastify.

## Возможности

 - [x] Самый быстрый REST API
 - [x] .render() метод для SSR (шаблонитизатор)
 - [x] .cors() метод для REST API
 - [x] devMode для авто-обновления страницы при внесении изменений
 - [ ] Cloudflare Tunnel для быстрого тестирования
 - [ ] Server Sent Events с одной строчки кода

И много других возможностей еще не раскрыто, но в скором... 

## Производительность
Самым удачным опытом оказалось попробовать веб-сервер на Fastify. Он легкий, мощный, имеет схему и типизацию запрос/ответ, а ещё очень быстрый. Ни один веб-сервер на Node.js не способен обрабатывать такое количество запросов, как Fastify.  **70K+ запросов в секунду**!
![](https://habrastorage.org/r/w1560/getpro/habr/upload_files/04c/6f1/068/04c6f1068de559d454a233a067dff740.png)
> Fastify способен потягаться в бенчмарках с самыми быстрыми веб-серверами на других языках, более низкоуровневых. НО я по прежнему люблю и Koa, он так же хорош, если нужна производительность на дистанции.

## Для чего нужен Blade?
Blade решает проблему написания чистых шаблонов на HTML/CSS/JS. А так же возможность использовать Hot Reload сервер и фронт.

## Как начать пользоваться?
1. Клонируйте git
2. Выполните установку Node.js (если его нет)
3. Откройте cmd, перейдите в директорию клонированного git и выполните команды:

```bash
npm init -y
npm i fastify
```
После выполненных манипуляций введите следующую команду:

```bash
node watch
```

**Готово!** Теперь вы пользуетесь лучшими инструментами для разработчиков начинающего/среднего уровня. Базовый скрипт watch следит за изменениями в файлах для обновления запущенного приложения.

## Давайте начнем!
Давайте создадим самый простой веб-сервер, где отрендерим данные с сервера в index.html
```javascript
    import blade from './modules/blade.js'
    const Blade = new blade({devMode: 1})
    const port = 3000
    
    Blade.get('/', (req, res) => {
    	return res.render('index.html', {name: 'John'})
    })
    
    Blade.run(port)
    
    console.log(`Blade Started!`)
```
Круто, не так ли?
