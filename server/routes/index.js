var ObjectId = require('mongodb').ObjectID;

exports.products = function(req, res) {
	var db = req.db;
	var collection = db.collection('products');
	var productCategory = req.query.productCategory;
	collection.find(
		{ 'productCategory': productCategory}
	).toArray(function(err, productsArray) {
		if (productsArray) {
			res.json(productsArray);
		}
		else {
			res.send('No products found');
		}
	});
};

exports.shoppingCart = function(req, res) {
	var db = req.db;
	var collection = db.collection('cart');
	collection.find(
		{ 'status': 'ACTIVE' }
	).toArray(function(err, shoppingcCartArray) {
		if (shoppingcCartArray) {
			res.json(shoppingcCartArray);
		}
		else {
			res.send('No products found in shopping cart');
		}
	});
};

exports.addToShoppingCart = function(req, res) {
	var db = req.db;
	var collection = db.collection('cart');
	let postData = req.body
	if (postData.productId) {
		postData.productId = new ObjectId(postData.productId)
		postData.status = 'ACTIVE'
		postData.dateModified = new Date()
		if (!postData.quantity) {
			postData.quantity = 1
		}
	} else {
		res.send({
			error_code: 'VALIDATION ERROR',
			message: 'productId is required!'
		})
		return
	}
	
	collection.insertOne(
		postData,
		{ upsert: true },
		function(error, result) {
			if (error) {
				res.render('error', {
					message: 'Add product to shopping cart failed!'
				});
			}
			else {
				res.json(result.ops);
			}
	});
};

exports.updateShoppingCart = function(req, res) {
	var db = req.db;
	var collection = db.collection('cart');
	let putData = req.body
	if (putData._id) {
		putData._id = new ObjectId(putData._id)
		if (!putData.status) {
			res.send({
				error_code: 'VALIDATION ERROR',
				message: 'status field is required!'
			})
			return
		} else if (putData.status === 'ACTIVE') {
			if (!putData.quantity) {
				res.send({
					error_code: 'VALIDATION ERROR',
					message: 'quantity is required when product is still active in shopping cart!'
				})
				return
			}
			if (!putData.quantity) {
				putData.quantity = 1
			}
		} else if (putData.status === 'CANCEL') {
			putData.quantity = 0
		} else if (putData.status !== 'CHECKOUT') {
			res.send({
				error_code: 'VALIDATION ERROR',
				message: 'Invalid value for shopping cart item status! Valid values are [ACTIVE, CANCEL, CHECKOUT]'
			})
			return
		}
		putData.dateModified = new Date()
	} else {
		res.send({
			error_code: 'VALIDATION ERROR',
			message: 'productId is required!'
		})
		return
	}
	collection.findOneAndUpdate(
		{ '_id': `"${putData._id}"` },
		{
			$set: {
				quantity: putData.quantity,
				status: putData.status,
				dateModified: new Date()
			}
		},
		{ 
			new: true,
			upsert: false, 
			returnOriginal: false 
		},
		function(err, result) {
		if (err) {
			return res.send({
				error_code: 'SERVER_ERROR',
				message: 'Cannot add product to shopping cart!'
			});
		}
		else if (!result.value) {
			return res.send({
				error_code: 'DOES_NOT_EXIST',
				message: 'Product does not exist inside shopping cart!'
			});
		} else {
			res.json(result.value)
		}
	});
};
