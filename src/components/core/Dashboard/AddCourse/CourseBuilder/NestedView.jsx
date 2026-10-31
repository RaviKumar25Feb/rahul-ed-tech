import React from 'react'
import { useDispatch } from 'react-redux';
import SubSectionModal from './SubSectionModal';

function NestedView({handleChangeEditSectionName}) {

    const {course} = useSelector((state) => state.course);
    const {token} = useSelector((state) => state.auth);
    const dispatch = useDispatch();

    const [vewSubSection, setViewSubSection] = useState(null);
    const [editSubSection, setEditSubSection] = useState(null);
    const [addSubSection, setAddSubSection] = useState(null);

    const [confirmationModal, setConfirmationModal] = useState(null);

    const handleDeleteSection = () => {

    }

    const handleDeleteSubSection = () => {

    }

  return (
    <div>

        <div className='rounded-md bg-richblack-700 p-5 px-6'>

            {
                course?.courseContent?.map((section) => (
                    <details key={section._id} open>
                        <summary className='flex items-center justify-between'>

                            <div>
                                <RxDropdownMenu />
                                <p>{section.sectionName}</p>
                            </div>

                            <div>
                                <button onClick={handleChangeEditSectionName(section._id, section.sectionName)}>
                                    <MdEdit />
                                </button>

                                <button onClick={() => {
                                    setConfirmationModal({
                                        text1: "Delete this section",
                                        text2: "All the sub section will be deleted",
                                        btn1Text: "Delete",
                                        btn2Text: "Cancel",
                                        btn1Handler: () => handleDeleteSection(section._id),
                                        btn2Handler: () => setConfirmationModal(null),
                                    })
                                }}>
                                    <RiDeleteBin6Line />
                                </button>

                                <span>|</span>

                                <BiSolidDownArrow />
                            </div>

                        </summary>

                        <div>
                            {
                                section.subSection.map((data) => (
                                    <div key={data._id} 
                                        onClick={setViewSubSection(data)}
                                        className='flex items-center justify-between gap-x-4 border-b-2'
                                    >
                                    
                                        <div className='flex items-center gap-x-3'>

                                            <RxDropdownMenu />
                                            <p>{data?.title}</p>

                                        </div>

                                        <div className='flex item-center gap-x-3'>
                                            <button
                                                onClick={() => setEditSubSection({...data, sectionId: section._id})}
                                            >
                                                <MdEdit />
                                            </button>

                                            <button 
                                                onClick={() => setConfirmationModal({
                                                    text1: "Delete this sub section",
                                                    text2: "All the lectures will be deleted",
                                                    btn1Text: "Delete",
                                                    btn2Text: "Cancel",
                                                    btn1Handler: () => handleDeleteSubSection(data._id, section._id),
                                                    btn2Handler: () => setConfirmationModal(null),
                                                })}
                                            >
                                                <RiDeleteBin6Line />
                                            </button>
                                        </div>

                                    </div>
                                ))
                            }

                            <button 
                                onClick={setAddSubSection(section._id)}
                                className='mt-4 flex items-center gap-x-2'
                            >
                                <AiOutlinePlus />
                                <p>Add Lecture</p>
                            </button>
                        </div>
                    </details>
                ))
            }

        </div>

        {
            addSubSection ? (<SubSectionModal 
                modalData={addSubSection}
                setModalData={setModalData}
                add={true}
            />)
            : setViewSubSection ? (<SubSectionModal 
                modalData={viewSubSection}
                setModalData={setViewSubSection}
                view={true}
            />)
            : editSubSection ? (<SubSectionModal 
                modalData={editSubSection}
                setModalData={setEditSubSection}
                edit={true}
            />)
            : (<div></div>)
        }

    </div>
  )
}

export default NestedView