import React, { useEffect, useState } from 'react'
import { set } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { setCourse } from '../../../../../slices/courseSlice';

function SubSectionModal({modalData, setModalData, add=false, view=false, edit=false}) {

    const {register, handleSubmit, setValue, getValues, formState: {errors}} = useForm();

    const {course} = useSelector((state) => state.course)
    const {token} = useSelector((state) => state.auth)
    const dispatch = useDispatch();
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if(view || edit) {
            setValue("lectureTitle", modalData.title)
            setValue("lectureDesc", modalData.description)
            setValue("lectureVideo", modalData.videoUrl)
        }
    }, [])

    const isFormUpdated = () => {
        const currentValues = getValues();

        if(currentValues.lectureTitle !== modalData.title ||
            currentValues.lectureDesc !== modalData.description ||
            currentValues.lectureVideo !== modalData.videoUrl
        ) {
            return true;
        }else{
            return false;
        }
    }

    const handleEditSubSection = async () => {
        const correntValues = getValues();

        const formData = new FormData();

        formData.append("sectionId", modalData.sectionId)
        formData.append("subSectionId", modalData.subSectionId)

        if(currentValues.lectureTitle !== modalData.title) {
            formData.append("title", currentValues.lectureTitle);
        }

        if(currentValues.lectureDesc !== modalData.description) {
            formData.append("description", currentValues.lectureDesc);
        }

        if(currentValues.lectureVideo !== modalData.videoUrl) {
            formData.append("videoUrl", currentValues.lectureVideo);
        }


        setLoading(true)
        //api call
        const result = await updateSubSection(formData, token);
        if(result) {
            dispatch(setCourse(result))
        }

        setModalData(null)
        setLoading(false)
    }

    const onSubmit = async (data) => {
        if(view) {
            return;
        }

        if(edit) {
            if(!isFormUpdated()) {
                toast.error("No Changes made to form")
                return;
            }else{
                //edit wali api call here
                handleEditSubSection();
            }
        }

        const formData = new FormData();
        formData.append("sectionId", modalData);
        formData.append("title", data.lectureTitle)
        formData.append("description", data.lectureDesc)
        formData.append("video", data.videoUrl)

        setLoading(true)

        //api call for creating new sub section
        const result = await createSubSection(formData, token);

        if(result) {
            dispatch(setCourse(result))
        }

        setModalData(null)
        setLoading(false)
        
    }



  return (
    <div>
    
        <div>
            <div>
                <p>{view && "Viewing"} {add & "Adding"} {edit && "Editing"} Lecture</p>

                <button
                    onClick={() => (!loading ? setModalData(null) : {})}
                >
                    <RxCross1 />
                </button>

                <form onSubmit={handleSubmit(onSubmit)}>

                    <Upload 
                        name="lectureVideo"
                        label="Lecture Video"
                        register={register}
                        setValue={setValue}
                        getValues={getValues}
                        errors={errors}
                        viewData={view ? modalData.videoUrl : null}
                        editData={edit ? modalData.videoUrl : null}
                    />

                    <div>
                        <label>Lecture title</label>
                        <input 
                            id='lectureTitle'
                            placeholder='Enter Lecture Title'
                            {...register("lectureTitle", {required: true})}
                            className='w-full'
                        />
                        {errors.lectureTitle && <span>Lecture Title is Required</span>}
                    </div>


                    <div>
                        <label>Lecture description</label>
                        <textarea 
                            id='lectureDesc'
                            placeholder='Enter lecture descrioption'
                            {...register("lectureDesc", {required: true})}
                            className='w-full h-min-[150px]'
                        />
                        {errors.lectureDesc && <span>Lecture Description is Required</span>}
                    </div>

                    {
                        <>
                            <IconBtn 
                            text="Cancel"
                            onclick={() => (!loading ? setModalData(null) : {})}
                        />

                        {
                            !view && (
                                <div>
                                    <IconBtn text={loading ? "Loading..." : edit ? "Save Changes" : "Save"} />
                                </div>
                            )
                        }
                        </>

                        
                    }

                </form>
            </div>
        </div>
    
    </div>
  )
}

export default SubSectionModal