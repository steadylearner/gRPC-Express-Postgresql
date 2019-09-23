const client =require('./client');

client.deleteProduct({ id: "expensive" },(error, _) => {
    if (!error) {
        console.log('Product is deleted Successfully')
    }
    else {
        console.error(error)
    }
});
