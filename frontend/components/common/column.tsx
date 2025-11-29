"use client";

import { Droppable } from "@hello-pangea/dnd";
import { TaskCard } from "./task-card";
import { Task } from "@/hooks/use-tasks";

interface ColumnProps {
  id: string;
  title: string;
  tasks: Task[];
  color: string;
  onDeleteTask: (id: number) => void;
}

export function Column({ id, title, tasks, color, onDeleteTask }: ColumnProps) {
  return (
    <Droppable droppableId={id}>
      {(provided, snapshot) => (
        <div 
          {...provided.droppableProps} 
          ref={provided.innerRef} 
          className={`
            rounded-xl min-h-[500px] p-4 
            ${snapshot.isDraggingOver ? "bg-gray-800" : "bg-gray-800/40"}
          `}
        >
          {/*cabecalho*/}
          <div className="pb-4 flex items-center justify-between">
            <h3 className="text-sm font-medium text-gray-400 flex items-center gap-2">
              <div className={`w-2 h-2 rounded-full ${color}`}></div> {title}
            </h3>
            <span className="text-xs bg-gray-900 text-gray-400 px-2 py-1 rounded-full border border-gray-700">
              {tasks.length}
            </span>
          </div>
          
          {/*lista*/}
          <div className="flex flex-col gap-3">
            {tasks.map((task, index) => (
              <TaskCard 
                key={task.taskId} 
                task={task} 
                index={index} 
                onDelete={onDeleteTask} 
              />
            ))}
            {provided.placeholder}
          </div>
        </div>
      )}
    </Droppable>
  );
}