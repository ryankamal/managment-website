NEWSCHEMA('productsLibraryItem').make(function(schema) {

    schema.setGet(function(error, model, options, callback) {
        console.log('product_id = ',options.product_id);
        var sql = DB(error);
        sql.debug = true;
        sql.query('product_data', "select * from library where p_id = "+options.product_id+"");
        sql.query('product_sizes',"select name from library_options where p_id = '"+options.product_id+"' and type = 'size' ");
        sql.query('product_extras',"select name from library_options where p_id = '"+options.product_id+"' and type = 'extra' ");
        sql.query('product_tastes',"select name from library_options where p_id = '"+options.product_id+"' and type = 'taste' ");
        sql.exec(function(err,response){
          console.log(response.product_data);
          console.log(response.product_sizes);
          console.log(response.product_extras);
          console.log(response.product_tastes);
        });
        sql.on('end',callback);
    });
});