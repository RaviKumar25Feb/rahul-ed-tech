import React from 'react'
import {sidebarLinks} from "../../../data/dashboard-links"
import SidebarLink from './SidebarLink';
import { logout } from '../../../services/operations/authAPI';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import ConfirmationModal from '../../common/ConfirmationModal';

function Sidebar() {

    const {confirmationModal, setConfirmationModal} = useState(null);
    const dispatch = useDispatch();
    const navigate = useNavigate();

  return (
    <div className='text-white'>

        <div>
            {
                sidebarLinks.map((link) => {
                    if(link.type && user?.accountType !== link.type) return null;
                    return (
                        <SidebarLink key={link.id} link={link} iconName={link.icon} />
                    )
                })
            }
        </div>

        <div className='mx-auto mt-6 mb-6 h-[1px] w-10/12 bg-richblack-600'></div>

        <div className='flex flex-col'>

            <SidebarLink
                link={{name: "Settings", path: "/dashboard/settings"}}
                iconName="VscSettingsGear"
            />

            <button
                onClick={() => setConfirmationModal({
                    text1: "Are you sure?",
                    text2: "You will be logged out",
                    btn1Text: "Logout",
                    btn2Text: "Cancel",
                    btn1Handler: () => dispatch(logout(navigate)),
                    btn2Handler: () => setConfirmationModal(null),
                })}
                className='text-sm font-medium text-richblack-300'
            >

                <div className='flex items-center gap-x-2'>
                    <VsSignOut className="text-lg" />
                    <span>Logout</span>
                </div>

            </button>

        </div>

        {confirmationModal && <ConfirmationModal modalData={confirmationModal} /> }

    </div>
  )
}

export default Sidebar