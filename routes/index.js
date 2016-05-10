
/*
 * GET home page.

 */

var cookieParser = require('cookie-parser');

module.exports = function(server,app,express){
	var counter = 0;
	//var user[] = {'abhi';'avi';'mohan';'raj';'ram';'mohan';'shayam'};

	app.use(cookieParser());
//	app.use(express.bodyParser());

	app.get('/', function(req, res) {
		//req.cookies.check = ++counter;
		res.render('home');
	});

}
