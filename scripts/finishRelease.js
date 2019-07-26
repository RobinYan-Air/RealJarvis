const shell = require('shelljs')
const { checkToBeReleasedRepos, envCheck } = require('../utils/tools')

const FINISH_COMMAND = '../../release.sh finish release'

module.exports = (jarvis) => {
  jarvis.hear(/finish/i, {
    id: 'finishCode',
    auth: true,
    role: ['admin', 'sa']
  }, (res) => {
    res.send("Copy that, will do it right now.")

    const reposNeedToBeCut = checkToBeReleasedRepos(res)
    if(reposNeedToBeCut.length === 0) {
      res.send('No application need to be released, please check.')
      return
    }
    envCheck(res)

    reposNeedToBeCut.forEach((repo) => finishRelease(repo, res))
  })
}

const finishRelease = (repo, res) => {
  res.send(`Trying to finish release for ${repo.description}`)
  shell.cd(`repos/${repo.repoPath}`)
  shell.exec(FINISH_COMMAND, (code, stdout, stderr) => {
    if(code === 0) {
      res.send(`Finished: finish release for ${repo.description}`)
    }
  })
}
