import { app, database } from "../../../firebase.Config";
import {
  collection,
  getDocs,
} from "firebase/firestore";
async function handler(req, res) {   
    const databaseRef = collection(database, "User Details");
    if (req.method === "GET") {
      const result = await getDocs(databaseRef);
      const data = result.docs.map((data) => {
        const internaldata = data.id;
        return internaldata;
      });
      res
        .status(200)
        .json({ message: "meetup get successfully!", data: data });
    }
}
export default handler;