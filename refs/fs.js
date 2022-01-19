const fs = require('fs/promises')
const fsSync = require('fs')
const path = require('path')

const chalk = require('chalk')

const basePath = path.join(__dirname, 'temp')
const getContent = () => `${process.argv[2] ?? ''}\n`
async function start() {
  try {
    if (fsSync.existsSync(basePath)) {
      await fs.appendFile(path.join(basePath, 'logs.txt'), getContent())
      const data = await fs.readFile(path.join(basePath, 'logs.txt'), {
        encoding: 'utf-8'
      })
      console.log(data)
    } else {
      await fs.mkdir(basePath)
      console.log(chalk.greenBright('folder created'))

      await fs.writeFile(path.join(basePath, 'logs.txt'), getContent())
    }
  } catch (error) {
    console.log(chalk.redBright(error))
  }
}
start()

// fs.rmdir(basePath)
