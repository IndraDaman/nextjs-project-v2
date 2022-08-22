//import { MongoClient,ObjectId } from "mongodb";
import Layout from "../../components/layout/Layout";
import  MeetupDetail  from "../../components/meetups/MeetupDetail";

function MeetupDetails(props) {
    
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
    // const client = await MongoClient.connect(
    //     "mongodb+srv://Indradaman:wAVBNbvn17L0CQNe@cluster0.ygmucxm.mongodb.net/nextjsprojectv2?retryWrites=true&w=majority"
    //   );
    //   const db = client.db();
    
    //   const meetupCollection = db.collection("meetups");
    //   const meetups=await meetupCollection.find({},{_id:1}).toArray();
    //   client.close();
    const response=await fetch('http://localhost:3000/api/meetup-fb/meetupId-all',{
      method:"GET",
      headers:{
          "Content-Type": "application/json"
      }
    }).then(response => { return response.json()})
    .catch(error => console.log('error', error));
    return{
        fallback:true,
        paths:response.data.map(meetup=>({params:{meetupId:meetup}}))
        
    }
}
export async function getStaticProps(context){
   
    const meetupId=context.params.meetupId;
    
    //fetch data from mongo
    // const client = await MongoClient.connect(
    //     "mongodb+srv://Indradaman:wAVBNbvn17L0CQNe@cluster0.ygmucxm.mongodb.net/nextjsprojectv2?retryWrites=true&w=majority"
    //   );
    //   const db = client.db();

    //   const meetupCollection = db.collection("meetups");
    //   const selectedMeetup = await meetupCollection.findOne({_id: ObjectId(meetupId)});
    //   client.close();
    const response=await fetch('http://localhost:3000/api/meetup-fb/'+meetupId,{
    method:"GET",
    headers:{
        "Content-Type": "application/json"
    }
  }).then(response => { return response.json()});
 
  const userData= {...response.data};
    return {
        props:{
            meetupData:{
                id:userData[0].id,
                title:userData[0].title,
                image:userData[0].image,
                address:userData[0].address,
                description:userData[0].description,
            }
        },
        
    }

}
export default MeetupDetails;
