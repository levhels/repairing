const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const workItem = require("./models/workitem");
const unitItem = require("./models/unititem");
const categoryItem = require("./models/categoryitem");
const workitem = require("./models/workitem");
const passport = require("passport");
const localStrategy = require("passport-local").Strategy
const session = require("express-session");
const MongoStore = require("connect-mongo")(session);


let app = express();

app.use(bodyParser.json());

mongoose.connect("mongodb://localhost/remont", { useNewUrlParser: true, useUnifiedTopology: true }).then(
	() => {console.log("Connection to mongoDB successful")},
	(error) => {console.log("Connection to mongoDB failed:"+error)}
);

let db = mongoose.connection;

app.use(session({
	name:"working-id",
	resave:false,
	secret:"mySecret",
	saveUninitialized:false,
	cookie:{maxAge:1000*60*60*24},
	store: new MongoStore({
			collection:"session",
			url:"mongodb://localhost/workingsession",
			ttl:24*60*60
	})
}));

app.use(passport.initialize());
app.use(passport.session());
passport.serializeUser(function(user,done) {
	console.log("serializeUser:"+user.username);
	done(null,user._id);
});

passport.deserializeUser(function(id,done) {
	console.log("deserializeUser");
	userModel.findById(id,function(err, user) {
		if(err) {
			return done(err);
		}
		if(!user) {
			return done(null,false);
		}
		return done(null,user);
	});	
});

passport.use("local-login", new localStrategy({
	usernameField:"username",
	passwordField:"password",
	passReqToCallback:true
}, function(req,username,password,done){
	if(!req.body.username || !req.body.password) {
		return done(null,false,"Wrong credentials");
	}
	if(req.body.username.length === 0 || req.body.password.length ===0 ) {
		return done(null,false,"Wrong credentials");
	}
	userModel.findOne({"username":username}, function(err,user) {
		if(err){
			return done(err);
		}
		if(!user) {
			return done(null,false,"Wrong credentials");
		}
		if(isPasswordValid(password,user.password)) {
			let token = createToken();
			req.session.token = token;
			req.session.username= username;
			return done(null,user)
		}
	});
}));

function createSaltedPassword(pw) {
	return bcrypt.hashSync(pw,bcrypt.genSaltSync(8),null);
}

function isPasswordValid(pw,hash) {
	return bcrypt.compareSync(pw,hash);
}

app.post("/login",
passport.authenticate("local-login",{failureRedirect:"/"}),function(req,res) {
	return res.status(200).json({"token":req.session.token})
});

app.post("/logout", function(req,res) {
	if(req.session) {
		req.session.destroy();
	}
	res.status(200).json({"message":"logged out"});
});

app.post("/register", function(req,res) {
	if(!req.body.username || !req.body.password) {
		return res.status(409).json({"message":"provide credentials"})
	}
	if(req.body.username.length ===0 || req.body.password.length ===0) {
		return res.status(409).json({"message":"provide credentials"})		
	}
	let user = new userModel({
		"username":req.body.username,
		"password":createSaltedPassword(req.body.password)
	})
	user.save(function(err) {
		if(err) {
			return res.status(409).json({"message":"username already in use"})
		}
		return res.status(200).json({"message":"success"})
	})
});

function isUserLogged(req,res,next) {
	let token = req.headers.token;
	if(req.isAuthenticated()) {
		return next();
	}
	res.status(403).json({"message":"not allowed"});
}

function createToken() {
	let token = "";
	let letters = "abcdefghijABCDEFGHIJ0123456789"
	for(let i=0;i<1024;i++) {
		let temp = Math.floor(Math.random()*30);
		token = token+letters[temp]
	}
	return token;
}


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
