import { useForm, SubmitHandler } from 'react-hook-form';
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { AVATARS } from '../../images';
import Cookies from 'universal-cookie';

interface FormData {
    username: string;
    name: string;
}

export const SignIn = () => {
    const cookies = new Cookies();

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
    };

    const {
        register,
        handleSubmit,
        formState: { errors }
    } = useForm<FormData>({ resolver: yupResolver(schema) });

    return (
        <div>
            <h1>Voice Room</h1>
            <div>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div>
                        <label> Username: </label>
                        <input type="text" {...register("username")} className=' border border-gray-700 rounded-md'/>
                        {errors.username && 
                        <p className=' text-red-600 '>{errors.username.message}</p>}
                    </div>
                    <div>
                        <label> Name: </label>
                        <input type="text" {...register("name")} className=' border border-gray-700 rounded-md'/>
                        {errors.name && 
                        <p className=' text-red-600 '>{errors.name.message}</p>}
                    </div>
                    <button type="submit">Sign In</button>
                </form>
            </div>
        </div>
    );
}