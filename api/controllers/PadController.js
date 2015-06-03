/**
 * PadController
 *
 * @description :: Server-side logic for managing pads
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
	addContent: function (req, res) {
    var data_from_client = req.params.all();

    if(req.isSocket && req.method === 'POST') {
      //Receiving new content from the client
      //Update pad contents
      Pad.create(data_from_client)
        .exec(function(e, data_from_client) {
          console.log(data_from_client);
          if(data_from_client.content) {
            Pad.publishCreate({id: data_from_client.id, content: data_from_client.content});
          }
        })
    } else if (req.isSocket) {
      //User subscribing, send them any new content
      Pad.watch(req.socket);
      console.log('User subscribed to ' + req.socket.id);
    }



  }
};

