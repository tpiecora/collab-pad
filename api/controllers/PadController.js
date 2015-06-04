/**
 * PadController
 *
 * @description :: Server-side logic for managing pads
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
  subscribe: function(req, res) {
    Pad.find({}, function(e, pads) {
      Pad.subscribe(req.socket);
      Pad.subscribe(req.socket, pads);
      sails.log.info(req.socket.id + ' subscribed');
      return res.ok('subscribed');
    })

  },

  getPad: function(req, res) {
    var data = req.params.all();
    sails.log.info(data.padId);
    if(req.isSocket && req.method === 'GET') {
      Pad.find({padId:data.padId}).exec(function(e,pad){
        if (e) return res.negotiate(e);
        sails.log.info('pad requested', pad[0]);
        return res.ok(pad[0]);
      });
    }
    if(req.isSocket && req.method === 'POST') {
      sails.log.info(data);
      Pad.create(data)
        .exec(function(e, rData) {
          if (e) return sails.log.error(e);
          sails.log.info('pad created', rData);
        })
    }
  },
  getSubscribers: function(req, res) {
    var data = req.params.all();
    if(req.isSocket && req.method === 'GET' && data.padId) {
      Pad.find({padId: data.padId}).exec(function (e, pad) {
        if (e) return sails.log.error(e);
        var x = Pad.subscribers(pad[0]);
        sails.log.info(x);
        return res.ok(x);
      });
    }
  },

  modify: function (req, res) {
    var data = req.params.all();

    if(req.isSocket && req.method === 'POST') {
      //Receiving new content from the client
      //Update pad contents
      sails.log.info('modify triggered', data);
      Pad.update({padId: data.padId}, {content: data.content})
        .exec(function(e, rData) {
          if (e) return sails.error(e);
          sails.log.info('pad updated', rData[0].id);
          if(rData[0].content) {
            Pad.publishUpdate(rData[0].id, rData[0]);
            sails.log.info('pad update published', rData[0].padId);
          }
        })
    } /*else if (req.isSocket) {
     // check if they are subscribed already
     Pad.subscribe(req.socket, data_from_client.padId, 'update');
     console.log(sails.sockets.subscribers());
     console.log('User subscribed to ' + req.socket.id);
     }
     */


  }
};

