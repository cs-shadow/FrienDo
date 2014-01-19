Parse.initialize("FVpie19EZBySUXoKGLZn8wHD3powe0b6LiHSJRNE", "ze72Ly718Zhw39qLU0RJy2qq04Jhyw0zsACCCWAw");

var ulist = [];
function all_users(all_user_list)
{
	
	ulist=all_user_list;
	console.log(ulist);
}

x(all_users);




function x(callback){
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
			callback(ulist); 
//			console.log(ulist);
			}
	});
}
//console.log(ulist);

