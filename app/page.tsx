"use client";

import Image from "next/image";
import { useState } from "react";

export default function Home() {
  const [task, setTask] = useState("");
  const [tasks, setTasks] = useState<
    { id: number; text: string; completed: boolean }[]
  >([]);

  function addTask() {
    if (task.trim() === "") {
      return;
    }

    const newTask = {
      id: Date.now(),
      text: task,
      completed: false,
    };

    setTasks([...tasks, newTask]);
    setTask("");
  }

  function toggleTask(id: number) {
    const updatedTasks = tasks.map((t) => {
      if (t.id === id) {
        t.completed = !t.completed;
      }
      return t;
    });
    setTasks([...updatedTasks]);
  }

  function removeTask(id: number) {
    const updatedTasks = tasks.filter((t) => t.id !== id);
    setTasks(updatedTasks);
  }

  return (
    <div className="min-h-screen flex flex-col items-center bg-white text-black">
      <header className="w-full flex justify-center p-4">
        <Image src="/logo.png" alt="Logo" width={50} height={50} />
      </header>

      <main className="flex-1 flex flex-col items-center justify-start pt-12 p-4">
        <h1 className="text-3xl font-bold mb-1">Lista de tarefas</h1>
        <p className="text-gray-600 mb-6">Organize. Priorize. Conclua.</p>

        <div className="flex gap-2 mb-6">
          <input
            type="text"
            value={task}
            onChange={(e) => setTask(e.target.value)}
            placeholder="Qual é sua próxima tarefa?"
            className="px-4 py-2 rounded-full bg-gray-200 outline-none"
          />
          <button
            onClick={addTask}
            className="bg-gray-400 p-2 rounded-full text-white font-bold text-lg transition-transform duration-600 hover:scale-150"
          >
            +
          </button>
        </div>

        <div className="flex flex-col gap-3">
          {tasks.map((t) => (
            <div
              key={t.id}
              className="flex items-center gap-2 rounded-full px-4 py-2 bg-gray-200"
            >
              <button
                onClick={() => toggleTask(t.id)}
                className={`w-5 h-5 rounded-full flex items-center justify-center ${
                  t.completed ? "bg-green-500" : "bg-gray-400"
                }`}
              >
                {t.completed && (
                  <span className="text-white text-xs font-bold">✓</span>
                )}
              </button>
              <span
                onClick={() => toggleTask(t.id)}
                className={`flex-1 cursor-pointer ${
                  t.completed ? "line-through text-gray-500" : ""
                }`}
              >
                {t.text}
              </span>
              <button
                onClick={() => removeTask(t.id)}
                className="text-black font-bold"
              >
                x
              </button>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}
