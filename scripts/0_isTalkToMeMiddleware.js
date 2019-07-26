require('dotenv').config()
const { jarvis, room } = require('../config/slackRelated')

module.exports = (jarvis) => {
  jarvis.listenerMiddleware((context, next, done) => {
    reqUser = context.response.message.user
    reqRoom = context.response.message.room
    reqMsg = context.response.message.rawMessage.text

    console.log('Middleware In: isTalkToMe')
    if(isPrivateRoom(reqRoom)) {
      next()
      console.log('Middleware out: isTalkToMe')
      return
    }

    if(isTalkToMeInChannel(reqMsg)) {
      next()
      console.log('Middleware out: isTalkToMe')
      return
    }
    console.log(`Not talk to me: ${reqMsg}`)
    console.log('Middleware out: isTalkToMe')
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
