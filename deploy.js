const { NodeSSH } = require('node-ssh')
const path = require('path')
const fs = require('fs').promises
require('dotenv').config()

async function deploySaa(host, username, password) {
  console.log('---- Starting deployment... ----')
  console.warn('---- Make sure you have run `yarn build` before deploying. ----')
  console.warn(
    '---- Make sure you have updated the `.production.env` file on GitHub before deploying. ----',
  )
  console.time('Deployment time')

  const ssh = new NodeSSH()

  try {
    console.log('Connecting to server...')
    await ssh.connect({ host, username, password })

    const filesToUpload = [
      {
        local: '.env.production',
        remote: `/var/www/ellie.howson.codes/html/.env.production`,
      },
      { local: 'src', remote: `/var/www/ellie.howson.codes/html/src`, isDir: true },
      { local: 'public', remote: `/var/www/ellie.howson.codes/html/public`, isDir: true },
      {
        local: 'next.config.mjs',
        remote: `/var/www/ellie.howson.codes/html/next.config.mjs`,
      },
      { local: 'package.json', remote: `/var/www/ellie.howson.codes/html/package.json` },
      { local: 'tsconfig.json', remote: `/var/www/ellie.howson.codes/html/tsconfig.json` },
    ]

    const commandsToRun = [
      {
        command: `cd /var/www/ellie.howson.codes/html && yarn install --ignore-peer-dependencies`,
        message: 'Installing packages...',
      },
      {
        command: `cd /var/www/ellie.howson.codes/html && cp .env.production .env`,
        message: 'Copying .env.production to .env...',
      },
      {
        command: `cd /var/www/ellie.howson.codes/html && NODE_ENV=production npx payload migrate`,
        message: 'Migrating database...',
        input: 'y\n',
      },
      {
        command: `cd /var/www/ellie.howson.codes/html && yarn build`,
        message: 'Building project...',
      },
      {
        command: 'pm2 reload all --update-env',
        message: 'Reloading PM2...',
      },
    ]

    for (const { remote } of filesToUpload) {
      try {
        await ssh.execCommand(`rm -rf ${remote}`)
        console.log(`Deleted ${remote} on the server.`)
      } catch (error) {
        console.warn(`Failed to delete ${remote} on the server. It may not exist.`)
      }
    }

    for (const file of filesToUpload) {
      const localPath = path.join(__dirname, file.local)
      const remotePath = file.remote
      try {
        await fs.access(localPath)
        console.log(`Uploading ${localPath} to ${remotePath}...`)
      } catch (error) {
        console.warn(`Skipping upload of ${localPath} as it doesn't exist locally.`)
        continue
      }
      if (file.isDir) {
        await ssh.putDirectory(localPath, remotePath)
      } else {
        await ssh.putFile(localPath, remotePath)
      }
    }

    for (const { command, message, input } of commandsToRun) {
      try {
        await runCommand(ssh, command, message, input)
      } catch (error) {
        console.error(error)
        break
      }
    }

    console.log('Deployment completed successfully.')
  } catch (error) {
    console.error('Deployment failed:', error)
    process.exit(1)
  } finally {
    console.timeEnd('Deployment time')
    ssh.dispose()
    process.exit(0)
  }
}

async function runCommand(ssh, command, message, input = '') {
  try {
    console.log(message)
    const result = await ssh.execCommand(command, { stdin: input })
    console.log(result.stdout)
    if (result.stderr) {
      console.warn(result.stderr)
    }
  } catch (error) {
    throw new Error(`Error during: ${message}\n${error.message}`)
  }
}

// Usage
deploySaa(process.env.SSH_HOST, process.env.SSH_USERNAME, process.env.SSH_PASSWORD)
