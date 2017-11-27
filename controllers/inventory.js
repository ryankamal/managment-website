exports.install = function() {
    F.route('/inventory', '/inventory/inventory');
    F.route('/recieve_permission', recieve_permission);
    F.route('/export_permission', export_permission);
    F.route('/destroy_permission', destroy_permission);
    F.route('/return_permission', return_permission);
    F.route('/inventories_reports', '/inventory/inventories_reports');
    F.route('/inventory_new', '/inventory/inventory_new');
};

function recieve_permission(){
    var self = this;
    self.layout('');
    self.view('/inventory/recieve_permission');
}

function export_permission(){
    var self = this;
    self.layout('');
    self.view('/inventory/export_permission');
}

function destroy_permission(){
    var self = this;
    self.layout('');
    self.view('/inventory/destroy_permission');
}

function return_permission(){
    var self = this;
    self.layout('');
    self.view('/inventory/return_permission');
}