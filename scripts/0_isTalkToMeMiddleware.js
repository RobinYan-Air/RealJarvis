const { jarvis, room } = require('../config/slackRelated')

module.exports = (jarvis) => {
  jarvis.listenerMiddleware((context, next, done) => {
    reqUser = context.response.message.user
    reqRoom = context.response.message.room
    reqMsg = context.response.message.rawMessage.text

    console.log(reqMsg)
    if(isPrivateRoom(reqRoom)) {
      next()
      return
    }

    if(isTalkToMeInChannel(reqMsg)) {
      next()
      return
    }
    console.log(`Not talk to me: ${reqMsg}`)
    done()
  })
}

const isTalkToMeInChannel = (msg) => {
  const jarvisId = jarvis.id
  const atMsg = `<@${jarvisId}>`

  return msg.indexOf(atMsg) >= 0
}

const isPrivateRoom = (roomId) => {
  if(!roomId) return false

  return room[roomId].type === 'private'
}
