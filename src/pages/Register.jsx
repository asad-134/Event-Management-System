import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Navigate } from 'react-router-dom'
import { registerUser, clearAuthError } from '../features/auth/authSlice.js'
import { useEffect} from 'react'
export default function Register(){
    const error = useSelector(state=>state.auth.error)
    const currentUser = useSelector((state) => state.auth.currentUser)
    const dispatch= useDispatch()
    const [form,setForm]= useState({
        name: '',
        email: '',
        password: '',
    })
    useEffect(() => {
        dispatch(clearAuthError())
    }, [dispatch])

    function handleChange(e) {
        //e.target is html elemnt where evnt hapenned
        //In an object, square brackets mean use the value of the variable as the property name.
        //If the user types in the email input, name contains "email"
        const { name, value } = e.target;
        setForm(previous => ({ ...previous, [name]: value }));

    }
    function handleSubmit(e) {
        e.preventDefault()

        if (!form.name.trim() || !form.email.trim() || !form.password) {
            alert('Please fill in all fields')
            return
        }

        if (form.password.length < 6) {
            alert('Password must be at least 6 characters')
            return
        }

        // Step 7: dispatch registerUser(form) here

        dispatch(registerUser(form))
    }
    if(currentUser){
        return <Navigate to="/events" replace/> 
    }
    return(
        <>  
          <form  onSubmit = {handleSubmit}>  
            <h1>Register</h1>
            <label htmlFor = "name">Name</label>
            <input
                id ="name" 
                name="name" 
                value={form.name} 
                onChange ={handleChange}            
            />

            <label htmlFor = "email">Email</label>
            <input
                id ="email" 
                name="email"
                type="email" 
                value={form.email} 
                onChange ={handleChange}
            />

            <label htmlFor = "password">Password</label>
            <input
                id ="password" 
                name="password"
                type="password" 
                value={form.password} 
                onChange ={handleChange}
            />
            {error && <p role="alert">{error}</p>}
            <button type = "submit">Submit credentials</button>
          </form>
        </>
);
}
