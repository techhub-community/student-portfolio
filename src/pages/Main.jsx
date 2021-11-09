import React from 'react'
import Navbar from '../components/Navbar'
import Card from '../components/Card'
import {MdAdd} from "react-icons/md"
import "./Main.css"
import LoginModal from '../components/LoginModal'
import { connect } from 'react-redux'
import { SetDropdown, SetModal, SetUser } from '../redux/actions/_appAction'
import NewWorkModal from '../components/NewWorkModal'
function Main({modal,user,works}) {
    return (
        <div className="main">

            {modal && <LoginModal/>}
            <Navbar/>
            <h1 className="dark:text-white mx-auto font-semibold lg:text-5xl text-3xl">Projects Showcase</h1>

            <div className="works grid sm:grid-cols-2 grid-cols-1 lg:grid-cols-3 mx-auto mt-10 gap-5">
                {
                    works && works.length>0 && works.map((work,i)=>{
                        return <Card title={work.title} description={work.description} thumb={work.thumb} url={work.url} upload_by={work.upload_by}/>
                    })
                }
            </div>

            <NewWorkModal/>

            {user && <button className="bg-gray-300 flex items-center justify-center rounded-full fixed right-5 bottom-2 fab">
                <MdAdd/>
            </button>}

            
        </div>
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
    modal:state.appReducer.modal,
    works:state.appReducer.works
})

export default connect(mapStateToProps,mapDispatchToProps)(Main)
