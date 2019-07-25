const Helper = require('hubot-test-helper');
// helper loads all scripts passed a directory
const helper = new Helper('./scripts');

// helper loads a specific script if it's a file
const scriptHelper = new Helper('./scripts/specific-script.js');

const co     = require('co');
const expect = require('chai').expect;

describe('hello-world', function() {
  beforeEach(function() {
    this.room = helper.createRoom();
  });
  afterEach(function() {
    this.room.destroy();
  });

  context('user says hi to hubot', function() {
    beforeEach(function() {
      return co(function*() {
        yield this.room.user.say('alice', '@hubot hi');
        yield this.room.user.say('bob',   '@hubot hi');
      }.bind(this));
    });

    it('should reply to user', function() {
      expect(this.room.messages).to.eql([
        ['alice', '@hubot hi'],
        ['hubot', '@alice hi'],
        ['bob',   '@hubot hi'],
        ['hubot', '@bob hi']
      ]);
    });
  });
});
