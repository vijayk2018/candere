import {Link} from 'react-router';
import {Image, Money} from '@shopify/hydrogen';
import type {
  ProductItemFragment,
  CollectionItemFragment,
  RecommendedProductFragment,
} from 'storefrontapi.generated';
import {useVariantUrl} from '~/lib/variants';

export function ProductItem({
  product,
  loading,
}: {
  product: any;
  loading?: 'eager' | 'lazy';
}) {
  const variantUrl = useVariantUrl(product.handle);
  const image = product.featuredImage;
  return (
    <Link
      className="group flex flex-col bg-white overflow-hidden transition-all duration-300 hover:shadow-md border border-[#e8e9f2] rounded-[4px] h-full"
      key={product.id}
      prefetch="intent"
      to={variantUrl}
    >
      <div className="relative aspect-square overflow-hidden bg-white p-2">
        {/* Top Controls */}
        <div className="absolute top-2 left-2 right-2 flex justify-between items-start z-10">
          <div className="flex flex-col gap-1">
            {/* Dynamic Product Label from metafield */}
            {product.productLabel?.value && (
              <div className="relative flex items-center">
                <div className="bg-[#fce4ec] text-[#d81b60] text-[9px] font-bold px-1.5 py-0.5 rounded-l-sm flex items-center gap-1">
                  <svg className="w-2.5 h-2.5 fill-[#d81b60]" viewBox="0 0 24 24">
                    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 14.5v-9l6 4.5-6 4.5z" />
                  </svg>
                  {product.productLabel.value.startsWith('[') 
                    ? JSON.parse(product.productLabel.value)[0] 
                    : product.productLabel.value}
                </div>
                <div className="w-0 h-0 border-t-[14px] border-t-[#fce4ec] border-r-[8px] border-r-transparent"></div>
                {/* Fold shadow */}
                <div className="absolute -bottom-[2px] right-[4px] w-0 h-0 border-t-[2px] border-t-gray-300 border-l-[2px] border-l-transparent"></div>
              </div>
            )}
          </div>
          <div className="flex gap-1.5">
            {/* Play Button Icon - Matching Image 2 */}
            <button className="w-7 h-7 flex items-center justify-center rounded-full text-[#898dad] hover:text-[#008696] transition-colors border border-[#e8e9f2] bg-white">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1" d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1" d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </button>
            {/* Heart Icon - Matching Image 2 */}
            <button className="w-7 h-7 flex items-center justify-center rounded-full text-[#898dad] hover:text-red-500 transition-colors border border-[#e8e9f2] bg-white">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
              </svg>
            </button>
          </div>
        </div>

        {image && (
          <Image
            alt={image.altText || product.title}
            aspectRatio="1/1"
            data={image}
            loading={loading}
            className="w-full h-full object-contain p-2"
            sizes="(min-width: 45em) 400px, 100vw"
          />
        )}
      </div>
      
      <div className="p-4 pt-1 flex flex-col flex-grow">
        {/* Price Row */}
        <div className="flex items-center justify-between mb-1.5">
          <div className="flex items-center">
            <span className="font-semibold text-[16px] tracking-[.15px] text-[#008696] whitespace-nowrap order-[-1] mr-2">
              <Money data={product.priceRange.minVariantPrice} />
            </span>
            <span className="text-[#898dad] text-[11px] line-through">
              ₹{Math.round(parseFloat(product.priceRange.minVariantPrice.amount) * 1.1).toLocaleString()}
            </span>
          </div>
          
          <div className="flex items-center gap-1 border-l border-[#e8e9f2] pl-3 ml-2">
            <span className="text-[12px] font-bold text-[#4a4a4a]">5</span>
            <svg className="w-3 h-3 text-[#ffb400] fill-current" viewBox="0 0 20 20">
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
            </svg>
            <span className="text-[10px] text-[#898dad]">(1)</span>
          </div>
        </div>
        
        {/* Discount Row */}
        {product.offer?.value && (
          <p className="font-normal text-[13px] tracking-[.2px] text-[#008696] m-0 p-0 w-full block overflow-hidden text-ellipsis whitespace-nowrap mb-[8px]">
            {product.offer.value}
          </p>
        )}
        
        {/* Title Row */}
        <h4 className="text-[12px] text-[#898dad] block overflow-hidden text-ellipsis whitespace-nowrap">
          {product.title}
        </h4>
      </div>
    </Link>
  );
}
