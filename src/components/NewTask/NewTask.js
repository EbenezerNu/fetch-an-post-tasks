import Section from "../UI/Section";
import TaskForm from "./TaskForm";
import useFetch from "../../hooks/use-fetch";

const NewTask = (props) => {
  const enterTaskCallback = (taskText, data) => {
    console.log("New Task : ", taskText);
    const generatedId = data.name; // firebase-specific => "name" contains generated id
    const createdTask = { id: generatedId, text: taskText };
    props.onAddTask(createdTask);
  };

  const { isLoading, error, sendRequest } = useFetch();

  const compiledTask = (taskText) => {
    sendRequest(
      {
        url: "https://react-http-d4113-default-rtdb.firebaseio.com/tasks.json",
        method: "POST",
        body: { text: taskText },
        headers: {
          "Content-Type": "application/json",
        },
      },
      enterTaskCallback.bind(null, taskText)
    );
  };

  return (
    <Section>
      <TaskForm onEnterTask={compiledTask} loading={isLoading} />
      {error && <p>{error}</p>}
    </Section>
  );
};

export default NewTask;
