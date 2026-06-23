import { ChevronDown, ChevronUp } from "lucide-react";
import type {
  BundleProduct,
  BundleStep,
  ProductSelectionState,
} from "../types/bundle.types";
import { cx } from "../utils/classNames";
import { ProductCard } from "./ProductCard";
import { StepIconGraphic } from "./StepIconGraphic";

interface StepSectionProps {
  step: BundleStep;
  stepIndex: number;
  totalSteps: number;
  selectedCount: number;
  isOpen: boolean;
  getProductSelection: (product: BundleProduct) => ProductSelectionState;
  onToggle: () => void;
  onNext: () => void;
  onSetVariant: (productId: string, variantId: string) => void;
  onSetQuantity: (
    productId: string,
    variantId: string | undefined,
    quantity: number,
  ) => void;
}

export function StepSection({
  step,
  stepIndex,
  totalSteps,
  selectedCount,
  isOpen,
  getProductSelection,
  onToggle,
  onNext,
  onSetVariant,
  onSetQuantity,
}: StepSectionProps) {
  const stepIconSize =
    step.icon === "sensor"
      ? 28
      : step.icon === "camera" || step.icon === "shield" || step.icon === "plus"
        ? 26
        : 22;

  return (
    <article
      className={cx(
        isOpen
          ? "relative overflow-hidden rounded-[7px] bg-wyze-panel"
          : "-mt-px border-y border-[#3f4248] bg-white",
      )}
    >
      <button
        type="button"
        className={cx(
          "w-full bg-transparent text-left transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-[-2px] focus-visible:outline-wyze-purple",
          isOpen ? "block" : "block hover:bg-wyze-panel-soft",
        )}
        aria-expanded={isOpen}
        onClick={onToggle}
      >
        {isOpen ? (
          <>
            <span
              className="block border-b border-[#a9c2e5] px-4 py-3 text-[10px] font-medium uppercase leading-none tracking-[0.16em] text-wyze-muted"
              data-testid={`step-eyebrow-row-${step.id}`}
            >
              {step.eyebrow}
            </span>
            <span
              className="flex items-center justify-between gap-4 px-4 py-4"
              data-step-title-row
            >
              <span className="flex min-w-0 items-center gap-3">
                <span className="grid size-[28px] shrink-0 place-items-center rounded-[3px] text-wyze-muted">
                  <StepIconGraphic icon={step.icon} size={stepIconSize} />
                </span>
                <span className="block min-w-0 text-[20px] font-semibold leading-tight text-wyze-text">
                  {step.title}
                </span>
              </span>
              <span className="flex shrink-0 items-center gap-2 text-[12px] font-medium text-wyze-purple">
                {selectedCount} selected
                <ChevronUp size={15} aria-hidden="true" />
              </span>
            </span>
          </>
        ) : (
          <>
            <span
              className="block border-b border-[#3f4248] px-4 py-4 text-[10px] font-normal uppercase leading-none tracking-[0.22em] text-[#45474d] sm:px-7"
              data-testid={`step-eyebrow-row-${step.id}`}
            >
              {step.eyebrow}
            </span>
            <span
              className="flex items-center justify-between gap-4 px-[15px] py-5"
              data-step-closed-title-row
            >
              <span className="flex min-w-0 items-center gap-2">
                <span className="grid size-[48px] shrink-0 place-items-center text-wyze-muted">
                  <StepIconGraphic icon={step.icon} size={stepIconSize} />
                </span>
                <span className="block min-w-0 text-[22px] font-semibold leading-[1.08] text-wyze-text">
                  {step.title}
                </span>
              </span>
              <span className="flex shrink-0 items-center gap-2 text-[12px] font-medium text-wyze-purple">
                <ChevronDown size={15} aria-hidden="true" />
              </span>
            </span>
          </>
        )}
      </button>

      {isOpen ? (
        <div
          className="relative bg-wyze-panel px-3 pb-[18px] pt-4 sm:px-[14px]"
          data-testid={`step-content-${step.id}`}
        >
          <div className="grid grid-cols-1 gap-[14px] min-[720px]:grid-cols-2">
            {step.products.map((product, index) => (
              <ProductCard
                key={product.id}
                product={product}
                selection={getProductSelection(product)}
                className={cx(
                  index === 4 &&
                    "min-[720px]:col-span-2 min-[720px]:mx-auto min-[720px]:w-[330px]",
                )}
                onSetVariant={onSetVariant}
                onSetQuantity={onSetQuantity}
              />
            ))}
          </div>

          {step.nextLabel ? (
            <button
              type="button"
              className="mx-auto mt-3 flex min-h-[36px] w-fit min-w-[222px] max-w-full items-center justify-center whitespace-nowrap rounded-[4px] border border-wyze-purple bg-white px-6 text-[15px] font-semibold text-wyze-purple transition-colors hover:bg-wyze-purple-soft focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-wyze-purple"
              onClick={onNext}
            >
              Next: {step.nextLabel}
            </button>
          ) : null}

          <span className="sr-only">
            {stepIndex + 1}/{totalSteps}
          </span>
        </div>
      ) : null}
    </article>
  );
}
