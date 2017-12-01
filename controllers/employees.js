exports.install = function() {
        F.route('/employee_profile','/employees/employee_profile');
        F.route('/employees','/employees/employees');
        F.route('/employees_times','/employees/employees_times');
		F.route('/salaries','/employees/salaries');
		F.route('/bonuses','/employees/bonuses');
		F.route('/reports','/employees/reports');
        F.route('/expenses','/employees/expenses');
        F.route('/vacations','/employees/vacations');
        F.route('/new-job',new_job);
        F.route('/new-employee',new_employee,['*employees']);
        F.route('/new-employee/{job_id}',new_employee,['*employees']);
        F.route('/employees',employees,['*employees']);
};



function new_job(){
    var self = this;
    self.layout('');
    self.view('/employees/new-job');
}

function new_employee(job_id){
    var self = this;
    var options = {};
    options.job_id = job_id;
    self.$get(options,function(err,response){
        self.view('/employees/new-employee',response);
    })
}

function employees(){
    var self = this;
    var options = {};
    self.$get(options,function(err,response){
        self.view('/employees/employees',response);
    })
}
