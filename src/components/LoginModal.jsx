import React from 'react'
import { connect } from 'react-redux'
import google_icon from "../assets/google.svg"
import { SetModal } from '../redux/actions/_appAction'
import "./LoginModal.css"
import { GoogleLogin } from 'react-google-login';
import Cookies from 'js-cookie'
import axios from 'axios'
function LoginModal({modal,SetModal}) {


    const handleClose = (e)=>{
        if(e.target.classList.contains("modal-backdrop")){
            SetModal(false);
        }
    }


    const responseGoogle = (response) => {
        console.log(response);
        const {profileObj} = response;
        if(profileObj){
            axios.post(`https://student-portfolio-server.herokuapp.com/login`,{_id:profileObj.googleId,name:profileObj.name,avatar:profileObj.imageUrl,email:profileObj.email}).then((response)=>{
                const {token} = response.data;
                console.log(token)

                Cookies.set('AUTH_TOKEN',token);

                window.location.href = '/';
                
            })
        }
      }


    return (
        <div className="modal-backdrop" onClick={handleClose}>
            <div className="modal bg-white py-5 px-5 dark:bg-black">
                <span className="dark:text-white">Login to add your public profile</span>
                


                <GoogleLogin
    clientId="671725596749-v8gtu0ptavq316aferenrrknae67p6lk.apps.googleusercontent.com"
    render={renderProps => (

      <button className="google_btn mt-5 px-2 gap-5 mx-auto justify-center py-2 dark:bg-white hover:bg-gray-200" onClick={renderProps.onClick} disabled={renderProps.disabled}>
                    <img src={google_icon} alt="google-icon" />
                    <span className="flex-1 font-semibold flex items-start">Login with Google</span>
                </button>
    )}
    buttonText="Login"
    onSuccess={responseGoogle}
    onFailure={responseGoogle}
  />
            </div>
        </div>
    )
}

const mapDispatchToProps = (dispatch)=>({
   
    SetModal:(modal)=>dispatch(SetModal(modal))
})



const mapStateToProps = (state)=>({
   
    modal:state.appReducer.modal
})

export default connect(mapStateToProps,mapDispatchToProps)(LoginModal)

