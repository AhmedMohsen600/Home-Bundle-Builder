import { cx } from "../utils/classNames";
import { formatPrice } from "../utils/formatters";

interface PriceBlockProps {
  price: number;
  compareAt?: number;
  billing?: string;
  alignRight?: boolean;
  variant?: "default" | "review";
}

export function PriceBlock({
  price,
  compareAt,
  billing,
  alignRight,
  variant = "default",
}: PriceBlockProps) {
  const isReviewVariant = variant === "review";

  return (
    <div
      className={cx(
        "flex flex-col whitespace-nowrap leading-none",
        alignRight
          ? "items-start sm:items-end sm:text-right"
          : "items-end text-right",
      )}
    >
      {compareAt && compareAt > price ? (
        <s
          className={cx(
            "font-normal",
            isReviewVariant
              ? "text-[14px] leading-4 tracking-[0.005em] text-wyze-discount"
              : "text-base text-wyze-card-discount",
          )}
        >
          {formatPrice(compareAt)}
        </s>
      ) : null}
      <p
        className={cx(
          "mt-0.5 font-normal",
          isReviewVariant
            ? "text-[14px] leading-4 tracking-[0.005em] text-wyze-price"
            : "text-base font-black text-wyze-card-price",
          price === 0 && !isReviewVariant && "text-wyze-green",
        )}
      >
        {price === 0 ? "FREE" : formatPrice(price)}
        {billing ? (
          <span
            className={cx(
              "ml-0.5",
              isReviewVariant
                ? "text-[14px] leading-4 tracking-[0.005em] text-wyze-price"
                : "text-base text-wyze-card-price",
            )}
          >
            {billing}
          </span>
        ) : null}
      </p>
    </div>
  );
}
