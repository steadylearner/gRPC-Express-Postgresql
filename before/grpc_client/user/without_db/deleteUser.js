const client =require('../client')

client.deleteUser({ id: "steadylearner" },(error,_) => {
    if(!error){
        console.log('User is deleted Successfully')
    }
    else{
        console.error(error)
    }

})
