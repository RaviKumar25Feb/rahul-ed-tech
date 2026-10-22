import React from "react";
import {ACCOUNT_TYPE} from "../../../utils/constants"
import { sidebarLinks } from "../../../data/dashboard-links";
import SidebarLink from "./SidebarLink";
import { logout } from "../../../services/operations/authAPI";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useState } from "react";
import ConfirmationModal from "../../common/ConfirmationModal";
import { IoIosLogOut } from "react-icons/io";

function Sidebar() {
  const [confirmationModal, setConfirmationModal] = useState(null);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { user } = useSelector((state) => state.profile);

  return (
    <div className="text-white">
      <div className="flex min-w-[222px] flex-col border-r-[1px] border-r-richblack-500">
        <div className="flex flex-col">
          {
            sidebarLinks.map((link) => {
                if (link.type && user?.accountType !== link.type) return null;
                return (
                    <SidebarLink key={link.id} link={link} iconName={link.icon} />
                );
            })
          }
        </div>

        <div className="mx-auto mt-6 mb-6 h-[1px] w-10/12 bg-richblack-600"></div>

        <div className="flex flex-col">
          <SidebarLink
            link={{ name: "Settings", path: "/dashboard/settings" }}
            iconName="VscSettingsGear"
          />

          <button
            onClick={() =>
              setConfirmationModal({
                text1: "Are you sure?",
                text2: "You will be logged out",
                btn1Text: "Logout",
                btn2Text: "Cancel",
                btn1Handler: () => dispatch(logout(navigate)),
                btn2Handler: () => setConfirmationModal(null),
              })
            }
            className="text-sm font-medium text-richblack-100 pl-7 pt-4"
          >
            <div className="flex items-center gap-x-2">
              <IoIosLogOut className="text-xl" />
              <span className="text-base">Logout</span>
            </div>
          </button>
        </div>
      </div>

      {confirmationModal && <ConfirmationModal modalData={confirmationModal} />}
    </div>
  );
}

export default Sidebar;
