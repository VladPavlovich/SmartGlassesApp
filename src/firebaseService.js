// src/firebaseService.js

import { firestore } from './firebaseConfig';
import { collection, query, where, getDocs, addDoc, setDoc, doc } from 'firebase/firestore';

export const getContactByName = async (name) => {
    try {
        const q = query(collection(firestore, 'contacts'), where('name', '==', name));
        const querySnapshot = await getDocs(q);
        if (!querySnapshot.empty) {
            const doc = querySnapshot.docs[0];
            return { id: doc.id, ...doc.data() };
        }
        return null;
    } catch (error) {
        console.error("Error getting contact by name:", error);
        return null;
    }
};

export const addContact = async (contact) => {
    try {
        const docRef = await addDoc(collection(firestore, 'contacts'), contact);
        return docRef.id;
    } catch (error) {
        console.error("Error adding contact:", error);
        return null;
    }
};

export const getAllContacts = async () => {
    try {
        const querySnapshot = await getDocs(collection(firestore, 'contacts'));
        const contacts = [];
        querySnapshot.forEach((doc) => {
            contacts.push({ id: doc.id, ...doc.data() });
        });
        return contacts;
    } catch (error) {
        console.error("Error getting all contacts:", error);
        return [];
    }
};

export const updateContact = async (contact) => {
    try {
        await setDoc(doc(firestore, 'contacts', contact.id), contact);
    } catch (error) {
        console.error("Error updating contact:", error);
    }
};
