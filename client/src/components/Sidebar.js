import React from "react"
import { connect } from "react-redux";
import GoogleAuth from './GoogleAuth.js'


import HomeIcon from "@material-ui/icons/Home";
import AddIcon from "@material-ui/icons/Add"
import PersonOutline from "@material-ui/icons/PersonOutline"
import Message from "@material-ui/icons/Message"

import SidebarOption from "./SidebarOption.js"
import PostList from './PostList.js'
import PostCreate from './PostCreate.js'
import PostEdit from './PostEdit.js'
import muhbrex from './../images/muhbrex_logo.png'
import './Sidebar.css'
import LIMIT from "./blacklistlimit.js";

function Sidebar(props){
    return (
        <div className = 'sidebar'>
          {/* <button className='logoButton'> */}
            <a href="http://localhost:3000"> <img
              className = 'logo'
              src = {muhbrex}
              width="250px"
              // onclick={() => {window.location = '/'}}
            /> </a>
          {/* </button> */}
          <GoogleAuth />
          {/* <SidebarOption text="UCLA" link="/" Icon={HomeIcon}/>  */}
          <SidebarOption text="Posts" link="/" Icon={Message}/> 
          
          {props.isSignedIn && (props.dislikes < LIMIT) && <SidebarOption text="Create Post" link="/create" Icon={AddIcon}/>}
          {props.isSignedIn && <SidebarOption text="User" link={`/user/${props.userId}`} Icon={PersonOutline}/>}
          
        </div>
    )
}

const mapStateToProps = (state) => {
  return {
    isSignedIn: state.auth.isSignedIn,
    userId: state.auth.userId,
    dislikes: state.likes.dislikes
  }
}

export default connect(mapStateToProps)(Sidebar);