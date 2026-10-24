import React from 'react'
import CourseInformationForm from './CourseInformation/CourseInformationForm';

function RenderSteps() {
    const {step} = useSelector((state) => state.course);

    const steps = [
        {
            id: 1,
            title: "Course Information"
        },
        {
            id: 2,
            title: "Course Builder"
        },
        {
            id: 3,
            title: "Publish"
        },
    ]

  return (
    <div>
    
        <div>
            {
                steps.map((item) => (
                    <>
                        <div key={item.id}>
                            <div className={`${step === item.id
                            ? "bg-yellow-900 border-yellow-50 text-yellow-50"
                            : "border-richblack-100 bg-richblack-800 text-richblack-300"
                            }`}>

                                {
                                    step > item.id ? (<FaCheck />) : (item.id)
                                }

                            </div>
                        </div>

                        {/* Add Code for dashes between the labels
                        {
                            item.id !== steps.length ? ("----") : ("-----")
                        } */}


                        <div>
                            {
                                steps.map((item) => (
                                    <div key={item.id}>
                                        <div>
                                            <p>{item.title}</p>
                                        </div>
                                    </div>
                                ))
                            }
                        </div>


                        {/* different form depending upoan the steps */}
                        {step === 1 && <CourseInformationForm />}
                        {/* {step === 2 && <CourseBuilderForm />}
                        {step === 3 && <PublishCourse />} */}
                    </>


                ))
            }
        </div>

    </div>
  )
}

export default RenderSteps