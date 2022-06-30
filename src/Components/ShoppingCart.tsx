import React from 'react';
import { Offcanvas } from 'react-bootstrap';
import { useShoppingCartContext } from '../Context/ShoppingCartContext';

type ShoppingCartProps = {
  isOpen: boolean;
};
function ShoppingCart({ isOpen }: ShoppingCartProps) {
  const { closeCart } = useShoppingCartContext();
  return (
    <Offcanvas show={isOpen} onHide={closeCart} placement='end'>
      <Offcanvas.Header closeButton>
        <Offcanvas.Title>Shopping Cart</Offcanvas.Title>
      </Offcanvas.Header>
    </Offcanvas>
  );
}

export default ShoppingCart;
