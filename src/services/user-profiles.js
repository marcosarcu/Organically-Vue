import {getFirestore, updateDoc, setDoc, getDoc, doc, collection,} from "firebase/firestore";
const db = getFirestore();

// Crea un usuario en la base de datos.
export function createUserProfile(uid, {email, displayName = null, photoURL = null}) {
    return setDoc(doc(db, 'users', uid), {
        email,
        displayName,
        photoURL,
    });
}

// Actualiza el perfil de un usuario, si no existe, lo crea.

export function updateUserProfile(uid, {displayName = null, photoURL = null}) {
    updateDoc(doc(db, 'users', uid), {
        displayName,
        photoURL,
    });
}

// Obtiene la información de perfil del usuario.

export async function getUserProfile(uid) {
    const userSnap = await getDoc(doc(db, 'users', uid));
    return {
        id: uid,
        ...userSnap.data(),
    };
}
