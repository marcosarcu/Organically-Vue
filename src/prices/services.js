import {collection, addDoc, onSnapshot, serverTimestamp, query, orderBy, getDocs} from 'firebase/firestore';
import {db} from '../services/firestore.js';

async function getServices(){
    const servicesCol = collection(db, 'services');
    const servicesSnapshot = await getDocs(servicesCol);
    const servicesList = servicesSnapshot.docs.map(doc => doc.data());
    return servicesList;
};

export {getServices};