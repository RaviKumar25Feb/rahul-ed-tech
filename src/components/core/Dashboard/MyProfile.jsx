import React from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom';
import IconBtn from '../../common/IconBtn';

function MyProfile() {

  const {user} = useSelector((state) => state.profile);
  console.log("user additional data: ", user.additionalDetails)
  console.log("user data: ", user)

  const navigate = useNavigate();

  return (
    <div className='text-white'>
    
      <h1>My Profile</h1>

      {/* Section1 */}
      <div className='flex justify-between gap-20'>
        <div className='flex'>
          <img src={user?.image} alt={`profile-${user?.firstName}`} className='aspect-sqaure w-[78px] rounded-full object-cover' />

          <div>
            <p>{user?.firstName + " " + user?.lastName}</p>
            <p>{user?.email}</p>
          </div>
        </div>

        <IconBtn text="Edit" onclick={() => navigate("/dashboard/settings")} />

      </div>

      {/* Section 2 */}
      <div>
        <div className='flex gap-x-5'>
          <p>About</p>
          <IconBtn 
            text="Edit"
            onclick={() => navigate("/dashboard/settings")}
          />
          <p>{user?.additionalDetails?.about ?? "StudyNotion Ed-Tech Platform"}</p>
        </div>

        <div className='flex flex-col gap-10'>
          <div className='flex gap-x-5'>
            <p>First Name</p>
            <p>{user?.firstName}</p>
          </div>
          <div className='flex gap-x-5'>
            <p>Email</p>
            <p>{user?.email}</p>
          </div>
          <div className='flex gap-x-5'>
            <p>Gender</p>
            <p>{user?.additionalDetails?.gender ?? "Add Genger"}</p>
          </div>
          <div className='flex gap-x-5'>
            <p>Last Name</p>
            <p>{user?.lastName}</p>
          </div>
          <div className='flex gap-x-5'>
            <p>Phone Number</p>
            <p>{user?.additionalDetails?.contactNumber ?? "Add Contact Number"}</p>
          </div>
          <div className='flex gap-x-5'>
            <p>Date of Birth</p>
            <p>{user?.additionalDetails?.dateOfBirth ?? "Add Date of Birth"}</p>
          </div>
        </div>
      </div>
    
    </div>
  )
}

export default MyProfile