const { readline } =require('./dist/index')

const rl = readline('r:/test.txt', 4, 'utf-8')

rl.on('line', console.log)
rl.on('error', console.error)


