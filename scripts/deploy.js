const shell = require('shelljs')
const puppeteer = require('puppeteer');

module.exports = (jarvis) => {
  jarvis.hear(/deploy/i, {
    id: 'deploy',
    auth: true,
    role: ['sa']
  }, (res) => {
    (async () => {
      try {
        const browser = await puppeteer.launch()
        const page = await browser.newPage()
        await page.goto('https://jenkins.awx.im/job/airwallex-release/job/update-release/build?delay=0sec')

        await login(page)
        await setEnv(page, 'staging')
        await setReleaseBranch(page, true)


        await page.screenshot({path: 'example.png'})
        res.send('heihei')
        await browser.close()
      } catch (error) {
        res.send(`Error: ${error}`)
      }
    })()
  })
}

const setReleaseBranch = async (page, isMaster = false) => {
  await page.waitForSelector('#gitParameterSelect>option[value="master"]')

  const releaseBranch = await page.$('#gitParameterSelect')
  if(isMaster) {
    await releaseBranch.type('master')
    return
  }

  const latestVersion = await releaseBranch.$('option')
  await latestVersion.click()
}

const setEnv = async (page, env) => {
  const envList = {
    'staging': 'etstaging',
    'demo': 'etdemo2',
    'production': 'etproduction'
  }

  const envSelector = await page.$('select[name="value"]')
  await envSelector.type(envList[env])
}

const login = async (page) => {
  const email = await page.$('#login_field')
  await email.type('robin.yan@airwallex.com')

  const pwd = await page.$('#password')
  await pwd.type('yanzg0905')

  const submit = await page.$('input[type="submit"]')
  await submit.click()

  await page.waitForNavigation({
    waitUntil: 'domcontentloaded'
  })
}
