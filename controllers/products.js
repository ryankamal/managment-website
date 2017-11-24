var socketio ;
var _socket;
var sql = DB();

exports.install = function() {
    F.route('/list', fetch_products, ['*Products']);
};


F.on('load',function(){
  /*
   * socket.io configuration
   */
  socketio = require('socket.io').listen(this.server);
  socketio.on('connection',function(socket){
      _socket = socket;
     console.log('new connection has been made');
     groups_data_chart();


     _socket.on('update_groupdata_only',function(group_name){
       update_groupdata(group_name);
     }).on('update_groupdata',function(group_name){
       update_groupdata(group_name);
       //groups_data_chart();
     });


     /* Insert a new product manually */
     _socket.on('insertNewProduct',function(data){
       insertNewProduct(data);
     })
     })
});





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






function fetch_products() {
    var self = this;
    var options = {};
    self.$get(options, function(err,response) {
        self.view('list', response);
    });
}



/* function to insert a new product */
function insertNewProduct(data){
  sql.query('insertNewProduct',"INSERT INTO products (p_name,p_group,p_image) VALUES ('"+data.p_name+"','"+data.p_group+"','"+data.p_img+"') RETURNING p_id");
   sql.exec(function(err,response){
     if(err){
       console.log(err);
     }else{
       console.log('insertNewProduct',response.insertNewProduct[0].p_id);
       /* insert new product sizes */
       for(var i = 0; i < data.p_sizes.length; i++){
         var _data = data.p_sizes[i];
         sql.query('insert sizes',"insert into products_options (name, cost, price , sym, type, product_id) values ('"+_data.p_name+"',"+_data.cost+","+_data.sale+",'"+_data.sym+"','size',"+response.insertNewProduct[0].p_id+")");
         sql.exec(function(err,response){
           if(err){
             console.log(err);
             return;
           }
         });
       }
     }
    
  });
console.log('p_name',data.p_name);
console.log('p_sizes',data.p_sizes);
}