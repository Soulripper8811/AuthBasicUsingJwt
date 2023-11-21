import React, { useState,useEffect } from 'react'
import { Button, Container,  Paper, Typography } from '@mui/material'
import axios from "axios"
import { useNavigate } from 'react-router-dom'

const Signup = () => {
  const navigate=useNavigate();

  // const [user, setUser] = useState([]);
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  useEffect(()=>{
    fetchUser();
  },[])
  const fetchUser=async()=>{
    await axios.get("http://localhost:3001/user").then((response)=>{
      console.log(response.data);
    })
  }
  const handleSignup=async(event)=>{
    event.preventDefault();
    await axios.post("http://localhost:3001/register",{username,email,password}).then(()=>{
      alert("user created successfully");
      setEmail("");
      setUsername("")
      setPassword("")
      fetchUser();
      navigate("/login")
    })

  }


  return (
    <>
      <Container maxWidth={"full"} className="justify-center items-center text-center ">
        <div className="mt-24">

        <Typography variant='h2'>
          SignUp
        </Typography>
        <Paper elevation={12} className="h-min w-2/5 m-auto">
          <form  className="h-1/2 flex flex-col p-8 text-center items-center justify-center " >
            <label htmlFor="username" className="font-bold ">Username</label>
            <input type="username"
             placeholder='Enter username ?' 
            className="focus:border p-2 border mb-3 w-1/2"
            value={username}
            onChange={(e)=>setUsername(e.target.value)}/>
            <label htmlFor="email" className="font-bold">Email</label>
            <input type="email" placeholder='Enter Email' className="focus:border p-2 border mb-3 w-1/2" 
            value={email}
            onChange={(e)=>setEmail(e.target.value)} />
            <label htmlFor="username" className="font-bold">password</label>
            <input type="password" placeholder='password here ?' className="focus:border border p-2 mb-3 w-1/2"
            value={password}
            onChange={(e)=>setPassword(e.target.value)}/>
          </form>
          <Button type='submit' onClick={handleSignup} variant="contained" className="bg-blue-700 mb-3">SignUp</Button>
        </Paper>
        </div>
      </Container>

    </>
  )
}

export default Signup