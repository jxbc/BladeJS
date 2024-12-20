let color = Object({
	Reset: `\x1b[0m`,
Bright: "\x1b[1m",
Dim: "\x1b[2m",
Underscore: "\x1b[4m",
Blink: "\x1b[5m",
Reverse: "\x1b[7m",
Hidden: "\x1b[8m",

tBlack: "\x1b[30m",
tRed: "\x1b[31m",
tGreen: "\x1b[32m",
tYellow: "\x1b[33m",
tBlue: "\x1b[34m",
tMagenta: "\x1b[35m",
tCyan: "\x1b[36m",
tWhite: "\x1b[37m",
tGray: "\x1b[90m",

BgBlack: "\x1b[40m",
BgRed: "\x1b[41m",
BgGreen: "\x1b[42m",
BgYellow:"\x1b[43m",
BgBlue: "\x1b[44m",
BgMagenta: "\x1b[45m",
BgCyan: "\x1b[46m",
BgWhite: "\x1b[47m",
BgGray: "\x1b[100m"
})

function log(name, ...out) {
	return console.log(name + color.Reset, ...out, color.Reset)
}

function Random(min, max) {
	min = Math.ceil(min);
	max = Math.floor(max);
	return Math.floor(Math.random() * (max - min + 1)) + min;
}

export { color, log, Random }