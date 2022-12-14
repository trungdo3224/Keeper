import { useState, useRef } from "react";
import { useDispatch } from "react-redux";
import AddIcon from '@mui/icons-material/Add';
import { addTask } from "../redux/features/taskSlice";
import { toast } from "react-toastify";
import { v4 as uuidv4 } from 'uuid';


function FormAddNote() {
  const dispatch = useDispatch();
  const titleRef = useRef();
  const [note, setNote] = useState({
    id: uuidv4(),
    title: "",
    body: "",
    done: false,
    createdAt: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNote((prevNote) => {
      return {
        ...prevNote,
        [name]: value,
        createdAt: Date.now(),
      };
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // onAdd(note);
    setNote({
      title: "",
      body: "",
    });
    if (note.title !== "") {
      dispatch(addTask(note));
      toast.success("Task added!")
  
      titleRef.current.focus();
    } else {
      toast.warning("Task must have a title");
    }
  };

  return (
    <div className="form-add-note">
      <form>
        <label htmlFor="title">Title:</label>
        <input
          required={true}
          ref={titleRef}
          value={note.title}
          name="title"
          className="title-input"
          placeholder="Add a task..."
          onChange={handleChange}
        ></input>
        <label htmlFor="body">Note:</label>
        <textarea
          required={true}
          value={note.body}
          name="body"
          className="body-input"
          placeholder="Task Description..."
          onChange={handleChange}
        ></textarea>
      </form>
      <button onClick={handleSubmit} className='add-btn'><AddIcon /></button>
    </div>
  );
}

export default FormAddNote;
