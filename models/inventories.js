NEWSCHEMA('Inventories').make(function(schema) {

        schema.setGet(function(error, model, options, callback) {
            var sql = DB(error);
            if(options.order == 'preview_inventory'){
                /** for example /inventories/2 handling */
                sql.debug = true;
                console.log(options.id);
                sql.query('inventory_data',"select inventories.* , sum(inventories_items.amount::float * inventories_items.price::float) as i_total_value , count(inventories_items.*) as i_total_items, round(avg(cast(inventories_items.amount as numeric) * cast(inventories_items.price as numeric))) as i_avg_value from inventories,inventories_items where inventories.id = "+options.id+" and inventories.id = inventories_items.i_id group by inventories.id, inventories.i_name,inventories.i_branch,inventories.i_desc,inventories.i_address,inventories.i_color,inventories.i_mobile ");
                sql.query('values_chart',"select DATE_PART('month',inventories_items.date) as month, lag(sum(cast(inventories_items.price as numeric) * cast(inventories_items.amount as numeric)) ,0) over w as total FROM inventories ,inventories_items where inventories.id = inventories_items.i_id and inventories.id = "+options.id+" group by DATE_PART('month',inventories_items.date) window w as(order by DATE_PART('month',inventories_items.date)) order by DATE_PART('month',inventories_items.date) asc");
                sql.query('outcoming_chart',"select DATE_PART('month',inventory_permissions_items.date) as month, lag(sum(cast(inventory_permissions_items.price as numeric) * cast(inventory_permissions_items.amount as numeric)) ,0) over w as total FROM inventories ,inventory_permissions_items ,inventory_permissions where inventories.id = inventory_permissions_items.i_id and inventory_permissions.i_id = inventories.id and inventories.id = "+options.id+" and inventory_permissions.type = 'outcoming' group by DATE_PART('month',inventory_permissions_items.date) window w as(order by DATE_PART('month',inventory_permissions_items.date)) order by DATE_PART('month',inventory_permissions_items.date) asc ");
                sql.query('incoming_chart',"select DATE_PART('month',inventory_permissions_items.date) as month, lag(sum(cast(inventory_permissions_items.price as numeric) * cast(inventory_permissions_items.amount as numeric)) ,0) over w as total FROM inventories ,inventory_permissions_items ,inventory_permissions where inventories.id = inventory_permissions_items.i_id and inventory_permissions.i_id = inventories.id and inventories.id = "+options.id+" and inventory_permissions.type = 'incoming' group by DATE_PART('month',inventory_permissions_items.date) window w as(order by DATE_PART('month',inventory_permissions_items.date)) order by DATE_PART('month',inventory_permissions_items.date) asc ");
                sql.query('inventory_itemsChange',"select _date, lag(count(inventories_items.*) ,0) OVER w as i_totalitems_change from inventories_items where inventories_items.i_id = "+options.id+" group by inventories_items._date WINDOW w as(ORDER BY _date) order by _date desc limit 1");
                sql.query('inventory_valueChange',"select round((sum(cast(inventories_items.amount as numeric) * cast(inventories_items.price as numeric)))/ (lag(sum(cast(inventories_items.amount as numeric) * cast(inventories_items.price as numeric)), 1) OVER w)   * 100, 1) as i_totalvalue_change from inventories_items where inventories_items.i_id = "+options.id+" group by inventories_items._date WINDOW w as (ORDER BY _date) order by _date desc  limit 2");
                sql.query('inventory_avgChange',"select round( (avg(cast(inventories_items.amount as numeric) * cast(inventories_items.price as numeric))) /(lag(avg(cast(inventories_items.amount as numeric) * cast(inventories_items.price as numeric)), 1) OVER w)  * 100, 1) as i_totalavg_change from inventories_items where inventories_items.i_id = "+options.id+" group by inventories_items._date WINDOW w as (ORDER BY _date) order by _date desc limit 2");
                sql.query('inventory_items',"select id, i_id, p_id,name,size,module,amount,kind,price,seller,to_char(date, 'YYYY-MM-DD') as date,to_char(expiry, 'YYYY-MM-DD') as expiry from inventories_items where i_id = "+options.id+"");
                sql.query('inventory_expires',"select * , expiry - NOW() as still from inventories_items where expiry <= NOW() + '5 DAYS'::INTERVAL and i_id = "+options.id+" ");
                sql.query('inventory_latest',"select inventories_items.id,inventories_items.name,inventories_items.amount,inventories_items.module, to_char(inventories_items.date, 'YYYY-MM-DD HH:MM') as date , inventory_permissions.type from inventories_items, inventory_permissions where inventories_items.i_id = "+options.id+" and inventories_items.p_id = inventory_permissions.id union select inventory_permissions_items.id,inventory_permissions_items.name,inventory_permissions_items.amount,inventory_permissions_items.module, to_char(inventory_permissions_items.date, 'YYYY-MM-DD HH:MM') as date , inventory_permissions.type from inventory_permissions_items, inventory_permissions,inventories_items where inventories_items.i_id = "+options.id+" and inventory_permissions.i_id = "+options.id+" and inventory_permissions_items.p_id = inventory_permissions.id ");
                sql.exec(function(err,response){
                    console.log('inventory_data',response.inventory_data);
                    //console.log('inventory_items',response.inventory_items);
                    //console.log('inventory_expires',response.inventory_expires);
                  
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




