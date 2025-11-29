"use client";

import { Draggable } from "@hello-pangea/dnd";
import { GripVertical, Trash2 } from "lucide-react";
import { Task } from "@/hooks/use-tasks";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

interface TaskCardProps {
  task: Task;
  index: number;
  onDelete: (id: number) => void;
}

export function TaskCard({ task, index, onDelete }: TaskCardProps) {
  //blindagem contra o erro de undefined
  if (!task) return null;

  return (
    <Draggable draggableId={task.taskId.toString()} index={index}>
      {(provided, snapshot) => (
        <div
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          style={{ ...provided.draggableProps.style }}
          className={`
            group relative p-4 rounded-lg border 
            bg-gray-800 border-gray-700
            ${snapshot.isDragging ? "border-blue-500 z-50" : "hover:border-gray-600"}
            ${task.taskCompleted ? "opacity-60 hover:opacity-100 border-transparent bg-transparent" : ""}
          `}
        >
          <div className="flex items-start gap-4">
            {/*icone grip*/}
            <div className="mt-1 text-gray-500 opacity-0 group-hover:opacity-100 transition-opacity">
              <GripVertical size={18} />
            </div>
            
            {/*conteudo*/}
            <div className="flex-1">
              <p className={`font-medium text-sm ${task.taskCompleted ? "text-gray-400 line-through" : "text-gray-200"}`}>
                {task.taskTitle}
              </p>
              {task.taskDescription && (
                <p className="text-xs text-gray-400 mt-2 whitespace-pre-wrap break-words">
                  {task.taskDescription}
                </p>
              )}
            </div>

            {/*modal de confirmacao*/}
            <AlertDialog>
              <AlertDialogTrigger asChild>
                <button 
                  className="text-gray-500 hover:text-red-400 opacity-0 group-hover:opacity-100 transition-opacity"
                  //o stopPropagation eh vital para nao ativar o drag ao clicar
                  onPointerDown={(e) => e.stopPropagation()}
                  onClick={(e) => e.stopPropagation()}
                >
                  <Trash2 size={16} />
                </button>
              </AlertDialogTrigger>
              
              <AlertDialogContent className="bg-gray-900 border-gray-800 text-white">
                <AlertDialogHeader>
                  <AlertDialogTitle>Excluir tarefa?</AlertDialogTitle>
                  <AlertDialogDescription className="text-gray-400">
                    Essa ação é irreversível.
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel className="bg-gray-800 border-gray-700 text-white hover:bg-gray-700 hover:text-white">
                    Cancelar
                  </AlertDialogCancel>
                  <AlertDialogAction 
                    onClick={() => onDelete(task.taskId)}
                    className="bg-red-600 hover:bg-red-700 text-white border-0"
                  >
                    Excluir
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>

          </div>
        </div>
      )}
    </Draggable>
  );
}