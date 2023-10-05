const admin = require('firebase-admin');
const serviceAccount = require('../tnshoesstore-firebase-adminsdk-i7343-da91775d79.json');

export const vertifyIdToken = (token:any)=>{
    if(!admin.apps.length){
        admin.initializeApp({
            credential:admin.credential.cert(serviceAccount)
        })
    }
    return admin.auth().vertifyIdToken(token).catch();
}
const token = 'YOUR_TOKEN_HERE';
const result = vertifyIdToken(token);

if(result){
    console.log('Token hợp lệ.');
    console.log(result);
}else{
    console.log('Token không hợp lệ.');
}