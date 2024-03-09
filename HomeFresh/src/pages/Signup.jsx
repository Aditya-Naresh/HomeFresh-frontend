import React from 'react'
import useApi from '../Components/AxiosInstance/Axios'
import { useNavigate } from 'react-router-dom'
import { useEffect, useState } from 'react';
// import Loader from '../../General/loader';
// import Loader from '../../General/NewLoader';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Lottie from 'lottie-react'
import animationData from '../LotttieFiles/Animation - 1709906271686.json'
import Button from '@mui/material/Button';


function Signup() {
    const [loading, setLoading] = useState(false);
    const api = useApi()
    const navigate = useNavigate();
    const [username, setUsername] = useState('');
    // const [errorMessage, setErrorMessage] = useState('');
    // const debouncedUsername = useDebounce(username, 500); 

    const [email, setEmail] = useState('');
    const [emailError, setEmailError] = useState('');
    const [password, setPassword] = useState('');
    const [passwordConfirm, setPasswordConfirm] = useState('');
    const [passwordStrength, setPasswordStrength] = useState('');
    const [passwordMatch, setPasswordMatch] = useState(true);
    const [hasStartedTyping, setHasStartedTyping] = useState(false);

    const passwordStrengthColor = {
        weak: { color: '#D50000' },   // red
        moderate: { color: '#FFA000' },  // orange
        strong: { color: '#007D00' }   // green
    };
    const isValidEmail = (email) => {
        const pattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{3,4}$/;
        return pattern.test(email);
    };

    const getPasswordStrength = (pwd) => {
        if (pwd.length < 6) return 'weak';
        if (/[A-Z]/.test(pwd) && /[a-z]/.test(pwd) && /[0-9]/.test(pwd) && /[@$!%*#?&]/.test(pwd)) return 'strong';
        return 'moderate';
    };

    const handlePasswordChange = (e) => {
        const passwordValue = e.target.value;
        setPassword(passwordValue);

        setPasswordStrength(getPasswordStrength(passwordValue));
        checkPasswordMatch(passwordValue, passwordConfirm);
        setHasStartedTyping(true);
    };

    const handlePasswordConfirmChange = (e) => {
        const passwordConfirmValue = e.target.value;
        setPasswordConfirm(passwordConfirmValue);

        checkPasswordMatch(password, passwordConfirmValue);
    };

    const checkPasswordMatch = (pwd, pwdConfirm) => {
        setPasswordMatch(pwd === pwdConfirm);
    };

    const handleEmailChange = (e) => {
        const emailValue = e.target.value;
        setEmail(emailValue);

        if (!isValidEmail(emailValue)) {
            setEmailError('Please enter a valid email address.');
        } else {
            setEmailError('');  // clear the error if the email is valid
        }
    };




    const handleSubmit = async (e) => {

        e.preventDefault();
        if (/\s/.test(username) || /\s/.test(password)) {
            toast.error("Invalid charectors ", {
                position: toast.POSITION.TOP_CENTER,
                theme: "colored"
            });
            return;
        }
        if (password !== passwordConfirm) {
            setErrorMessage("Passwords do not match!");
            console.log('password not match ');
            return;
        }

        
        if (emailError) {

            return;
        }


        const formData = new FormData();
        formData.append('email', email);
        formData.append('username', username);
        formData.append('password', password);


        try {
            setLoading(true)
            const response = await api.post('UserRegistrationView/', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                }
            });
            console.log('Otp has send:', response.data);
            setLoading(false)
            localStorage.setItem('email', email);
            localStorage.setItem('pass', passwordConfirm);
            toast.success(" OTP has been send to your Email", {
                position: toast.POSITION.TOP_CENTER,
                theme: "colored"
            });
            navigate('/otp');

        } catch (error) {
            setLoading(false)

            toast.error('Error registering user:', error.response.data);
        }
    };

    const handlelogin = () => {
        navigate('/login')
    }


    return (
        <>
            {loading ? ('loading') : (
                <div className="flex flex-col lg:flex-row h-screen first-letter " style={{ backgroundImage: 'url(https://img.freepik.com/free-photo/fresh-gourmet-meal-beef-taco-salad-plate-generated-by-ai_188544-13382.jpg?t=st=1709984887~exp=1709988487~hmac=2ea07669ac4913df1a4108cfcc1af010ef9eca9618e99a1eaea47ef06715e652&w=1480)', backgroundSize: 'cover' }}>
                    <div className="w-full lg:w-1/2 ml-10 py-20 lg:py-0 flex items-center">
                        <div className='w-3/4 h-3/4 mx-auto lg:mt-4' >
                            {/* <Lottie animationData={animationData} className="w-full h-full" /> */}
                        </div>
                    </div>

                    <div className="w-full lg:w-1/2 flex items-center justify-center   ">
                        <div className="rounded-md w-10/12 mx-auto shadow-2xl px-48 lg:px-12 py-6 mb-16 lg:mb-0 " style={{ backgroundColor: 'rgba(255, 255, 255, 0.4)' }}>
                            <form onSubmit={handleSubmit}>
                                <div className="   lg:text-3xl text-4xl font-bold mb-4   tracking-wide">Signup</div>

                                <div className="mb-4">
                                    <label htmlFor="username" className="block font-medium text-black" required style={{ fontSize: "20px" }}>Username</label>
                                    <textarea id="username" value={username} onChange={e => setUsername(e.target.value)} style={{ resize: "none",backgroundColor: 'rgba(255, 255, 255, 0.7)' }} className="w-full p-1 rounded-lg " required></textarea>

                                </div>

                                <div className="mb-4">
                                    <label htmlFor="email" className="block font-medium text-black" required style={{ fontSize: "20px" }}>Email </label>
                                    <textarea id="email" value={email} onChange={handleEmailChange} style={{ resize: "none", backgroundColor: 'rgba(255, 255, 255, 0.7)' }} className="w-full p-1 rounded-lg " required></textarea>
                                    {emailError && <p className="text-red-500 mt-1 text-lg font-medium">{emailError}</p>}
                                </div>

                                <div className="mb-4">
                                    <label htmlFor="password" className="block font-medium text-black" required style={{ fontSize: "20px" }}>Password</label>
                                    <textarea id="password" value={password} onChange={handlePasswordChange} style={{ resize: "none",backgroundColor: 'rgba(255, 255, 255, 0.7)' }} className="w-full p-1 rounded-lg " required></textarea>
                                    {hasStartedTyping && (
                                        <div style={{ ...passwordStrengthColor[passwordStrength] }}>
                                            Password Strength: {passwordStrength.charAt(0).toUpperCase() + passwordStrength.slice(1)}
                                        </div>
                                    )}
                                </div>

                                <div className="mb-4">
                                    <label htmlFor="confirmPassword" className="block font-medium text-black" required style={{ fontSize: "20px" }}>Confirm Password</label>
                                    <textarea id="confirmPassword" value={passwordConfirm} onChange={handlePasswordConfirmChange} style={{ resize: "none" ,backgroundColor: 'rgba(255, 255, 255, 0.7)' }} className="w-full p-1 rounded-lg  " required></textarea>
                                    {!passwordMatch && <div className="text-lg font-medium mt-1 text-red-500">Passwords do not match!</div>}
                                </div>

                                <div className="flex justify-center items-center mt-9">
                                    
                                    <Button
                                        variant="contained"
                                        style={{ backgroundColor: '#4caf50', height: '50px', fontWeight: 'bold', fontSize: '16px' }}
                                        sx={{ marginTop: '10px', borderRadius: '10px' }}
                                        type="submit"
                                    >
                                        Get started
                                    </Button>
                                </div>

                                <div className="flex justify-center items-center mt-5">
                                    <p onClick={handlelogin} className='font-medium cursor-pointer'>Already Have an Account ? </p>
                                </div>
                            </form>
                            <ToastContainer />
                        </div>
                    </div>
                </div>
            )}

        </>
    )
}

export default Signup