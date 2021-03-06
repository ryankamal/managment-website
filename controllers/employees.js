exports.install = function() {
        F.route('/employee_profile','/employees/employee_profile');
        //F.route('/employees','/employees/employees');
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
        F.route('new_law',new_law);
        F.route('/new_vacation',new_vacation);
        F.route('/new_vacationtype',new_vacationtype);
        F.route('/edit_salary',edit_salary);
        F.route('/new_allowance',new_allowance);
        F.route('/new_incentive',new_incentive);
        F.route('/new_bonus',new_bonus);
        F.route('/new_deduction',new_deduction);
        F.route('/new_emp_bonus',new_emp_bonus);
        F.route('/new_bonus_event',new_bonus_event);
        F.route('/new_standard',new_standard);
        F.route('/new_report',new_report);

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


function new_law(){
    var self = this;
    self.layout('');
    self.view('/employees/new_law');
}


function new_vacation(){
    var self = this;
    self.layout('');
    self.view('/employees/new_vacation');
}


function new_vacationtype(){
    var self = this;
    self.layout('');
    self.view('/employees/new_vacationtype');
}


function edit_salary(){
    var self = this;
    self.layout('');
    self.view('/employees/edit_salary');
}


function new_allowance(){
    var self = this;
    self.layout('');
    self.view('/employees/new_allowance');
}

function new_incentive(){
    var self = this;
    self.layout('');
    self.view('/employees/new_allowance');
}

function new_bonus(){
    var self = this;
    self.layout('');
    self.view('/employees/new_bonus');
}

function new_deduction(){
    var self = this;
    self.layout('');
    self.view('/employees/new_deduction');
}

function new_emp_bonus(){
    var self = this;
    self.layout('');
    self.view('/employees/new_emp_bonus');
}

function new_bonus_event(){
    var self = this;
    self.layout('');
    self.view('/employees/new_bonus_event');
}

function new_standard(){
    var self = this;
    self.layout('');
    self.view('/employees/new_standard');
}

function new_report(){
    var self = this;
    self.layout('');
    self.view('/employees/new_report');
}