var connection =  new require('./kafka/Connection');

var Login = require('./services/login.js');
var Signup = require('./services/signup.js');
var OwnerLogin = require('./services/ownerlogin.js');
var OwnerSignup = require('./services/ownersignup.js');
var PostProperty = require('./services/postproperty.js');
var UpdateProfile = require('./services/updateprofile.js');
var GetProfile = require('./services/getprofile.js');
var PropertyDetails = require('./services/propertydetails.js');
var BookProperty = require('./services/bookproperty.js');
var Dashboard = require('./services/dashboard.js');
var OwnerDashboardProps = require('./services/ownerdashboardprops.js');
var OwnerDashboardBookings = require('./services/ownerdashboardbookings.js');
var SearchResults = require('./services/searchresults.js');
var SendMessage = require('./services/sendmessage.js');
var DisplayMessages = require('./services/displaymessages.js');
var GetUserAccess = require('./services/getuseraccess.js');


function handleTopicRequest(topic_name,fname){
  
    var consumer = connection.getConsumer(topic_name);
    var producer = connection.getProducer();
    console.log('server is running ');
    consumer.on('message', function (message) {
  
        console.log('message received for ' + topic_name +" ", fname);
       console.log(JSON.stringify(message.value));
    
        var data = JSON.parse(message.value);
        
        fname.handle_request(data.data, function(err,res){
        
            var payloads = [
                { topic: data.replyTo,
                    messages:JSON.stringify({
                        correlationId:data.correlationId,
                        data : res
                    }),
                    partition : 0
                }
            ];
            producer.send(payloads, function(err, data){
                console.log("Data: ",data);
            });
            return; 
        });
  
    });

}

handleTopicRequest("login",Login);
handleTopicRequest("signup",Signup);
handleTopicRequest("ownerlogin",OwnerLogin);
handleTopicRequest("ownersignup",OwnerSignup);
handleTopicRequest("postproperty",PostProperty);
handleTopicRequest("updateprofile",UpdateProfile);
handleTopicRequest("getprofile",GetProfile);
handleTopicRequest("propertydetails",PropertyDetails);
handleTopicRequest("bookproperty",BookProperty);
handleTopicRequest("dashboard",Dashboard);
handleTopicRequest("ownerdashboard_props",OwnerDashboardProps);
handleTopicRequest("ownerdashboard_bookings",OwnerDashboardBookings);
handleTopicRequest("searchresults",SearchResults);
handleTopicRequest("sendmessage",SendMessage);
handleTopicRequest("displaymessages",DisplayMessages);
handleTopicRequest("getuseraccess",GetUserAccess);

