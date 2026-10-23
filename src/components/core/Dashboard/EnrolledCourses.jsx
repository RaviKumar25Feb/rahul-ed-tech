import ProgressBar from '@ramonak/react-progress-bar';
import React, { useEffect } from 'react'
import { useSelector } from 'react-redux';

function EnrolledCourses() {

    const [enrolledCourses, setEnrolledCourses] = useState(null);

    const {token} = useSelector((state) => state.auth);

    const getAllEnrolledCourses = async () => {
        try{
            const response = await getUserEnrolledCourses(token);
            setEnrolledCourses(response);

        }catch(error){
            console.log("Unable to fetch enrolled courses data");
        }
    }

    useEffect(() => {
        getAllEnrolledCourses();
    }, []);

  return (
    <div className='text-white'>

        <div>
            <h1>Enrolled Courses</h1>

            {
                !enrolledCourses ? (<div className='loading'></div>) 
                : !enrolledCourses.length ? (<p>You dont have any courses yet</p>)
                : (
                    <div>
                        <div>
                            <p>Course Name</p>
                            <p>Durations</p>
                            <p>Progress</p>
                        </div>

                        {/* Enrolled courses ke cards yha se start hote hai */}
                        <div>
                            {
                                enrolledCourses.map((course, index ) => (
                                    <div>

                                        <div>
                                            <img src={course?.thumbnail} />
                                            <div>
                                                <p>{course?.courseName}</p>
                                                <p>{course?.courseDescription}</p>
                                            </div>
                                        </div>

                                        <div>
                                            {course?.totalDuration}
                                        </div>

                                        <div>
                                            <p>Progress: {course.progressPercentage || 0}%</p>

                                            <ProgressBar 
                                                completed={course.progressPercentage || 0}
                                                height='8px'
                                                isLabelVisible={false}
                                            />
                                        </div>

                                    </div>
                                ))
                            }
                        </div>
                    </div>
                )

            }
        </div>

    </div>
  )
}

export default EnrolledCourses