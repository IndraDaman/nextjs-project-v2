import { MongoClient } from "mongodb";
async function handler(req, res) {
  if (req.method === "POST") {
    const data = req.body;
    const { title, image, address, description } = data;
    const client = await MongoClient.connect(
      "mongodb+srv://Indradaman:wAVBNbvn17L0CQNe@cluster0.ygmucxm.mongodb.net/nextjsprojectv2?retryWrites=true&w=majority"
    );
    const db = client.db();

    const meetupCollection = db.collection("meetups");
    const result = await meetupCollection.insertOne(data);
    console.log(result);
    client.close();
    res.status(201).json({ message: "meetup insert successfully!" });
  }
}

export default handler;
