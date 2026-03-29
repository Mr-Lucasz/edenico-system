type FooterCountryFlagProps = Readonly<{
  code: 'BR' | 'US' | 'ES'
  className?: string
}>

/** Bandeiras em SVG (emojis falham em muitos browsers Windows). */
export function FooterCountryFlag({ code, className }: FooterCountryFlagProps) {
  const svgProps = {
    className,
    viewBox: '0 0 20 14' as const,
    'aria-hidden': true as const,
    focusable: 'false' as const,
  }

  if (code === 'BR') {
    return (
      <svg {...svgProps}>
        <rect width="20" height="14" fill="#009b3a" />
        <polygon fill="#fedf00" points="10,1.5 18.5,7 10,12.5 1.5,7" />
        <circle cx="10" cy="7" r="2.8" fill="#002776" />
      </svg>
    )
  }

  if (code === 'US') {
    return (
      <svg {...svgProps}>
        <rect width="20" height="14" fill="#b22234" />
        <path
          fill="#fff"
          d="M0,2h20v1.15H0zm0,2.3h20v1.15H0zm0,2.3h20v1.15H0zm0,2.3h20v1.15H0zm0,2.3h20v1.15H0zm0,2.3h20v1.15H0z"
        />
        <rect width="8.5" height="7.6" fill="#3c3b6e" />
        <g fill="#fff">
          <circle cx="1.3" cy="1.15" r="0.35" />
          <circle cx="2.9" cy="1.15" r="0.35" />
          <circle cx="4.5" cy="1.15" r="0.35" />
          <circle cx="6.1" cy="1.15" r="0.35" />
          <circle cx="7.7" cy="1.15" r="0.35" />
          <circle cx="2.1" cy="2.3" r="0.35" />
          <circle cx="3.7" cy="2.3" r="0.35" />
          <circle cx="5.3" cy="2.3" r="0.35" />
          <circle cx="6.9" cy="2.3" r="0.35" />
          <circle cx="1.3" cy="3.45" r="0.35" />
          <circle cx="2.9" cy="3.45" r="0.35" />
          <circle cx="4.5" cy="3.45" r="0.35" />
          <circle cx="6.1" cy="3.45" r="0.35" />
          <circle cx="7.7" cy="3.45" r="0.35" />
          <circle cx="2.1" cy="4.6" r="0.35" />
          <circle cx="3.7" cy="4.6" r="0.35" />
          <circle cx="5.3" cy="4.6" r="0.35" />
          <circle cx="6.9" cy="4.6" r="0.35" />
          <circle cx="1.3" cy="5.75" r="0.35" />
          <circle cx="2.9" cy="5.75" r="0.35" />
          <circle cx="4.5" cy="5.75" r="0.35" />
          <circle cx="6.1" cy="5.75" r="0.35" />
          <circle cx="7.7" cy="5.75" r="0.35" />
        </g>
      </svg>
    )
  }

  // ES
  return (
    <svg {...svgProps}>
      <rect width="20" height="3.5" fill="#aa151b" />
      <rect y="3.5" width="20" height="7" fill="#f1bf00" />
      <rect y="10.5" width="20" height="3.5" fill="#aa151b" />
    </svg>
  )
}
