// client/src/pages/Register.tsx

import { useState } from 'react';
// Adaptez ces chemins d'importation si nécessaire
import { Button } from "@/components/ui/button"; 
import { Input } from "@/components/ui/input"; 
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"; 

export default function Register() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setMessage('Enregistrement en cours...');
    setError('');

    try {
      // NOTE IMPORTANTE : L'API est sur le port 3001
      const response = await fetch('http://localhost:3001/api/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name, email, password }),
      });

      const data = await response.json();

      if (response.ok) {
        setMessage(data.message);
        setName('');
        setEmail('');
        setPassword('');
      } else {
        setError(data.error || 'Erreur inconnue lors de l\'inscription.');
        setMessage('');
      }
    } catch (err) {
      setError("Impossible de contacter le serveur. Assurez-vous que l'API Node.js est lancée sur le port 3001.");
      setMessage('');
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gbeto-surface">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle className="text-2xl text-center">Créer un compte Danxomɛ</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleRegister} className="space-y-4">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700">Nom (Optionnel)</label>
              <Input 
                id="name"
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <div>
              <label htmlFor="email">Email *</label>
              <Input
                id="email"
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div>
              <label htmlFor="password">Mot de passe *</label>
              <Input
                id="password"
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            
            <Button type="submit" className="w-full bg-gbeto-gold hover:bg-gbeto-gold/90">
              S'inscrire
            </Button>
            
            {message && <p className="text-sm text-green-600 mt-4 text-center">{message}</p>}
            {error && <p className="text-sm text-red-600 mt-4 text-center">{error}</p>}
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
