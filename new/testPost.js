const request = require('request');
const rp = require('request-promise');


describe('isTeenager', function () {
    it('should post request', function (done) {
        var options = {
            method: 'POST',
            uri: ' http://demo4603035.mockable.io/test',
            body: {
                some: 'payload'
            },
            json: true // Automatically stringifies the body to JSON
        };
        
        rp(options)
            .then(function (parsedBody) {
                // POST succeeded...
                console.log(parsedBody)
                done()
            })
            .catch(function (err) {
                console.log('lol you done failed', err)
                done()
            });
    });
});