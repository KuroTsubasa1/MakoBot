module.exports = {

  // calles a script which patches the git and restart the bot service
  patchServer: function() {
    execFile("/root/makobot/MakoBot/discordJs/syncGitRepo.sh");
    message.channel.send("patched git");
    message.channel.send("restart now");
  }
};
