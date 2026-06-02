import React from 'react';
import {redirect, useLoaderData} from 'react-router';
import ringBanner from '~/assets/Rings-2.webp';
import type {Route} from './+types/($locale).collections.$handle';
import {getPaginationVariables, Analytics} from '@shopify/hydrogen';
import {PaginatedResourceSection} from '~/components/PaginatedResourceSection';
import {redirectIfHandleIsLocalized} from '~/lib/redirect';
import {ProductItem} from '~/components/ProductItem';
import type {ProductItemFragment} from 'storefrontapi.generated';

export const meta: Route.MetaFunction = ({data}) => {
  return [{title: `Hydrogen | ${data?.collection.title ?? ''} Collection`}];
};

export async function loader(args: Route.LoaderArgs) {
  // Start fetching non-critical data without blocking time to first byte
  const deferredData = loadDeferredData(args);

  // Await the critical data required to render initial state of the page
  const criticalData = await loadCriticalData(args);

  return {...deferredData, ...criticalData};
}

/**
 * Load data necessary for rendering content above the fold. This is the critical data
 * needed to render the page. If it's unavailable, the whole page should 400 or 500 error.
 */
async function loadCriticalData({context, params, request}: Route.LoaderArgs) {
  const {handle} = params;
  const {storefront} = context;
  const paginationVariables = getPaginationVariables(request, {
    pageBy: 8,
  });

  if (!handle) {
    throw redirect('/collections');
  }

  const [{collection}] = await Promise.all([
    storefront.query(COLLECTION_QUERY, {
      variables: {handle, ...paginationVariables},
      // Add other queries here, so that they are loaded in parallel
    }),
  ]);

  if (!collection) {
    throw new Response(`Collection ${handle} not found`, {
      status: 404,
    });
  }

  // The API handle might be localized, so redirect to the localized handle
  redirectIfHandleIsLocalized(request, {handle, data: collection});

  return {
    collection,
  };
}

/**
 * Load data for rendering content below the fold. This data is deferred and will be
 * fetched after the initial page load. If it's unavailable, the page should still 200.
 * Make sure to not throw any errors here, as it will cause the page to 500.
 */
function loadDeferredData({context}: Route.LoaderArgs) {
  return {};
}

export default function Collection() {
  const {collection} = useLoaderData<typeof loader>();

  return (
    <div className="collection-page bg-gray-50 min-h-screen">
      {/* Hero Banner Section */}
      <div className="w-full h-[300px] md:h-[400px] bg-white overflow-hidden">
        {collection.image ? (
          <img
            src={collection.image.url}
            alt={collection.image.altText || collection.title}
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="w-full h-full bg-gradient-to-r from-gray-100 to-gray-200" />
        )}
      </div>

      {/* Collection Info & Breadcrumbs Section */}
      <div className="bg-[#f1fcf4] border-b border-[#e0f2e9]">
        <div className="max-w-[1400px] mx-auto px-6 py-4 flex flex-col items-start">
          <div className="flex items-center gap-2 mb-1">
            <h1 className="text-sm font-bold text-[#1a237e]">
              {collection.title}
            </h1>
            <span className="text-sm text-gray-500 font-medium">
              {collection.products.nodes.length} Designs
            </span>
          </div>
          
          <nav className="text-[11px] text-[#00695c]">
            <ol className="flex items-center space-x-1">
              <li>
                <a href="/" className="hover:underline">Home</a>
              </li>
              <li>/</li>
              <li>
                <a href="/jewellery" className="hover:underline">Jewellery</a>
              </li>
              <li>/</li>
              {collection.handle.toLowerCase().includes('ring') && (
                <>
                  <li>
                    <a href="/jewellery/rings" className="hover:underline">Rings</a>
                  </li>
                  <li>/</li>
                </>
              )}
              <li className="font-semibold text-gray-400 cursor-default">
                {collection.title}
              </li>
            </ol>
          </nav>
        </div>
      </div>

      {/* Main Content Layout */}
      <div className="max-w-[1400px] mx-auto px-4 py-8 flex flex-col md:flex-row gap-8">
        {/* Sidebar Filters */}
        <aside className="w-full md:w-[260px] flex-shrink-0 bg-white p-6 rounded-lg shadow-sm h-fit">
          <div className="mb-8">
            <h3 className="text-lg font-bold text-gray-900 mb-4 border-b pb-2">Filters</h3>
            
            {/* Price Filter Mock */}
            <div className="mb-6">
              <h4 className="text-sm font-semibold text-gray-700 mb-3">Price</h4>
              <div className="space-y-2">
                {['Under ₹10,000', '₹10,000 - ₹25,000', '₹25,000 - ₹50,000', 'Over ₹50,000'].map((price) => (
                  <label key={price} className="flex items-center text-sm text-gray-600 cursor-pointer hover:text-cyan-600">
                    <input type="checkbox" className="mr-2 rounded text-cyan-600 focus:ring-cyan-500" />
                    {price}
                  </label>
                ))}
              </div>
            </div>

            {/* Metal Filter Mock */}
            <div className="mb-6">
              <h4 className="text-sm font-semibold text-gray-700 mb-3">Metal</h4>
              <div className="space-y-2">
                {['Yellow Gold', 'White Gold', 'Rose Gold', 'Platinum'].map((metal) => (
                  <label key={metal} className="flex items-center text-sm text-gray-600 cursor-pointer hover:text-cyan-600">
                    <input type="checkbox" className="mr-2 rounded text-cyan-600 focus:ring-cyan-500" />
                    {metal}
                  </label>
                ))}
              </div>
            </div>

            {/* Purity Filter Mock */}
            <div className="mb-6">
              <h4 className="text-sm font-semibold text-gray-700 mb-3">Purity</h4>
              <div className="space-y-2">
                {['14K', '18K', '22K', '24K'].map((purity) => (
                  <label key={purity} className="flex items-center text-sm text-gray-600 cursor-pointer hover:text-cyan-600">
                    <input type="checkbox" className="mr-2 rounded text-cyan-600 focus:ring-cyan-500" />
                    {purity}
                  </label>
                ))}
              </div>
            </div>
          </div>
        </aside>

        {/* Product Grid Area */}
        <main className="flex-grow">
          <div className="flex justify-between items-center mb-6">
            <p className="text-gray-600 text-sm">
              Showing <span className="font-semibold">{collection.products.nodes.length}</span> products
            </p>
            <div className="flex items-center gap-2">
              <label className="text-sm text-gray-600">Sort by:</label>
              <select className="text-sm border-gray-300 rounded-md focus:ring-cyan-500 focus:border-cyan-500">
                <option>Featured</option>
                <option>Price: Low to High</option>
                <option>Price: High to Low</option>
                <option>Newest</option>
              </select>
            </div>
          </div>

          <PaginatedResourceSection<ProductItemFragment>
            connection={collection.products}
            resourcesClassName="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4"
          >
            {({node: product, index}) => {
              // Cycle of 6 products: 4 in first row, 2 in second row (with a banner)
              const cycleIndex = index % 6;
              const showBannerBefore = cycleIndex === 4;

              return (
                <React.Fragment key={product.id}>
                  {showBannerBefore && (
                     <div className="col-span-1 sm:col-span-2 lg:col-span-2 bg-white rounded-sm overflow-hidden relative group min-h-[250px] border border-gray-100 shadow-sm">
                       <img 
                         src={ringBanner} 
                         alt="Lifestyle Banner"
                         className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                       />
                     </div>
                   )}
                  
                  <div className="col-span-1">
                    <ProductItem
                      product={product}
                      loading={index < 8 ? 'eager' : undefined}
                    />
                  </div>
                </React.Fragment>
              );
            }}
          </PaginatedResourceSection>
        </main>
      </div>

      <Analytics.CollectionView
        data={{
          collection: {
            id: collection.id,
            handle: collection.handle,
          },
        }}
      />
    </div>
  );
}

const PRODUCT_ITEM_FRAGMENT = `#graphql
  fragment MoneyProductItem on MoneyV2 {
    amount
    currencyCode
  }
  fragment ProductItem on Product {
    id
    handle
    title
    featuredImage {
      id
      altText
      url
      width
      height
    }
    priceRange {
      minVariantPrice {
        ...MoneyProductItem
      }
      maxVariantPrice {
        ...MoneyProductItem
      }
    }
    offer: metafield(namespace: "custom", key: "offer") {
      value
    }
    productLabel: metafield(namespace: "custom", key: "new_product_label") {
      value
    }
  }
` as const;

// NOTE: https://shopify.dev/docs/api/storefront/2022-04/objects/collection
const COLLECTION_QUERY = `#graphql
  ${PRODUCT_ITEM_FRAGMENT}
  query Collection(
    $handle: String!
    $country: CountryCode
    $language: LanguageCode
    $first: Int
    $last: Int
    $startCursor: String
    $endCursor: String
  ) @inContext(country: $country, language: $language) {
    collection(handle: $handle) {
      id
      handle
      title
      description
      image {
        id
        url
        altText
        width
        height
      }
      products(
        first: $first,
        last: $last,
        before: $startCursor,
        after: $endCursor
      ) {
        nodes {
          ...ProductItem
        }
        pageInfo {
          hasPreviousPage
          hasNextPage
          endCursor
          startCursor
        }
      }
    }
  }
` as const;
