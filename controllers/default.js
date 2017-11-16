
var socketio ;
var _socket;

/*
 * routes control
 */
exports.install = function() {
	F.route('/');
        F.route('/balance_sheet','balance_sheet');
        F.route('/bills','bills');
        F.route('/capital_management','capital_management');
        F.route('/customers','customers');
        F.route('/employee_profile','employee_profile');
        F.route('/employees','employees');
				F.route('/employees2','employees2');
        F.route('/employees_times','employees_times');
        F.route('/expenses','expenses');
        F.route('/income_list','income_list');
        F.route('/inventory','inventory');
        F.route('/licences','licences');
        F.route('/list_library','list_library');
        F.route('/loans','loans');
        F.route('/personal_withdrew','personal_withdrew');
        F.route('/property-rights','property-rights');
        F.route('/purchases','purchases');
        F.route('/sales','sales');
        F.route('/suppliers','suppliers');
        F.route('/treasury','treasury');
        F.route('/vacations','vacations');

	// or
	// F.route('/');
};

/*
F.on('load',function(){
    /*
     * socket.io configuration
     *
    socketio = require('socket.io').listen(this.server);
    socketio.on('connection',function(socket){
        _socket = socket;
       console.log('new connection has been made');
       _socket.on('fetch_last_10added',fetch_last_10added);
       _socket.on('fetch_all_products',fetch_all_products);
       _socket.on('fetch_groups_data',fetch_groups_data);
       _socket.on('update_groupdata',function(group_name){
         update_groupdata(group_name);
         groups_data_chart();
       });
       _socket.on('update_groupdata_only',function(group_name){
         update_groupdata(group_name);
       });
    });

});

*/





/*
 * products list page functions

function fetch_last_10added() {
        const query = "select * from products";
        pool.query(query,(err,res)=>{
            if(err){
                console.log('err on view_list function');
            }else{
                console.log('result',res.rows);
                _socket.emit('fetch_last_10added',res.rows);
            }
        }) ;
    }

function fetch_all_products(){
    const query = "select products.p_id,products.p_name,products.p_group,products.p_price,products.p_cost,products.max,products.max_amount,products.p_created,products.p_quantity,products.p_cost, sum(bills.total_price) as total_sales_cash, sum(bills.amount) as total_sales_amount from products,bills where products.p_id = bills.db_p_id group by products.p_id,products.p_name,products.p_group,products.p_price,products.p_cost,products.max,products.max_amount,products.p_created,products.p_quantity,products.p_cost ";
        pool.query(query,(err,res)=>{
            if(err){
                console.log('err on view_list function');
            }else{
                console.log('result',res.rows);
                _socket.emit('fetch_all_products',res.rows);
            }
        }) ;
}

function fetch_groups_data(){
  const query="select p_out.p_group as name, count(p_out.p_id) as total_products,(select sum(bills.total_price) as total_sales from bills where bills.p_group = p_out.p_group ),max(p_out.p_name) as max,min(p_out.p_name) as min from products p_out group by p_out.p_group";
  pool.query(query,(err,res)=>{
    if(err){
      console.log('err on fetch_groups_data function');
    }else{
      console.log('result',res.rows);
      _socket.emit('fetch_groups_data',res.rows);
    }
  })
}

function update_groupdata(group_name){
  const query = 'SELECT ((select count(*) from products where p_group = $1  )::float/(COUNT(*))) * 100 as percentage, (select sum(total_price) from bills where p_group = $1), (select "name" as heighest_sale from (select "name" , sum(total_price) from bills where p_group = $1 group by "name") as total where sum = (select max(sum) from (select "name" , sum(total_price) from bills where p_group = $1 group by "name") as total)), (select "name" as lowest_sale from (select "name" , sum(total_price) from bills where p_group = $1 group by "name") as total where sum = (select min(sum) from (select "name" , sum(total_price) from bills where p_group = $1 group by "name") as total) limit 1) from products ';
  const values = [""+group_name+""];
  pool.query(query,values,(err,res)=>{
    if(err){
      console.log('err on update_groupdata function',err.stack);
    }else{
      console.log('result',res.rows);
      _socket.emit('update_groupdata',res.rows);
    }
  });

}

function groups_data_chart(){
  const query = "select p_group as label, count(*) as value , (select count(*) as total from products )  from products group by p_group";
  pool.query(query,(err,res)=>{
    if(err){
      console.log('error on groups_data_chart',err.stack);
    }else{
      console.log('result',res.rows);
      _socket.emit('groups_data_chart',res.rows);
    }
  });

}*/
