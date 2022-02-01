import React from 'react'
import './Contacts.css'
export default function Contacts(props) {
  const {authModalOpen} = props
  return <h1 className={authModalOpen ? 'contactsH blured' : 'contactsH'}> Контакты </h1>
}
