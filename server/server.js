var
  express = require('express'),
  app = express(),
  mongoose = require('mongoose'),
  bodyParser = require('body-parser'),
  cors = require('cors'),
  PORT = 3000;

app.use([
  cors(),
  bodyParser.json(),
  bodyParser.urlencoded({ extended: true }),
  express.static('../client/')
]);

mongoose.Promise = require('q').Promise;

mongoose.connect('mongodb://localhost:27017/users', function (err) {
  if (err) {
    console.log("Connection not established");
  }
  else {
    console.log("Connection established");
  }
});

var
  Schema = mongoose.Schema,

  users_schema = new Schema({
    username: String,
    password: String,
    firstName: String,
    lastName: String,
    email: String,
    phone: String,
    location: String
  }),

  messages_schema = new Schema({
    recipient: String,
    recipient_img: String,
    sender: String,
    sender_img: String,
    title: String,
    description: String,
    important: String
  }),

  reply_schema = new Schema({
    replyId: String,
    reply: String
  }),

  user = mongoose.model('user_signup', users_schema),
  message = mongoose.model('messages_lists', messages_schema),
  replyModel = mongoose.model('reply_list', reply_schema);


////////////////// REPLY HANDLER //////////////////

app.post('/reply', function (req, res) {
  var
    replyMessage = new replyModel({
      replyId: req.body.id,
      reply: req.body.reply
    });

  replyMessage.save(function (err, user) {
    if (!err) {
      res.send({
        isReplied: true,
        message: 'replied',
        data: user
      });
    }
    else {
      res.send({
        isReplied: false,
        message: 'replied error'
      });
    }
  });

});


////////////////// REGISTRATIONS HANDLER //////////////////

app.post('/register', function (req, res) {

  var userRegistration = new user({
    username: req.body.username,
    password: req.body.password,
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    email: req.body.email,
    phone: req.body.phone,
    location: req.body.location
  });

  userRegistration.save(function (err) {
    if (!err) {
      console.log("Document saved");
      res.send({
        isRegistered: true,
        message: 'registered'
      });
    }
    else {
      res.send({
        isRegistered: false,
        message: 'Registration error'
      });
    }
  });
});


////////////////// LOGIN HANDLER //////////////////

app.post('/loginuser', function (req, res) {

  var
    username = req.body.username,
    password = req.body.password;

  user.findOne({ username: username, password: password }, function (err, user) {
    if (err) {
      return res.status(500).send();
    }
    if (!user) {
      return res.send({
        isLoggedIn: false,
        message: "Not Registered"
      });
    }
    return res.send({
      isLoggedIn: true,
      message: "Registered",
      data: user
    });
  });
});


////////////////// PROFILE UPDATE //////////////////

app.post('/profile', function (req, res) {
  var
    username = req.body.user,
    newUsername = req.body.userDetails.username,
    newPassword = req.body.userDetails.password,
    newFirstName = req.body.userDetails.firstName,
    newLastName = req.body.userDetails.lastName,
    newEmail = req.body.userDetails.email,
    newPhone = req.body.userDetails.phone,
    newLocation = req.body.userDetails.location;

  user.update(
    { username: username },
    {
      "$set": {
        username: newUsername,
        password: newPassword,
        firstName: newFirstName,
        lastName: newLastName,
        email: newEmail,
        phone: newPhone,
        location: newLocation
      }
    },
    function (err, user) {
      if (err) {
        return res.send({
          reset: false,
          message: "Not updated"
        });
      }
      if (!user) {
        return res.send({
          reset: false,
          message: "Not updated"
        });
      }
      return res.send({
        reset: true,
        message: "Updated Successfully",
        data: user
      });
    });
});


////////////////// MESSAGE SAVED //////////////////

app.post('/messagesave', function (req, res) {

  var username = req.body.user;

  message.find({ recipient: username }, function (err, msg) {
    if (err) {
      return res.status(500).send();
    }
    if (!msg) {
      return res.send({
        messages: false,
        message: "No messages"
      });
    }
    return res.send({
      messages: true,
      message: "Save messages",
      data: msg
    });

  });
});


////////////////// IMPORTANT COUNT //////////////////

app.post('/important', function (req, res) {

  var
    important = req.body.count,
    id = req.body.id;

  message.update({ _id: id }, { "$set": { important: important } }, function (err, user) {
    if (err) {
      return res.send({
        reset: false,
        message: "Not updated"
      });
    }
    if (!user) {
      return res.send({
        reset: false,
        message: "Not updated"
      });
    }
    return res.send({
      reset: true,
      message: "Updated Successfully",
      data: user
    });
  });

});


////////////////// DELETE MESSAGE //////////////////

app.post('/deletemsg', function (req, res) {
  var id = req.body.id;

  message.remove({ _id: id }, function (err, user) {
    if (err) {
      return res.send({
        delete: false,
        message: "Not deleted"
      });
    }
    if (!user) {
      return res.send({
        delete: false,
        message: "Not deleted"
      });
    }
    return res.send({
      reset: true,
      message: "Deleted Successfully",
    });
  });
});

app.listen(PORT, function () {
  console.log(`Server running at local host @${PORT}`);
});