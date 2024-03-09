import { useState } from "react";
import { MdSave, MdEdit, MdDelete } from "react-icons/md";
import { useTodoStore } from "./store/store"; // Adjust the path according to your file structure

const App = () => {
  const [input, setInput] = useState("");
  const [editingId, setEditingId] = useState<number | null>(null);
  const [editedText, setEditedText] = useState("");

  const tasks = useTodoStore((state) => state.tasks);
  const addTaskToStore = useTodoStore((state) => state.addTask);
  const deleteTaskFromStore = useTodoStore((state) => state.deleteTask);
  const toggleTaskCompletion = useTodoStore(
    (state) => state.toggleTaskCompletion
  );

  const handleAddTask = () => {
    if (!input) return;
    addTaskToStore(input);
    setInput("");
  };

  const handleUpdateTaskText = (id: number) => {
    // Assuming you have an updateTask method in your store
    // For simplicity, we'll delete and re-add the task as an update here
    deleteTaskFromStore(id);
    addTaskToStore(editedText);
    setEditingId(null);
    setEditedText("");
  };

  return (
    <div className="container mx-auto p-4 flex flex-col items-center justify-center">
      <div className="mb-4 flex">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Add a new task"
          className="border-2 border-gray-200 bg-white h-10 px-5 pr-16 rounded-lg text-sm focus:outline-none"
        />
        <button
          onClick={handleAddTask}
          className="text-white bg-blue-500 hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center ml-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        >
          Add Task
        </button>
      </div>

      <div className="flex flex-col w-full">
        {tasks.map((task) => (
          <div
            key={task.id}
            className="flex items-center justify-between p-4 mb-2 border rounded shadow-sm bg-white"
          >
            {editingId === task.id ? (
              <>
                <input
                  type="text"
                  value={editedText}
                  onChange={(e) => setEditedText(e.target.value)}
                  className="border-b border-gray-300 focus:outline-none focus:border-blue-500"
                />
                <button
                  onClick={() => handleUpdateTaskText(task.id)}
                  className="text-gray-500"
                >
                  <MdSave size={20} />
                </button>
              </>
            ) : (
              <>
                <span
                  className={`${task.isCompleted ? "line-through" : ""}`}
                  onClick={() => toggleTaskCompletion(task.id)}
                >
                  {task.text}
                </span>
                <button
                  onClick={() => {
                    setEditingId(task.id);
                    setEditedText(task.text); // Set initial value of edited text
                  }}
                  className="text-gray-500 mr-2"
                >
                  <MdEdit size={20} />
                </button>
              </>
            )}
            <button
              onClick={() => deleteTaskFromStore(task.id)}
              className="text-red-500"
            >
              <MdDelete size={20} />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default App;
