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

export default function LoginForm() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    try {
      //bate no endpoint
      const response = await fetch("http://localhost:8080/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          username: username,
          password: password,
        }),
      });

      if (!response.ok) {
        throw new Error("Usuário ou senha inválidos");
      }

      const data = await response.json();
      const token = data.accessToken || data.token || data.jwtValue;
      
      localStorage.setItem("auth_token", token);

      //redireciona para a home
      router.push("/home"); 

    } catch (err) {
      setError("Falha no login. Verifique seus dados.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex h-screen w-full items-center justify-center bg-gray-900 px-4">
      <Card className="w-full max-w-sm bg-gray-800 border-gray-700 text-white">
        <CardHeader>
          <CardTitle className="text-2xl">Login</CardTitle>
          <CardDescription className="text-gray-400">
            Entre com suas credenciais.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit}>
            <div className="flex flex-col gap-6">

              {error && (
                <div className="bg-red-900/50 text-red-200 p-3 rounded text-sm border border-red-800">
                  {error}
                </div>
              )}

              <div className="grid gap-2">
                <Label htmlFor="username" className="text-gray-200">Usuário</Label>
                <Input
                  id="username"
                  type="text"
                  required
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="bg-gray-700 border-gray-600 text-white"
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

              <Button 
                type="submit" 
                className="w-full" 
                disabled={isLoading}
              >
                {isLoading ? "Aguarde..." : "Entrar"}
              </Button>
            </div>
            
            <div className="mt-4 text-center text-sm text-gray-400">
              Não tem uma conta?{" "}
              <Link href="/register" className="underline underline-offset-4 hover:text-white">
                Cadastre-se
              </Link>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}