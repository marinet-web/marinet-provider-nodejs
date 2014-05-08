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
    this.config = config;
}

/**
 * Take the authorization token
 *
 * @param {Function} callback
 * @return {String}
 * @api public
 */
MarineteRestfulProvider.prototype.getToken = function (callback) {
    var param = 'appName=' + this.config.appName + '&appKey=' + this.config.appKey;
    var resource = '/api/account/token?' + param;
    var uri = this.config.rootUrl + resource;

    request(uri, function (err, resp, body) {
        if (err) return console.log(err);
        if (!callback) return body;

        callback(body);
    });
};

/**
 * Logs the error
 *
 * @param {Object} error
 * @api public
 */
MarineteRestfulProvider.prototype.error = function (error) {
    var self = this;
    
    this.getToken(function (tokenKey) {
        var uri = self.config.rootUrl + '/api/error';
        
        var options = {
            url: uri,
            method: 'POST',
            headers: {
                'tokenKey': tokenKey,
                'Content-Type': 'application/json'
            },
            form: {
                AppName: self.config.appName,
                Message: error.message,
                Exception: error.exception,
                CurrentUser: error.user
            }
        };
        
        request(options);
    });
};

/**
 * Expose `MarineteRestfulProvider`.
 */

module.exports = MarineteRestfulProvider;