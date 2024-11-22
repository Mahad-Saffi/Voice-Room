import { useForm, SubmitHandler } from 'react-hook-form';
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

interface FormData {
    username: string;
    name: string;
}

export const SignIn = () => {
    const schema = yup.object().shape({
        username: yup
        .string()
        .required("Username is required")
        .matches(/^[a-zA-Z0-9_]*$/, "Username can only contain letters, numbers, and underscores"),
        name: yup.string().required("Name is required"),
    });

    const onSubmit: SubmitHandler<FormData> = (data, event) => {
        event?.preventDefault();
        const { username, name } = data;
        console.log(username, name);
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