import type {
  BundleProduct,
  ProductVariant,
} from '../types/bundle.types'
import { cx } from '../utils/classNames'

interface VariantSelectorProps {
  product: BundleProduct
  activeVariantId?: string
  onSetVariant: (productId: string, variantId: string) => void
}

export function VariantSelector({
  product,
  activeVariantId,
  onSetVariant,
}: VariantSelectorProps) {
  return (
    <div
      className="mt-2 flex min-h-[25px] flex-wrap content-start gap-1.5"
      aria-label={`${product.title} variants`}
    >
      {product.variants?.map((variant) => (
        <button
          key={variant.id}
          type="button"
          className={cx(
            'inline-flex h-[24px] items-center gap-1 rounded-[2px] border px-1.5 text-[10px] font-medium leading-none transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-wyze-purple',
            variant.id === activeVariantId
              ? 'border-[hsla(170,88%,34%,1)] bg-[hsla(165,88%,53%,0.04)] text-wyze-text'
              : 'border-[#CCCCCC] bg-white text-wyze-text hover:border-[hsla(170,88%,34%,1)]',
          )}
          title={variant.label}
          aria-label={`${variant.label} for ${product.title}`}
          onClick={() => {
            onSetVariant(product.id, variant.id)
          }}
        >
          <VariantMark variant={variant} />
          <span>{variant.label}</span>
        </button>
      ))}
    </div>
  )
}

function VariantMark({ variant }: { variant: ProductVariant }) {
  return (
    <span
      className="grid size-3.5 shrink-0 place-items-center overflow-hidden rounded-[2px] border border-black/10"
      style={{ backgroundColor: variant.swatch }}
    >
      {variant.image ? (
        <img
          className="size-full object-cover"
          src={variant.image}
          alt=""
          loading="lazy"
        />
      ) : null}
    </span>
  )
}
