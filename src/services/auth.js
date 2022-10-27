import { getAuth, signInWithEmailAndPassword, onAuthStateChanged, signOut, createUserWithEmailAndPassword} from "firebase/auth";

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
onAuthStateChanged(auth, (user) => {
    if (user) {
        userData.email = user.email;
        userData.uid = user.uid;
        // console.log(userData);
    } else {
        userData.email = null;
        userData.uid = null;
        // console.log(userData);
    }
    notifyAll();
});
let observers = [];
export function subscribeToAuthChanges(callback) {
    observers.push(callback);
    notify(callback);
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

export function register(email, password) {
    return createUserWithEmailAndPassword(auth, email, password)
}