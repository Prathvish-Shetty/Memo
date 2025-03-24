import {useState} from 'react'
import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'
import Alert from '../components/Alert.jsx'
import { signup } from '../services/authService.js'

function Signup() {
  const { register, handleSubmit, formState: { errors } } = useForm()
  const navigate = useNavigate()
  const [success, setSuccess] = useState(false)
  const [fail, setFail] = useState(false)
  const onSubmit = async (data) => {
    try {
      await signup(data)
      setSuccess(true)
      setTimeout(() => setSuccess(false), 2000);
      navigate('/');
    } catch (error) {
      console.error("Signup failed:", error);
      setFail(true)
      setTimeout(() => setFail(false), 2000);
    }
  }
  return (
    <div className='h-[85vh] flex justify-center items-center py-2 px-4'>
      <form onSubmit={handleSubmit(onSubmit)} className="fieldset w-xs bg-base-200 border border-base-300 p-4 rounded-box">
        <label className="fieldset-label">Name</label>
        <input
          {...register("name", { required: "Name is required" })}
          type="text" className="input" placeholder="Name"
        />
        {errors.name && <p className="text-red-500">{errors.name.message}</p>}
        <label className="fieldset-label">Email</label>
        <input
          {...register("email", { required: "Email is required" })}
          type="email" className="input" placeholder="Email"
        />
        {errors.email && <p className="text-red-500">{errors.email.message}</p>}
        <label className="fieldset-label">Password</label>
        <input
          {...register("password", { required: "Password is required" })}
          type="password" className="input" placeholder="Password"
        />
        {errors.password && <p className="text-red-500">{errors.password.message}</p>}
        <button type="submit" className="btn bg-amber-50 text-black mt-4">Sign up</button>
      </form>
      {success && <Alert text={"Registration successfull"}/>}
      {fail && <Alert text={"Registration Unsuccessful"}/>}
    </div>
  )
}

export default Signup