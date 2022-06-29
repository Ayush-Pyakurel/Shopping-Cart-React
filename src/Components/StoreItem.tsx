import { Button, Card, NavItem } from 'react-bootstrap';
import { formateCurrency } from '../Utilities/formatCurrency';
import { useShoppingCartContext } from '../Context/ShoppingCartContext';

type StoreItemProps = {
  id: number;
  imgUrl: string;
  price: number;
  name: string;
};

export function StoreItem({ id, imgUrl, price, name }: StoreItemProps) {
  const {
    getItemQuantity,
    increaseCartQuantity,
    decreaseCartQuantity,
    removeCartItem,
  } = useShoppingCartContext();
  const quantity = getItemQuantity(id);
  return (
    <Card className='h-100'>
      <Card.Img
        variant='top'
        src={imgUrl}
        height='200px'
        style={{ objectFit: 'cover' }}
      />
      <Card.Body className='d-flex flex-column'>
        <Card.Title className='d-flex justify-content-between align-items-baseline mb-4'>
          <span className='fs-2'>{name}</span>
          <span className='ms-2 text-muted'>{formateCurrency(price)}</span>
        </Card.Title>
        <div className='mt-auto'>
          {quantity === 0 ? (
            <Button className='w-100' onClick={() => increaseCartQuantity(id)}>
              + Add To Cart
            </Button>
          ) : (
            <div
              className='d-flex align-items-center flex-column'
              style={{ gap: '.5rem' }}
            >
              <div
                className='d-flex align-items-center justify-content-center'
                style={{ gap: '.5rem' }}
              >
                <Button onClick={() => increaseCartQuantity(id)}>+</Button>
                <div>
                  {' '}
                  <span className='fs-3'>{quantity} in cart</span>
                </div>
                <Button onClick={() => decreaseCartQuantity(id)}>-</Button>
              </div>
              <Button
                variant='danger'
                size='sm'
                onClick={() => removeCartItem(id)}
              >
                Remove
              </Button>
            </div>
          )}
        </div>
      </Card.Body>
    </Card>
  );
}
