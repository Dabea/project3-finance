var mongoose = require('mongoose');

var productSchema = mongoose.Schema({


    Receipt: {
        Items: [{
            Product: {
                
                name: {
                type: String,
                required: true,
                },
                quantity: {
                    type: String,
                    required: true
                },
                cost: {
                    type: String,
                    required: true
                },
                category: {
                    type: String,
                    required: true
                }
        }
    }
    ], 

    Date: {
        type: Date,
        default: Date.now
    },

    Store: {
        type: String,
        required: true

    },

    Total: {
        type: String,
        required: true

    }, 





    }
    // product: {
	// 	productName: {
	// 		type: String,
	// 		required: true
    //     },
    //     productStore: {
    //         type: String,
    //     },
    //     productDepartment: { 
    //         type: String
    //     }

        
	// },
	// transaction:{
    //     transactionDate:{
    //         type: Date,
    //         default: Date.now
    //     },
    //     transactionQuantity: {
    //         type: String
    //     },
    //     transactionTotal: {
    //         type: String,
    //     },
    // }
});

var Product = mongoose.model('Product', productSchema);

module.exports = Product;