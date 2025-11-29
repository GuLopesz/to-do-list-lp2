"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link"; 
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function RegisterPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    if (password !== confirmPassword) {
      alert("As senhas não coincidem!");
      setIsLoading(false);
      return;
    }

    try {
      //conexao com o backend
      const response = await fetch("http://localhost:8080/users", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          username: username,
          password: password,
        }),
      });

      if (!response.ok) {
        //verifica se o user ja existe
        throw new Error("Erro ao criar conta. O usuário pode já existir.");
      }

      //sucesso
      alert("Conta criada com sucesso!");
      router.push("/");//redireciona para o login

    } catch (error) {
      console.error(error);
      alert("Erro no cadastro. Tente novamente.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex h-screen w-full items-center justify-center bg-gray-900 px-4">
      <Card className="w-full max-w-sm bg-gray-800 border-gray-700 text-white">
        <CardHeader>
          <CardTitle className="text-2xl">Crie sua conta</CardTitle>
          <CardDescription className="text-gray-400">
            Escolha seu usuário e senha.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit}>
            <div className="flex flex-col gap-4">

              <div className="grid gap-2">
                <Label htmlFor="username" className="text-gray-200">Usuário</Label>
                <Input
                  id="username"
                  type="text"
                  placeholder="ex: joao.silva"
                  required
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="bg-gray-700 border-gray-600 text-white placeholder:text-gray-400 focus-visible:ring-offset-gray-800"
                />
              </div>

              <div className="grid gap-2">
                <Label htmlFor="password" className="text-gray-200">Senha</Label>
                <Input 
                  id="password" 
                  type="password" 
                  required 
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="bg-gray-700 border-gray-600 text-white focus-visible:ring-offset-gray-800"
                />
              </div>

              <div className="grid gap-2">
                <Label htmlFor="confirmPassword" className="text-gray-200">Confirmar senha</Label>
                <Input 
                  id="confirmPassword" 
                  type="password" 
                  required 
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className="bg-gray-700 border-gray-600 text-white focus-visible:ring-offset-gray-800"
                />
              </div>

              <Button 
                type="submit" 
                className="w-full mt-2" 
                disabled={isLoading}
              >
                {isLoading ? "Criando conta..." : "Cadastrar"}
              </Button>
            </div>
            
            <div className="mt-4 text-center text-sm text-gray-400">
              Já tem uma conta?{" "}
              <Link href="/" className="underline underline-offset-4 hover:text-white">
                Fazer login
              </Link>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}