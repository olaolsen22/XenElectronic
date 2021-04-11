const test = require('ava');
const request = require('supertest');
const app = require('../index.js');

test('check status', async t => {
    const response = await request(app)
        .get('/health');
    t.is(response.status, 200);
    t.is(response.body.message, 'OK')
})

test('Fetch products list', async t => {
    const response = await request(app)
        .get('/products?productCategory=tv')
    t.is(response.status, 200);
})

test('Fetch shopping cart list', async t => {
    const response = await request(app)
        .get('/shopping-cart')
    t.is(response.status, 200);
})

test('Add product to shopping cart', async t => {
    const response = await request(app)
        .post('/shopping-cart')
        .send({productId: '606ed98c2d895647264c97e2'})
    t.is(response.status, 200);
})


test('Update product to shopping cart', async t => {
    const response = await request(app)
        .put('/shopping-cart/update-product')
        .send(
            {
                _id: '6071d029fb512e6628802963',
                status: 'ACTIVE'
            }
        )
    t.is(response.status, 200);
})

test('Update multiple products to shopping cart', async t => {
    const response = await request(app)
        .put('/shopping-cart/update-multiple-products')
        .send(
            {
                status: 'CANCEL',
                currentStatus: 'ACTIVE'
            }
        )
    t.is(response.status, 200);
})