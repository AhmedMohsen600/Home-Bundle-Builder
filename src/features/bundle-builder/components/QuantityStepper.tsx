import { Minus, Plus } from "lucide-react";

interface QuantityStepperProps {
  label: string;
  quantity: number;
  onChange: (quantity: number) => void;
  disabledDecrement?: boolean;
  testId?: string;
}

export function QuantityStepper({
  label,
  quantity,
  onChange,
  disabledDecrement = false,
  testId,
}: QuantityStepperProps) {
  return (
    <div
      className="inline-flex shrink-0 items-center gap-[10px] text-center text-[28px] font-normal leading-none text-wyze-text"
      data-testid={testId ? `${testId}-stepper` : "quantity-stepper"}
    >
      <button
        type="button"
        aria-label={`Decrease ${label}`}
        disabled={quantity <= 0 || disabledDecrement}
        className="grid size-[20px] place-items-center rounded-[4px] bg-white text-[#6f7882] border-2 border-[#E6EBF0]"
        onClick={() => {
          onChange(quantity - 1);
        }}
      >
        <Minus size={10} fontWeight={900} color="#CED6DE" aria-hidden="true" />
      </button>
      <span
        className="grid text-black font-medium place-items-center text-base"
        data-testid={testId}
      >
        {quantity}
      </span>
      <button
        type="button"
        aria-label={`Increase ${label}`}
        className="grid size-[20px] place-items-center rounded-[4px] bg-[#f1f5f8] text-[#4d565f] transition-colors hover:bg-[#e8eef4] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-wyze-purple"
        onClick={() => {
          onChange(quantity + 1);
        }}
      >
        <Plus size={8} aria-hidden="true" />
      </button>
    </div>
  );
}
