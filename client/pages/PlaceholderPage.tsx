import { Construction, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Link } from "react-router-dom";
import React from "react"; 

interface PlaceholderPageProps {
  title: string;
  description: string;
  suggestedContent?: string[];
}

export default function PlaceholderPage({ title, description, suggestedContent }: PlaceholderPageProps) {
  
  // --- Fonction pour rendre le bouton secondaire fonctionnel ---
  const handleSecondaryButtonClick = () => {
    // Dans un vrai projet, ceci pourrait ouvrir un formulaire de feedback, 
    // naviguer vers une page d'aide, ou enregistrer un événement analytique.
    console.log("Action déclenchée: Demande de contenu supplémentaire.");
    alert("Merci de l'intérêt porté à cette page ! Votre demande de contenu est notée.");
  };
  // -----------------------------------------------------------

  return (
    <div className="min-h-[80vh] flex items-center justify-center bg-background">
      <div className="container mx-auto px-4 text-center">
        <Card className="max-w-2xl mx-auto">
          <CardContent className="p-12">
            <div className="w-20 h-20 bg-Danxomɛ-gold rounded-full flex items-center justify-center mx-auto mb-6">
              <Construction className="h-10 w-10 text-Danxomɛ-gold-foreground" />
            </div>
            
            <h1 className="text-3xl md:text-4xl font-playfair font-bold text-foreground mb-4">
              {title}
            </h1>
            
            <p className="text-muted-foreground text-lg mb-8">
              {description}
            </p>

            {suggestedContent && (
              <div className="mb-8">
                <h3 className="text-lg font-semibold text-foreground mb-4">
                  Cette page contiendra :
                </h3>
                <ul className="text-left max-w-md mx-auto space-y-2">
                  {suggestedContent.map((item, index) => (
                    <li key={index} className="flex items-center text-muted-foreground">
                      <span className="w-2 h-2 bg-gbeto-gold rounded-full mr-3"></span>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              {/* Le bouton "Retour à l'Accueil" est fonctionnel grâce au composant Link */}
              <Button asChild className="bg-gbeto-gold hover:bg-Danxomɛ-gold/90 text-Danxomɛ-gold-foreground">
                <Link to="/">
                  <ArrowLeft className="mr-2 h-4 w-4" />
                  Retour à l'Accueil
                </Link>
              </Button>
              
              {/* Le bouton secondaire utilise la nouvelle fonction onClick */}
              <Button variant="outline" onClick={handleSecondaryButtonClick}>
                Continuez à demander pour remplir cette page
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
