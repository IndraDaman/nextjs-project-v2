import { app, database } from "../../../firebase.Config";
import {
    collection,
    addDoc,
    getDocs,
    doc,
    updateDoc,
    deleteDoc,
  } from "firebase/firestore";
async function handler(req, res) {
    const databaseRef = collection(database, "User Details");
    if (req.method === "POST") {
        const data = req.body;

        const result = await addDoc(databaseRef, data);
        res.status(201).json({ message: "meetup insert successfully!" });
        }

}

export default handler