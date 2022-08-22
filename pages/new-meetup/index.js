import { useRouter } from "next/router";
import Layout from "../../components/layout/Layout";
import NewMeetupForm from "../../components/meetups/NewMeetupForm";

function NewMeetupPage() {
  const route = useRouter();
 async function addMeetupHandler(enterMeetupData) {
    //console.log(enterMeetupData);
    
    const response=await fetch('/api/new-meetup',{
      method:"POST",
      body:JSON.stringify(enterMeetupData),
      headers:{
          "Content-Type": "application/json"
      }
    });
    const data=await response.json();
    console.log(data);
    route.push('/');
  }
  return (
    <Layout>
      <NewMeetupForm onAddMeetup={addMeetupHandler} />
    </Layout>
  );
}
export default NewMeetupPage;
