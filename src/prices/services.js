import {collection, addDoc, onSnapshot, serverTimestamp, query, orderBy, getDocs, getDoc, doc, updateDoc, deleteDoc} from 'firebase/firestore';
import {db} from '../services/firestore.js';

async function getServices(){
    const servicesCol = collection(db, 'services');
    const servicesSnapshot = await getDocs(servicesCol, orderBy('createdAt', 'desc'));
    const servicesList = servicesSnapshot.docs.map(doc => ({id: doc.id, ...doc.data()}));
    return servicesList;
};

async function addService(service){
    const servicesCol = collection(db, 'services');
    const serviceDoc = await addDoc(servicesCol, {
        ...service,
        createdAt: serverTimestamp()
    });
    return serviceDoc;
};

async function getServiceById(id){
    const servicesCol = collection(db, 'services');
    const serviceSnapshot = await getDoc(doc(servicesCol, id));
    const service = serviceSnapshot.data();
    return service;
};

async function updateService(id, service){
    const servicesCol = collection(db, 'services');
    const serviceDoc = doc(servicesCol, id);
    return await updateDoc(serviceDoc, service);
};

async function deleteService(id){
    const servicesCol = collection(db, 'services');
    const serviceDoc = doc(servicesCol, id);
    return await deleteDoc(serviceDoc);
};

export {getServices, addService, getServiceById, updateService, deleteService};