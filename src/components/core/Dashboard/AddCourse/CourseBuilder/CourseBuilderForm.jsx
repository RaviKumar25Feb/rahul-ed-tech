import React from 'react'
import { useForm } from 'react-hook-form'
import IconBtn from '../../../../common/IconBtn';
import { IoAddCircleOutline } from "react-icons/io5";
import { FaArrowLeft } from "react-icons/fa";
import { FaArrowRight } from "react-icons/fa";
import { useDispatch, useSelector } from 'react-redux';
import { setCourse } from '../../../../../slices/courseSlice';

function CourseBuilderForm() {

    const {register, handleSubmit, setValue, formState: {errors}} = useForm();
    const {course} = useState((state) => state.course);
    const dispatch = useDispatch();
    const [loading, setLoading] = useState(false);

    const [editSectionName, setEditSectionName] = useState(null);

    const onSubmit = async(data) => {
        setLoading(true);
        let result;

        if(editSectionName) {
            //we are editing the section name
            result = await upadteSection({
                sectionName: data.sectionName,
                sectionId: editSectionName,
                courseId: course._id,
            }, token)
        }else {
            //we are creating new section name
            result = await createSection({
                sectionName: data.sectionName,
                courseId: course._id,
            }, token);
        }

        // update values
        if(result) {
            dispatch(setCourse(result))
            setEditSectionName(false);
            setValue("sectionName", "")
        }

        //loading false
        setLoading(false);
    }

    const cancelEdit = () => {
        setEditSectionName(false);
        setValue("sectionName", "");
    }

    const goBack = () => {
        dispatch(setStep(1));
        dispatch(setEditCourse(true));
    }

    const goToNext = () => {
        if(course.courseContent.length === 0){
            toast.error("please create at least one section");
            return;
        }
        if(course.courseContent.some((section) => section.subSection.length === 0)){
            toast.error("Please create at least one sub section also");
            return;
        }
        dispatch(setStep(3));
    }

    const handleChangeEditSectionName = () => {

        if(editSectionName === sectionId) {
            cancelEdit();
            return;
        }

        //defined the behaviour of this function
        setEditSectionName(sectionId)
        setValue("sectionName", sectionName)
    }

  return (
    <div>
    
        <p>
            Course Builder
        </p>

        <form onSubmit={handleSubmit(onSubmit)}>
            <label>Section Name</label>
            <input 
                id='sectionName'
                placeholder='Add Section Name'
                {...register("sectionName", {required: true})}
                className='w-full'
            />
            {errors.sectionName && <span>Section name is required.</span>}


            <div>
            <IconBtn 
                type="Submit"
                text={editSectionName ? "Edit Section Name" : "Create Section"}
                outline={true}
            >
                <IoAddCircleOutline className='text-yellow-50' />
            </IconBtn>

            {
                editSectionName && (
                    <button
                        type='Submit'
                        onClick={cancelEdit}
                    >
                        Cancel Edit
                    </button>
                )
            }
            </div>
        </form>


        {
            course.courseContent.length > 0 && (
                <NestedView handleChangeEditSectionName={handleChangeEditSectionName}/>
            )
        }


        <div className='flex justify-end'>
            <button
                onClick={goBack}
            >
                <FaArrowLeft/>Back
            </button>

            <IconBtn text="Next" onclick={goToNext}>
                <FaArrowRight />
            </IconBtn>
        </div>
    
    </div>
  )
}

export default CourseBuilderForm