//import { MongoClient } from "mongodb";
import { useEffect, useState } from "react";
import Layout from "../components/layout/Layout";
import MeetupList from "../components/meetups/MeetupList";

const DUMMY_MEETUPS = [
  {
    id: "m1",
    title: "A first meetup",
    image:
      "https://cdn.theatlantic.com/thumbor/t_SUTY6eiMNjB5_jOvdz8Cv0mFA=/0x0:1920x1080/976x549/media/img/mt/2015/05/man/original.jpg",
    address: "Some address 5/3",
    description: "Some description",
  },
  {
    id: "m2",
    title: "A second meetup",
    image:
      "https://akns-images.eonline.com/eol_images/Entire_Site/2017030/rs_1024x759-170130182221-rs_1024x759-160324154853-560-batman.jpg",
    address: "Some address 10/3",
    description: "Some description",
  },
];

function HomePage(props) {
 
  // const [loaderMeetups,setLoaderMeetups] = useState();
  // useEffect(()=>{
  //     setLoaderMeetups(DUMMY_MEETUPS);
  // },[]);
  return (
    <Layout>
      <MeetupList meetups={props.meetups} />
    </Layout>
  );
}
// export async function getServerSideProps(context){
//     const req= context.req;
//     const res= context.res;
//     //fetch data from api
//     return {
//         props:{
//             meetups:DUMMY_MEETUPS
//         }
//     }
// }

export async function getStaticProps() {
  //fetch data from mongo
  // const client = await MongoClient.connect(
  //   "mongodb+srv://Indradaman:wAVBNbvn17L0CQNe@cluster0.ygmucxm.mongodb.net/nextjsprojectv2?retryWrites=true&w=majority"
  // );
  // const db = client.db();

  // const meetupCollection = db.collection("meetups");
  // const meetups=await meetupCollection.find().toArray();
  // client.close();
  const response=await fetch('http://localhost:3000/api/meetup-fb/meetup-all',{
    method:"GET",
    headers:{
        "Content-Type": "application/json"
    }
  }).then(response => { return response.json()})
  .catch(error => console.log('error', error));

  return {
    props: {
      meetups: response.data.map((meetup,i)=>({
        title:meetup.title,
        image:meetup.image,
        address:meetup.address,
        description:meetup.description,
        id:meetup.id.toString(),
      })),
    },
    revalidate: 1,
  };
}
export default HomePage;
