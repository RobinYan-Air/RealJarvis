const shell = require('shelljs')

module.exports = (jarvis) => {
  jarvis.hear(/hello/i, {
    id: 'hello',
    auth: true,
    role: ['sa']
  }, (res) => {
    console.log(res)
    const releaseTestingPath = process.env.RELEASE_TESTING_PATH || ''
    if (!releaseTestingPath) {
      res.send('RELEASE_TESTING_PATH has NOT been set')
      return
    }

    // shell.echo(`Path for Repo<release_testing>: ${releaseTestingPath}`)
    // shell.cd(releaseTestingPath)
    // shell.exec('git pull')
    // shell.cd('repos/airwallex-airboard-ng')
    // shell.exec('../../release.sh cut release')
    // // shell.echo(shell.ls())
    res.send("hello, this is Jarvis, Robin's faithful servant")
  })

  jarvis.hear(/bye/i, {
    id: 'bye',
    auth: true,
    role: ['admin']
  }, (res) => {
    console.log(res)
    const releaseTestingPath = process.env.RELEASE_TESTING_PATH || ''
    if (!releaseTestingPath) {
      res.send('RELEASE_TESTING_PATH has NOT been set')
      return
    }

    // shell.echo(`Path for Repo<release_testing>: ${releaseTestingPath}`)
    // shell.cd(releaseTestingPath)
    // shell.exec('git pull')
    // shell.cd('repos/airwallex-airboard-ng')
    // shell.exec('../../release.sh cut release')
    // // shell.echo(shell.ls())
    res.send("hello, this is Jarvis, Robin's faithful servant")
  })
}
