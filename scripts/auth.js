const intersection = require('lodash.intersection')
const { user, room} = require('../config/slackRelated')

module.exports = (jarvis) => {


  jarvis.listenerMiddleware((context, next, done) => {
    const { id, auth, role } = context.listener.options
    reqUser = context.response.message.user
    reqRoom = context.response.message.room
    reqMsg = context.response.message.text

    if(!auth) {
      next()
      return
    }

    const userRole = getUserRole(reqUser.id)
    const hasPermission = intersection(userRole, role).length > 0

    if(hasPermission) {
      next()
      return
    }

    context.response.reply(`You are not authorized to do this operation<${id}>`)
    done()
  })
}


const getUserRole = (userId) => {
  const u = user[userId]

  if(!u) {
    return []
  }

  return u.role || []
}
