NEWSCHEMA('Inventories').make(function(schema) {

        schema.setGet(function(error, model, options, callback) {
            var sql = DB(error);
            if(options.order == 'preview_inventory'){
                /** for example /inventories/2 handling */
                //sql.debug = true;
                sql.query('inventory_data',"select inventories.* , sum(inventories_items.amount::float * inventories_items.price::float) as i_total_value , count(inventories_items.*) as i_total_items, avg(inventories_items.amount::float * inventories_items.price::float) as i_avg_value from inventories,inventories_items where inventories.id = "+options.id+" and inventories.id = inventories_items.i_id group by inventories.id, inventories.i_name,inventories.i_branch,inventories.i_desc,inventories.i_address,inventories.i_color,inventories.i_mobile");
                sql.query('inventory_items',"select * from inventories_items where i_id = "+options.id+"");
                sql.query('inventory_expires',"select * , expiry - NOW() as still from inventories_items where expiry <= NOW() + '5 DAYS'::INTERVAL and i_id = "+options.id+" ");
                sql.query('inventory_latest',"select inventories_items.* , inventory_permissions.type from inventories_items, inventory_permissions where inventories_items.p_id = inventory_permissions.id union select inventory_permissions_items.* , inventory_permissions.type from inventory_permissions_items, inventory_permissions where inventory_permissions_items.p_id = inventory_permissions.id");
                sql.exec(function(err,response){
                    console.log('inventory_data',response.inventory_data);
                    console.log('inventory_items',response.inventory_items);
                    console.log('inventory_expires',response.inventory_expires);
                  
                });
                sql.on('end',callback);
            }else{
            //sql.debug = true;
            sql.query('fetch_inventories',"select * from inventories");
            sql.exec(function(err,response){
              console.log('fetch_inventories',response.fetch_inventories);
            });
            sql.on('end',callback);
            }
            
            
        });
    });




