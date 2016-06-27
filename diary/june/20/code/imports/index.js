var showMessage = require('./mylib');
showMessage('test');

var related = require('./related');

$(window).on('scroll', function (position) {
    if (position > 2000) {
        require.ensure('./related');
    }
});


$('head').append('<script src="http://myserver.com/related/index.js');


