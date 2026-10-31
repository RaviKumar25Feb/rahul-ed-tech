import React from 'react'
import { useNavigate } from 'react-router-dom'
import {confirmationModal} from "../../../common/ConfirmationModal"
import { useSelector } from 'react-redux';
import {Table, Tbody, Thead, Tr, Td} from "react-super-responsive-table";


function CourseTable() {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [confirmationModal, setConfirmationModal] = useState(null);
    const {token} = useSelector((state) => state.auth);

    const handleCourseDelete = async(courseId) => {
        setLoading(true)
        await deleteCourse({courseId: courseId}, token)
        const result = await fetchInstructorCourses(token);
        if(result) {
            setCourses(result);    
        }

        setConfirmationModal(null)
        setLoading(false)
    }

  return (
    <div>
    
        <Table>
            <Thead>
                <Tr>
                    <Th>
                        Courses
                    </Th>
                    <Th>
                        Duration
                    </Th>
                    <Th>
                        Price
                    </Th>
                    <Th>
                        Actions
                    </Th>
                </Tr>
            </Thead>

            <Tbody>

                {
                    courses?.length === 0 ? (
                        <Tr>
                            <Td>
                                No Courses Found
                            </Td>
                        </Tr>
                    ) : (
                        courses?.map((course) => (
                            <Tr key={course._id} className="flex gap-x-10 border-b border-richblack-50">
                                <Td>
                                    <img 
                                        src={course?.thumbnail} 
                                        alt={course?.courseName}
                                        className='h-[150px] w-[180px] rounded-md'
                                    />

                                    <div>
                                        <p>{course.courseName}</p>
                                        <p>{course.courseDescription}</p>
                                        <p>Created: {formatDate(course.createAt)}</p>
                                    </div>

                                    {
                                        course.status === COURSE_STATUS.DRAFT ? (
                                            <p>
                                                <HiClock size={14} />
                                                Drafted
                                            </p>
                                        ) : (
                                            <p>
                                                <FaCheck size={14} />
                                                Published
                                            </p>
                                        )
                                    }
                                </Td>

                                <Td>
                                    2h 30min
                                </Td>
                                <Td>
                                    {course.price}
                                </Td>
                                <Td>
                                    <button
                                        disabled={loading}
                                        onClick={() => navigate(`/dashboard/edit-course/${course._id}`)}
                                    >
                                        <FiEdit2 size={20} />
                                    </button>

                                    <button
                                        disabled={loading}
                                        onClick={() => {
                                            setConfirmationModal({
                                                text1: "Do you want to delete this course",
                                                text2: "All the data related to this course will be deleted",
                                                btn1Text: !loading ? "Delete" : "Loading...",
                                                btn2Text: "Cancel",
                                                btn1Handler: !loading ? () => handleCourseDelete(course._id)
                                                : () => {},
                                                btn2handler: !loading ? () => setConfirmationModal(null)
                                                : () => {}
                                            })
                                        }}
                                        title= "Delete"
                                    >
                                        <RiDeleteBin6Line size={20} />
                                    </button>
                                </Td>
                            </Tr>
                        ))
                    )
                }

            </Tbody>
        </Table>

        {confirmationModal && <confirmationModal modalData={confirmationModal} />}
    
    </div>
  )
}

export default CourseTable