import { Construction, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Link } from "react-router-dom";

interface PlaceholderPageProps {
  title: string;
  description: string;
  suggestedContent?: string[];
}

export default function PlaceholderPage({ title, description, suggestedContent }: PlaceholderPageProps) {
  return (
    <div className="min-h-[80vh] flex items-center justify-center bg-background">
      <div className="container mx-auto px-4 text-center">
        <Card className="max-w-2xl mx-auto">
          <CardContent className="p-12">
            <div className="w-20 h-20 bg-gbeto-gold rounded-full flex items-center justify-center mx-auto mb-6">
              <Construction className="h-10 w-10 text-gbeto-gold-foreground" />
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
              <Button asChild className="bg-gbeto-gold hover:bg-gbeto-gold/90 text-gbeto-gold-foreground">
                <Link to="/">
                  <ArrowLeft className="mr-2 h-4 w-4" />
                  Retour à l'Accueil
                </Link>
              </Button>
              
              <Button variant="outline">
                Continuez à demander pour remplir cette page
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
