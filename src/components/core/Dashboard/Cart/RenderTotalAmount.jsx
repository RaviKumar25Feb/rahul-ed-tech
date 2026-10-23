import React from 'react'
import IconBtn from '../../../common/IconBtn';
import { useSelector } from 'react-redux'

function RenderTotalAmount() {

    const {total} = useSelector((state) => state.cart);

    const handleBuyCourse = async () => {
        try{
            const courses = cart.map((course) => course._id);
            console.log("Bought these courses: ", courses);
        }
        catch(error){

        }
    }


  return (
    <div>

        <p>Total: </p>

        <p>Rs {total}</p>

        <IconBtn 
            text="Buy Now"
            onclick={handleBuyCourse}
            customClasses={"w-full justify-center"}
        />
    
    </div>
  )
}

export default RenderTotalAmount