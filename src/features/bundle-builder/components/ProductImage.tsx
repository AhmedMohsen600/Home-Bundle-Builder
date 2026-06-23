import { useState } from 'react'
import type { StepIcon } from '../types/bundle.types'
import { cx } from '../utils/classNames'
import { StepIconGraphic } from './StepIconGraphic'

interface ProductImageProps {
  src: string
  alt: string
  fallbackIcon: StepIcon
  className?: string
}

export function ProductImage({
  src,
  alt,
  fallbackIcon,
  className,
}: ProductImageProps) {
  const [hasError, setHasError] = useState(false)

  if (hasError || !src) {
    return (
      <span
        className={cx(
          'grid place-items-center rounded-[4px] bg-wyze-panel-soft text-wyze-purple',
          className,
        )}
        role={alt ? 'img' : undefined}
        aria-label={alt || undefined}
        aria-hidden={alt ? undefined : true}
      >
        <StepIconGraphic icon={fallbackIcon} />
      </span>
    )
  }

  return (
    <img
      className={className}
      src={src}
      alt={alt}
      loading="lazy"
      onError={() => {
        setHasError(true)
      }}
    />
  )
}
