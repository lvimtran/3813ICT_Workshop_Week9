const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(bodyParser.json());

let products = [];
let currentId = 1;

app.get('/products', (req, res) => {
    res.json(products);
});

app.post('/products', (req, res) => {
    const newProduct = req.body;
    newProduct.id = currentId++;
    products.push(newProduct);
    res.json(newProduct);
});

app.put('/products/:id', (req, res) => {
    const { id } = req.params;
    const updatedProduct = req.body;
    
    // Ensure that ID is string, or convert it to the type you need
    const productIndex = products.findIndex(p => p.id == id);
    
    if (productIndex > -1) {
        products[productIndex] = {...updatedProduct, id}; // Maintain the id
        res.json(updatedProduct);
    } else {
        res.status(404).json({ error: 'Product not found' });
    }
  });
  
  app.delete('/products/:id', (req, res) => {
    const { id } = req.params;
    const productIndex = products.findIndex(p => p.id == id);
    
    if (productIndex > -1) {
        const deletedProduct = products.splice(productIndex, 1);
        res.json(deletedProduct);
    } else {
        res.status(404).json({ error: 'Product not found' });
    }
  });
  

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
