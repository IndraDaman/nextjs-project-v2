import { MongoClient,ObjectId } from "mongodb";
import Layout from "../../components/layout/Layout";
import  MeetupDetail  from "../../components/meetups/MeetupDetail";

function MeetupDetails(props) {
    console.log(props);
  return (
    <Layout>
      <MeetupDetail
        image={props.meetupData.image}
        title={props.meetupData.title}
        address={props.meetupData.address}
        description={props.meetupData.description}
      />
    </Layout>
  );
}
export async function getStaticPaths(){
    const client = await MongoClient.connect(
        "mongodb+srv://Indradaman:wAVBNbvn17L0CQNe@cluster0.ygmucxm.mongodb.net/nextjsprojectv2?retryWrites=true&w=majority"
      );
      const db = client.db();
    
      const meetupCollection = db.collection("meetups");
      const meetups=await meetupCollection.find({},{_id:1}).toArray();
      client.close();
    return{
        fallback:true,
        paths:meetups.map(meetup=>({params:{meetupId:meetup._id.toString()}}))
        
    }
}
export async function getStaticProps(context){
   
    const meetupId=context.params.meetupId;
    
    //fetch data from api
    const client = await MongoClient.connect(
        "mongodb+srv://Indradaman:wAVBNbvn17L0CQNe@cluster0.ygmucxm.mongodb.net/nextjsprojectv2?retryWrites=true&w=majority"
      );
      const db = client.db();

      const meetupCollection = db.collection("meetups");
      const selectedMeetup = await meetupCollection.findOne({_id: ObjectId(meetupId)});
      client.close();
    return {
        props:{
            meetupData:{
                id:selectedMeetup._id.toString(),
                title:selectedMeetup.title,
                image:selectedMeetup.image,
                address:selectedMeetup.address,
                description:selectedMeetup.description,
            }
        },
        
    }

}
export default MeetupDetails;
