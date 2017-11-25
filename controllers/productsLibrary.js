var sql = DB();

exports.install = function() {
    F.route('/productsLibrary', fetch_productsLibrary, ['*productsLibrary']);
};

function fetch_productsLibrary() {
    var self = this;
    var options = {};
    self.$get(options, function(err,response) {
        self.view('/products/productsLibrary', response);
    });
}


/*
F.on('load',function(){
  /*
   * socket.io configuration
   *
  socketio = require('socket.io').listen(this.server);
  socketio.on('connection',function(socket){
      _socket = socket;
     console.log('new connection has been made');

     /* Install a product *
     _socket.on('install_product',function(p_id){
         install_product(p_id);
     });
     });
});*/









