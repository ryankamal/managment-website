



NEWSCHEMA('Products').make(function(schema) {

    schema.setGet(function(error, model, options, callback) {
        var sql = DB(error);
        sql.debug = true;
        sql.query('last10products', "select * from products limit 10 ");
        sql.query('allProducts',"select products.p_id,products.p_name,products.p_group,products.p_price,products.p_cost,products.max,products.max_amount,products.p_created,products.p_quantity,products.p_cost, sum(bills.total_price) as total_sales_cash, sum(bills.amount) as total_sales_amount from products left outer join bills on products.p_id = bills.db_p_id group by products.p_id,products.p_name,products.p_group,products.p_price,products.p_cost,products.max,products.max_amount,products.p_created,products.p_quantity,products.p_cost ");
        sql.query('productGroups',"select p_out.p_group as name, count(p_out.p_id) as total_products,(select sum(bills.total_price) as total_sales from bills where bills.p_group = p_out.p_group ),max(p_out.p_name) as max,min(p_out.p_name) as min from products p_out group by p_out.p_group");
        sql.query('productGroupsChart',"select p_group as label, count(*) as value , (select count(*) as total from products )  from products group by p_group");
        sql.exec(function(err,response){
          console.log(response.last10products);
          console.log(response.all_products);
          console.log(response.productGroups);
          console.log(response.productGroupsChart);
        });
        sql.on('end',callback);
    });
});
