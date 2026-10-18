import React from 'react'
import ContactUsForm from '../components/core/ContactPage/ContactUsForm'
import Footer from '../components/common/Footer'
function Contact() {
  return (
    <div>
        <div>

            {/* Left wala card */}
            <div>
                {/* Panding */}
            </div>

            {/* right side form */}
            <div>
                <h1>Got a Idea? We’ve got the skills. Let’s team up</h1>

                <p>Tall us more about yourself and what you’re got in mind.</p>

                <ContactUsForm />
            </div>


            <div>
                <h1>Reviews from other leaners</h1>

                {/* <ReviewSlider /> */}
            </div>

            {/*Footer */}
            <Footer />

        </div>
    </div>
  )
}

export default Contact