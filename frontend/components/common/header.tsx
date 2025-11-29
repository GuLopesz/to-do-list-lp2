"use client";

import { useRouter } from "next/navigation";
import { LogOut, CheckSquare } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function Header() {
  const router = useRouter();

  const handleLogout = () => {
    //limpa os dados de acesso
    localStorage.removeItem("auth_token");
    //manda de volta pra tela de login
    router.push("/"); 
  };

  return (
    <header className="w-full bg-black shadow-lg border-b border-blue-600 sticky top-0 z-50">
      <div className="max-w-5xl mx-auto px-6 h-16 flex items-center justify-between">
        
        {/*logo e titulo*/}
        <div className="flex items-center gap-2">
          <div className="bg-blue-600 p-1 rounded">
            <CheckSquare className="text-white" size={20} />
          </div>
          <h1 className="text-xl font-bold text-blue-500 tracking-widest select-none">
            TO-DO-LIST
          </h1>
        </div>

        {/*botao sair*/}
        <Button 
          variant="ghost" 
          onClick={handleLogout}
          className="text-gray-400 hover:text-white hover:bg-gray-800 gap-2 transition-colors"
        >
          <span className="hidden sm:inline">Sair</span>
          <LogOut size={18} />
        </Button>
        
      </div>
    </header>
  );
}