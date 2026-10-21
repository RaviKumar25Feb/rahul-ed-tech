import React from 'react'
import { useSelector } from 'react-redux'
import { Outlet } from 'react-router-dom';
import Sidebar from '../components/core/Dashboard/Sidebar';

function Dashboard() {

    const {loading: authLoading} = useSelector((state) => state.auth);
    const {loading: profileLoading} = useSelector((state) => state.profile);

    if(authLoading || profileLoading) {
        return (
            <div className='mt-10'>
                <div className='spinner'></div>
            </div>
        )
    }

  return (
    <div className='flex flex-row'>

        <Sidebar />


        <div className='mx-auto w-11/12 max-w-[100px] py-10'>
            <Outlet />
        </div>

    </div>
  )
}

export default Dashboard