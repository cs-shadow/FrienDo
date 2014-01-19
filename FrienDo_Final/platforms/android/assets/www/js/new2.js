Parse.initialize("FVpie19EZBySUXoKGLZn8wHD3powe0b6LiHSJRNE", "ze72Ly718Zhw39qLU0RJy2qq04Jhyw0zsACCCWAw"); 
function send_broadcast()
{
	var promisesPhase1 = [];

	var mes = document.forms["broadcast-form"]["broadcast-form"].value;
	var des = document.forms["broadcast-form"]["text-area"].value;
	var usnm = localStorage.getItem('username');
	//alert(mes +","+ des);
	var Employee = Parse.Object.extend({
className: "Broadcast"
});

var EmployeeCollection = Parse.Collection.extend({
model: Employee
});

var employees = new EmployeeCollection(
		[
		{"Message": mes, "Description": des , "User" : usnm}
		]
		);

employees.each(function(employee) {
		promisesPhase1.push(employee.save());
		});

}

function all_broad()
{
	Parse.initialize("FVpie19EZBySUXoKGLZn8wHD3powe0b6LiHSJRNE", "ze72Ly718Zhw39qLU0RJy2qq04Jhyw0zsACCCWAw");

	var query1=new Parse.Query("Friends");
	var user=localStorage.getItem('username');
	var eemail;
	var query3=new Parse.Query("Users");
	query3.equalTo("Name",user);
	//async:false;
	query3.find({success: function(results)
		{
			eemail=results[0]['_serverData']['email'];
			console.log(eemail);
			first(eemail);
		}
	});



	function first(eemail){


	console.log(eemail);
	var userbroad=[];
	query1.find({success: function(results)
		{
			for(var i=0;i<results.length;i++)
			{
				var abc = results[i]['_serverData']['emails'];
				console.log(abc);
				if(abc.indexOf(eemail) != -1)
					userbroad.push(results[i]['_serverData']['user']);
			}
			console.log(userbroad);
			userbroad.push(user);
			var uniqueNames = [];
			$.each(userbroad, function(i, el){
    		if($.inArray(el, uniqueNames) === -1)
    			 uniqueNames.push(el);
			});
			second(uniqueNames);
		}
	});

	}


	function second(userbroad){
		console.log(userbroad);
		var dlist = [];
		var ulist = [];
		var mlist = [];
		for(var k=0;k<userbroad.length;k++)
		{
			var query = new Parse.Query("Broadcast");
			query.equalTo("User",userbroad[k]);
			var newdiv = document.getElementById('blist');
		//query.equalTo("User",user);
			query.find({success: function(results)
				{
					for(var i = 0; i < results.length; i++)
					{
						mlist = (results[i]['_serverData']['Message']);
						ulist = (results[i]['_serverData']['User']);
						dlist = (results[i]['_serverData']['Description']);
						newdiv.innerHTML += "<li><b>" + mlist + "</b></li>" + dlist + "<br /> - '" + ulist + "'";
						//console.log(mlist[1]);
						//console.log(mlist.length);
					}

					/*for(var i=0; i < mlist.length; i++) 
					{
						newdiv.innerHTML += "<li>" + mlist[i] + "</li>";
					} */
				}
			});
		}

    }
	

    
}

function all_todo()
{
	Parse.initialize("FVpie19EZBySUXoKGLZn8wHD3powe0b6LiHSJRNE", "ze72Ly718Zhw39qLU0RJy2qq04Jhyw0zsACCCWAw");
	
	var query1=new Parse.Query("TodoFriends");
	var user=localStorage.getItem('username');

	var eemail;
	var query3=new Parse.Query("Users");
	query3.equalTo("Name",user);
	//async:false;
	query3.find({success: function(results)
		{
			eemail=results[0]['_serverData']['email'];
			console.log(eemail);
			first(eemail);
		}
	});

	function first(eemail){


	console.log(eemail);
	var usertodo=[];
	query1.find({success: function(results)
		{
			for(var i=0;i<results.length;i++)
			{
				var abc = results[i]['_serverData']['email'];
				console.log(abc);
				if(abc.indexOf(eemail) != -1)
					usertodo.push(results[i]['_serverData']['Name']);
			}
			console.log(usertodo);
			usertodo.push(user);
			var uniqueNames = [];
			$.each(usertodo, function(i, el){
    		if($.inArray(el, uniqueNames) === -1)
    			 uniqueNames.push(el);
			});
			second(uniqueNames);
			console.log(usertodo);
		}
	});

	}

	function second(usertodo){
		console.log(usertodo);
		var dlist = [];
		var ulist = [];
		var mlist = [];
		var list = [];
		for(var k=0;k<usertodo.length;k++)
		{
			var query = new Parse.Query("Todo");
			query.equalTo("User",usertodo[k]);
			var newdiv = document.getElementById('blist-todo');
		//query.equalTo("User",user);
			query.find({success: function(results)
			{
			//console.log(results);
			for(var i = 0; i < results.length; i++)
			{
			ulist = (results[i]['_serverData']['User']);
			dlist = (results[i]['_serverData']['todo']);
			if(results[i]['_serverData']['numval'] == 0)
			{
			uid = (results[i]['id']);
			newdiv.innerHTML += "<input type='checkbox' id = 'li-todo' value = " + uid + " name = " + uid +"> '" + dlist + "'" + ulist + "</input><br />";
			}
			else
			{
			newdiv.innerHTML += "<strike> '" + dlist + "'" + ulist + "</strike><br />";
			}
			}
			}
			});
		}

    }
	
	
	
	//console.log(list);

	//var list = [];
/*	for(var i=0; i < ulist.length; i++) 
	{
		//  list.push(ulist[i]);
	}
*/	//console.log(list);
}

function todo_validate()
{
	$(':checkbox').each(function() {
			if(this.checked)
			{
			var uid = this.value;
			Parse.initialize("FVpie19EZBySUXoKGLZn8wHD3powe0b6LiHSJRNE", "ze72Ly718Zhw39qLU0RJy2qq04Jhyw0zsACCCWAw");
			var query = new Parse.Query("Todo");
			query.equalTo("objectId", uid);
			console.log(query);
			query.first({success: function(results) 
				{
				results.set("numval", 1);
				results.save();
				}
				});
			}
			});
//	window.location.assign('view_todo.html');
}

$( document ).ready(function() {
		$("#broadcast-form").submit(function(e){
			e.preventDefault();
			send_broadcast();
			});
		});

$( document ).ready(function() {
		$("#todo-list").submit(function(e){
			e.preventDefault();
			todo_validate();
			});
		});
