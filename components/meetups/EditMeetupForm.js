import { useState,useEffect } from "react";

import Card from "../ui/Card";
import classes from "./NewMeetupForm.module.css";

function EditMeetupForm(props) {
  const [ID, setID] = useState(null);
  const [Title, setTitle] = useState("");
  const [Image, setImage] = useState("");
  const [Address, setAddress] = useState("");
  const [Description, setDescription] = useState("");
  useEffect(() => {
    setID(props.id);
    setTitle(props.title);
    setImage(props.image);
    setAddress(props.address);
    setDescription(props.description);
  }, []);
  function submitHandler(event) {
    event.preventDefault();

    const meetupData = {
      id: ID,
      title: Title,
      image: Image,
      address: Address,
      description: Description,
    };

    props.onEditMeetup(meetupData);
  }

  return (
    <Card>
      <form className={classes.form} onSubmit={submitHandler}>
        <div className={classes.control}>
          <label htmlFor="title">Meetup Title</label>
          <input
            type="text"
            required
            id="title"
            defaultValue={props.title}
            onChange={(event) => setTitle(event.target.value)}
          />
        </div>
        <div className={classes.control}>
          <label htmlFor="image">Meetup Image</label>
          <input
            type="url"
            required
            id="image"
            defaultValue={props.image}
            onChange={(event) => setImage(event.target.value)}
          />
        </div>
        <div className={classes.control}>
          <label htmlFor="address">Address</label>
          <input
            type="text"
            required
            id="address"
            defaultValue={props.address}
            onChange={(event) => setAddress(event.target.value)}
          />
        </div>
        <div className={classes.control}>
          <label htmlFor="description">Description</label>
          <textarea
            id="description"
            required
            rows="5"
            defaultValue={props.description}
            onChange={(event) => setDescription(event.target.value)}
          />
        </div>
        <div className={classes.actions}>
          <button>Edit Meetup</button>
        </div>
      </form>
    </Card>
  );
}

export default EditMeetupForm;
