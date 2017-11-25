var sql = DB();

exports.install = function() {
    F.route('/products', fetch_products, ['*Products']);
};














function fetch_products() {
    var self = this;
    var options = {};
    self.$get(options, function(err,response) {
        self.view('/products/products', response);
    });
}



