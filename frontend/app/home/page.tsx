"use client";

import Header from '@/components/common/header';
import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-900 text-gray-100 font-sans">
      
      <Header />

      <main className="max-w-5xl mx-auto px-6 py-8">
        
        {/*cabecalho*/}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="text-3xl font-bold text-white">Minhas Tarefas</h2>
            <p className="text-gray-400 mt-1">Gerencie seu dia a dia</p>
          </div>
          
          <Button className="bg-blue-600 hover:bg-blue-700 text-white gap-2">
            <Plus size={20} />
            Nova Tarefa
          </Button>
        </div>

        {/*area da lista de tarefas*/}
        <div className="grid gap-4">
          <div className="p-8 text-center border-2 border-dashed border-gray-700 rounded-lg text-gray-500">
            <p>Sua lista está vazia por enquanto.</p>
          </div>
        </div>

      </main>
    </div>
  );
}