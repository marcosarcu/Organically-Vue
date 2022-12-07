import { getAuth, signInWithEmailAndPassword, onAuthStateChanged, signOut, createUserWithEmailAndPassword, updateProfile} from "firebase/auth";
import { updateUserProfile as updateUserProfileDb, createUserProfile, getUserRole }  from "./user-profiles";

const auth = getAuth();

export const ERROR_MESSAGES = {
    'auth/wrong-password': 'La contraseña es incorrecta',
    'auth/user-not-found': 'El usuario no existe',
    'auth/invalid-email': 'El email no es válido',
    'auth/too-many-requests': 'Demasiados intentos fallidos, inténtelo más tarde',
    'empty_fields': 'Todos los campos son obligatorios',
    'passwords_not_match': 'Las contraseñas no coinciden',
    'auth/email-already-in-use': 'El email ya está en uso',
    'auth/weak-password': 'La contraseña debe tener al menos 6 caracteres',
}

// Observadores
let userData = {
    email: null,
    uid: null,
};

if(localStorage.getItem('user') !== null){
    userData = JSON.parse(localStorage.getItem('user'));
}

onAuthStateChanged(auth, (user) => {
    if (user) {
        userData.email = user.email;
        userData.uid = user.uid;
        userData.displayName = user.displayName;
    } else {
        userData.email = null;
        userData.uid = null;
        userData.displayName = null;
    }
    localStorage.setItem('user', JSON.stringify(userData));
    notifyAll();
});
let observers = [];
export function subscribeToAuthChanges(callback) {
    observers.push(callback);
    console.log('Observer added', observers);
    notify(callback);

    return () => {
        observers = observers.filter((obs) => obs !== callback);
        console.log('Observer removed', observers);
    }
}
function notify(callback) {
    callback({...userData});
}
function notifyAll() {
    observers.forEach(callback => notify(callback));
}

// Auth functions
export function logIn(email, password) {
    return signInWithEmailAndPassword(auth, email, password);
}
  
export function logOut() {
    return signOut(auth);
}

export async function register(email, password) {
    const {user} = await createUserWithEmailAndPassword(auth, email, password);
    return createUserProfile(user.uid, {email});
}

// update profile functions
export async function updateUserProfile(displayName) {
    const authPromise = updateProfile(auth.currentUser, {
        displayName,
    });
    // actualiza el perfil en la base de datos
    const dbPromise = updateUserProfileDb(auth.currentUser.uid, {
        displayName,
    });

    await Promise.all([authPromise, dbPromise]);
    userData = {
        ...userData,
        displayName,
    };

    notifyAll();
}

