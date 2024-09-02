import React, { useContext, useEffect, useState } from 'react'
import spaceData from '@/utils/spaceRaw'
import { Button, Card, Typography } from '@mui/material'
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import AddIcon from '@mui/icons-material/Add';
import { useRouter } from "next/navigation";
// import "./css/space.css"
import { Footer } from '../footer/Footer';
import { ThemeContext } from '@/app/context/ThemeProvider';
import toast from 'react-hot-toast';
import axios from 'axios';
import { UserContext } from '@/app/context/UserProvider';
import { ThreeDots } from 'react-loader-spinner';
import { useSession } from 'next-auth/react';
const SpaceList = () => {
    const router = useRouter();
    const { theme } = useContext(ThemeContext);

    interface spaceDataType {
        _id: ""
        title: "",
        category: "",
        description: "",
        displayPhoto: "",
        createdAt: ""
    }

    const { data: session } = useSession();

    const [spaceData, setSpaceData] = useState<spaceDataType[]>([]);
    const { userId }: { userId: string } = useContext(UserContext);
    // console.log(userId)

    const fetchData = async () => {
        try {
            const res = await axios.get(`/api/space/c?id=${userId}`);
            // if (session) {
            //     toast(`Welcome, ${session.user.username}`, { icon: '👏', className: `${theme == "dark" ? "bg-black text-white" : "bg-blue-200"}` });
            // }
            return res.data.data;
        } catch (error) {
            console.log(error);
            toast.error("There is some error");
        }
    }

    const handleDelete = async (space:string, spaceid:string) => {
        try {
            const res = await axios.delete(`/api/space/d?id=${spaceid}`);
            toast.success(`${space} deleted successfully`);
            setSpaceData(spaceData.filter((el)=> el._id!==spaceid));
        } catch (error) {
            console.log(error);
            toast.error("There is some error");
        }
    }

    useEffect(() => {

        fetchData().then((data) => {
            setSpaceData(data);
        });

    }, [session])

    if (!spaceData) {
        return <div className={`flex flex-col justify-center h-[90vh] w-full items-center ${theme == "light" ? 'bg-white' : 'bg-[rgb(13,13,13)]'}`}>
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
        </div>

    }

    
    return (
        <>
            <div className='flex flex-col justify-center items-center h-[89vh] w-full'>
                {!spaceData.length ?
                    <div className='relative w-full h-full flex flex-col justify-center items-center opacity-[0.55]'>
                        <div className={`text-center max-sm:text-xl text-2xl font-bold ${theme === "dark" ? "text-slate-100" : ""}`}>
                            <p>Maintain some <span className='text-indigo-600'>Space </span>from      <span className='relative'>
                                Youtube
                                <span className='bg-indigo-600 w-full absolute h-[3px] top-1/2 left-0'></span>
                            </span></p>
                            <p>Create your first space</p>
                        </div>
                        <img src="file.png" alt="" />
                        <div className={`w-[100px] h-[20px] blur-xl ${theme == "dark" ? "bg-slate-100" : "bg-black"} absolute top-1/2 translate-y-12`}></div>
                    </div>
                    :
                    <div className='flex justify-center flex-wrap gap-4 w-[85%] sm:w-[70%] h-full overflow-y-auto overflow-x-hidden'>
                        {
                            spaceData.map((space) => {
                                return (
                                    // <div className='shadow-xl w-fit h-fit'>
                                    <Card sx={{ margin: "20px", backgroundColor: `${theme == "dark" && "black"}`, color: `${theme == "dark" && "rgb(203 213 225)"}` }} className={`w-full sm:w-[300px] md:w-[400px] max-lg:h-fit
                                xl:h-[420px] shadow-xl ${theme == "dark" ? "shadow-black" : ""} relative`}>
                                        <CardMedia >
                                            <img src={space.displayPhoto || "https://images.unsplash.com/photo-1611162616475-46b635cb6868?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"} className='brightness-50 h-[250px] w-full' />
                                        </CardMedia>
                                        <CardContent className='xl:absolute xl:bottom-2'>
                                            <Typography variant='h4' sx={{ fontWeight: "bold" }}>
                                                {space.title}
                                            </Typography>
                                            <Typography variant='body2' sx={{ fontWeight: "bold" }}>
                                                Category: {space.category}
                                            </Typography>
                                            <Typography variant='body2' sx={{ fontWeight: "bold" }}>
                                                Created At: {space.createdAt}
                                            </Typography>
                                            <Button variant='outlined' sx={{ marginTop: "5px" }} onClick={() => router.push(`/space/${space.title}/${space._id}`)}>
                                                Start
                                            </Button>
                                            <Button variant='outlined' sx={{ marginTop: "5px", marginLeft: "5px" }} onClick={()=>handleDelete(space.title,space._id)}>
                                                Delete
                                            </Button>
                                        </CardContent>
                                    </Card>
                                    // </div>
                                )
                            })
                        }
                    </div>}
            </div>
        </>
    )
}

export default SpaceList