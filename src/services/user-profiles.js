import {getFirestore, updateDoc, setDoc, getDoc, doc, collection, getDocs} from "firebase/firestore";
const db = getFirestore();

// Crea un usuario en la base de datos.
export function createUserProfile(uid, {email, displayName = null, photoURL = null}) {
    return setDoc(doc(db, 'users', uid), {
        email,
        displayName,
        photoURL,
        userRole: 'user',
    });
}

// Actualiza el perfil de un usuario, si no existe, lo crea.

export function updateUserProfile(uid, {displayName = null, photoURL = null}) {
    updateDoc(doc(db, 'users', uid), {
        displayName,
        photoURL,
    });
}

// Obtiene el perfil de un usuario.

export async function getUserRole(uid) {
    const userSnap = await getDoc(doc(db, 'users', uid));
    return userSnap.data().userRole;
}

// Obtiene todos los usuarios.

export async function getUsers() {
    const usersSnap = await getDocs(collection(db, 'users'));
    // add id to each user
    return usersSnap.docs.map(user => ({uid: user.id, ...user.data()}));
}

// Obtiene la información de perfil del usuario.

export async function getUserProfile(uid) {
    const userSnap = await getDoc(doc(db, 'users', uid));
    return {
        uid: uid,
        ...userSnap.data(),
    };
}
