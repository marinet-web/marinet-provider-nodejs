/**
 * Module dependencies.
 */

var request = require('request');

/**
 * `MarineteRestfulProvider` constructor.
 *
 * @param {Object} config
 * @api public
 */

function MarineteRestfulProvider(config) {
    this.config = config || {
        rootUrl: '',
        app: {
            id: '',
            key: ''
        }
    };
}

/**
 * Logs the error
 *
 * @param {Object} error
 * @api public
 */
MarineteRestfulProvider.prototype.error = function (error) {
    var self = this;

    if (!self.config.rootUrl) throw new Error('There is no rootUrl in the config.');
    if (!self.config.app) throw new Error('There is no app in the config.');
    if (!self.config.app.id) throw new Error('Can\'t find app.id property.');
    if (!self.config.app.key) throw new Error('Can\'t find app.key property.');

    var uri = self.config.rootUrl + '/error';

    var options = {
        url: uri,
        method: 'POST',
        headers: {
            'marinetappid': self.config.app.id,
            'marinetappkey': self.config.app.key,
            'Content-Type': 'application/json'
        },
        json: error
    };

    request(options);

};

/**
 * Expose `MarineteRestfulProvider`.
 */

module.exports = MarineteRestfulProvider;
