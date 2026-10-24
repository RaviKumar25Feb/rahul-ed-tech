import React, { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { useDispatch } from 'react-redux';
import IconBtn from "../../../../common/IconBtn"


function CourseInformationForm() {

    const [loading, setLoading] = useState(false);
    const [courseCategories, setCourseCategories] = useState([]);
    const dispatch = useDispatch()

    useEffect( () => {
        const getCategories = async() => {
            setLoading(true);
            const categories = await fetchCourseCategories();
            if(categories.length > 0) {
                setCourseCategories(categories);
            }
            setLoading(false);
        }

        getCategories();
    }, []);

    const {
        register,
        handleSubmit,
        setValue,
        getValues,
        formState: {errors}
    } = useForm();

    const onSubmit = async(data) => {
        try{

        }catch(error) {

        }
    }

  return (
    <form
        onSubmit={handleSubmit(onSubmit)}
        className='rounded-md border-r-richblack-700 bg-richblue-800 p-5'
    >
    
        <div>
            <label htmlFor='courseTitle'>Course Title<sup>*</sup></label>
            <input 
                id='courseTitle'
                placeholder='Enter Course title'
                {...register("courseTitle", {required: true})}
                className='text-white w-full'
            />
            {errors.courseTitle && (<span>Course Title is required</span>)}
        </div>

        <div>
            <label htmlFor='courseShortDescription'>Course Short Description<sup>*</sup></label>
            <textarea 
                id='courseShortDescription'
                placeholder='Enter Description'
                {...register("courseShortDesc", {required: true})}
                className='min-h-[150px] w-full text-white'
            />
            {errors.courseShortDesc && (<span>Course Short Description is Required</span>)}
        </div>

        <div className='relative'>
            <label htmlFor='coursePrice'>Course Price<sup>*</sup></label>
            <input 
                id='coursePrice'
                placeholder='Enter Course Price'
                {...register("coursePrice", {required: true})}
                className='text-white w-full'
            />
            <HiOutlineCurrencyRupee className="absolute top-1/2 text-richblack-800 text-lg" />
            {errors.coursePrice && (<span>Course Price is required</span>)}
        </div>

        <div>
            <label htmlFor='courseCategory'>Course Category<sup>*</sup></label>
            <select 
                id='courseCategory'
                defaultValue=''
                {...register("courseCategory", {required: true})}
                
            >
                <option disabled value=''>
                    Choose a Category
                </option>

                {
                    !loading && 
                    courseCategories.map((category, index) => (
                        <option key={index} value={category?.id}>
                            {category?.name}
                        </option>
                    ))
                }
            </select>
            {errors.courseCategory && (<span>Course Category is required.</span>)}
        </div>
        
        {/* create a custom component for handling tags input
        <ChipInput /> */}

        {/* create a component for uploading and showing preview of media
        <Upload /> */}

        <div>
            <label htmlFor='courseBenefits'>Benefits of the Course</label>
            <textarea 
                id='courseBenefits'
                placeholder='Enter Benefits of the course'
                {...register("courseBenefits", {require: true})}
                className='text-white w-full min-h-[150px]'
            />
            {errors.courseBenefits && (<span>Course Benefits are required.</span>)}
        </div>

        {/* create a component for course instructions/requirements */}
        <RequirementField 
            name="courseRequirements"
            label="Requirements/Instructions"
            register={register}
            errors={errors}
            setValue={setValue}
            getValues={getValues}
        />

        <div>

            {
                editCourse && (
                    <button
                        onClick={() => dispatch(setStep(2))}
                        className='flex items-center gap-x-5 bg-richblack-300'
                    >
                        Continue Without Saving
                    </button>
                )
            }

            <IconBtn text={!editCourse ? "Next" : "Save Changes"} />

        </div>

    </form>
  )
}

export default CourseInformationForm