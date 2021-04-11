var ObjectId = require('mongodb').ObjectID;

const shoppingCartStatusCodes = ['ACTIVE', 'CANCEL', 'CHECKOUT', 'PAID']

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
	collection.aggregate([
		{
			$lookup: {
				from: 'products',
				localField: 'productId',
				foreignField: '_id',
				as: 'productDetails'
			}
		},
		{
			$match: {
				status: 'ACTIVE'
			}
		}
	]).toArray(function(err, shoppingcCartArray) {
			if (shoppingcCartArray) {
				res.json(shoppingcCartArray);
			}
			else {
				res.send('No products found in shopping cart');
			}
		})
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
			return res.send({
				error_code: 'VALIDATION ERROR',
				message: 'status field is required!'
			})
		} else if (putData.status === 'ACTIVE') {
			if (!putData.quantity) {
				return res.send({
					error_code: 'VALIDATION ERROR',
					message: 'quantity is required when product is still active in shopping cart!'
				})
			}
			if (!putData.quantity) {
				putData.quantity = 1
			}
		} else if (putData.status === 'CANCEL') {
			putData.quantity = 0
		} else if (putData.status !== 'CHECKOUT') {
			return res.send({
				error_code: 'VALIDATION ERROR',
				message: 'Invalid value for shopping cart item status! Valid values are [ACTIVE, CANCEL, CHECKOUT]'
			})
		}
		putData.dateModified = new Date()
	} else {
		return res.send({
			error_code: 'VALIDATION ERROR',
			message: 'productId is required!'
		})
	}
	collection.updateOne(
		{ _id: new ObjectId(putData._id) },
		{
			$set: {
				status: putData.status,
				dateModified: new Date()
			}
		},
		function(err, result) {
		if (err) {
			return res.send({
				error_code: 'SERVER_ERROR',
				message: 'Cannot modify product from shopping cart!'
			});
		}
		else if (!result.result) {
			return res.send({
				error_code: 'DOES_NOT_EXIST',
				message: 'Product does not exist inside shopping cart!'
			});
		} else {
			res.json(result.result)
		}
	});
};

exports.updateMultipleProducts = function(req, res) {
	var db = req.db;
	var collection = db.collection('cart');
	let putData = req.body
	if (!putData.status || !putData.currentStatus) {
		return res.send({
			error_code: 'VALIDATION_ERROR',
			message: `Field "${putData.status ? 'status' : 'currentStatus'}" cannot be empty`
		});
	} else if (shoppingCartStatusCodes.indexOf(putData.status) === -1 || shoppingCartStatusCodes.indexOf(putData.currentStatus) === -1) {
		return res.send({
			error_code: 'VALIDATION_ERROR',
			message: `Invalid status type for '${putData.status ? 'status' : 'currentStatus'}'. Available options are [${shoppingCartStatusCodes}]`
		});
	}
	collection.updateMany(
		{ status: putData.currentStatus },
		{
			$set: {
				status: putData.status,
				dateModified: new Date()
			}
		},
		function(err, result) {
		if (err) {
			return res.send({
				error_code: 'SERVER_ERROR',
				message: 'Cannot checkout products from shopping cart!'
			});
		} else if (result.result.nModified === 0) {
			return res.send({
				error_code: 'EMPTY_SHOPPING_CART',
				message: 'There are no products inside the shopping cart for checkout!'
			});			
		} else {
			res.json(result.result)
		}
	});
};
