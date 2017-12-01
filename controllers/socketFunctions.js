var socketio ;
var _socket;
var sql = DB();

F.on('load',function(){
   /*
   * socket.io configuration
   */

   
  socketio = require('socket.io').listen(this.server);


  socketio.on('connection',function(socket){
   _socket = socket;
     console.log('new connection has been made');



















     /**
      * for products page
      */

     //groups_data_chart();


     _socket.on('update_groupdata_only',function(group_name){
       update_groupdata(group_name);
     }).on('update_groupdata',function(group_name){
       update_groupdata(group_name);
       //groups_data_chart();
     });


     /* Insert a new product manually */
     _socket.on('insertNewProduct',function(data){
       insertNewProduct(data);
     });






















     /**
      * for products library page
      */

      /* Install a product */
     _socket.on('install_product',function(p_id){
         install_product(p_id);
     });








     /**
      * for Inventory pages
      */
      _socket.on('add_new_inventory',function(data){
        add_new_inventory(data);
      });




      /*
      *for employees page
      */
      _socket.on('submit_new_job',function(data){
        submit_new_job(data);
      }).on('submit_new_employee',function(data){
        submit_new_employee(data);
      });



     });
});


/*****************************************************************************
 * ************* End of socket.io listen events
 *****************************************************************************/
/*****************************************************************************
 * ************* Begin of all functions 
 *****************************************************************************/












     /********************************************************************
      * for products page
      ********************************************************************/

      function groups_data_chart(){

sql.query('productGroupsChart',"select p_group as label, count(*) as value , (select count(*) as total from products )  from products group by p_group");
sql.exec(function(err,response){
  console.log(response.productGroupsChart);
  _socket.emit('groups_data_chart',response.productGroupsChart);
  update_groupdata(response.productGroupsChart[0].label);
});
}


function update_groupdata(group_name){
  console.log('ddddddddddddddddddddddddddddddddd');
  console.log('group_name',group_name);
  sql.query('groupsChartData','SELECT ((select count(*) from products where p_group = $1  )::float/(COUNT(*))) * 100 as percentage, (select sum(total_price) from bills where p_group = $1), (select "name" as heighest_sale from (select "name" , sum(total_price) from bills where p_group = $1 group by "name") as total where sum = (select max(sum) from (select "name" , sum(total_price) from bills where p_group = $1 group by "name") as total)), (select "name" as lowest_sale from (select "name" , sum(total_price) from bills where p_group = $1 group by "name") as total where sum = (select min(sum) from (select "name" , sum(total_price) from bills where p_group = $1 group by "name") as total) limit 1) from products ',[''+group_name+'']);
  sql.exec(function(err,response){
    console.log('groupsChartData',response.groupsChartData);
    _socket.emit('update_groupdata',response.groupsChartData);
  });



}

/* function to insert a new product */
function insertNewProduct(data){
  sql.query('insertNewProduct',"INSERT INTO products (p_name,p_group,p_image,max,max_amount,p_cost,p_price,p_created) VALUES ('"+data.p_name+"','"+data.p_group+"','"+data.p_image+"',"+data.max_time+","+data.max_prepare+","+data.p_cost_price+","+data.p_sale_price+",'"+data.p_created+"') RETURNING p_id");
   sql.exec(function(err,response){
     if(err){
       console.log(err);
       _socket.emit('insertNewProductCallback','failure');
     }else{
       console.log('insertNewProduct',response.insertNewProduct[0].p_id);
       /* insert new product sizes */
       if(data.p_sizes.length > 0){
       for(var i = 0; i < data.p_sizes.length; i++){
         var _data = data.p_sizes[i];
         sql.query('insert sizes',"insert into products_options (name, cost, price , sym, type, product_id) values ('"+_data.name+"',"+_data.cost+","+_data.sale+",'"+_data.sym+"','size',"+response.insertNewProduct[0].p_id+")");
         sql.exec(function(err,response){
           if(err){
             console.log(err);
             return;
           }
         });
       }
       }

       /* insert new product extras */
       if(data.p_extras.length > 0){
       for(var i = 0; i < data.p_extras.length; i++){
         var _data = data.p_extras[i];
         sql.query('insert extras',"insert into products_options (name, cost, price , sym, type, product_id) values ('"+_data.name+"',"+_data.cost+","+_data.sale+",'"+_data.size+"','extra',"+response.insertNewProduct[0].p_id+")");
         sql.exec(function(err,response){
           if(err){
             console.log(err);
             return;
           }
         });
       }
       }
console.log(data.p_extras)
       console.log(data.p_tastes)
       /* insert new product tastes */
       if(data.p_tastes.length > 0){
       for(var i = 0; i < data.p_tastes.length; i++){
         var _data = data.p_tastes[i];
         sql.query('insert tastes',"insert into products_options (name, cost, price , sym, type, product_id) values ('"+_data.name+"','"+_data.cost+"','"+_data.sale+"','"+_data.size+"','taste',"+response.insertNewProduct[0].p_id+")");
         sql.exec(function(err,response){
           if(err){
             console.log(err);
             return;
           }
         });
       }
      }
      _socket.emit('insertNewProductCallback','success');
     }
  });
console.log('p_name',data.p_name);
console.log('p_sizes',data.p_sizes);
}
















     /********************************************************************
      * for productsLiprary page
      ********************************************************************/



      /*************************************
* Install product by Id
********************************************/
function install_product(p_id){

    sql.query('product_data',"select p_name, p_group,p_img from library where p_id = "+p_id+"");
    sql.exec(function(err,response){
        if(err){
            console.log('err on install product',err);
        }else{
            console.log(response.product_data);
            sql.query('Insert_product_data',"insert into products (p_name,p_group,p_image,p_status,lib) values ('"+response.product_data[0].p_name+"','"+response.product_data[0].p_group+"','"+response.product_data[0].p_img+"','lib_susp','true') returning p_id");
            sql.query('product_options',"select name, type from library_options where p_id = '"+p_id+"'");
            sql.exec(function(err,response){
                if(err){
                    console.log('err on insert Product on 2nd query',err);
                }else{
                    console.log('inserted new product data successfully',response.Insert_product_data[0].p_id);
                    console.log(response.product_options.length);
                    for(var i = 0; i < response.product_options.length; i++){
                        console.log('row',response.product_options[i]);
                        sql.query('Insert_product_options',"insert into products_options (name,type,product_id) values ('"+response.product_options[i].name+"','"+response.product_options[i].type+"',"+response.Insert_product_data[0].p_id+")");
                        sql.exec(function(err,response){
                            if(err){
                                console.log('err on insert product options',err);
                            }else{
                                console.log('inserted product options successfully');
                            }
                        });
                    }
                }
            });
        }

    });


}















     /********************************************************************
      * for Inventory pages
      ********************************************************************/

      /**
       * add_new_inventory
       */
      function add_new_inventory(data){
        sql.query('add_new_inventory',"insert into inventories (i_name,i_branch,i_desc,i_color,i_address,i_mobile) values ('"+data.name+"','"+data.branch+"','"+data.desc+"','"+data.color+"','"+data.address+"','"+data.mobile+"')");
        sql.exec(function(err,response){
          if(err){
            console.log(err);
          }else{
            console.log('added new inventory');
          }
        });
      }







      /********************************************************************
      * for employees page
      ********************************************************************/

      function submit_new_job(data){
        console.log(data.desc);
        sql.query('submit_new_job',"insert into jobs (name,\"desc\",hours,salary) values ('"+data.name+"','"+data.desc+"','"+data.hours+"','"+data.salary+"') returning id");
        sql.exec(function(err,response){
          if(err){
            console.log(err);
          }
          else 
          {
            console.log('submmitted new job',response.submit_new_job[0].id);
            //submit job files
            for(var i = 0; i < data.files.length; i++){
              sql.query('submit_job_documents',"insert into job_files (j_id,name) values ("+response.submit_new_job[0].id+",'"+data.files[i]+"')");
              sql.exec(function(err,response){
               if(err){
                 console.log(err);
               }
               else
               {
                 console.log('submmited new job documents');
               }
              });
            }
            //submit job missions
            for(var i = 0; i < data.missions.length; i++){
              sql.query('submit_job_missions',"insert into job_missions (j_id,mission) values ("+response.submit_new_job[0].id+",'"+data.missions[i]+"')");
              sql.exec(function(err,response){
               if(err){
                 console.log(err);
               }
               else
               {
                 console.log('submmited new job missions');
               }
              });
            }
          }
        });
      }


      function submit_new_employee(data){
        sql.query('submit_employee_data',"insert into employees (j_id,name,mobile,gender,religion,city,address,national_id,birth,degree,education) values ('"+data.j_id+"','"+data.name+"','"+data.mobile+"','"+data.gender+"','"+data.religion+"','"+data.city+"','"+data.address+"','"+data.national_id+"','"+data.birth+"','"+data.degree+"','"+data.education+"') returning id");
        sql.exec(function(err,response){
          if(err){
            console.log(err);
          }else{
            console.log('submmitted new employee data',response.submit_employee_data[0].id);
            /**
             * insert employee experiences data
             */
            for(var i = 0; i < data.exps.length; i ++){
              sql.query('submit_employee_exps',"insert into employee_exp (e_id,name,file) values ('"+response.submit_employee_data[0].id+"','"+data.exps[i].name+"','"+data.exps[i].file+"') ");
              sql.exec(function(err,response){
                if(err){
                  console.log(err);
                }else{
                  console.log('submmitted employee experiences');
                }
              });
            }

            /**
             * insert employee files data
             */
            for(var i = 0; i < data.files.length; i ++){
              sql.query('submit_employee_exps',"insert into employee_files (e_id,name,file) values ('"+response.submit_employee_data[0].id+"','"+data.files[i].name+"','"+data.files[i].path+"') ");
              sql.exec(function(err,response){
                if(err){
                  console.log(err);
                }else{
                  console.log('submmitted employee files');
                }
              });
            }
            
          }
        });
      }


