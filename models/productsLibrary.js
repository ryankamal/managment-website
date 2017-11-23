NEWSCHEMA('productsLibrary').make(function(schema){
  schema.setGet(function(error, model, options, callback) {
    var sql = DB(error);
    sql.debug = true;
    sql.query('allProducts', "select * from library");
    sql.exec(function(err,response){
      console.log(response.allProducts);
    });
    sql.on('end',callback);
  });
});
