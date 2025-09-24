import { Group, Title, Button, UnstyledButton, Burger } from '@mantine/core';
import classes from './styles.module.css';
import { CartButton } from '@/components/cart/CartButton';

interface HeaderProps {
  onToggleMenu: () => void;
  opened: boolean;
}

export function Header({ onToggleMenu, opened }: HeaderProps) {
  return (
    <Group h="100%" px="md" justify="space-between" className={classes.header} data-testid="header">
      <Burger 
        opened={opened} 
        onClick={onToggleMenu} 
        hiddenFrom="sm" 
        size="sm" 
      />

      <Group gap="xl">
        <Title order={3} className={classes.title}>
          Vegetable
        </Title>
        <Button variant="filled" color="#54B46A" radius="xl" size="sm">
          Catalog
        </Button>
      </Group>

      <Group ml="xl" gap={0} visibleFrom="m">
        <UnstyledButton>
          <CartButton />
        </UnstyledButton>
      </Group>
    </Group>
  );
}
