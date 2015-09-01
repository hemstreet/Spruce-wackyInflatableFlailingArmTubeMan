var request = require('request'),
    _ = require('underscore'),
    socket = require('socket.io-client');

var wackyInflatableFlailingArmTubeMan = {

    config: require('./config/config.json'),
    isPartyTime: false,
    partyTimeDuration: 15000,

    init: function () {

        socket = socket(this.config.url);

        socket.on('connect', function () {
            console.log('connected');
            this.stop();
        }.bind(this));

        socket.on('did-book-appointments', function () {
            console.log('appointment booked');
            this.go();
        }.bind(this));

    },

    go: function() {

        if(this.isPartyTime) {
            return;
        }

        this.isPartyTime = true;

        request(this.config.arduino + 0, function (error, response, body) {
            setTimeout(function() {
                this.stop();
            }.bind(this), this.partyTimeDuration);
        }.bind(this));

    },

    stop: function() {
        request(this.config.arduino + 1, function (error, response, body) {
            this.isPartyTime = false;
        }.bind(this));
    }
};

wackyInflatableFlailingArmTubeMan.init();