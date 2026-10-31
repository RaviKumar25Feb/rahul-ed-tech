import React from 'react'
import { useDispatch, useSelector } from 'react-redux';

function EditCourse() {

    const {courseId} = useParams();
    const {course} = useSelector((state) => state.course);
    const [loading, setLoading] = useState(false);
    const dispatch = useDispatch();
    const {token} = useSelector((state) => state.auth)

    useEffect(() => {

        setLoading(true);
        const editCourse = async() => {
            const result = await getFullDetailsCourse(courseId, token);
            if(result?.courseDetails){
                dispatch(setEditCourse(true))
                dispatch(setCourse(result?.courseDetails));
            }
        }
        setLoading(false);

    }, [])

    if(loading) {
        return (
            <div className='loading'>Loading...</div>
        )
    }

  return (
    <div>

        <h1>Edit Course</h1>

        <div>
            {
                course ? (
                    <RenderSteps />
                ) : (
                    <p>Course Not Found</p>
                )
            }
        </div>

    </div>
  )
}

export default EditCourse