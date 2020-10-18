const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const workItem = require("./models/workitem");
const unitItem = require("./models/unititem");
const categoryItem = require("./models/categoryitem");
const workitem = require("./models/workitem");

let app = express();

app.use(bodyParser.json());

mongoose.connect("mongodb://localhost/remont", { useNewUrlParser: true, useUnifiedTopology: true }).then(
	() => {console.log("Connection to mongoDB successful")},
	(error) => {console.log("Connection to mongoDB failed:"+error)}
);

let db = mongoose.connection;


//app.use(bodyParser.json());

app.get ('/works', function(req, res) {
    workItem.find(function(err, items) {
		if(err){
			return res.status(404).json({"message":"works not found"})
		}
		if(!items) {
			return res.status(404).json({"message":"no works"})
        }
		//console.log(items);
		return res.status(200).json(items);
	})
});

app.post("/works", function(req,res) {
	//console.log(req)
	let item = new workItem({
		workname:req.body.workname,
		description:req.body.description,
		category:req.body.category,
		unit:req.body.unit,
		price:req.body.price

	})
	console.log(item)
	item.save(function(err) {
		if(err) {
			return res.status(409).json({"message":"item not saved"})
		}
		return res.status(200).json({"message":"success"});
	})
});

app.put("/works/:workId", function(req,res) {

	console.log(req.body._id)
	let item = {
		workname:req.body.workname,
		description:req.body.description,
		category:req.body.category,
		unit:req.body.unit,
		price:req.body.price

	}
	//console.log(item)
	workItem.findOne({"_id":req.body._id})
		.then((response) => {
			console.log(response)
			workItem.updateOne({"_id":req.body._id},item,function(err) {
				if(err) {
					return res.status(409).json({"message":"item is not updated"})
				}
				return res.status(200).json({"message":"success"});
			})
		})
	/**/

});

app.delete("/works/:id", function(req,res) {
    workItem.deleteOne({"_id":req.params.id}, function(err) {
		if(err) {
			return res.status(404).json({"message":"not found"});			
		}
		return res.status(200).json({"message":"success"})
	})
});


app.get ('/units', function(req, res) {
    unitItem.find(function(err, items) {
		if(err){
			return res.status(404).json({"message":"units not found"})
		}
		if(!items) {
			return res.status(404).json({"message":"no units"})
        }
		//console.log(items);
		return res.status(200).json(items);
	})
});

app.get ('/categories', function(req, res) {
    categoryItem.find(function(err, items) {
		if(err){
			return res.status(404).json({"message":"categories not found"})
		}
		if(!items) {
			return res.status(404).json({"message":"no categories"})
        }
		//console.log(items);
		return res.status(200).json(items);
	})
});




app.get ('/kuku', function(req, res) {
    res.send('hello kuku');
});

app.get ('/1', function(req, res) {
    res.send('privet papa!');
});

const port = process. env.PORT || 3001;

app.listen(port);
console.log("running in port 3001");
