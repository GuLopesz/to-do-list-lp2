import { useState, useEffect } from "react";
import { DropResult } from "@hello-pangea/dnd";

export interface Task {
  taskId: number;
  taskTitle: string;
  taskDescription: string;
  taskCompleted: boolean;
}

export function useTasks() {
  const [tasks, setTasks] = useState<Task[]>([]);
  
  //helper para pegar o header
  const getAuthHeader = () => {
    const token = typeof window !== "undefined" ? localStorage.getItem("auth_token") : "";
    return {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${token}`
    };
  };

  //busca tarefas
  const fetchTasks = async () => {
    try {
      const response = await fetch("http://localhost:8080/api/tasks", { headers: getAuthHeader() });
      if (response.ok) {
        const data = await response.json();
        setTasks(data);
      }
    } catch (error) { console.error(error); }
  };

  //cria tarefa
  const createTask = async (title: string, desc: string) => {
    if (!title) return;
    try {
      await fetch("http://localhost:8080/api/tasks", {
        method: "POST",
        headers: getAuthHeader(),
        body: JSON.stringify({ taskTitle: title, taskDescription: desc, taskCompleted: false }),
      });
      fetchTasks();
    } catch (error) { console.error(error); }
  };

  //deleta tarefa
const deleteTask = async (id: number) => {
    try {
      const response = await fetch(`http://localhost:8080/api/tasks/${id}`, { method: "DELETE", headers: getAuthHeader() });
      if (response.ok) setTasks((prev) => prev.filter((t) => t.taskId !== id));
    } catch (error) { console.error(error); }
  };

  //move tarefa (drag and drop logic)
  const moveTask = async (result: DropResult) => {
    const { source, destination, draggableId } = result;

    if (!destination) return;
    if (source.droppableId === destination.droppableId && source.index === destination.index) return;

    const taskId = Number(draggableId);
    const task = tasks.find(t => t.taskId === taskId);
    if (!task) return;

    //se mudou de coluna
    if (source.droppableId !== destination.droppableId) {
      const newStatus = destination.droppableId === "done";
      
      setTasks(prev => prev.map(t => t.taskId === taskId ? { ...t, taskCompleted: newStatus } : t));

      try {
        await fetch(`http://localhost:8080/api/tasks/${taskId}`, {
          method: "PUT",
          headers: getAuthHeader(),
          body: JSON.stringify({
            taskTitle: task.taskTitle,
            taskDescription: task.taskDescription,
            taskCompleted: newStatus,
          }),
        });
      } catch (error) {
        console.error("Erro ao mover:", error);
        fetchTasks(); //reverte se der erro
      }
    }
  };

  useEffect(() => { fetchTasks(); }, []);

  return {
    tasks,
    pendingTasks: tasks.filter(t => !t.taskCompleted),
    completedTasks: tasks.filter(t => t.taskCompleted),
    createTask,
    deleteTask,
    moveTask,
    refreshTasks: fetchTasks
  };
}