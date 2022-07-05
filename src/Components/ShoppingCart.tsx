import { Offcanvas, Stack } from 'react-bootstrap';
import { useShoppingCartContext } from '../Context/ShoppingCartContext';
import { formateCurrency } from '../Utilities/formatCurrency';
import CartItems from './CartItems';
import storeItems from '../Data/items.json';

type ShoppingCartProps = {
  isOpen: boolean;
};
function ShoppingCart({ isOpen }: ShoppingCartProps) {
  const { closeCart, cartItems } = useShoppingCartContext();

  return (
    <Offcanvas show={isOpen} onHide={closeCart} placement='end'>
      <Offcanvas.Header closeButton>
        <Offcanvas.Title>Shopping Cart</Offcanvas.Title>
      </Offcanvas.Header>
      <Offcanvas.Body>
        <Stack gap={3}>
          {cartItems.map((item) => {
            return <CartItems key={item.id} {...item} />;
          })}
          <div className='ms-auto fw-bold fs-5'>
            {formateCurrency(
              cartItems.reduce((total, item) => {
                const items = storeItems.find((i) => i.id === item.id);
                return total + (items?.price || 0) * item.quantity;
              }, 0)
            )}
          </div>
        </Stack>
      </Offcanvas.Body>
    </Offcanvas>
  );
}

export default ShoppingCart;
function previousvalue(previousvalue: any, currentValue: any): number {
  throw new Error('Function not implemented.');
}

function currentValue(previousvalue: any, currentValue: any): number {
  throw new Error('Function not implemented.');
}
