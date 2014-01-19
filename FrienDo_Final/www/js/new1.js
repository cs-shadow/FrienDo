Parse.initialize("FVpie19EZBySUXoKGLZn8wHD3powe0b6LiHSJRNE", "ze72Ly718Zhw39qLU0RJy2qq04Jhyw0zsACCCWAw"); 
function signup_validate()
{
  
  var promisesPhase1 = [];
  var uname = document.forms["signup-form"]["username"].value;
  var passwd = document.forms["signup-form"]["password"].value;
  var email = document.forms["signup-form"]["email"].value;
  var Employee = Parse.Object.extend({
      className: "Users"
  });
  var EmployeeCollection = Parse.Collection.extend({
      model: Employee
  });
  var employees = new EmployeeCollection(
      [
      {"Name" : uname, "passwd" : passwd, "email" : email}
      ]
  );
  // Pass 1: Save basic employee information
  employees.each(function(employee) {
      promisesPhase1.push(employee.save());
  });
  console.log(promisesPhase1);
//  alert(promisesPhase1);
} 
function login_validate()
{
    var uname = document.forms["login-form"]["username"].value;
    var passwd = document.forms["login-form"]["password"].value;
    console.log(uname, passwd);
    var query = new Parse.Query("Users");
    query.equalTo("Name",uname);
    query.equalTo("passwd",passwd);
    query.find({success: function(results) {
    console.log(results);
    
    window.localStorage["username"] = results[0]['_serverData']['Name'];
    window.localStorage["password"] = results[0]['_serverData']['passwd']; 
    window.location.assign("submit.html");
    }});
}

$( document ).ready(function() {
    $("#signup-form").submit(function(e){
      e.preventDefault();
      var u = document.forms["signup-form"]["username"].value;
      var p = document.forms["signup-form"]["password"].value;
      var e = document.forms["signup-form"]["email"].value;
      if(u!='' && p!='' && e!='')
      {
        signup_validate();
      }
    });
});

//function deviceReady() {
$( document ).ready(function() 
{
  $("#login-form").on("submit",function(e) 
  {
    e.preventDefault();
    //disable the button so we can't resubmit while we wait
    //$("#login-submit",this).attr("disabled","disabled");
    var u = document.forms["login-form"]["username"].value;
    var p = document.forms["login-form"]["password"].value;
    if(u != '' && p!= '') 
    {  
      login_validate();
    }
  });
});

function logout()
{
    window.localStorage["username"]=null;
    window.localStorage["password"]=null;

  //  var user = localStorage.getItem('username');
  //  var pass = localStorage.getItem('password');

  //  alert(user + " : " + pass);
}

$( document ).ready(function() 
{
  $("#submit-form").on("submit",function(e) 
  {
    e.preventDefault();
    logout();
    //disable the button so we can't resubmit while we wait
    //$("#login-submit",this).attr("disabled","disabled");
    window.location.replace("index.html");
  });
});
