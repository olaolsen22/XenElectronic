
const express = require('express');
var bodyParser = require('body-parser');
const app = express();
const port = 4000;
var routes = require('./routes');

const swaggerUI = require('swagger-ui-express');
const swaggerFile = require('./swagger.json');

var MongoClient = require('mongodb').MongoClient;
var db;

// Start swagger UI
app.use('/api-documentation', swaggerUI.serve, swaggerUI.setup(swaggerFile));


// Start connection to DB
MongoClient.connect('mongodb+srv://admin:123654@xenelectric-db.cswea.mongodb.net/xenelectric-db', function(err, database) {
	if (err) {
		throw err;
	} else {
		db = database.db('xenelectric-ecommerce');
		console.log("Connected to db!");
	}
});
app.use(function(req, res, next) {
	req.db = db;
	next();
});

// Add body parsers for requests
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));

// Routes
app.get('/health', routes.healthCheck)
app.get('/products', routes.products);
app.get('/shopping-cart', routes.shoppingCart);
app.post('/shopping-cart', routes.addToShoppingCart);
app.put('/shopping-cart/update-product', routes.updateShoppingCart);
app.put('/shopping-cart/update-multiple-products', routes.updateMultipleProducts);

const server = app.listen(port, () => {
	console.log(`XenElectric API listening at http://localhost:${port}`)
})

module.exports = server