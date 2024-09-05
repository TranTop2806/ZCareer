import React, { useEffect, useState } from 'react'
import Navbar from '../shared/Navbar'
import { Button } from '../ui/button'
import { ArrowLeft, Loader2 } from 'lucide-react'
import { Label } from '../ui/label'
import { Input } from '../ui/input'
import { COMPANY_API_END_POINT } from '@/utils/constant'
import axios from 'axios'
import { useNavigate, useParams } from 'react-router-dom'
import { toast } from 'sonner'
import { useSelector } from 'react-redux'
import { setSingleCompany } from '@/redux/companySlice'
import useGetCompanyById from '@/hooks/useGetCompanyById'
import { Avatar, AvatarImage } from '../ui/avatar'


const CompanySetup = () => {
    const params = useParams();
    useGetCompanyById(params.id);
    const [input, setInput] = useState({
        name: '',
        description: '',
        website: '',
        location: '',
        file: null //logo
    });
    const {singleCompany} = useSelector(store=>store.company);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const changEventHandler = (e) => {
        setInput({
            ...input,
            [e.target.name]: e.target.value
        })
    }
    const changFileHandler = (e) => {
        setInput({
            ...input,
            file: e.target.files?.[0]
        })
    }
    const submitHandler = async (e) => {
        e.preventDefault();
        console.log(input);
        const formData = new FormData();
        formData.append('name', input.name);
        formData.append('description', input.description);
        formData.append('website', input.website);
        formData.append('location', input.location);
        if (input.file){
            formData.append('file', input.file);
        }
        try {
            setLoading(true);
            const res = await axios.put(`${COMPANY_API_END_POINT}/update/${params.id}`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                },
                withCredentials: true
            });
            if (res.data.success) {
                toast.success(res.data.message);
                navigate('/admin/companies');
            }
        } catch (error) {
            console.log(error);
            toast.error(error.response.data.message);
        } finally{
            setLoading(false);
        }   

    }

    useEffect(() => {
        setInput({
            name: singleCompany?.name || '',
            description: singleCompany?.description || '',
            website: singleCompany?.website || '',
            location: singleCompany?.location || '',
            file: singleCompany.file || null //logo
        })
    },[singleCompany])
    
    return (
        <div>
            <Navbar/>
            <div className='max-w-xl mx-auto my-10'>
                <form onSubmit={submitHandler}>
                    <div className='flex items-center gap-5 p-8'>
                        <Button onClick={()=> navigate("/admin/companies")} variant='outline' className='flex items-center gap-2 text-gray-500 font-semibold'>
                            <ArrowLeft/>
                            <span>Back</span>
                            
                        </Button>
                        <Avatar>
                            <AvatarImage src={singleCompany.logo || "../../../public/favicon.png"} />
                        </Avatar>
                        <h1 className='font-bold text-xl'>{singleCompany.name} Setup</h1>
                    </div>
                    <div className='grid grid-cols-2 gap-4'> 
                        <div>
                            <Label>Company Name</Label>
                            <Input
                                type='text'
                                name='name'
                                value={input.name}
                                onChange={changEventHandler}
                            />
                        </div>
                        <div>
                            <Label>Description</Label>
                            <Input
                                type='text'
                                name='description'
                                value={input.description}
                                onChange={changEventHandler}
                            />
                        </div>
                        <div>
                            <Label>Website</Label>
                            <Input
                                type='text'
                                name='website'
                                value={input.website}
                                onChange={changEventHandler}
                            />
                        </div>
                        <div>
                            <Label>Location</Label>
                            <Input
                                type='text'
                                name='location'
                                value={input.location}
                                onChange={changEventHandler}
                            />
                        </div>
                        <div>
                            <Label>Logo</Label>
                            <Input
                                type='file'
                                name='image/*'
                                onChange={changFileHandler}
                            />
                        </div>
                    </div>
                    {
                        loading ? <Button className="w-full my-4"><Loader2 className="mr-2 h-4 animate-spin"/>Please wait</Button>
                        :<Button className='w-full mt-8'>Update</Button>
                    }
                    

                </form>
            </div>
        </div>
    )
}

export default CompanySetup