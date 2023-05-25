import {StompJs, Client} from "@stomp/stompjs";
import SockJS from "sockjs-client";

let stompClient = null

function connect() {
    stompClient = new StompJs.Client({
        brokerURL: 'ws://localhost:8080/game',
        debug: function (str) {
            console.log(str);
        }
    });

    stompClient.onConnect = function (frame) {
        // setConnected(true);
        console.log('Connected: ' + frame);
        stompClient.subscribe('/topic/online', function (messageOutput) {
            resolveOnlineUserMessage(JSON.parse(messageOutput.body));
        });
        stompClient.onStompError = function (frame) {
            // Will be invoked in case of error encountered at Broker
            // Bad login/passcode typically will cause an error
            // Complaint brokers will set `message` header with a brief message. Body may contain details.
            // Compliant brokers will terminate the connection after any error
            console.log('Broker reported error: ' + frame.headers['message']);
            console.log('Additional details: ' + frame.body);
        };
        stompClient.publish({
            destination: "/ws/online",
            body: JSON.stringify({type: "JOIN", userId: "${user.id}", username: "${user.name}"})
        })
    }
    stompClient.activate();
}

function disconnect() {
    if (stompClient != null) {
        stompClient.publish({
            destination: "/ws/online",
            body: JSON.stringify({type: "LEAVE", userId: "${user.id}", username: "${user.name}"})
        })
        stompClient.publish({
            destination: "/topic/lobby/${lobbyId}",
            body: JSON.stringify({type: "LEAVE", userId: "${user.id}", username: "${user.name}"})
        })
        stompClient.deactivate();
    }
    console.log("Disconnected");
}

function sendInvite(recepientId) {
    if (stompClient != null) {
        stompClient.publish({
            destination: "/ws/invite",
            body: JSON.stringify({senderName: "${user.name}", recepientId: recepientId, lobbyId: "${lobbyId}"})
        })
    }
}