import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'
import IconBtn from '../../common/IconBtn';
import CourseTable from './InstructorCourses';
import { useNavigate } from 'react-router-dom';
import {fetchInstructorCourses} from "../../../services/operations/coursesDetails"

function MyCourses() {
    const navigate = useNavigate()
    const {token} = useSelector((state) => state.auth);
    const [courses, setCourses] = useState([]);

    useEffect(() => {
        const fetchCourses = async() => {
            const result = await fetchInstructorCourses(token)
            if(result) {
                setCourses(result);
            }
        }

        //call here
        fetchCourses();
    }, []);

  return (
    <div>
    
        <div className='flex items-center justify-center'>
            <h1 className='text-richblack-5 font-medium'>My Courses</h1>

            <IconBtn 
                text="New Course"
                onclick={() => navigate("/dashboard/add-course")}
            >
                <VsAdd />
            </IconBtn>

            {courses && <CourseTable courses={courses} setCourses={setCourses} />}
        </div>

    </div>
  )
}

export default MyCourses