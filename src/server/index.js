const express = require('express');
const app = express();
const router = express.Router();

// Settings
app.set('port', process.env.PORT || 4000);

// Middlewares
app.use(express.json());

// Routes api
app.use('/api/client', require('./routes/client'));
app.use('/api/user', require('./routes/user'));
app.use('/api/sigIn', require('./routes/sigIn'));
app.use('/api/product', require('./routes/product'));
app.use('/api/supplier', require('./routes/supplier'));
app.use('/api/egress', require('./routes/egress'));
app.use('/api/invoice', require('./routes/invoice'));
app.use('/api/itemInvoice', require('./routes/itemInvoice'));
app.use('/api/payment', require('./routes/payment'));
app.use('/api/reports', require('./routes/reports'));
app.use('/api/category', require('./routes/category'));

// Starting the server
app.listen(app.get('port'), () => { 
  console.log(`Server online`);
}); 

module.exports = router;  