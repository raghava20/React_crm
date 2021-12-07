import React from 'react'
import { Link } from "react-router-dom"
import LogOut from './LogOut'
import "./SideBar.css"

function SideBar() {
    return (
        <div>

            <div class="sidebar-container">
                <div class="sidebar-logo">
                    CRM
                </div>
                <ul class="sidebar-navigation">

                    <Link to="/dashboard">
                        <li>
                            <a href="#">
                                <i class="fas fa-list" aria-hidden="true"></i> &nbsp;&nbsp;Dashboard
                            </a>
                        </li>
                    </Link>
                    <Link to="/leads">
                        <li>
                            <a href="#">
                                <i class="fa fa-users" aria-hidden="true"></i>Leads
                            </a>
                        </li>
                    </Link>
                    <Link to="/service-requests">
                        <li>
                            <a href="#">
                                <i class="fa fa-edit" aria-hidden="true"></i>Service Requests
                            </a>
                        </li>
                    </Link>
                    <LogOut />
                </ul>
            </div>

        </div >
    )
}

export default SideBar
