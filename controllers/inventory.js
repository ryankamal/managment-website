exports.install = function() {
    F.route('/inventories/{inventory_id}', preview_inventory, ['*Inventories']);
    F.route('/recieve_permission', recieve_permission);
    F.route('/export_permission', export_permission);
    F.route('/destroy_permission', destroy_permission);
    F.route('/return_permission', return_permission);
    F.route('/inventories_reports', inventories_reports, ['*Inventories_reports']);
    F.route('/inventories', fetch_inventories, ['*Inventories']);
    F.route('/add_new_inventory',add_new_inventory,['*Inventories']);
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


function fetch_inventories(){
    var self = this;
    var options = {};
    self.$get(options, function(err,response) {
        self.view('/inventory/inventories', response);
    });
}

function add_new_inventory(){
    var self = this;
    var options = {};
    self.layout('');
    self.$get(options, function(err,response) {
        self.view('/inventory/add_new_inventory', response);
    });
}

function preview_inventory(inventory_id){
    var self = this;
    var options = {};
    options.order = 'preview_inventory';
    options.id = decodeURIComponent(inventory_id);
    self.$get(options, function(err,response) {
        self.view('/inventory/inventory_view', response);
    });
}

function inventories_reports(){
    var self = this;
    var options = {};
    self.$get(options, function(err,response){
        self.view('/inventory/inventories_reports', response );
    });
}