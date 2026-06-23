import { categoryFallbackIcons } from '../constants/bundleConstants'
import type { ReviewLine } from '../types/bundle.types'
import { PriceBlock } from './PriceBlock'
import { ProductImage } from './ProductImage'
import { QuantityStepper } from './QuantityStepper'
import { WyzeShieldIcon } from './WyzeShieldIcon'

interface ReviewLineItemProps {
  line: ReviewLine
  onSetQuantity: (
    productId: string,
    variantId: string | undefined,
    quantity: number,
  ) => void
}

export function ReviewLineItem({ line, onSetQuantity }: ReviewLineItemProps) {
  const visibleName = line.name.replace(/ - (White|Grey|Black)$/, '')
  const isPlanLine = line.category === 'plan'

  return (
    <div
      className="grid grid-cols-[38px_minmax(0,1fr)] gap-x-2 gap-y-1 border-b border-[#d4deee] py-2 last:border-b-0 sm:grid-cols-[38px_minmax(0,1fr)_118px_78px] sm:items-center"
      data-review-row
    >
      {isPlanLine ? (
        <span className="row-span-2 flex size-[36px] items-center justify-center sm:row-span-1">
          <WyzeShieldIcon data-testid="review-plan-shield-icon" />
        </span>
      ) : (
        <ProductImage
          className="row-span-2 size-[36px] rounded-[3px] bg-white object-contain p-1 sm:row-span-1"
          src={line.image}
          alt=""
          fallbackIcon={
            line.productId === 'fast-shipping'
              ? 'truck'
              : categoryFallbackIcons[line.category]
          }
        />
      )}
      <div className="min-w-0">
        <p className="text-[12px] font-medium leading-tight text-wyze-text">
          {visibleName}
          {visibleName !== line.name ? (
            <span className="sr-only"> {line.name}</span>
          ) : null}
        </p>
        {line.required ? (
          <span className="mt-0.5 block text-[10px] font-bold uppercase tracking-[0.08em] text-wyze-green">
            Required
          </span>
        ) : null}
      </div>
      <div className="col-start-2 justify-self-start sm:col-auto sm:justify-self-end">
        <QuantityStepper
          label={`${line.name} review quantity`}
          quantity={line.quantity}
          onChange={(nextQuantity) => {
            onSetQuantity(line.productId, line.variantId, nextQuantity)
          }}
          disabledDecrement={line.required}
          testId={`review-quantity-${line.key}`}
        />
      </div>
      <div className="col-start-2 justify-self-start sm:col-auto sm:min-w-[78px] sm:justify-self-end">
        <PriceBlock
          price={line.price * line.quantity}
          compareAt={
            line.compareAt ? line.compareAt * line.quantity : undefined
          }
          billing={line.billing}
          alignRight
          variant="review"
        />
      </div>
    </div>
  )
}
