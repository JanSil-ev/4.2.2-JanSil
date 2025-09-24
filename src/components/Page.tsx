import { MainLayout } from './layout/MainLayout';
import { ProductCatalog } from './catalog/ProductCatalog';



export function Page() {
  return (
    <MainLayout>
      <ProductCatalog />
    </MainLayout>
  );
}