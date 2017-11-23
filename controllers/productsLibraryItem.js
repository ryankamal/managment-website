exports.install = function() {
    F.route('/productsLibraryItem/{product_id}', fetch_productsLibrary, ['*productsLibraryItem']);
};

function fetch_productsLibrary(product_id) {
    var self = this;
    var options = {product_id : decodeURIComponent(product_id)};
    console.log(options);
    self.$get(options, function(err,response) {
        //self.plain(response);
        self.layout('');
        self.view('/products/productsLibraryItem',response);
    });
}

