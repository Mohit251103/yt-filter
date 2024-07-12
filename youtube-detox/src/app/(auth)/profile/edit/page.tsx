"use client";
import React, { useState } from 'react'
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

const Profile = () => {
    const searchParams = useSearchParams();
    const type: string = searchParams.get('type') as string;
    const [loading, setLoading] = useState(false);
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
            <div className='h-[100vh] bg-white flex flex-col justify-center items-center'>
                (!loading?<Brightness4Icon className='absolute top-0 right-0 -translate-x-5 translate-y-5'></Brightness4Icon>
                <div>
                    <img src="/filtered2.png" alt="" />
                </div>
                <div className='font-bold'>
                    <p className='text-3xl '>Welcome to <span className='text-red-500'>filtered.</span></p>
                    <p className='text-xl'>The only solution to a filtered feed space</p>
                </div>
                <div className='h-fit w-[25%] border border-2 m-5 rounded-2xl p-3'>
                    <p className='text-xl text-center'>Create a username</p>
                    <form onSubmit={handleSubmit(changeUsername)} className='flex flex-col my-3'>
                        <TextField {...register('username')} id="outlined-basic" label="Username" variant="outlined" onChange={(e) => setUsername(e.target.value)} value={username} />
                        {errors.username?.message && <p className='text-sm text-[red]'>{errors.username?.message.toString()}</p>}
                        <Button type="submit" variant='outlined' className='w-1/4 my-2'>Proceed</Button>
                    </form>
                </div>:
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
                )
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