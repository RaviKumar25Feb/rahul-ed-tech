import React from 'react'
import HighlightText from '../components/core/HomePage/HighlightText'
import BannerImage1 from "../assets/Images/aboutus1.webp"
import BannerImage2 from "../assets/Images/aboutus2.webp"
import BannerImage3 from "../assets/Images/aboutus3.webp"
import Quote from '../components/core/AboutPage/Quote'
import FoundingImage from "../assets/Images/FoundingStory.png"
import StatsComponent from '../components/core/AboutPage/StatsComponent'
import LearningGrid from '../components/core/AboutPage/LearningGrid'
import ContactForm from '../components/core/AboutPage/ContactForm'
import Footer from '../components/common/Footer'
function About() {
  return (
    <div className='text-white mx-auto'>
    
        {/* Section 1 */}
        <section >

            <header>
                <h1 className='text-3xl'>Driving Innovation in Online Education for a </h1>
                <HighlightText text={"Brighter Future"} />

                <p>Studynotion is at the forefront of driving innovation in online education. We're passionate about creating a brighter future by offering cutting-edge courses, leveraging emerging technologies, and nurturing a vibrant learning community.</p>
            </header>

            <div className='flex gap-x-3 mx-auto'>

                <img src={BannerImage1} />
                <img src={BannerImage2} />
                <img src={BannerImage3} />

            </div>

        </section>

        {/* Section 2 */}
        <section>
            <div>
                <Quote />
            </div>
        </section>

        {/* Section 3 */}
        <section>
            {/* founding stroy wala div */}
            <div className='flex'>
                {/* left part */}
                <div>
                    <h1>Our Founding Story</h1>
                    <p>Our e-learning platform was born out of a shared vision and passion for transforming education. It all began with a group of educators, technologists, and lifelong learners who recognized the need for accessible, flexible, and high-quality learning opportunities in a rapidly evolving digital world.</p>
                    <p>As experienced educators ourselves, we witnessed firsthand the limitations and challenges of traditional education systems. We believed that education should not be confined to the walls of a classroom or restricted by geographical boundaries. We envisioned a platform that could bridge these gaps and empower individuals from all walks of life to unlock their full potential.</p>
                </div>

                {/* right part */}
                <div>
                    <img src={FoundingImage} />
                </div>
            </div>

            {/* Vision and mission wala div */}
            <div className='flex'>
                {/* left wala part */}
                <div>
                    <h1 className='text-2xl'>Our Vision</h1>
                    <p>With this vision in mind, we set out on a journey to create an e-learning platform that would revolutionize the way people learn. Our team of dedicated experts worked tirelessly to develop a robust and intuitive platform that combines cutting-edge technology with engaging content, fostering a dynamic and interactive learning experience.</p>
                </div>

                {/* right wala part */}
                <div>
                    <h1 className='text-2xl'>Our Mission</h1>
                    <p>our mission goes beyond just delivering courses online. We wanted to create a vibrant community of learners, where individuals can connect, collaborate, and learn from one another. We believe that knowledge thrives in an environment of sharing and dialogue, and we foster this spirit of collaboration through forums, live sessions, and networking opportunities.</p>
                </div>
            </div>
        </section>

        {/* Section 4 */}
        <StatsComponent />

        {/* Section 5 */}
        <LearningGrid />

        {/* Section 6 */}
        <section>
            <ContactForm />
        </section>

        {/* Section 7 */}
        <section>
            <div>
                <h1>Reviews from other learners</h1>
                {/* <ReviewSlider /> */}
            </div>
        </section>


        {/*Footer */}
      <Footer />

    </div>
  )
}

export default About
