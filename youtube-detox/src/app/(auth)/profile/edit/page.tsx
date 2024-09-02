"use client";
import React, { useContext, useState } from 'react'
import { useSearchParams } from 'next/navigation'
import { Button } from '@mui/material';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { UsernameSchema } from "../../../../validators/username-schema"
import { TextField } from '@mui/material';
import Brightness4Icon from '@mui/icons-material/Brightness4';
import axios from 'axios';
import toast from 'react-hot-toast';
import { useRouter } from 'next/navigation';
import { ThreeDots } from "react-loader-spinner"
import { ThemeContext } from '@/app/context/ThemeProvider';

const Profile = () => {
    const searchParams = useSearchParams();
    const type: string = searchParams.get('type') as string;
    const [loading, setLoading] = useState(false);
    const { theme } = useContext(ThemeContext);
    if (type == 'first-time') {
        const {
            register,
            handleSubmit,
            formState: { errors },
        } = useForm({
            resolver: zodResolver(UsernameSchema),
        });

        const [username, setUsername] = useState("");
        const router = useRouter();

        const changeUsername = async () => {
            try {
                const res = await axios.post("/api/profile/new-user", { username });
                if (res.data.success) {
                    setLoading(true);
                    router.push("/dashboard");
                    toast.success(res.data.message);
                }
            } catch (error: any) {
                toast.error(error.message);
            }
        }

        return (
            <div className={`h-[100vh] bg-white flex flex-col justify-center items-center relative ${theme === "dark" ? 'text-white bg-[rgb(13,13,13)]' : 'text-black'}`}>
                {!loading ?
                    <>
                        <div className='absolute top-3'>
                            {theme == "light" && <img src='/filtered2.png' className='md:w-[13vw] w-[20vw] '></img>}
                            {theme === "dark" && <img src='/filtered-dark.png' className='md:w-[12vw] w-[20vw]' />}
                        </div>
                        <div className='font-bold'>
                            <p className='text-3xl max-md:text-2xl text-center'>Welcome to <span className='text-red-500'>filtered.</span></p>
                            <p className='text-xl max-md:text-lg text-center'>The only solution to a filtered feed space</p>
                        </div>
                        <div className='h-fit w-[25%] max-md:w-[55%] border border-2 m-5 rounded-2xl p-3'>
                            <p className='text-xl text-center'>Create a username</p>
                            <form onSubmit={handleSubmit(changeUsername)} className='flex flex-col my-3'>
                                <TextField {...register('username')} id="outlined-basic" label="Username" variant="outlined" onChange={(e) => setUsername(e.target.value)} value={username} />
                                {errors.username?.message && <p className='text-sm text-[red]'>{errors.username?.message.toString()}</p>}
                                <Button type="submit" variant='outlined' className='md:w-[30%] max-md:w-full my-2'>Proceed</Button>
                            </form>
                        </div>
                    </> :
                    <ThreeDots
                        visible={true}
                        height="80"
                        width="80"
                        color="black"
                        radius="9"
                        ariaLabel="three-dots-loading"
                        wrapperStyle={{}}
                        wrapperClass=""
                    />
                }
            </div>
        )
    }
    else {
        return (
            <div>not first-time</div>
        )
    }
}

export default Profile