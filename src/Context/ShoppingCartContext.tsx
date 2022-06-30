import { createContext, ReactNode, useContext, useState } from 'react';
import ShoppingCart from '../Components/ShoppingCart';

//as it is typescript; have to declare the type; type of children is ReactNode
type ShoppingCartContextProps = {
  children: ReactNode;
};

//defining the type for CartItems that is used in useState
type CartItem = {
  id: number;
  quantity: number;
};

//providing type to context
type ShoppingCartContext = {
  openCart: () => void;
  closeCart: () => void;
  getItemQuantity: (id: number) => number;
  increaseCartQuantity: (id: number) => void;
  decreaseCartQuantity: (id: number) => void;
  removeCartItem: (id: number) => void;
  cartQuantity: number;
  cartItems: CartItem[];
};

//creating shopping cart context; code after 'as' means the context that we created should be of the same type
const ShoppingCartContext = createContext({} as ShoppingCartContext);

//custome hook that consume shopping cart context
export function useShoppingCartContext() {
  return useContext(ShoppingCartContext);
}

//funtion that returns the context.provider wrapper --- children is the value that gets wrapped by provider
export function ShoppingCartProvider({ children }: ShoppingCartContextProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [cartItems, setCartItems] = useState<CartItem[]>([]);

  function getItemQuantity(id: number) {
    return cartItems.find((item) => item.id === id)?.quantity || 0;
  }

  function increaseCartQuantity(id: number) {
    //passing the callback funtion in setState so that it updates the state immediately
    setCartItems((currentItem) => {
      //checking if the item is empty, if empty adding the quantity
      if (currentItem.find((item) => item.id === id) == null) {
        return [...currentItem, { id, quantity: 1 }];
      } else {
        return currentItem.map((item) => {
          if (item.id === id) {
            return { ...item, quantity: item.quantity + 1 };
          } else {
            return item;
          }
        });
      }
    });
  }

  function decreaseCartQuantity(id: number) {
    setCartItems((currentItem) => {
      if (currentItem.find((item) => item.id === id)?.quantity === 1) {
        return currentItem.filter((item) => item.id !== id);
      } else {
        return currentItem.map((item) => {
          if (item.id === id) {
            return { ...item, quantity: item.quantity - 1 };
          } else {
            return item;
          }
        });
      }
    });
  }

  function removeCartItem(id: number) {
    setCartItems((currentItem) => {
      return currentItem.filter((item) => item.id !== id);
    });
  }

  const cartQuantity = cartItems.reduce((quantities, items) => {
    return items.quantity + quantities;
  }, 0);

  const openCart = () => setIsOpen(true);
  const closeCart = () => setIsOpen(false);

  return (
    <ShoppingCartContext.Provider
      value={{
        getItemQuantity,
        increaseCartQuantity,
        decreaseCartQuantity,
        removeCartItem,
        cartQuantity,
        cartItems,
        openCart,
        closeCart,
      }}
    >
      {children}
      <ShoppingCart isOpen={isOpen} />
    </ShoppingCartContext.Provider>
  );
}
