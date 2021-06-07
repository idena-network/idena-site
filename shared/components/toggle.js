/* eslint-disable react/prop-types */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import {useContext} from 'react'
import {AccordionContext, useAccordionToggle} from 'react-bootstrap'
import {useHash} from '../useHash'

export function CustomToggle({children, eventKey}) {
  const [, setHash] = useHash()
  const currentEventKey = useContext(AccordionContext)
  const onAccordionClick = useAccordionToggle(eventKey, () => {
    setHash(eventKey)
  })
  const isCurrentEventKey = currentEventKey === eventKey

  return (
    <a
      style={{cursor: 'pointer'}}
      aria-expanded={isCurrentEventKey}
      onClick={onAccordionClick}
    >
      {children}
    </a>
  )
}
