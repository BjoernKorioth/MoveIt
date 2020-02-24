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

exports.sendNotificationTrophyWin = functions.database.ref('/wins/{userId}').onWrite((event: any, context: any) => {

    //get the userId of the person receiving the notification because we need to get their token
    // console.log("context: ");
    // console.log(context);
    // console.log("event: ");
    // console.log(event);
    const winnerId = context.params.userId;
    console.log("winnerId: ", winnerId);

    //get the token of the user receiving the message
    return admin.database().ref("/users/" + winnerId).once('value').then((snap: { child: (arg0: string) => { (): any; new(): any; val: { (): any; new(): any; }; }; }) => {
        const token = snap.child("token").val();
        console.log("token: ", token);

        //we have everything we need
        //Build the message payload and send the message
        console.log("Construction the notification message.");
        const payload = {
            notification: {
                title: "You reached your goal!",
                body: "Congratulations - you reached your goal!",
                sound: "default",
                click_action: "FCM_PLUGIN_ACTIVITY"
            },
            data: {
                header: "Congratulations!",
                text: "Congratulations! You have reached your goal"
            }
        };
        return admin.messaging().sendToDevice(token, payload)
            .then(function (response: any) {
                console.log("Successfully sent message:", response);
            })
            .catch(function (error: any) {
                console.log("Error sending message:", error);
            });
    });
});

exports.sendNotification = functions.https.onCall((data: any, context: any) => {
    // Message text passed from the client.
    const token = data.token;
    const uid = data.uid;
    const title = data.title || "You reached your goal!";
    const body = data.body || "Congratulations - you reached your goal!";
    const id = data.id || (new Date()).getTime();
    const type = data.type || '';
    // Authentication / user information is automatically added to the request.
    // const uid = context.auth.uid;
    // const name = context.auth.token.name || null;
    // const picture = context.auth.token.picture || null;
    // const email = context.auth.token.email || null;

    const notification = {
        notification: type,
        time: id,
        response: 'negative'
    };
    admin.database().ref('/tracking/' + uid + '/reactions/' + id).set(notification).then(
        (res: any) => console.log(res),
        (err: any) => console.log(err)
    );

    const payload = {
        notification: {
            title: title,
            body: body,
            sound: "default",
            click_action: "FCM_PLUGIN_ACTIVITY"
        },
        data: {
            header: title,
            text: body,
            type: type,
            id: id
        }
    };

    return admin.messaging().sendToDevice(token, payload)
        .then(function (response: any) {
            console.log("Successfully sent message:", response);
        })
        .catch(function (error: any) {
            console.log("Error sending message:", error);
        });

});
