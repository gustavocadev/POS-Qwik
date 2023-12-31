import { component$, useComputed$ } from '@builder.io/qwik';
import { Link, routeLoader$ } from '@builder.io/qwik-city';
import { Product } from '~/components/product/Product';
import { getProducts } from '~/helpers/products';

export const useProducts = routeLoader$(async () => {
  try {
    const products = await getProducts();

    return products;
  } catch (error) {
    console.error(error);
    return [];
  }
});

export default component$(() => {
  const products = useProducts();

  const isProductsEmpty = useComputed$(() => products.value.length === 0);

  return (
    <>
      <Link
        class="rounded bg-green-400 hover:bg-green-500 font-bold py-2 px-10"
        href="new/"
      >
        Nuevo Producto
      </Link>
      <h1 class="text-4xl font-black my-10">Productos</h1>

      {isProductsEmpty.value && (
        <p class="text-2xl font-bold text-center">
          No hay productos disponibles
        </p>
      )}
      <ul
        role="list"
        class="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5"
      >
        {products.value.map((product) => {
          return <Product key={product.image} product={product} />;
        })}
      </ul>
    </>
  );
});
