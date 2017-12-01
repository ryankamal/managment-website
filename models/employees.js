NEWSCHEMA('employees').make(function(schema) {
    
        schema.setGet(function(error, model, options, callback) {
            var sql = DB(error);
            
            //sql.debug = true;
               

            if(!options.job_id == ''){
                console.log('job_id',options.job_id);
                sql.query('job_data', "select * from jobs where id = "+options.job_id+" ");
                sql.query('job_files',"select * from job_files where j_id = '"+options.job_id+"' ");
                sql.exec(function(err,response){
                    if(err){
                        console.log(err);
                    }else{
                        console.log('job_files',response.job_files);
                        console.log('job_data',response.job_data);
                    }
                });
                sql.on('end',callback);
            }else{
                sql.query('jobs', "select name,id from jobs ");
                sql.query('employees',"select employees.*, jobs.name as job from employees left outer join jobs on (cast(employees.j_id as numeric) = jobs.id)");
                sql.exec(function(err,response){
                  console.log(response.jobs);
                });
                sql.on('end',callback);
            }

            
        } );
    });