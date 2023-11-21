import { Button, Container,  Paper, Typography } from '@mui/material'
import React, { useState,useEffect } from 'react'
import axios from "axios"
import { useNavigate } from 'react-router-dom'

const Login = () => {
  const navigate=useNavigate();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  useEffect(()=>{
    fetchUser();
  },[])
  const fetchUser=async()=>{
    await axios.get("http://localhost:3001/user").then((response)=>{
      console.log(response.data);
    })
  }
  const handleLogin=async()=>{
    try {
      const res=await axios.post("http://localhost:3001/login",{username,password})
      const token=res.data.token;
      alert("login succes")
      setUsername("")
      setPassword("")
      fetchUser()
      navigate("/home")
      localStorage.setItem("token",token);

    } catch (error) {
      console.log(error)
    }
  }
  return (
    <>
      <Container maxWidth={"full"} className="justify-center items-center text-center ">
        <div className="mt-24">

        <Typography variant='h2'>
          Login
        </Typography>
        <Paper elevation={12} className="h-min w-2/5 m-auto">
          <form  className="h-1/2 flex flex-col p-8 text-center items-center justify-center ">
            <label htmlFor="username" className="font-bold">username</label>
            <input type="text" placeholder='Enter username' className="focus:border p-2 border mb-3 w-1/2"  value={username}
            onChange={(e)=>setUsername(e.target.value)}/>
            <label htmlFor="username" className="font-bold">password</label>
            <input type="password" placeholder='password here ?' className="focus:border border p-2 mb-3 w-1/2"  value={password}
            onChange={(e)=>setPassword(e.target.value)} />
          </form>
          <Button onClick={handleLogin}variant="contained" className="bg-blue-700 mb-3">Log In</Button>
        </Paper>

        </div>
      </Container>

    </>
  )
}

export default Login