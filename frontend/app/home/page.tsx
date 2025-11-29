"use client";

import { useState, useEffect } from "react";
import Header from "@/components/common/header";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Plus } from "lucide-react";
import { DragDropContext } from "@hello-pangea/dnd";
import { Column } from "@/components/common/column"; 
import { useTasks } from "@/hooks/use-tasks";

export default function Home() {
  const { pendingTasks, completedTasks, createTask, deleteTask, moveTask } = useTasks();
  
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  
  const [enabled, setEnabled] = useState(false);
  useEffect(() => {
    const animation = requestAnimationFrame(() => setEnabled(true));
    return () => { cancelAnimationFrame(animation); setEnabled(false); };
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await createTask(title, desc);
    setTitle(""); setDesc(""); setIsOpen(false);
  };

  if (!enabled) return null;

  return (
    <div className="min-h-screen bg-gray-900 text-gray-100 font-sans selection:bg-blue-500/30">
      <Header />

      <main className="max-w-6xl mx-auto px-6 py-12">
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-12 gap-6">
          <div>
            <h2 className="text-3xl font-bold text-white tracking-tight">Tarefas</h2>
            <p className="text-gray-400 mt-2 text-sm font-light">Arraste as tarefas e gerencie seu fluxo de trabalho.</p>
          </div>
          
          <Dialog open={isOpen} onOpenChange={setIsOpen}>
            <DialogTrigger asChild>
              <Button className="rounded-full bg-blue-600 hover:bg-blue-500 text-white px-6">
                <Plus size={18} className="mr-2" />Criar Tarefa
              </Button>
            </DialogTrigger>
            <DialogContent className="bg-gray-800 border-gray-700 text-white sm:rounded-2xl">
              <DialogHeader><DialogTitle>Criar tarefa</DialogTitle></DialogHeader>
              <form onSubmit={handleSubmit} className="flex flex-col gap-4 mt-4">
                <Input placeholder="Título..." value={title} onChange={(e) => setTitle(e.target.value)} className="bg-gray-900 border-gray-700 h-11" required />
                <Input placeholder="Descrição..." value={desc} onChange={(e) => setDesc(e.target.value)} className="bg-gray-900 border-gray-700 h-11" />
                <Button type="submit" className="bg-blue-600 hover:bg-blue-500 mt-2 h-11 rounded-lg">Salvar</Button>
              </form>
            </DialogContent>
          </Dialog>
        </div>

        <DragDropContext onDragEnd={moveTask}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 h-full items-start">
            
            <Column 
              id="todo" 
              title="A Fazer" 
              tasks={pendingTasks} 
              color="bg-blue-500"
              onDeleteTask={deleteTask}
            />

            <Column 
              id="done" 
              title="Concluídas" 
              tasks={completedTasks} 
              color="bg-green-500"
              onDeleteTask={deleteTask}
            />

          </div>
        </DragDropContext>
      </main>
    </div>
  );
}