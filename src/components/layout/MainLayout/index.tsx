import { AppShell } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { Header } from '../Header';
import classes from './styles.module.css';

interface MainLayoutProps {
  children: React.ReactNode;
}

export function MainLayout({ children }: MainLayoutProps) {
  const [opened, { toggle }] = useDisclosure();

  return (
    <AppShell
      header={{ height: 80 }}
      navbar={{ width: 300, breakpoint: 'sm', collapsed: { desktop: true, mobile: !opened } }}
      padding="md"
      className={classes.appShell}
    >
      <AppShell.Header className={classes.headerSection}>
        <Header onToggleMenu={toggle} opened={opened} />
      </AppShell.Header>

      <AppShell.Main className={classes.mainSection}>{children}</AppShell.Main>
    </AppShell>
  );
}
