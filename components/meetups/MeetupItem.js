import { useRouter } from "next/router";
import Card from "../ui/Card";
import classes from "./MeetupItem.module.css";

function MeetupItem(props) {
  const router = useRouter();
  function showDetailsHandler() {
    router.push("/" + props.id);
  }
  function editDetailsHandler() {
    router.push("/edit-meetup/" + props.id);
  }
  function deleteDetailsHandler() {
    deleteMeetupHandler(props.id);
  }
  async function deleteMeetupHandler(id) {
    //console.log(enterMeetupData);
    
    const response=await fetch('/api/meetup-fb/'+id,{
      method:"DELETE",
      headers:{
          "Content-Type": "application/json"
      }
    });
    const data=await response.json();
    console.log(data);
    router.push('/');
  }
  return (
    <li className={classes.item}>
      <Card>
        <div className={classes.image}>
          <img src={props.image} alt={props.title} />
        </div>
        <div className={classes.content}>
          <h3>{props.title}</h3>
          <address>{props.address}</address>
        </div>
        <div className={classes.actions}>
          <button onClick={showDetailsHandler}>Show Details</button>
        </div>
        <div className={classes.actions}>
          <button onClick={editDetailsHandler}>Edit Details</button>
        </div>
        <div className={classes.actions}>
          <button onClick={deleteDetailsHandler}>Delete Details</button>
        </div>
      </Card>
    </li>
  );
}

export default MeetupItem;
