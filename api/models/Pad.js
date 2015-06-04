/**
* Pad.js
*
* @description :: TODO: You might write a short summary of how this model works and what it represents here.
* @docs        :: http://sailsjs.org/#!documentation/models
*/

module.exports = {

  attributes: {
    content: {
      type: 'string'
    },
    padId: {
      type: 'string',
      required: 'true',
      unique: 'true'
    },
    userId: {
      type: 'string',
      required: 'true'
    },
    editor: {
      type: 'string'
    }
  }
};

