const { Client, RichPresence, SpotifyRPC } = require('discord.js-selfbot-v13');
const client = new Client();

client.once('ready', async () => {

  const extendURLs = await RichPresence.getExternal(
    client,
    'application id',
    'https://cdn.discordapp.com/avatars/1340022235276116069/79c8532c5759c9019ef6887156f8e729.webp?size=2048'
  );
  const largeAsset = extendURLs[0].external_asset_path;

  const playstation = new RichPresence(client)
    .setApplicationId('application id')
    .setType('PLAYING')
    .setURL('https://www.youtube.com/watch?v=5icFcPkVzMg')
    .setState('beta test')
    .setName('beta test')
    .setDetails('beta test')
    .setParty({ max: 448, current: 444 })
    .setStartTimestamp(Date.now())
    .setAssetsLargeImage(largeAsset)
    .setAssetsLargeText('beta test')
    .setPlatform('ps5')
    .addButton('Hacking', 'https://twitch.tv/303');

  const now = Date.now();
  const spotify = new SpotifyRPC(client)
    .setAssetsLargeImage('https://cdn.discordapp.com/avatars/1340022235276116069/79c8532c5759c9019ef6887156f8e729.webp?size=2048')
    .setAssetsSmallImage('https://cdn.discordapp.com/avatars/1340022235276116069/79c8532c5759c9019ef6887156f8e729.webp?size=2048')
    .setAssetsLargeText('by куроковв')
    .setDetails('hello my name is')
    .setState('kurokovv')
    .setStartTimestamp(now)
    .setEndTimestamp(now)
    .setSongId('888888')
    .setAlbumId('88888')
    .setArtistIds(['929', '292']);

  client.user.setPresence({
    activities: [spotify] 
  });
});

client.on('messageCreate', async message => {
  if (message.author.id !== client.user.id) return;

  if (message.content === 'Sptik') {
    await message.delete().catch(() => {});
    try {
      await message.channel.send({
        content: '.',
        activity: {
          type: 3,
          partyId: `spotify:${client.user.id}`
        }
      });
    } catch (err) {}
  }

  if (message.content === 'Oprs') {
    await message.delete();
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    const rand = len => Array.from({ length: len }, () => chars[Math.floor(Math.random() * chars.length)]).join('');
    const question = rand(8);
    const link = 'link';
    const answers = Array.from({ length: 8 }, () => ({ text: link, emoji: null }));
    await message.channel.send({
      poll: {
        question: { text: question },
        answers,
        duration: 1,
        allowMultiselect: true
      }
    });
  }

  if (message.content.startsWith('Spm')) {
    await message.delete();
    const [ , countStr, ...textParts ] = message.content.split(' ');
    const count = parseInt(countStr, 10);
    const text = textParts.join(' ');
    if (!count || count < 1 || count > 50 || !text) return;
    const promises = Array.from({ length: count }, () => message.channel.send(text));
    Promise.all(promises).catch(() => {});
  }
});

client.login('account token');