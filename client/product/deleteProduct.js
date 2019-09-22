const client =require('./client')

client.deleteProduct({ id: "d544a8f0-d9f50be459c8" },(error,_) => {
    if(!error){
        console.log('Product is deleted Successfully')
    }
    else{
        console.error(error)
    }

})
