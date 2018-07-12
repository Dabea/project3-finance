var json2csv = require('json2csv');

exports.get = function(req, res) {

	//var fields = Object.keys(Author.schema.obj);
	var fields = [
		'product.productName',
		'product.productStore',
		'product.productDepartment',
		'transaction.transactionDate',
		'transaction.transactionQuantity',
		'transaction.transactionTotal'
	];

	var csv = json2csv({ data: '', fields: fields });

	res.set("Content-Disposition", "attachment;filename=transaction_data.csv");
	res.set("Content-Type", "application/octet-stream");

	res.send(csv);

};