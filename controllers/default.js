var {
    Pool,
    Client
} = require('pg');
var socketio ;
var _socket;

/*
 * routes control
 */
exports.install = function() {
	F.route('/');
        F.route('/list','list');
        F.route('/balance_sheet','balance_sheet');
        F.route('/bills','bills');
        F.route('/capital_management','capital_management');
        F.route('/customers','customers');
        F.route('/employee_profile','employee_profile');
        F.route('/employees','employees');
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

	
F.on('load',function(){
    /*
     * socket.io configuration
     */
    socketio = require('socket.io').listen(this.server);
    socketio.on('connection',function(socket){
        _socket = socket;
       console.log('new connection has been made');
       _socket.on('fetch_last_10added',fetch_last_10added);
       _socket.on('fetch_all_products',fetch_all_products);
    });
    
});




/*
 * connect to database
 */
var connectionString = 'postgresql://postgres:postgres@localhost/postgres';
var pool = new Pool({
    connectionString: connectionString
});




/*
 * products list page functions
 */
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

























