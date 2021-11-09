import Cookies from 'js-cookie'
import React from 'react'
import {MdKeyboardArrowDown} from "react-icons/md"
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { SetDropdown, SetModal, SetUser } from '../redux/actions/_appAction'
import "./Navbar.css"
function Navbar({user,dropdown,SetDropdown,modal,SetModal,SetUser}) {



    const handleLogout = ()=>{
        Cookies.remove('AUTH_TOKEN');
        SetUser(null);
    }
    return (
        <nav className="w-full bg-white">
        <div className="flex items-center justify-between navbar mx-auto">
            <Link to="/" className="logo font-semibold text-xl dark:text-gray-50">Home</Link>
            {user && <div className="nav__right flex items-center gap-2" onClick={()=>{
                SetDropdown(!dropdown)
            }}>
                <img src={user.avatar}alt="avatar" className="w-10 h-10 rounded-full"/>
                <span className="font-semibold text-xl hidden lg:block dark:text-white">{user.name}</span>
                <button className="drodpown_btn dark:text-white light:text-black">
                    <MdKeyboardArrowDown/>
                    {dropdown && <div className="dropdown px-11 dark:bg-black bg-white">
                        <Link to={`/user/${user && user.id}`} className="text-xl font-bold flex items-center py-2">Dashboard</Link>
                        <Link to={`#`} className="text-xl font-bold flex items-center py-2" onClick={handleLogout}>Logout</Link>
                    </div>}
                    </button>
            </div>}

            {!user && <button className="login_btn text-white bg-red-500 flex items-center justify-center rounded-full font-semibold" onClick={()=>{
                SetModal(!modal);
            }}>Login</button>}
        </div>
        </nav>
    )
}



const mapDispatchToProps = (dispatch)=>({
    SetUser:(user)=>dispatch(SetUser(user)),
    SetDropdown:(dropdown)=>dispatch(SetDropdown(dropdown)),
    SetModal:(modal)=>dispatch(SetModal(modal))
})

const mapStateToProps = (state)=>({
    user:state.appReducer.user,
    dropdown:state.appReducer.dropdown,
    modal:state.appReducer.modal
})

export default connect(mapStateToProps,mapDispatchToProps)(Navbar)
