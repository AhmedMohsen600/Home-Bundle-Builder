import { ShoppingCart } from "lucide-react";
import { groupLabels } from "../constants/bundleConstants";
import type {
  BundleTotals,
  ProductCategory,
  ReviewGroups,
} from "../types/bundle.types";
import { formatPrice } from "../utils/formatters";
import { ReviewLineItem } from "./ReviewLineItem";
import { WyzeFastShippingIcon } from "./WyzeFastShippingIcon";

interface ReviewPanelProps {
  groups: ReviewGroups;
  totals: BundleTotals;
  onSetQuantity: (
    productId: string,
    variantId: string | undefined,
    quantity: number,
  ) => void;
  onSave: () => void;
  onCheckout: () => void;
  saveMessage: string;
  checkoutMessage: string;
}

export function ReviewPanel({
  groups,
  totals,
  onSetQuantity,
  onSave,
  onCheckout,
  saveMessage,
  checkoutMessage,
}: ReviewPanelProps) {
  return (
    <aside
      className="rounded-[7px] bg-wyze-panel px-[18px] py-[13px] lg:sticky lg:top-[46px]"
      aria-label="Your security system"
    >
      <div>
        <p className="mb-5 text-[10px] font-medium uppercase tracking-[0.16em] text-wyze-muted">
          REVIEW
        </p>
        <h2 className="text-[21px] font-semibold leading-tight tracking-normal text-wyze-text">
          Your security system
        </h2>
        <p className="mt-1.5 border-b border-[#d4deee] pb-3 text-[12px] leading-[1.35] text-wyze-muted">
          Review your personalized protection system designed to keep what
          matters most safe.
        </p>
      </div>

      <div className="mt-3 space-y-3">
        {(Object.keys(groupLabels) as ProductCategory[]).map((category) =>
          groups[category].length ? (
            <section key={category}>
              <h3 className="mb-1.5 text-[10px] font-medium uppercase leading-none tracking-[0.08em] text-wyze-soft">
                {groupLabels[category]}
              </h3>
              <div>
                {groups[category].map((line) => (
                  <ReviewLineItem
                    key={line.key}
                    line={line}
                    onSetQuantity={onSetQuantity}
                  />
                ))}
              </div>
            </section>
          ) : null,
        )}
      </div>

      <div className="mt-3 flex items-center justify-between gap-3 border-b border-[#d4deee] py-3 text-[12px] font-medium text-wyze-text">
        <span className="flex min-w-0 items-center gap-2">
          <WyzeFastShippingIcon
            className="shrink-0"
            data-testid="review-fast-shipping-icon"
          />
          Fast Shipping
        </span>
        <span className="shrink-0 text-[14px] font-bold text-[#4E2FD2]">
          <s className="mr-1 font-semibold text-wyze-soft">$5.99</s> FREE
        </span>
      </div>

      <div className="mt-3 flex items-end justify-between gap-4">
        <img
          className="size-[74px] shrink-0 object-contain"
          src="/wyze-satisfaction-guarantee.png"
          alt="100% Wyze satisfaction guarantee"
        />
        <div className="flex min-w-0 flex-1 flex-col items-end">
          <span className="self-end rounded-[3px] bg-wyze-purple px-3 py-1 text-[13px] font-medium leading-none text-white">
            as low as $19.19/mo
          </span>
          <p
            className="mt-2 flex items-baseline justify-end gap-[10px]"
            data-testid="review-total-row"
          >
            <span className="whitespace-nowrap text-[18px] font-semibold leading-none text-wyze-discount line-through">
              {formatPrice(totals.compareAt)}
            </span>
            <span className="whitespace-nowrap text-[24px] font-bold leading-none text-wyze-purple">
              {formatPrice(totals.price)}
            </span>
          </p>
        </div>
      </div>

      <p className="mt-3 text-center text-[12px] font-bold text-wyze-green">
        Congrats! You&apos;re saving {formatPrice(totals.savings)} on your
        security bundle.
      </p>

      <button
        type="button"
        className="mt-2 flex h-[44px] w-full items-center justify-center gap-2 rounded-[3px] bg-wyze-purple px-5 text-[14px] font-extrabold text-white transition-colors hover:bg-wyze-purple-dark focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-wyze-purple"
        onClick={onCheckout}
      >
        <ShoppingCart size={18} aria-hidden="true" />
        Checkout
      </button>
      {checkoutMessage ? (
        <p className="mt-2 text-center text-[12px] font-semibold text-wyze-muted">
          {checkoutMessage}
        </p>
      ) : null}

      <button
        type="button"
        className="mx-auto mt-2 flex items-center justify-center text-center text-[14px] font-normal italic leading-[1.2] tracking-[-0.02px] text-wyze-text underline decoration-solid underline-offset-2 transition-colors hover:text-wyze-purple focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-wyze-purple"
        onClick={onSave}
      >
        Save my system for later
      </button>
      {saveMessage ? (
        <p className="mt-2 text-center text-[12px] font-semibold text-wyze-muted">
          {saveMessage}
        </p>
      ) : null}
    </aside>
  );
}
