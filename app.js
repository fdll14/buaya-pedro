const { Client, MessageMedia, LocalAuth } = require('whatsapp-web.js');
const express = require('express');
const { body, validationResult } = require('express-validator');
const socketIO = require('socket.io');
const qrcode = require('qrcode');
const http = require('http');
const { phoneNumberFormatter } = require('./helpers/formatter');
const fileUpload = require('express-fileupload');
const axios = require('axios');
const owner = '62895422836123';
const port = process.env.PORT || 8000;
const { sewa, test, botPricelist, botPayment, botMenu, botML, botEPEP, botValo } = require('./listgroups/bot.js');
const { aPayment, aMenu, aML, roblox,aEPEP, aLol,aGi,apex,aEvent } = require('./listgroups/maulia.js');
const { ads, gestun,garapan, adsMenu,cv } = require('./listgroups/buaya.js');
const { three } = require('./listgroups/kuota.js');
const app = express();
const server = http.createServer(app);
const io = socketIO(server);
app.use(express.json());
app.use(express.urlencoded({
  extended: true
}));

/**
 * BASED ON MANY QUESTIONS
 * Actually ready mentioned on the tutorials
 * 
 * Many people confused about the warning for file-upload
 * So, we just disabling the debug for simplicity.
 */
app.use(fileUpload({
  debug: false
}));

app.get('/', (req, res) => {
  res.sendFile('index.html', {
    root: __dirname
  });
});

const client = new Client({
  restartOnAuthFail: true,
  puppeteer: {
    headless: true,
    args: [
      '--no-sandbox',
      '--disable-setuid-sandbox',
      '--disable-dev-shm-usage',
      '--disable-accelerated-2d-canvas',
      '--no-first-run',
      '--no-zygote',
      '--single-process', // <- this one doesn't works in Windows
      '--disable-gpu'
    ],
  },
  authStrategy: new LocalAuth()
});

client.on('message', async msg =>{
  var chat = await msg.getChat();
  var group = chat.name;
  if(group === 'Bot'){
      let tag = msg.body
      switch(tag){
        case '!test':
          msg.reply(test)
          break;
        case '!sewa':
          msg.reply(sewa)
          break;
        case '!pricelist':
          msg.reply(botPricelist)
          break
        case '!payment':
          msg.reply(botPayment)
          break;
        case '!menu':
          msg.reply(botMenu)
          break
        case '!ml':
          msg.reply(botML)
          break;
        case '!epep':
          msg.reply(botEPEP)
          break
        case '!valo':
          msg.reply(botValo)
          break;
        case '!close':
          var authorId = msg.author || msg.from;
          var chat = await msg.getChat();
          for(let participant of chat.participants){
            if(participant.id._serialized === authorId && !participant.isAdmin) {
              msg.reply(`Perintah ini khusus admin.`);
            }else if(participant.id._serialized === authorId && participant.isAdmin) {
              chat.setMessagesAdminsOnly(true);
              chat.sendMessage(`Toko tutup hari ini`)
 
            }
          }
          break;
        case '!open':
          var authorId = msg.author || msg.from;
          var chat = await msg.getChat();
          for(let participant of chat.participants){
            if(participant.id._serialized === authorId && !participant.isAdmin) {
              msg.reply(`Perintah ini khusus admin.`);
            }else if(participant.id._serialized === authorId && participant.isAdmin) {
              chat.sendMessage(`Toko buka hari ini`)
              chat.setMessagesAdminsOnly(false);
            }
          }
          break;
        case '!done':
          try {
            var authorId = msg.author || msg.from;
            var contact = await client.getContactById(msg._data.quotedParticipant)
            var chat = await msg.getChat();
            var date = new Date(msg.timestamp * 1000);
            var waktu = date.toTimeString().slice(0,8)
  
            for(let participant of chat.participants){
              if(participant.id._serialized === authorId && !participant.isAdmin) {
                msg.reply(`Perintah ini khusus admin.`);
              }else if(participant.id._serialized === authorId && participant.isAdmin) {
                chat.sendMessage(`「 *Transaksi Berhasil* 」
  
Waktu : ${waktu} WIB
Status : Berhasil
  
Terimakasih @${contact.number} telah order di kami 🙏`,{mentions: [contact]})
              }
            }
          } catch (e) {
            msg.reply(`Tolong reply chat untuk menggunakan fitur ini!.`);
          }
          break        
        case '!proses':
          try {
            var authorId = msg.author || msg.from;
            var contact = await client.getContactById(msg._data.quotedParticipant)
            var chat = await msg.getChat();
            var date = new Date(msg.timestamp * 1000);
            var waktu = date.toTimeString().slice(0,8)
  
            for(let participant of chat.participants){
              if(participant.id._serialized === authorId && !participant.isAdmin) {
                msg.reply(`Perintah ini khusus admin.`);
              }else if(participant.id._serialized === authorId && participant.isAdmin) {
                chat.sendMessage(`「 *Transaksi Proses* 」

                Waktu : ${waktu} WIB
                Status : Proses
                
                Mohon tunggu proses sesuai antrian ya @${contact.number}`,{mentions: [contact]})
              }
            }
          } catch (e) {
            msg.reply(`Tolong reply chat untuk menggunakan fitur ini!.`);
          }
          break
        case '!totalgroups':
          client.getChats().then(chats => {
            const groups = chats.filter(chat => chat.isGroup);
            if (groups.length == 0) {
              msg.reply('You have no group yet.');
            } else {
              let replyMsg = '*YOUR GROUPS*\n\n';
              groups.forEach((group, i) => {
                replyMsg += `ID: ${group.id._serialized}\nName: ${group.name}\n\n`;
              });
              replyMsg += '_You can use the group id to send a message to the group._'
              msg.reply(replyMsg);
            }
          });
          break
      }
  }else if(group === 'Buaya Store|Reseller'){
    let tag = msg.body
    switch(tag){
      case '!sewa':
        msg.reply(sewa)
        break;
      case '!pricelist':
        msg.reply(botPricelist)
        break
      case '!payment':
        msg.reply(botPayment)
        break;
      case '!menu':
        msg.reply(botMenu)
        break
      case '!ml':
        msg.reply(botML)
        break;
      case '!epep':
        msg.reply(botEPEP)
        break
      case '!valo':
        msg.reply(botValo)
        break;
      case '!kuota':
        msg.reply(`*Daftar menu suntik kuota* :

*!three* untuk melihat daftar kuota three
xl comming soon
tsel comming soon
indosat comming soon

`)
        break;
      case '!three':
        msg.reply(three)
        break;
      case '!done':
          try {
            var authorId = msg.author || msg.from;
            var contact = await client.getContactById(msg._data.quotedParticipant)
            var chat = await msg.getChat();
            var date = new Date(msg.timestamp * 1000);
            var waktu = date.toTimeString().slice(0,8)
  
            for(let participant of chat.participants){
              if(participant.id._serialized === authorId && !participant.isAdmin) {
                msg.reply(`Perintah ini khusus admin.`);
              }else if(participant.id._serialized === authorId && participant.isAdmin) {
                chat.sendMessage(`「 *Transaksi Berhasil* 」
  
Waktu : ${waktu} WIB
Status : Berhasil
  
Terimakasih @${contact.number} telah order di kami 🙏`,{mentions: [contact]})
              }
            }
          } catch (e) {
            msg.reply(`Tolong reply chat untuk menggunakan fitur ini!.`);
          }
        break        
      case '!proses':
        try {
            var authorId = msg.author || msg.from;
            var contact = await client.getContactById(msg._data.quotedParticipant)
            var chat = await msg.getChat();
            var date = new Date(msg.timestamp * 1000);
            var waktu = date.toTimeString().slice(0,8)
            for(let participant of chat.participants){
              if(participant.id._serialized === authorId && !participant.isAdmin) {
                msg.reply(`Perintah ini khusus admin.`);
              }else if(participant.id._serialized === authorId && participant.isAdmin) {
                chat.sendMessage(`「 *Transaksi Proses* 」

Waktu : ${waktu} WIB
Status : Proses
                
Mohon tunggu proses sesuai antrian ya @${contact.number}`,{mentions: [contact]})
              }
            }
          } catch (e) {
            msg.reply(`Tolong reply chat untuk menggunakan fitur ini!.`);
          }
        break
      }

  }else if(group === '~ SELL VIA LOGIN ~'){
    let tag = msg.body
    switch(tag){
      case '!sewa':
        msg.reply(sewa)
        break;
      case '!menu':
        msg.reply(aMenu)
        break
      case '!payment':
        msg.reply(aPayment)
        break;
      case '!roblox':
        msg.reply(roblox)
        break;
      case '!apex':
        msg.reply(apex)
        break;
      case '!gi':
        msg.reply(aGi)
        break
      case '!event':
        msg.reply(aEvent)
        break
      case '!ml':
        msg.reply(aML)
        break;
      case '!epep':
        msg.reply(aEPEP)
        break
      case '!lol':
        msg.reply(aLol)
        break
      case '!done':
        try {
          var authorId = msg.author || msg.from;
          var contact = await client.getContactById(msg._data.quotedParticipant)
          var chat = await msg.getChat();
          var date = new Date(msg.timestamp * 1000);
          var waktu = date.toTimeString().slice(0,8)
  
          for(let participant of chat.participants){
            if(participant.id._serialized === authorId && !participant.isAdmin) {
              msg.reply(`Perintah ini khusus admin.`);
            }else if(participant.id._serialized === authorId && participant.isAdmin) {
              chat.sendMessage(`「 *Transaksi Berhasil* 」

Waktu : ${waktu} WIB
Status : Berhasil
  
Terimakasih @${contact.number} telah order di kami 🙏`,{mentions: [contact]})              }
            }
        }catch (e) {
          msg.reply(`Tolong reply chat untuk menggunakan fitur ini!.`);
        }
        break        
      case '!proses':
        try {
          var authorId = msg.author || msg.from;
          var contact = await client.getContactById(msg._data.quotedParticipant)
          var chat = await msg.getChat();
          var date = new Date(msg.timestamp * 1000);
          var waktu = date.toTimeString().slice(0,8)

          for(let participant of chat.participants){
            if(participant.id._serialized === authorId && !participant.isAdmin) {
              msg.reply(`Perintah ini khusus admin.`);
            }else if(participant.id._serialized === authorId && participant.isAdmin) {
              chat.sendMessage(`「 *Transaksi Proses* 」

              Waktu : ${waktu} WIB
              Status : Proses
              
              Mohon tunggu proses sesuai antrian ya @${contact.number}`,{mentions: [contact]})
            }
          }
        } catch (e) {
          msg.reply(`Tolong reply chat untuk menggunakan fitur ini!.`);
        }
        break        
      case '!close':
        var authorId = msg.author || msg.from;
        var chat = await msg.getChat();
        for(let participant of chat.participants){
          if(participant.id._serialized === authorId && !participant.isAdmin) {
            msg.reply(`Perintah ini khusus admin.`);
          }else if(participant.id._serialized === authorId && participant.isAdmin) {
            chat.setMessagesAdminsOnly(true);
            chat.sendMessage(`Toko tutup hari ini`)
          }
        }
        break;
      case '!open':
        var authorId = msg.author || msg.from;
        var chat = await msg.getChat();
        for(let participant of chat.participants){
          if(participant.id._serialized === authorId && !participant.isAdmin) {
            msg.reply(`Perintah ini khusus admin.`);
          }else if(participant.id._serialized === authorId && participant.isAdmin) {
            chat.sendMessage(`Toko buka hari ini`)
            chat.setMessagesAdminsOnly(false);
          }
        }
        break;
    }    
  }else if(group === 'Buaya Cuan'){
    let tag = msg.body
    switch(tag){
      case '!menu':
        msg.reply(adsMenu)
        break
      case '!garapan':
        msg.reply(garapan)
        break;
      case '!adsgoogle':
        msg.reply(ads)
        break;
      case '!cv':
        msg.reply(cv)
        break;
      case '!gestun':
        msg.reply(gestun)
        break;
      case '!close':
        var authorId = msg.author || msg.from;
        var chat = await msg.getChat();
        for(let participant of chat.participants){
          if(participant.id._serialized === authorId && !participant.isAdmin) {
            msg.reply(`Perintah ini khusus admin.`);
          }else if(participant.id._serialized === authorId && participant.isAdmin) {
            chat.setMessagesAdminsOnly(true);
            chat.sendMessage(`Group tutup hari ini`)
          }
        }
        break;
      case '!open':
        var authorId = msg.author || msg.from;
        var chat = await msg.getChat();
        for(let participant of chat.participants){
          if(participant.id._serialized === authorId && !participant.isAdmin) {
            msg.reply(`Perintah ini khusus admin.`);
          }else if(participant.id._serialized === authorId && participant.isAdmin) {
            chat.sendMessage(`Group buka hari ini`)
            chat.setMessagesAdminsOnly(false);
          }
        }
        break;  
      }    
  }
});

client.initialize();

// Socket IO
io.on('connection', function(socket) {
  socket.emit('message', 'Connecting...');

  client.on('qr', (qr) => {
    console.log('QR RECEIVED', qr);
    qrcode.toDataURL(qr, (err, url) => {
      socket.emit('qr', url);
      socket.emit('message', 'QR Code received, scan please!');
    });
  });

  client.on('ready', () => {
    socket.emit('ready', 'Whatsapp is ready!');
    socket.emit('message', 'Whatsapp is ready!');
  });

  client.on('authenticated', () => {
    socket.emit('authenticated', 'Whatsapp is authenticated!');
    socket.emit('message', 'Whatsapp is authenticated!');
    console.log('AUTHENTICATED');
  });

  client.on('auth_failure', function(session) {
    socket.emit('message', 'Auth failure, restarting...');
  });

  client.on('disconnected', (reason) => {
    socket.emit('message', 'Whatsapp is disconnected!');
    client.destroy();
    client.initialize();
  });
});


const checkRegisteredNumber = async function(number) {
  const isRegistered = await client.isRegisteredUser(number);
  return isRegistered;
}

const findGroupByName = async function(name) {
  const group = await client.getChats().then(chats => {
    return chats.find(chat => 
      chat.isGroup && chat.name.toLowerCase() == name.toLowerCase()
    );
  });
  return group;
}

// Send message to group
// You can use chatID or group name, yea!
app.post('/send-group-message', [
  body('id').custom((value, { req }) => {
    if (!value && !req.body.name) {
      throw new Error('Invalid value, you can use `id` or `name`');
    }
    return true;
  }),
  body('message').notEmpty(),
], async (req, res) => {
  const errors = validationResult(req).formatWith(({
    msg
  }) => {
    return msg;
  });

  if (!errors.isEmpty()) {
    return res.status(422).json({
      status: false,
      message: errors.mapped()
    });
  }

  let chatId = req.body.id;
  const groupName = req.body.name;
  const message = req.body.message;

  // Find the group by name
  if (!chatId) {
    const group = await findGroupByName(groupName);
    if (!group) {
      return res.status(422).json({
        status: false,
        message: 'No group found with name: ' + groupName
      });
    }
    chatId = group.id._serialized;
  }

  client.sendMessage(chatId, message).then(response => {
    res.status(200).json({
      status: true,
      response: response
    });
  }).catch(err => {
    res.status(500).json({
      status: false,
      response: err
    });
  });
});

// Clearing message on spesific chat
app.post('/clear-message', [
  body('number').notEmpty(),
], async (req, res) => {
  const errors = validationResult(req).formatWith(({
    msg
  }) => {
    return msg;
  });

  if (!errors.isEmpty()) {
    return res.status(422).json({
      status: false,
      message: errors.mapped()
    });
  }

  const number = phoneNumberFormatter(req.body.number);

  const isRegisteredNumber = await checkRegisteredNumber(number);

  if (!isRegisteredNumber) {
    return res.status(422).json({
      status: false,
      message: 'The number is not registered'
    });
  }

  const chat = await client.getChatById(number);
  
  chat.clearMessages().then(status => {
    res.status(200).json({
      status: true,
      response: status
    });
  }).catch(err => {
    res.status(500).json({
      status: false,
      response: err
    });
  })
});

server.listen(port, function() {
  console.log('App running on *: ' + port);
});