/* eslint-disable react/prop-types */
import React from 'react'
import {Dropdown} from 'react-bootstrap'
import cookie from 'cookie-cutter'

export function Combobox(
  {title = '', itemsList = []},
  itemsTitle = '',
  onItemClick
) {
  const CustomToggle = React.forwardRef(({children, onClick}, ref) => (
    <a
      className="combobox-toggle"
      href=""
      ref={ref}
      onClick={e => {
        e.preventDefault()
        onClick(e)
      }}
    >
      {children}
    </a>
  ))

  return (
    <Dropdown>
      <Dropdown.Toggle as={CustomToggle} id="dropdown-custom-components">
        {title}
        <img
          src="/static/images/dropdown-menu.png"
          alt="toggle-arrow"
          width="16"
          style={{margin: '0 0 0.2rem 0.5rem'}}
        />
      </Dropdown.Toggle>

      <Dropdown.Menu>
        <Dropdown.Header>Choose a language</Dropdown.Header>
        {itemsList.map(lang => (
          <Dropdown.Item
            href={lang.href}
            onClick={() => {
              cookie.set('NEXT_LOCALE', lang.key, {
                expires: new Date(2147483647 * 1000),
                path: '/',
              })
            }}
            onSelect={onItemClick}
            eventKey={lang.key}
            key={lang.key}
          >
            {lang.title}
          </Dropdown.Item>
        ))}
      </Dropdown.Menu>
    </Dropdown>
  )
}
