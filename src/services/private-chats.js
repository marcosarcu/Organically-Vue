import { getFirestore, doc, getDocs, addDoc, collection, serverTimestamp, query, where, limit, orderBy, onSnapshot, } from "firebase/firestore";
const db = getFirestore();


// Obtener los chats privados entre dos usuarios, si no existen, los crea.

export async function getPrivateChatRef(uid1, uid2) {
    const chatsRef = collection(db, 'private-chats');
    const chatsQuery = query(chatsRef, where('usuarios', '==', {
        [uid1]: true,
        [uid2]: true,
    }), limit(1));
    const chatsSnap = await getDocs(chatsQuery);
    if (chatsSnap.empty) {
        // No existe el chat, lo creamos.
        const chatRef = await addDoc(chatsRef, {
            usuarios: {
                [uid1]: true,
                [uid2]: true,
            },
            messages: {},
        });
        return doc(db, 'private-chats', chatRef.id);
    } else {
        // Existe el chat, lo devolvemos.
        return chatsSnap.docs[0].ref;
    }
}

// Envia un mensaje a un chat privado.

export async function sendPrivateMessage({ uid1, uid2, text }) {
    const chatRef = await getPrivateChatRef(uid1, uid2);
    return addDoc(collection(db, 'private-chats', chatRef.id, 'messages'), {
        text,
        from: uid1,
        created_at: serverTimestamp(),
    });
}

// Subscribe a un chat privado.
export async function subscribeToPrivateChat({ uid1, uid2 }, callback) {
    const chatRef = await getPrivateChatRef(uid1, uid2);
    const queryChat = query(
        collection(db, 'private-chats', chatRef.id, 'messages'),
        orderBy('created_at'),
    );
    return onSnapshot(queryChat, snapshot => {
        const messages = snapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data(),
        }));
        callback(messages);
    });
}
