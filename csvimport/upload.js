// With a database connection and a new POST route configured, parse the CSV file
var csv = require('fast-csv');

var mongoose = require('mongoose');
var Product = require('./product');
 
//  the post function is defined and exported for use by the index.js file

// The function first checks that there is a file contained in the request body. 
// If there is not, an error is returned indicating that a file must be uploaded.
// When a file has been uploaded, a reference to the file is saved to a variable called authorFile.
exports.post = function (req, res) {
    if (!req.files)
        return res.status(400).send('No files were uploaded.');
     
    var productFile = req.files.file;
 
    // authors array that will be populated as the CSV file is parsed.
    // This array will be used to save the data to the database.
    var products = [];
         
    // The fast-csv library is now called by leveraging the fromString function
    // This function accepts the CSV file as a string
    csv
     .fromString(productFile.data.toString(), {
         headers: true,
         ignoreEmpty: true
     })
     .on("data", function(data){
         data['_id'] = new mongoose.Types.ObjectId();
          
         products.push(data);
     })
     .on("end", function(){
         Product.create(products, function(err, documents) {
            if (err) throw err;
         });
          
         res.send(products.length + ' Product have been successfully uploaded.');
     });
};