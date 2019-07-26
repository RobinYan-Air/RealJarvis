const shell = require('shelljs')
const { checkToBeReleasedRepos, envCheck } = require('../utils/tools')

const CUT_COMMAND = '../../release.sh cut release'

module.exports = (jarvis) => {
  jarvis.hear(/cut/i, {
    id: 'cutCode',
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

    reposNeedToBeCut.forEach((repo) => cutRepo(repo, res))
  })
}

const cutRepo = (repo, res) => {
  res.send(`Trying to cut ${repo.description}`)
  shell.cd(`repos/${repo.repoPath}`)
  shell.exec(CUT_COMMAND, (code, stdout, stderr) => {
    if(code === 0) {
      res.send(`Finished: cut ${repo.description}`)
    }
  })
}
