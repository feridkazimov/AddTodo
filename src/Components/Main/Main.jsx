import React, { useEffect, useState } from "react";
import "../Main/main.css";
import AddTask from "../AddTask/AddTask";
import {
  collection,
  addDoc,
  getDocs,
  doc,
  updateDoc,
  deleteDoc,
} from "firebase/firestore";
import { db } from "../../firebase/firebase";

function Main() {
  const [todos, setTodos] = useState([]);
  const [newTodo, setNewTodo] = useState("");
  const [isEditing, setIsEditing] = useState(false);
  const [currentTodoId, setCurrentTodoId] = useState(null);
  const [editTodoText, setEditTodoText] = useState("");

  useEffect(() => {
    const fetchTodos = async () => {
      const todoCollection = collection(db, "todos");
      const todoSnapshot = await getDocs(todoCollection);
      // console.log(todoSnapshot.docs.map((a) => a.data()));
      const todoList = todoSnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setTodos(todoList);
    };
    fetchTodos();
  }, []);
  // console.log("todos hatdasan", todos);

  const handleAddTodo = async () => {
    if (newTodo.trim() === "") return;

    const docRef = await addDoc(collection(db, "todos"), {
      text: newTodo,
    });
    setTodos([...todos, { id: docRef.id, text: newTodo }]);
    setNewTodo("");
  };

  const handleEditTodo = (id, text) => {
    setIsEditing(true);
    setCurrentTodoId(id);
    setEditTodoText(text);
  };
  const handleSaveEdit = async () => {
    if (editTodoText.trim() === "") return;
    const todoDoc = doc(db, "todos", currentTodoId);
    await updateDoc(todoDoc, { text: editTodoText });
    setTodos(
      todos.map((todo) =>
        todo.id === currentTodoId ? { ...todo, text: editTodoText } : todo
      )
    );
    setIsEditing(false);
    setCurrentTodoId(null);
    setEditTodoText("");
  };

  const handleCancel = ()=>{
    setIsEditing(false)
  }
  const handleDeleteTodo = async (id) => {
    await deleteDoc(doc(db, "todos", id));
    setTodos(todos.filter((todo) => todo.id !== id));
  };

  return (
    <div>
      <div className="container">
        <h1>Todo</h1>
        <input
          type="text"
          value={newTodo}
          onChange={(e) => setNewTodo(e.target.value)}
        />
        <button onClick={handleAddTodo}>Add Todo</button>
        <ul>
          {todos.map((todo) => (
            <li key={todo.id}>
              {isEditing && currentTodoId === todo.id ? (
                <>
                  <input
                    type="text"
                    value={editTodoText}
                    onChange={(e) => setEditTodoText(e.target.value)}
                  />
                  <button onClick={handleSaveEdit}>Save</button>
                  <button onClick={handleCancel}>Cancel</button>
                </>
              ) : (
                <>
                  <span>{todo.text}</span>
                  <button onClick={() =>handleEditTodo(todo.id, todo.text)}>
                    Edit{" "}
                  </button>
                  <button onClick={() => handleDeleteTodo(todo.id)}>Del</button>
                </>
              )}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default Main;
