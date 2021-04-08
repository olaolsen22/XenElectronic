
const express = require('express');
const app = express();
const port = 3000;

const swaggerUI = require('swagger-ui-express');
const swaggerFile = require('./swagger.json');

app.use('/api-documentation', swaggerUI.serve, swaggerUI.setup(swaggerFile));

app.listen(port, () => {
  console.log(`XenElectric app listening at http://localhost:${port}`)
})