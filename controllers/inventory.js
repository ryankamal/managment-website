exports.install = function() {
    F.route('/inventory', '/inventory/inventory');
    F.route('/recieve_permission', recieve_permission);
};

function recieve_permission(){
    var self = this;
    self.layout('');
    self.view('/inventory/recieve_permission');
}