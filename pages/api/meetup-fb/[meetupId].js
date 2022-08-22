import { app, database } from "../../../firebase.Config";
import {
  collection,
  addDoc,
  getDocs,
  doc,
  updateDoc,
  deleteDoc,
  query,
} from "firebase/firestore";
async function handler(req, res) {
  const meetupId = req.query.meetupId;
  const databaseRef = collection(database, "User Details");
  if (req.method === "GET") {
    const result = await getDocs(databaseRef);
    const data = result.docs.map((data) => {
      const internaldata = data.data();
      internaldata.id = data.id;
      return internaldata;
    });
    const userData = {...data.filter((obj) => obj.id == meetupId)};
    res
      .status(201)
      .json({ message: "meetup get successfully!", data: userData });
  } else if (req.method === "POST") {
    let fieldToEdit = doc(database, "User Details", meetupId);
    const data = req.body;
    const result = await updateDoc(fieldToEdit, {
      title: data.title,
      image: data.image,
      address: data.address,
      description: data.description,
    });
    res
    .status(200)
    .json({ message: "meetup update successfully!"});
} else if (req.method === "DELETE") {
    let fieldToDelete = doc(database, "User Details", meetupId);    
    const result = await deleteDoc(fieldToDelete);
    res
    .status(200)
    .json({ message: "meetup deleted successfully!"});
  }
}
export default handler;
