import { Fragment } from 'react';
import { X, Plus, Minus, ShoppingBag, Trash2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useCart } from '@/contexts/CartContext';
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';

export default function Cart() {
  const { state, removeItem, updateQuantity, clearCart, closeCart } = useCart();

  const formatPrice = (price: number) => {
    return price.toLocaleString() + ' FCFA';
  };

  const handleCheckout = () => {
    // Here you would integrate with a payment processor
    alert('Redirection vers le paiement sécurisé...');
    closeCart();
  };

  return (
    <Sheet open={state.isOpen} onOpenChange={closeCart}>
      <SheetContent className="w-full sm:max-w-lg bg-background border-border">
        <SheetHeader className="border-b border-border pb-4">
          <SheetTitle className="flex items-center justify-between">
            <span className="flex items-center">
              <ShoppingBag className="h-5 w-5 mr-2 text-gbeto-gold" />
              Panier ({state.itemCount})
            </span>
            {state.items.length > 0 && (
              <Button
                variant="ghost"
                size="sm"
                onClick={clearCart}
                className="text-destructive hover:text-destructive hover:bg-destructive/10"
              >
                <Trash2 className="h-4 w-4 mr-1" />
                Vider
              </Button>
            )}
          </SheetTitle>
          <SheetDescription>
            {state.items.length === 0 
              ? "Votre panier est vide"
              : `Total: ${formatPrice(state.total)}`
            }
          </SheetDescription>
        </SheetHeader>

        <div className="flex flex-col h-full">
          {state.items.length === 0 ? (
            <div className="flex-1 flex flex-col items-center justify-center text-center py-8">
              <ShoppingBag className="h-16 w-16 text-muted-foreground mb-4" />
              <h3 className="text-lg font-semibold text-foreground mb-2">
                Votre panier est vide
              </h3>
              <p className="text-muted-foreground mb-6">
                Découvrez nos produits authentiques béninois
              </p>
              <Button 
                onClick={closeCart}
                className="bg-gbeto-gold hover:bg-gbeto-gold/90 text-gbeto-gold-foreground"
              >
                Continuer vos achats
              </Button>
            </div>
          ) : (
            <>
              {/* Cart Items */}
              <div className="flex-1 overflow-y-auto py-4 space-y-4">
                {state.items.map((item) => (
                  <div key={item.id} className="flex items-start space-x-4 p-4 bg-gbeto-surface rounded-lg">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-16 h-16 object-cover rounded-md flex-shrink-0"
                    />
                    <div className="flex-1 min-w-0">
                      <h4 className="text-sm font-semibold text-foreground truncate">
                        {item.name}
                      </h4>
                      {item.artisan && (
                        <p className="text-xs text-muted-foreground">
                          Par {item.artisan}
                        </p>
                      )}
                      <div className="flex items-center justify-between mt-2">
                        <span className="text-sm font-bold text-foreground">
                          {formatPrice(item.price)}
                        </span>
                        <div className="flex items-center space-x-2">
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => updateQuantity(item.id, item.quantity - 1)}
                            disabled={item.quantity <= 1}
                            className="h-6 w-6 p-0"
                          >
                            <Minus className="h-3 w-3" />
                          </Button>
                          <span className="text-sm font-medium w-8 text-center">
                            {item.quantity}
                          </span>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                            disabled={item.quantity >= item.inStock}
                            className="h-6 w-6 p-0"
                          >
                            <Plus className="h-3 w-3" />
                          </Button>
                        </div>
                      </div>
                      <div className="flex items-center justify-between mt-2">
                        <span className="text-xs text-muted-foreground">
                          Sous-total: {formatPrice(item.price * item.quantity)}
                        </span>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => removeItem(item.id)}
                          className="text-destructive hover:text-destructive hover:bg-destructive/10 h-6 px-2"
                        >
                          <X className="h-3 w-3" />
                        </Button>
                      </div>
                      {item.quantity >= item.inStock && (
                        <p className="text-xs text-amber-600 mt-1">
                          Stock maximum atteint
                        </p>
                      )}
                    </div>
                  </div>
                ))}
              </div>

              {/* Cart Footer */}
              <div className="border-t border-border pt-4 space-y-4">
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Sous-total:</span>
                    <span className="font-semibold">{formatPrice(state.total)}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Livraison:</span>
                    <span className="font-semibold">Gratuite</span>
                  </div>
                  <div className="flex justify-between text-base font-bold border-t border-border pt-2">
                    <span>Total:</span>
                    <span className="text-gbeto-gold">{formatPrice(state.total)}</span>
                  </div>
                </div>

                <div className="space-y-2">
                  <Button 
                    onClick={handleCheckout}
                    className="w-full bg-gbeto-gold hover:bg-gbeto-gold/90 text-gbeto-gold-foreground"
                    disabled={state.items.length === 0}
                  >
                    Procéder au paiement
                  </Button>
                  <Button 
                    variant="outline" 
                    onClick={closeCart}
                    className="w-full"
                  >
                    Continuer vos achats
                  </Button>
                </div>

                <div className="text-xs text-muted-foreground text-center">
                  <p>Paiement sécurisé • Livraison gratuite</p>
                  <p>Support client 24h/7j</p>
                </div>
              </div>
            </>
          )}
        </div>
      </SheetContent>
    </Sheet>
  );
}
