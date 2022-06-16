const admin = require("firebase-admin")

const serviceAccount = require("./firebase-keys.json")

try {
  if (admin.apps.lenght === 0) {
    admin.initializeApp({
      credential: admin.credential.cert(serviceAccount),
    })
  }
} catch (e) {
  console.log("ERROR EN ADMIN.JS:", e)
}

export const firestore = admin.firestore()
