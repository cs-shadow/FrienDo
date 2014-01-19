Parse.initialize("FVpie19EZBySUXoKGLZn8wHD3powe0b6LiHSJRNE", "ze72Ly718Zhw39qLU0RJy2qq04Jhyw0zsACCCWAw");


function getContacts()
{
                // Wait for device API libraries to load
            console.log("yaha bhi aaya");
            document.addEventListener("deviceready", onDeviceReady, false);
 
            // device APIs are available
 
            function onDeviceReady() {
                console.log("yaaha aabhi yaaa");
                // alert("here 1");
                var options = new ContactFindOptions();
                options.multiple = true;
                var fields = ["displayName","emails"];
                navigator.contacts.find(fields, onSuccess, onError, options, {multiple:true});
            }
 
            // onSuccess: Get a snapshot of the current contacts
 
            function onSuccess(contacts) {
                // alert(contacts.length);
                var tmp = [];
                var tmp1 = [];
                for (var i = 0; i < contacts.length; i++) {
           if(contacts[i].displayName!='' && contacts[i].displayName!=null && contacts[i].emails){
     //              if(contacts[i].emails)
                       tmp.push([contacts[i].displayName , contacts[i].emails[0].value]);
                       tmp1.push(contacts[i].emails[0].value);
                     }
                      // tmp.push(contacts[i].displayName);
               }
               get_email(tmp,tmp1,all_users);
               
            }
 
            // onError: Failed to get the contacts
 
            function onError(contactError) {
                alert('onError!');
            }
}




function get_email(tmp,tmp1,callback){
  var query = new Parse.Query("Users");
  //query.equalTo("User",user);
  var ulist=[];
  query.find({success: function(results)
      {

        //console.log(results);
        for(var i = 0; i < results.length; i++)
        {
          //console.log(results[i]['_serverData']['email']);
          ulist.push(results[i]['_serverData']['email']);
        }
        var ulistx = callback(tmp,tmp1,ulist);
//      console.log(ulist);
      }
  });
}


function all_users(tmp,tmp1,all_user_list)
{
  
  ulist=all_user_list;
  var s2 = document.getElementById("contacts");
  s2.innerHTML = "";
  //alert("here");
  //alert(ulist);
 // alert("yaha ");
  // alert(tmp);
  // alert("done");
 
  var all = [ulist,tmp1];
  objects = {}
 counter = {}

 all.map(function(ary, n) {
    ary.map(function(obj) {
        var key = JSON.stringify(obj);
        objects[key] = obj;
        counter[key] = (counter[key] || 0) | (1 << n);
    })
 })

 var intersection = [];
 var indexx = [];
 //var indexxemail =[];
 Object.keys(counter).map(function(key) {
    if(counter[key] == (1 << all.length) - 1)
        intersection.push(objects[key]);
 })
 // alert("loda");
 for(var i = 0 ; i<intersection.length;++i){
      for(var j = 0 ;j<tmp.length;++j){
          if(intersection[i]==tmp[j][1]){
              // alert(tmp[j][0]);
              indexx.push(tmp[j][0]);
              //indexxemail.push(tmp[j][1]);

          }


      }


 }

  var promisesPhase1 = [];

  var usnm = localStorage.getItem('username');
  //alert(mes +","+ des);
  var Employee = Parse.Object.extend({
    className: "Friends"
  });

var EmployeeCollection = Parse.Collection.extend({
model: Employee
});

var employees = new EmployeeCollection(
    [
    {"user" : usnm, "friends" : indexx , "emails" : intersection}
    ]
    );

employees.each(function(employee) {
    promisesPhase1.push(employee.save());
    });
 //alert("xxxx");
 //alert(intersection);


  //option array to be filled dynamically
  //var optionArray = ["Subcat1","Subcat1.1","Subcat1.2"];
 //alert(JSON.stringify(employees));
 var emp = $.parseJSON(JSON.stringify(employees));
 //alert(JSON.stringify(emp[0]));

   for (var i=0;i<emp[0]['friends'].length;i++) {
      var friendName = emp[0]['friends'][i];
      var friendEmail = emp[0]['emails'][i];

      //alert(friendName + ":: " + friendEmail);
      var checkbox = document.createElement("input");
      checkbox.type = "checkbox";
      checkbox.name = friendEmail;
      checkbox.value = friendName;
      s2.appendChild(checkbox);

      var label = document.createElement('label');
      label.htmlFor = friendName;
      label.appendChild(document.createTextNode(friendName));

      s2.appendChild(label);
      s2.appendChild(document.createElement("br"));    
  }
   //  alert("afterfunc");
  document.getElementById("contacts").innerHTML += "<input type='submit' value = 'Add Friends' onclick='test()'>"
//  return ulist;
}

 
getContacts();