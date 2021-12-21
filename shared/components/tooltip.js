/* eslint-disable react/jsx-props-no-spreading */
import {useState, useRef} from 'react'
import {Tooltip} from 'reactstrap'

export function TooltipText({
  tooltip,
  children,
  placement = 'bottom',
  ...props
}) {
  const [tooltipOpen, setTooltipOpen] = useState(false)

  const ref = useRef(null)
  return (
    <>
      <span ref={ref} {...props}>
        {children}
      </span>
      {ref.current && (
        <Tooltip
          target={ref.current}
          placement={placement}
          arrowClassName="toolTipArrow"
          popperClassName="toolTipPopper"
          innerClassName="toolTipInnerPopper"
          offset="0 8px"
          isOpen={tooltipOpen}
          toggle={() => setTooltipOpen(!tooltipOpen)}
        >
          {tooltip}
        </Tooltip>
      )}
    </>
  )
}

export function TooltipLogo({
  tooltip,
  placement = 'bottom',
  imageLink,
  href,
  isWidth = false,
  ...props
}) {
  const [tooltipOpen, setTooltipOpen] = useState(false)
  const imgColor = `/static/images/${imageLink}.svg`
  const imgGray = `/static/images/${imageLink}-gray.svg`

  const ref = useRef(null)
  return (
    <>
      <div ref={ref} className={`partners-info ${isWidth ? 'width' : ''}`}>
        <img className="logo-gray" src={imgGray} alt={tooltip} />
        <img className="logo-color" src={imgColor} alt={tooltip} />
        <a href={href} target="_blank" rel="noreferrer">
          {' '}
        </a>
      </div>
      {ref.current && (
        <Tooltip
          target={ref.current}
          placement={placement}
          arrowClassName="toolTipArrow"
          popperClassName="toolTipPopper logo"
          innerClassName="toolTipInnerPopper"
          offset="0 8px"
          isOpen={tooltipOpen}
          toggle={() => setTooltipOpen(!tooltipOpen)}
        >
          {tooltip}
        </Tooltip>
      )}
    </>
  )
}
