import { useForm, SubmitHandler } from 'react-hook-form';
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { AVATARS } from '../../assets/images';
import Cookies from 'universal-cookie';
import { StreamVideoClient, User } from '@stream-io/video-react-sdk';
import { useUser } from '../../user-context';
import { useNavigate } from 'react-router-dom';

interface FormData {
    username: string;
    name: string;
}

export const SignIn = () => {
    const cookies = new Cookies();
    const { setClient, setUser } = useUser();

    const navigate = useNavigate();

    const schema = yup.object().shape({
        username: yup
        .string()
        .required("Username is required")
        .matches(/^[a-zA-Z0-9_]*$/, "Username can only contain letters, numbers, and underscores"),
        name: yup.string().required("Name is required"),
    });

    const onSubmit: SubmitHandler<FormData> = async (data, event) => {
        event?.preventDefault();
        const { username, name } = data;
        
        const response = await fetch('http://localhost:4000/auth/createUser', {
            method: "POST", 
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({username, name, image: AVATARS[0]}), 
        });

        console.log(response);

        if (!response.ok) {
            alert('Failed to create user');
            return;
        }

        const responceData = await response.json();

        const user: User = {
            id: username,
            name,
        }

        const myClient = new StreamVideoClient({
            apiKey: import.meta.env.VITE_SECRET_KEY,
            user,
            token: responceData.token
        });

        setClient(myClient);
        setUser({ username, name });

        const expires = new Date();
        expires.setDate(expires.getDate() + 1);

        cookies.set("token", responceData.token, {
            expires,
        });

        cookies.set("username", responceData.username, {
            expires,
        });

        cookies.set("name", responceData.name, {
            expires,
        });

        navigate("/");
    };

    const {
        register,
        handleSubmit,
        formState: { errors }
    } = useForm<FormData>({ resolver: yupResolver(schema) });

    return (
        <div className='absolute inset-0 bg-slate-800 text-white flex flex-col items-center justify-center'>
            <h1 className='text-4xl font-bold mb-8'>Voice Room</h1>
            <div className='w-96 bg-slate-700 p-6 rounded-lg shadow-lg'>
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                    <div>
                        <label className="block text-sm font-medium mb-2"> Username: </label>
                        <input type="text" {...register("username")} 
                        className="w-full border border-gray-600 rounded-md px-4 py-2 bg-slate-800 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"/>
                        {errors.username && 
                        <p className="text-red-500 text-sm mt-1">
                            {errors.username.message}
                        </p>}
                    </div>
                    <div>
                        <label className="block text-sm font-medium mb-2"> Name: </label>
                        <input type="text" {...register("name")} 
                        className="w-full border border-gray-600 rounded-md px-4 py-2 bg-slate-800 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"/>
                        {errors.name && 
                        <p className="text-red-500 text-sm mt-1">
                            {errors.name.message}
                        </p>}
                    </div>
                    <button type="submit" 
                    className="w-full bg-blue-600 text-white font-medium py-2 rounded-md hover:bg-blue-700 transition">
                        Sign In
                    </button>
                </form>
            </div>
        </div>
    );
}