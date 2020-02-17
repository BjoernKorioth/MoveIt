//import * as functions from 'firebase-functions';

// // Start writing Firebase Functions
// // https://firebase.google.com/docs/functions/typescript
//
// export const helloWorld = functions.https.onRequest((request, response) => {
//  response.send("Hello from Firebase!");
// });


let functions = require('firebase-functions');

let admin = require('firebase-admin');

admin.initializeApp(functions.config().firebase);

exports.sendNotificationTrophyWin = functions.database.ref('/wins/{userId}').onCreate((event: { params: { userId: any; }; }) => {
	
	//get the userId of the person receiving the notification because we need to get their token
	const winnerId = event.params.userId;
	console.log("winnerId: ", winnerId);
	
    //get the token of the user receiving the message
    return admin.database().ref("/users/" + winnerId).once('value').then((snap: { child: (arg0: string) => { (): any; new(): any; val: { (): any; new(): any; }; }; }) => {
        const token = snap.child("token").val();
        console.log("token: ", token);
        
        //we have everything we need
        //Build the message payload and send the message
        console.log("Construction the notification message.");
        const payload = {
            data: {
                data_type: "direct_message",
                title: "You won a new Trophy"
            }
        };   
        return admin.messaging().sendToDevice(token, payload)
                    .then(function(response: any) {
                        console.log("Successfully sent message:", response);
                        })
                        .catch(function(error: any) {
                        console.log("Error sending message:", error);
                        });
    });
});
