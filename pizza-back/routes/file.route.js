let csv = require('fast-csv');
    mongoose = require('mongoose');
    express = require("express"),
    router = express.Router();

let pizzaSchema = require("../models/Pizza");

router.post = ("/sendPizza", (req, res, next) =>{
    if (!req.files)
        return res.status(400).send('No files were uploaded.');
	
	var authorFile = req.files.file;
	var authors = [];
		
	csv
	 .fromString(authorFile.data.toString(), {
		 headers: true,
		 ignoreEmpty: true
	 })
	 .on("data", function(data){
		 data['_id'] = new mongoose.Types.ObjectId();
		 
		 authors.push(data);
	 })
	 .on("end", function(){
		 pizzaSchema.create(authors, function(err, documents) {
			if (err) throw err;
		 });
		 
		 res.send(authors.length + ' authors have been successfully uploaded.');
	 });
});

module.exports = router;