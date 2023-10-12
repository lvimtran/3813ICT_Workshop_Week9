module.exports = function(db) {
    const collection = db.collection('products');
    const products = [
      { id: 1, name: 'Product 1', description: 'Description 1', price: 10.00, units: 20 },
      // Add more products as needed
    ];
  
    collection.insertMany(products, (err, result) => {
      if (err) throw err;
      console.log('Products added:', result.insertedCount);
    });
  };
  