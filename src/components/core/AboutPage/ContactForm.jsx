import React from 'react'
import ContactUsForm from '../ContactPage/ContactUsForm'

function ContactForm() {
  return (
    <div className='mx-auto'>

        <h1>Get in Touch</h1>

        <p>
            We’d love to here for you, Please fill out this form.
        </p>

        <div className='my-5'>
            <ContactUsForm />
        </div>

    </div>
  )
}

export default ContactForm