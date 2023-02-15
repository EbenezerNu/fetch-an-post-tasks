import Section from "../UI/Section";
import TaskForm from "./TaskForm";
import useFetch from "../../hooks/use-fetch";

const NewTask = (props) => {
  const enterTaskCallback = (data) => {
    const generatedId = data.name; // firebase-specific => "name" contains generated id
    const createdTask = { id: generatedId, text: data.name };
    props.onAddTask(createdTask);
  };

  const { isLoading, error, sendRequest } = useFetch(
    {
      url: "https://react-http-d4113-default-rtdb.firebaseio.com/tasks.json",
      method: "POST",
      body: { text: "Hello" },
      headers: {
        "Content-Type": "application/json",
      },
    },
    enterTaskCallback
  );

  return (
    <Section>
      <TaskForm onEnterTask={sendRequest} loading={isLoading} />
      {error && <p>{error}</p>}
    </Section>
  );
};

export default NewTask;
