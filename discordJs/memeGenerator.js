module.exports = {

  sendMeme: function(message, filename) {

    // for local testing
    // message.channel.sendFile(`${filename}`)

    // for production
    message.channel.sendFile(`/root/makobot/MakoBot/discordJs/${filename}`);
  }
}
