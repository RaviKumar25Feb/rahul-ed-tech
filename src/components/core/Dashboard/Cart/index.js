import React from 'react'
import { useSelector } from 'react-redux'

function index() {

    const {total, totalItems} = useSelector((state) => state.auth);

  return (
    <div className='text-white'>
    
        <h1>Your Cart</h1>

        <p>{totalItems} Courses in Cart</p>

        {
            total > 0 ? 
            (
                <div className='flex'>
                    <RenderCartCourses />
                    <RenderTotalAmount />
                </div>
            ) : (
                <div>
                    Your cart is empty
                </div>
            )
        }
    
    </div>
  )
}

export default index