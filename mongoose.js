//创建Mongoose连接
var mongoose = require('mongoose');
var db = mongoose.createConnection('mongodb://127.0.0.1/NodeJS');

//连接错误
db.on('error', function(error){
	console.log(error);
});

//Schema结构
var mongooseSchema = new mongoose.Schema({
	username : { type : String, default :'匿名用户'},
	title :{ type : String },
	content : { type : String },
	time : { type : Date, default: Date.now },
	age : { type : Number}
});

//添加 mongoose 实例方法
mongooseSchema.methods.findByUserName = function(username, callback){
	return this.model('mongoose').find({ username : username }, callback);
}

//添加 mongoose 静态方法，静态方法在Model层就能使用
mongooseSchema.methods.findByTitle = function(title, callback){
	return this.model('mongoose').find({ title : title }, callback);
}

//model
var mongooseModel = db.model('mongoose', mongooseSchema);

//增加记录 基于 entity 操作
var doc = {
	username : 'entity_demo_username',
	title : 'entity_demo_title',
	content : 'entity_demo_content'
};

var mongooseEntity = new mongooseModel(doc);

mongooseEntity.save(function(err){
	if(err){
		console.log(err);
	} else {
		console.log('Save OK!');
	}

	//关闭数据库连接
	db.close();
});

//增加记录 基于model操作
var doc = {
	username : 'model_demo_username',
	title : 'model_demo_title',
	content : 'model_demo_content'
};

mongooseModel.create(doc, function(err){
	if(err){
		console.log(err);
	} else {
		console.log('save ok!');
	}

	db.close();
});


//修改记录
mongooseModel.update(conditions, update, options, callback);
var conditions = {username : 'model_demo_username'};
var update = {$set : {age : 27, title : 'model_demo_title_update'}};
var options = {upsert : true};

mongooseModel.update(conditions, update, options, function(err){
	if(err){
		console.log(err);
	} else {
		console.log('update ok!');
	}

	//关闭数据库连接
	db.close();
});

//查询
//基于实例方法的查询
var mongooseEntity = new mongooseModel();
mongooseEntity.findByUserName('model_demo_username', function(err, result){
	if(err){
		console.log(err);
	} else {
		console.log(result);
	}

	db.close();
});

//基于静态方法的查询
mongooseModel.findByTitle('entity_demo_title', function(err, result){
	if(err){
		console.log(err);
	} else {
		console.log(result);
	}

	db.close();
});

//mongoose Find方法
var criteria = { title : 'entity_demo_title'};//查询条件
var fields = { title : 1 , content: 1 time : 1}; //待返回的字段
var options = {};

mongooseModel.find(criteria, fields, options, function(err, result){
	if(err){
		console.log(err);
	} else {
		console.log(result);
	}

	db.close();
});

//删除记录
var conditions = {
	username : 'entity_demo_username'
};

mongooseModel.remove(conditions, function(err){
	if(err){
		console.log(err);
	} else {
		console.log('delete ok!');
	}

	db.close();
});
