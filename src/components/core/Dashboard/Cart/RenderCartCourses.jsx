import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { GiNinjaStar } from "react-icons/gi";
import { MdDelete } from "react-icons/md";
import { removeFromCart } from '../../../../slices/cartSlice';

function RenderCartCourses() {

    const {cart} = useSelector((state) => state.cart);

    const dispatch = useDispatch();

  return (
    <div>

        {
            cart.map((course, index) => (
                <div>
                    <div>
                        <img src={course?.thumbnail} />
                        <div>
                            <p>{course?.courseName}</p>
                            <p>{course?.category?.name}</p>
                            <div>
                                {/* api call for average rating */}
                                <span>4.8</span>
                                <ReactStars 
                                    count={5}
                                    size={20}
                                    edit={false}
                                    activeColor="#ffd700"
                                    emptyIcon={<GiNinjaStar/>}
                                    fullIcon={<GiNinjaStar/>}
                                />
                                <span>{course?.ratingAndRevies?.length} Ratings</span>
                            </div>
                            <div>
                                <span>Total Courses | Lesson | Beginner</span>
                            </div>
                        </div>
                    </div>

                    <div>
                        <button
                            onClick={() => dispatch(removeFromCart(course._id))}
                        >
                            <MdDelete />
                            <span>Remove</span>
                        </button>

                        <p>Rs {course?.price}</p>
                    </div>

                </div>
            ))
        }

    </div>
  )
}

export default RenderCartCourses