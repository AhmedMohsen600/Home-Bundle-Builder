import { categoryFallbackIcons } from "../constants/bundleConstants";
import type {
  BundleProduct,
  ProductSelectionState,
} from "../types/bundle.types";
import { cx } from "../utils/classNames";
import { PriceBlock } from "./PriceBlock";
import { ProductImage } from "./ProductImage";
import { QuantityStepper } from "./QuantityStepper";
import { VariantSelector } from "./VariantSelector";

interface ProductCardProps {
  product: BundleProduct;
  selection: ProductSelectionState;
  className?: string;
  onSetVariant: (productId: string, variantId: string) => void;
  onSetQuantity: (
    productId: string,
    variantId: string | undefined,
    quantity: number,
  ) => void;
}

export function ProductCard({
  product,
  selection,
  className,
  onSetVariant,
  onSetQuantity,
}: ProductCardProps) {
  const activeVariantId = selection.activeVariantId;
  const activeVariant = product.variants?.find(
    (variant) => variant.id === activeVariantId,
  );
  const price = activeVariant?.price ?? product.price;
  const compareAt = activeVariant?.compareAt ?? product.compareAt;
  const image = activeVariant?.image ?? product.image;

  return (
    <article
      className={cx(
        "relative grid min-h-[159px] w-full min-w-0 grid-cols-[104px_minmax(0,1fr)] gap-3 rounded-[10px] border-2 bg-white p-[11px] transition-colors max-[639px]:grid-cols-1",
        selection.selected
          ? "border-wyze-card-selected"
          : "border-transparent hover:border-wyze-line",
        className,
      )}
      data-testid={`product-card-${product.id}`}
    >
      {product.badge ? (
        <span className="absolute left-2 top-2 z-10 rounded-full bg-wyze-purple px-2 py-1 text-[10px] font-extrabold leading-none text-white">
          {product.badge}
        </span>
      ) : null}

      <div className="flex min-h-[92px] items-center justify-center rounded-[5px] bg-white px-1">
        <ProductImage
          className="h-[88px] w-full max-w-[94px] object-contain mix-blend-multiply"
          src={image}
          alt={product.title}
          fallbackIcon={
            product.id === "fast-shipping"
              ? "truck"
              : categoryFallbackIcons[product.category]
          }
        />
      </div>

      <div className="flex min-w-0 flex-col">
        <h3 className="overflow-hidden text-base font-semibold leading-[1.2] tracking-normal text-wyze-text [display:-webkit-box] [-webkit-box-orient:vertical] [-webkit-line-clamp:2]">
          {product.title}
        </h3>
        <p className="mt-2 font-medium min-h-[34px] overflow-hidden text-[11px] leading-[1.2] text-wyze-muted [display:-webkit-box] [overflow-wrap:anywhere] [-webkit-box-orient:vertical] [-webkit-line-clamp:3]">
          {product.description}{" "}
          {product.learnMoreUrl ? (
            <a
              className="font-bold text-wyze-purple underline underline-offset-2 hover:text-wyze-purple-dark"
              href={product.learnMoreUrl}
              target="_blank"
              rel="noreferrer"
            >
              Learn More
            </a>
          ) : null}
        </p>

        {product.variants?.length ? (
          <VariantSelector
            product={product}
            activeVariantId={activeVariantId}
            onSetVariant={onSetVariant}
          />
        ) : null}

        <div className="mt-auto flex items-end justify-between gap-2 pt-2">
          <QuantityStepper
            label={`${product.title} quantity`}
            quantity={selection.quantity}
            onChange={(nextQuantity) => {
              onSetQuantity(product.id, activeVariantId, nextQuantity);
            }}
            disabledDecrement={product.required}
            testId={`product-quantity-${product.id}`}
          />
          <PriceBlock
            price={price}
            compareAt={compareAt}
            billing={product.billing}
          />
        </div>
      </div>
    </article>
  );
}
