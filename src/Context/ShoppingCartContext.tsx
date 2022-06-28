import { createContext, ReactNode, useContext } from 'react';

type ShoppingCartContextProps = {
  children: ReactNode;
};

const ShoppingCartContext = createContext({});

export function useShoppingCartContext() {
  return useContext(ShoppingCartContext);
}

export function ShoppingCartProvider({ children }: ShoppingCartContextProps) {
  return (
    <ShoppingCartContext.Provider value={{}}>
      {children}
    </ShoppingCartContext.Provider>
  );
}
