import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import IconBtn from '../../../common/IconBtn';
import {COURSE_STATUS} from "../../../../utils/constants"
import { resetCourseState } from '../../../../slices/courseSlice';

function PublishCourse() {

    const {register, handleSubmit, setValue, getValues} = useForm();
    const {course} = useSelector( (state) => state.course );
    const {token} = useSelector( (state) => state.auth );
    const [loading, setLoading] = useState(false);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const goToCourse = () => {
        dispatch(resetCourseState());
        navigate("/dashboard/my-courses")
    }
    
    const handleCoursePublish = async() => {
        //check if form has been updated or not
        if(
            (course?.status === COURSE_STATUS.DRAFT && getValues("public") === false) ||
            (course?.status === COURSE_STATUS.PUBLISHED && getValues("public") === true)
        ) {
            //form has not been updated
            //no need to make api call for these cases
            goToCourse();
            return;
        }

        const formData = new FormData();
        formData.append("courseId", course._id)
        const courseStutus = getValues("public") ? COURSE_STATUS.PUBLISHED : COURSE_STATUS.DRAFT;
        formData.append("status", courseStutus);
        setLoading(true)
        const result = await editCourseDetails(formData, token);
        if(result) {
            goToCourse();
        }
        setLoading(false);
    }

    const onSubmit = async(data) => {
        //api call here
        handleCoursePublish();
    }

    const goBack = () => {
        dispatch(setStep(2));
    }

  return (
    <div>
    
        <p>Publish Settings</p>


        <form onSubmit={handleSubmit(onSubmit)}>

            <div className='my-6 mb-8'>
                {/* CheckBox */}
                <label htmlFor='public' className='flex items-center gap-3'>
                    <input 
                        type='checkbox'
                        id='public'
                        {...register("public")}
                        className='border-gray-300 h-4 w-4 rounded-md text-richblack-50'
                    />

                    <span className='ml-2 text-richblack-400'>Make this course Public</span>
                </label>
            </div>

            {/* Next Prev Button */}
            <div className='ml-auto flex max-w-max items-center gap-x-4'>

                <button
                    disabled={loading}
                    type='button'
                    onClick={goBack}
                    className='flex cursor-pointer items-center gap-x-2 rounded-md bg-richblack-300 py-2 px-4'
                >
                    Back
                </button>

                <IconBtn 
                    disabled={loading}
                    text="Save Changes"
                />

            </div>
        
        </form>
    
    </div>
  )
}

export default PublishCourse