import firebase from 'firebase/app'
import 'firebase/firestore'

const db = firebase.initializeApp({
  apiKey: process.env.VUE_APP_FIREBASE_API_KEY,
  authDomain: process.env.VUE_APP_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.VUE_APP_FIREBASE_PROJECT_ID,
  storageBucket: process.env.VUE_APP_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.VUE_APP_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.VUE_APP_FIREBASE_APP_ID
}).firestore()

const records = db.collection('records')

export function addRecord(score) {
  return records.add(score)
}

export async function hallOfFame() {
  try {
    const snapshot = await records.get()
    let rankings = []
    snapshot.docs.forEach(doc => {
      rankings.push(doc.data())
    })
    return rankings
      .sort((a, b) =>
        a.score > b.score ? 1 : -1
      ).slice(0, 10)
  } catch(err) {
    console.log(err)
  }
}