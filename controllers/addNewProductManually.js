exports.install = function() {
    F.route('/addNewProductManually', addNewProductManually);
};

function addNewProductManually() {
    var self = this;
    var options = {};
    self.layout('');
    self.view('/products/addNewProductManually');
}