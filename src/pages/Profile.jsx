import axios from 'axios'
import React from 'react'
import { connect } from 'react-redux'
import Navbar from '../components/Navbar'
import WorkCard from '../components/WorkCard'
import {MdModeEdit,MdMail} from "react-icons/md"
import {BsGlobe,BsGithub} from "react-icons/bs"
import "./Profile.css"

function Profile({uid,user}) {
const [person,setPerson] = React.useState(null);
const [work,setWork] = React.useState(null);



React.useEffect(()=>{
    const getUser = async ()=>{
        try{
            const r = await axios.get(`https://student-portfolio-server.herokuapp.com/public/${uid}`);
            return r.data;
        }
        catch(e){
            return e.message;
        }
    }


    const getWorks = async ()=>{
        try{
            const r = await axios.get(`https://student-portfolio-server.herokuapp.com/works/${uid}`);
            return r.data;
        }
        catch(e){
            return e.message;
        }
    }

    getUser().then((data)=>{
        const {user} = data;

        setPerson(user);
    })

    getWorks().then((data)=>{
        const {works} = data;

        console.log(works)
        setWork(works);
    })
},
// eslint-disable-next-line
[])


const handleSocialNavigate = (url) =>{
    window.location.href= url;
}
    return (
        <div>
            <Navbar/>

            <div className="user_hero w-full flex">
                <div className="user_picture flex-1 flex items-center justify-center">
                    <div className="person__avatar">
                    {person && <img src={person.avatar} alt="user_profile_picture" className="w-32 h-32 rounded-full shadow-2xl"/>}
                    {!person && <div className="placehlder__avatar"></div>}
                    {user && user.id===uid && <button className="edit_btn"><MdModeEdit/></button>}
                    </div>
                </div>
                <div className="user_hero_footer flex justify-between flex-wrap">
                    <div className="user_textual">
                        <h2 className="text-white text-3xl font-semibold">{person && person.name}</h2>
                        <span>{person && person.Bio}</span>
                    </div>

                    <div className="user_social_profiles gap-1 flex items-center">
                    {person && person.github && <button className="py-2 px-3 bg-black rounded-full text-white" onClick={()=>handleSocialNavigate(`mailto:${person.email}`)}><MdMail/></button>}
                        {person && person.website && <button className="py-2 px-3 bg-purple-900 rounded-full text-white" onClick={()=>handleSocialNavigate(person.website)}><BsGlobe/></button>}
                        {person && person.github && <button className="py-2 px-3 bg-black rounded-full text-white" onClick={()=>handleSocialNavigate(`https://github.com/${person.github}`)}><BsGithub/></button>}
                    </div>
                </div>
            </div>

           <div className="container">
           {work && work.length>0 ? <h3 className="text-4xl font-bold">Works</h3>:<h3 className="text-center font-semibold text-3xl">Yod don't have any work yet</h3>}

           <div className="grid works grid-cols-1 gap-6 sm:grid-cols-2 xl:grid-cols-5 mt-2">
           {
               work && work.map((work,i)=>{
                   return <WorkCard title={work.title} description={work.description} thumb={work.thumb} url={work.url}/>
               })
           }
           </div>
           </div>
        </div>
    )
}


const mapStateToProps = (state)=>({
    user:state.appReducer.user
})


export default connect(mapStateToProps,null)(Profile)
