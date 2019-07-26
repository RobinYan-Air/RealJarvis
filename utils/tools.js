const shell = require('shelljs')
const REPOS = require('../config/gitRepos')

const envCheck = (res) => {
  res.send("Checking Env...")

  const releaseTestingPath = process.env.RELEASE_TESTING_PATH || ''
  if (!releaseTestingPath) {
    res.send('RELEASE_TESTING_PATH has NOT been set')
    return
  }

  _updateReleaseTestingRepo(releaseTestingPath)
  res.send("No issues for env.")
}

const checkToBeReleasedRepos = (res) => {
  res.send('Checking how many applications need to be released...')

  const msg = res.message.text
  const reposNeedToBeCut = REPOS.filter((repo) => msg.toLowerCase().indexOf(repo.name.toLowerCase()) >= 0)

  res.send(`Applications need to be released: ${reposNeedToBeCut.map(r => r.description).join(' / ')}`)
  return reposNeedToBeCut
}

const _updateReleaseTestingRepo = (path) => {
  shell.cd(path)
  shell.exec('git pull', {silent: true})
}

module.exports = {
  envCheck,
  checkToBeReleasedRepos
}
