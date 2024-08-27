import React from 'react'
import { BsGrid1X2Fill }from 'react-icons/bs'
import { FaReact, FaRegUser } from "react-icons/fa";
import { FaTableList } from "react-icons/fa6";
import { BiMap } from "react-icons/bi";
import { IoIosNotifications } from "react-icons/io";
import { SiTypeorm } from "react-icons/si";


function Sidebar({openSidebarToggle, OpenSidebar}) {
  return (
    <aside id="sidebar" className={openSidebarToggle ? "sidebar-responsive": ""}>
        <div className='sidebar-title'>
            <div className='sidebar-brand'>
                <FaReact  className='icon_header'/> CREATIVE TIM
            </div>
            <span className='icon close_icon' onClick={OpenSidebar}>X</span>
        </div>

        <ul className='sidebar-list'>
            <li className='sidebar-list-item'>
                <a href="">
                    <BsGrid1X2Fill className='icon'/> DASHBOARD
                </a>
            </li>
            <li className='sidebar-list-item'>
                <a href="">
                    <FaReact className='icon'/> ICONS
                </a>
            </li>
            <li className='sidebar-list-item'>
                <a href="">
                    <BiMap className='icon'/> MAP
                </a>
            </li>
            <li className='sidebar-list-item'>
                <a href="">
                    <IoIosNotifications className='icon'/> NOTIFICATION
                </a>
            </li>
            <li className='sidebar-list-item'>
                <a href="">
                    <FaRegUser className='icon'/> USER PROFILE
                </a>
            </li>
            <li className='sidebar-list-item'>
                <a href="">
                    <FaTableList className='icon'/> TABLE LIST
                </a>
            </li>
            <li className='sidebar-list-item'>
                <a href="">
                    <SiTypeorm className='icon'/> TYPOGRAPHY
                </a>
            </li>
        </ul>
    </aside>
  )
}

export default Sidebar