import { Button, Stack } from 'react-bootstrap';
import { useShoppingCartContext } from '../Context/ShoppingCartContext';
import storeItems from '../Data/items.json';
import { formateCurrency } from '../Utilities/formatCurrency';

type CartItemsProps = {
  id: number;
  quantity: number;
};

function CartItems({ id, quantity }: CartItemsProps) {
  const { removeCartItem } = useShoppingCartContext();
  const item = storeItems.find((itemId) => itemId.id === id);
  if (item == null) {
    return null;
  }
  return (
    <Stack direction='horizontal' gap={2} className='d-flex align-items-center'>
      <img
        src={item?.imgUrl}
        style={{ width: '125px', height: '75px', objectFit: 'cover' }}
      />

      <div className='me-auto'>
        <div>
          {item?.name}{' '}
          {quantity > 1 && (
            <span className='text-muted ' style={{ fontSize: '.65rem' }}>
              x{quantity}
            </span>
          )}
        </div>
        <div className='text-muted' style={{ fontSize: '.75rem' }}>
          {formateCurrency(item?.price)}
        </div>
      </div>
      <div>{formateCurrency(item?.price * quantity)}</div>
      <Button
        variant='outline-danger'
        size='sm'
        onClick={() => removeCartItem(item.id)}
      >
        &times;
      </Button>
    </Stack>
  );
}

export default CartItems;
