module.exports = {

  sendMeme: function(message, filename) {
    message.channel.sendFile(`${filename}`)
  }
}
