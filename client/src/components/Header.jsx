import React from 'react'
import { useNavigate } from 'react-router-dom'
import {Container,Box} from "@mui/material"
import {BsFillJournalBookmarkFill} from "react-icons/bs"
import {Link} from "react-router-dom"


const Header = () => {
  const navigate=useNavigate()
  const isUserSignedIn=!!localStorage.getItem("token")
  const handleSignOut=(e)=>{
    e.preventDefault()
    localStorage.removeItem("token")
    navigate("/login")

  }

  return (
    <>
    
    <Container className="border flex justify-between h-11 " maxWidth={"cotainer.xl"}>
        <Box  className="border  flex flex-row justify-center text-center " >
        <BsFillJournalBookmarkFill style={{fontSize:"40px"}}/>
            <h2 className="text-black text-xl font-bold ">AuthSystem</h2>
        </Box>
        <Box className="flex justify-center items-center flex-row ">
          {
            isUserSignedIn?(<>
                        <div className="flex justify-center text-center items-center flex-row gap-4">
                    <Link className="bg-blue-600 rounded-lg p-2 text-white" to={"/login"}>Account</Link>
                    <Link  onClick={handleSignOut} className="bg-blue-600 rounded-lg p-2 text-white">SigOut</Link>
            </div>

            </>):(
              <>
                    <div className="flex justify-center text-center items-center flex-row gap-4">
                    <Link className="bg-blue-600 rounded-lg p-2 text-white" to={"/login"}>Login</Link>
                    <Link to={"/register"} className="bg-blue-600 rounded-lg p-2 text-white">Signup</Link>
                    </div>
              </>
            )
          }

        </Box>

    </Container>
    </>
    
  )
}

export default Header