import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
   apiKey: 'AIzaSyClpmaKBA00OGDQVTUSb734WF1mA10Clbg',
   authDomain: 'assessment-review.firebaseapp.com',
   projectId: 'assessment-review',
   storageBucket: 'assessment-review.appspot.com',
   messagingSenderId: '1030924598306',
   appId: '1:1030924598306:web:458dd6b664649d4efc1e7b',
   measurementId: 'G-K3DCXDJH0L',
};

const firebaseApp = initializeApp(firebaseConfig);

const db = getFirestore(firebaseApp);
const auth = getAuth(firebaseApp);

export { db, auth };
