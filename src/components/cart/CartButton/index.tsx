import { IconShoppingCart } from '@tabler/icons-react';
import { Badge, Button, Menu, Text } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { CartItem } from '@/types';
import cartIcon from '../../image/cart_empty.svg';
import classes from './styles.module.css';
import { Steppers } from '@/components/steper';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { removeItem, editItem } from '@/store/slice/CartSlice';

export function CartButton() {
  const [opened, { open, close }] = useDisclosure(false);
  const dispatch = useAppDispatch();
  const cart = useAppSelector((state) => state.shopping)

  const changeCount = (id: number, count: number) => {
    if (count <= 0) {
      dispatch(removeItem(id))
    } else {
      const item = cart.items.find((item) => item.id === id)
      if (item) {
       dispatch(editItem({ ...item, count }))
      }
    }
  };

  const totalSum = cart.items.reduce((sum, item) => sum + item.price * item.count, 0);

  return (
    <>
      <Menu
        opened={opened}
        onClose={close}
        width={444}
        position="bottom-end"
        offset={25}
        arrowPosition="center"
      >
        <Menu.Target>
          <Button
            component="div"
            mt="md"
            radius="md"
            color="#56B280"
            onClick={open}
            leftSection={cart.items.length > 0 ? <Badge>{cart.items.length}</Badge> : ''}
            rightSection={<IconShoppingCart />}
            data-testid="button"
          >
            Cart
          </Button>
        </Menu.Target>
        <Menu.Dropdown className={classes.menuDropdown}>
          {cart.items.length > 0 ? (
            <>
              {cart.items.map((product: CartItem) => ( 
                <div key={product.id} className={classes.cartItem}>
                  <img src={product.image} alt={product.name} className={classes.image} />
                  <div>
                    <Text fw={500} className={classes.productName}>
                      {product.name.split(' - ')[0]}
                    </Text>
                    <Text c="dimmed" className={classes.productWeight}>
                      {product.name.split(' - ')[1]}
                    </Text>
                  </div>

                  <div className={classes.productPrice}>
                    <Text>$ {product.price * product.count}</Text>
                  </div>
                  <Steppers
                    onCountChange={(newCount) => changeCount(product.id, newCount)}
                    initialCount={product.count}
                    allowZero
                  />
                </div>
              ))}

              <Menu.Item>
                <div className={classes.total}>
                  <Text fw={500}>Total</Text>
                  <Text fw={600}>$ {totalSum}</Text>
                </div>
              </Menu.Item>
            </>
          ) : (
            <div className={classes.emptyCart}>
              <img src={cartIcon} alt="Empty cart" className={classes.emptyCartImage} />
              <Text fw={500} size="lg" mt="md">
                Your cart is empty!
              </Text>
            </div>
          )}
        </Menu.Dropdown>
      </Menu>
    </>
  );
}