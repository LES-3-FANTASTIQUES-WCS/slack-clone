const EventEmitter = require('events');

const EVENTS = Object.freeze({
  MESSAGE_CREATED: 'MESSAGE_CREATED',
});

const eventEmitter = new EventEmitter();

module.exports = {
  EVENTS,
  eventEmitter,
};
