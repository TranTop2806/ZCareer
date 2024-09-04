import React, { useState } from 'react'
import Navbar from '../shared/Navbar'
import { Label } from '../ui/label'
import { Input } from '../ui/input'
import { Button } from '../ui/button'
import { useSelector } from 'react-redux'
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from '../ui/select'
import { JOB_API_END_POINT } from '@/utils/constant'
import axios from 'axios'
import { toast } from 'sonner'
import { useNavigate } from 'react-router-dom'
import { Loader2 } from 'lucide-react'



const PostJob = () => {
    const [input, setInput] = useState({
        title: '',
        description: '', 
        requirements: '', 
        salary: '', 
        location: '', 
        jobType: '', 
        experience: '', 
        position: 0, 
        companyId: ''
    });
    const [loading, setLoading] = useState(false);
    const {companies} = useSelector(store=>store.company);
    const navigate = useNavigate();
    const changeEventHandler = (e) => {
        setInput({
            ...input,
            [e.target.name]: e.target.value
        });
    }
    const selectChangeHandler = (value) => {
        const selectedCompany = companies.find(company => company.name.toLowerCase() === value);
        setInput({
            ...input,
            companyId: selectedCompany._id
        });
    }
    const submitHandler = async (e) => {
        e.preventDefault();
        try {
            setLoading(true);
            const res = await axios.post(`${JOB_API_END_POINT}/post`, input, { 
                headers:{
                    'Content-Type': 'application/json'
                },
                withCredentials: true 
            });
            if (res.data.success) {
                toast.success(res.data.message);
                navigate("/admin/jobs");
            }
        } catch (error) {
            toast.error(error.response.data.message);
        } finally {
            setLoading(false);
        }
    }



    return (
        <div>
            <Navbar />
            <div className='flex items-center justify-center w-screen my-5'>
                <form onSubmit={submitHandler} className='p-8 max-w-4xl border-gray-200 shadow-lg rounded-md'>              
                    <div className='grid grid-cols-2 gap-3'>
                        <div>
                            <Label>Job Title</Label>
                            <Input 
                                type= 'text'
                                name='title'
                                value={input.title}
                                onChange={changeEventHandler}
                                className='focus-visible:ring-offset-0 focus-visible:ring-0 my-1'
                                placeholder='Full Stack Developer, etc.'
                            />
                        </div>
                        <div>
                            <Label>Description</Label>
                            <Input 
                                type= 'text'
                                name='description'
                                value={input.description}
                                onChange={changeEventHandler}
                                className='focus-visible:ring-offset-0 focus-visible:ring-0 my-1'
                                placeholder='We are looking for a Full Stack Developer to produce scalable software solutions. You’ll be part of a cross-functional team that’s responsible for the full software development life cycle, from conception to deployment.'
                            />
                        </div>
                        <div>
                            <Label>Requirements</Label>
                            <Input 
                                type= 'text'
                                name='requirements'
                                value={input.requirements}
                                onChange={changeEventHandler}
                                className='focus-visible:ring-offset-0 focus-visible:ring-0 my-1'
                                placeholder='Applicants must have a minimum of 3 years experience in software development, etc.'
                            />
                        </div>
                        <div>
                            <Label>Salary</Label>
                            <Input 
                                type= 'text'
                                name='salary'
                                value={input.salary}
                                onChange={changeEventHandler}
                                className='focus-visible:ring-offset-0 focus-visible:ring-0 my-1'
                                placeholder='10000000'
                            />
                        </div>
                        <div>
                            <Label>Location</Label>
                            <Input 
                                type= 'text'
                                name='location'
                                value={input.location}
                                onChange={changeEventHandler}
                                className='focus-visible:ring-offset-0 focus-visible:ring-0 my-1'
                                placeholder='Ho Chi Minh, Hanoi, etc.'
                            />
                        </div>
                        <div>
                            <Label>Job Type</Label>
                            <Input 
                                type= 'text'
                                name='jobType'
                                value={input.jobType}
                                onChange={changeEventHandler}
                                className='focus-visible:ring-offset-0 focus-visible:ring-0 my-1'
                                placeholder='Full Time, Part Time, etc.'
                            />
                        </div>
                        <div>
                            <Label>Experience Level</Label>
                            <Input 
                                type= 'text'
                                name='experience'
                                value={input.experience}
                                onChange={changeEventHandler}
                                className='focus-visible:ring-offset-0 focus-visible:ring-0 my-1'
                                placeholder='1,2,3,...'
                            />
                        </div>
                        <div>
                            <Label>No of Position</Label>
                            <Input 
                                type= 'number'
                                name='position'
                                value={input.position}
                                onChange={changeEventHandler}
                                className='focus-visible:ring-offset-0 focus-visible:ring-0 my-1'
                                placeholder='Enter position'
                            />
                        </div>
                        <div>
                            <Label className='mb-1'>Company</Label>
                            {
                                companies.length >= 0 && (
                                    <Select onValueChange={selectChangeHandler}>
                                        <SelectTrigger className="w-[180px]">
                                            <SelectValue placeholder="Select a company" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectGroup>
                                            {
                                                companies.map((company) => {
                                                    return (
                                                        <SelectItem value={company?.name?.toLowerCase()}> 
                                                            {company.name}
                                                        </SelectItem>
                                                    )
                                                })
                                            }
                                                
                                            </SelectGroup>
                                        </SelectContent>
                                    </Select>
                                )
                            }    
                        </div>
                        
                    </div> 

                    {
                        loading ? <Button className="w-full my-4"><Loader2 className="mr-2 h-4 animate-spin"/>Please wait</Button>
                        :<Button className='w-full mt-8'>Post Job</Button>
                    }
                    {
                        companies.length === 0 && <p className='text-xs text-red-600 font-bold text-center my-3' >*Please register a company first, before posting a jobs</p>
                    }
                
                </form>             
            </div>
        </div>
    )
}

export default PostJob