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

    interface spaceDataType{
        _id:""
        title:"",
        category:"",
        description:"",
        displayPhoto:"",
        createdAt:""     
    }

    const {data:session} = useSession();

    const [spaceData, setSpaceData] = useState<spaceDataType[]>([]);
    const { userId }:{userId:string} = useContext(UserContext);
    // console.log(userId)

    const fetchData = async () => {
        try {
            const res = await axios.get(`/api/space/c?id=${userId}`);
            // console.log(res.data.data);
            return res.data.data;
        } catch (error) {
            console.log(error);
            toast.error("There is some error");
        }
    }

    useEffect(() => {
        
        fetchData().then((data)=>{
            setSpaceData(data);
        });
        
    }, [session])

    if (!spaceData) {
        return <div className='flex flex-col justify-center items-center bg-white h-full w-full'>
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
            <div className='flex flex-col justify-center items-center h-[92vh] w-full'>
                <div className='flex justify-center flex-wrap gap-4 w-[85%] sm:w-[70%] h-full overflow-y-auto overflow-x-hidden'>
                    {!spaceData && <Card sx={{ width: "300px", margin: "20px", backgroundColor: "black", display: "flex", alignItems: "center", justifyContent: "center" }} className={`h-[200px] md:h-[380px]`}>
                        <CardContent>
                            <div className='rounded-full relative hover:cursor-pointer' onClick={() => router.push("/space/c")}>
                                <div className='rounded-full text-[150px] absolute hover:bg-gray-500/50 hover:opacity-25 h-full w-full'></div>
                                <AddIcon sx={{ fontSize: "150px", color: "grey" }} className='rounded-full z-1' />
                            </div>
                        </CardContent>
                    </Card>}
                    {
                        spaceData.map((space) => {
                            return (
                                // <div className='shadow-xl w-fit h-fit'>
                                <Card sx={{ margin: "20px", backgroundColor: `${theme == "dark" && "black"}`, color: `${theme == "dark" && "rgb(203 213 225)"}` }} className={`w-full sm:w-[300px] md:w-[400px] sm:h-fit
                                xl:h-[480px] shadow-xl ${theme == "dark" ? "shadow-black" : ""} relative`}>
                                    <CardMedia >
                                        <img src={space.displayPhoto || "https://images.unsplash.com/photo-1611162616475-46b635cb6868?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"} className='brightness-50' height={100}/>
                                    </CardMedia>
                                    <CardContent className='xl:absolute xl:bottom-0'>
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
                                    </CardContent>
                                </Card>
                                // </div>
                            )
                        })
                    }
                </div>
                <Footer />
            </div>
        </>
    )
}

export default SpaceList