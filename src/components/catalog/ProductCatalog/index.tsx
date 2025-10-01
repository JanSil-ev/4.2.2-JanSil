import { useEffect, useState } from 'react';
import { Center, Flex, Loader } from '@mantine/core';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { fetchProducts } from '@/store/slice/ProductSlice';
import { ProductCard } from '../ProductCard';
import classes from './styles.module.css';

export function ProductCatalog() {
  const dispatch = useAppDispatch();
  const { data, isLoading, error } = useAppSelector((state) => state.products);

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  if (isLoading) {
    return (
      <Center style={{ height: '100vh' }}>
        <Loader color="green" data-testid="loader"/>
      </Center>
    );
  }

  if (error) {
    return (
      <Center style={{ height: '100vh' }}>
        <div>Error: {error}</div>
      </Center>
    );
  }

  return (
    <>
      <div className={classes.container}>
        <h2 className={classes.title}>Catalog</h2>
        <Flex
          gap="md"
          justify="center"
          align="center"
          direction="row"
          wrap="wrap"
          className={classes.flexContainer}
        >
          {data?.map((p) => (
            <ProductCard key={p.id} {...p} />
          ))}
        </Flex>
      </div>
    </>
  );
}
