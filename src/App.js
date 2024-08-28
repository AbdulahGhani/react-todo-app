import { useState, useEffect } from "react";
import "./App.css";

const initalData = localStorage.getItem("task")
  ? JSON.parse(localStorage.getItem("task"))
  : [];

const App = () => {
  const [task, settask] = useState("");
  const [desc, setdesc] = useState("");
  const [maintask, setmaintask] = useState(initalData);

  useEffect(() => {
    const jsonData = JSON.stringify(maintask);
    localStorage.setItem("task", jsonData);
  }, [maintask]);

  const seterror = () => {
    alert("Both task and description are required.");
  };
  const submithandler = (e) => {
    e.preventDefault();
    if (!task || !desc) {
      seterror();
      return;
    }

    //  setmaintask([...maintask, {task, desc}])

    setmaintask((previous) => [...previous, { task, desc }]);

    setdesc("");
    settask("");
  };
  const deleteTask = (index) => {
    // const newTasks = maintask.filter((_, i) => i !== index);
    // setmaintask(newTasks);

    setmaintask((previous) => previous.filter((_, i) => i !== index));
  };

  let rendertask;

  if (maintask.length === 0) rendertask = <h2>No Task Avaliable</h2>;
  else
    rendertask = maintask.map((t, i) => {
      return (
        <div key={i} className="alltask">
          <h4>{t.task}</h4>
          <h4>{t.desc}</h4>
          <button className="del" onClick={() => deleteTask(i)}>
            Delete
          </button>{" "}
          {/* The Delete button */}
        </div>
      );
    });

  return (
    <>
      <h1>My Todo List</h1>
      <form onSubmit={submithandler}>
        <input
          type="text"
          placeholder="Type Your Work"
          value={task}
          onChange={(e) => {
            settask(e.target.value);
          }}
        ></input>
        <input
          type="text"
          placeholder="Describe Your Work"
          value={desc}
          onChange={(e) => {
            setdesc(e.target.value);
          }}
        ></input>

        <button className="add">Add Task</button>
      </form>
      <hr />
      <div className="showtask">
        <ul>{rendertask}</ul>
      </div>
    </>
  );
};

export default App;
