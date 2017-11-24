var socketio ;
var _socket;
var sql = DB();

exports.install = function() {
    F.route('/productsLibrary', fetch_productsLibrary, ['*productsLibrary']);
};

function fetch_productsLibrary() {
    var self = this;
    var options = {};
    self.$get(options, function(err,response) {
        self.view('productsLibrary', response);
    });
}
