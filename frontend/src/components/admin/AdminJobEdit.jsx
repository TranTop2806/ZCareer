// import React, { useEffect, useState } from 'react';
// import Navbar from '../shared/Navbar';
// import { Button } from '../ui/button';
// import { ArrowLeft, Loader2 } from 'lucide-react';
// import { Label } from '../ui/label';
// import { Input } from '../ui/input';
// import { JOB_API_END_POINT } from '@/utils/constant';
// import axios from 'axios';
// import { useNavigate, useParams } from 'react-router-dom';
// import { toast } from 'sonner';
// import { useDispatch, useSelector } from 'react-redux';
// import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
// import { setSingleJob } from '@/redux/jobSlice';

// const AdminJobEdit = () => {
//     const { id: jobId } = useParams(); // Lấy jobId từ URL
//     const dispatch = useDispatch();
//     const [input, setInput] = useState({
//         title: '',
//         description: '',
//         location: '',
//         jobType: '',
//         experience: '',
//         requirements: '',
//         salary: '',
//         position: 0,
//         companyId: '',
//     });
//     const { singlejob } = useSelector((store) => store.job); // Truy xuất singlejob từ store
//     const { companies } = useSelector((store) => store.company);
//     const [loading, setLoading] = useState(false);
//     const navigate = useNavigate();

//     // Hàm thay đổi giá trị input
//     const changeEventHandler = (e) => {
//         setInput({
//             ...input,
//             [e.target.name]: e.target.value,
//         });
//     };

//     // Hàm thay đổi công ty
//     const selectChangeHandler = (value) => {
//         const selectedCompany = companies.find((company) => company.name.toLowerCase() === value);
//         setInput({
//             ...input,
//             companyId: selectedCompany._id,
//         });
//     };

//     // Fetch dữ liệu của công việc từ API nếu singlejob chưa có
//     useEffect(() => {
//         const fetchSingleJob = async () => {
//             try {
//                 const res = await axios.get(`${JOB_API_END_POINT}/get/${jobId}`, { withCredentials: true });
//                 if (res.data.success) {
//                     dispatch(setSingleJob(res.data.job)); // Lưu job vào Redux store
//                 }
//             } catch (error) {
//                 console.log(error);
//                 toast.error('Failed to load job data.');
//             }
//         };

//         if (!singlejob) {
//             fetchSingleJob(); // Fetch nếu singlejob chưa được nạp
//         }
//     }, [jobId, dispatch, singlejob]);

//     // Cập nhật form khi singlejob có dữ liệu
//     useEffect(() => {
//         if (singlejob) {
//             setInput({
//                 title: singlejob?.title || '',
//                 description: singlejob?.description || '',
//                 location: singlejob?.location || '',
//                 jobType: singlejob?.jobType || '',
//                 experience: singlejob?.experience || '',
//                 requirements: singlejob?.requirements || '',
//                 salary: singlejob?.salary || '',
//                 position: singlejob?.position || 0,
//                 companyId: singlejob?.company?._id || '',
//             });
//         }
//     }, [singlejob]);

//     // Hàm submit form để cập nhật công việc
//     const submitHandler = async (e) => {
//         e.preventDefault();
//         console.log(input);

//         try {
//             setLoading(true);
//             const res = await axios.put(`${JOB_API_END_POINT}/update/${jobId}`, input, {
//                 headers: {
//                     'Content-Type': 'application/json',
//                 },
//                 withCredentials: true,
//             });
//             if (res.data.success) {
//                 toast.success(res.data.message);
//                 navigate('/admin/jobs');
//             }
//         } catch (error) {
//             console.log(error);
//             toast.error(error.response.data.message);
//         } finally {
//             setLoading(false);
//         }
//     };
//     return (
//         <div>
//             <Navbar />
//             <div className='flex items-center justify-center w-screen my-5'>
//                 <form onSubmit={submitHandler} className='p-8 max-w-4xl border-gray-200 shadow-lg rounded-md'>
//                     <div className='flex items-center gap-5 p-8'>
//                         <Button onClick={() => navigate('/admin/jobs')} variant='outline' className='flex items-center gap-2 text-gray-500 font-semibold'>
//                             <ArrowLeft />
//                             <span>Back</span>
//                         </Button>
//                         <h1 className='font-bold text-xl'>Edit Job</h1>
//                     </div>
//                     <div className='grid grid-cols-2 gap-3'>
//                         <div>
//                             <Label>Job Title</Label>
//                             <Input type='text' name='title' value={input.title} onChange={changeEventHandler} className='focus-visible:ring-offset-0 focus-visible:ring-0 my-1' placeholder='Full Stack Developer, etc.' />
//                         </div>
//                         <div>
//                             <Label>Description</Label>
//                             <Input
//                                 type='text'
//                                 name='description'
//                                 value={input.description}
//                                 onChange={changeEventHandler}
//                                 className='focus-visible:ring-offset-0 focus-visible:ring-0 my-1'
//                                 placeholder='We are looking for a Full Stack Developer to produce scalable software solutions. You’ll be part of a cross-functional team that’s responsible for the full software development life cycle, from conception to deployment.'
//                             />
//                         </div>
//                         <div>
//                             <Label>Requirements</Label>
//                             <Input type='text' name='requirements' value={input.requirements} onChange={changeEventHandler} className='focus-visible:ring-offset-0 focus-visible:ring-0 my-1' placeholder='Applicants must have a minimum of 3 years experience in software development, etc.' />
//                         </div>
//                         <div>
//                             <Label>Salary ($(</Label>
//                             <Input type='text' name='salary' value={input.salary} onChange={changeEventHandler} className='focus-visible:ring-offset-0 focus-visible:ring-0 my-1' placeholder='1000,2000,ect.' />
//                         </div>
//                         <div>
//                             <Label>Location</Label>
//                             <Input type='text' name='location' value={input.location} onChange={changeEventHandler} className='focus-visible:ring-offset-0 focus-visible:ring-0 my-1' placeholder='Ho Chi Minh, Hanoi, etc.' />
//                         </div>
//                         <div>
//                             <Label>Job Type</Label>
//                             <Input type='text' name='jobType' value={input.jobType} onChange={changeEventHandler} className='focus-visible:ring-offset-0 focus-visible:ring-0 my-1' placeholder='Full Time, Part Time, etc.' />
//                         </div>
//                         <div>
//                             <Label>Experience Level</Label>
//                             <Input type='text' name='experience' value={input.experience} onChange={changeEventHandler} className='focus-visible:ring-offset-0 focus-visible:ring-0 my-1' placeholder='1,2,3,...' />
//                         </div>
//                         <div>
//                             <Label>No of Position</Label>
//                             <Input type='number' name='position' value={input.position} onChange={changeEventHandler} className='focus-visible:ring-offset-0 focus-visible:ring-0 my-1' placeholder='Enter position' />
//                         </div>
//                         <div>
//                             <Label className='mb-1'>Company</Label>
//                             {companies.length > 0 && (
//                                 <Select onValueChange={selectChangeHandler} defaultValue={input.companyId}>
//                                     <SelectTrigger className='w-[180px]'>
//                                         <SelectValue placeholder={companies.find((company) => company._id === input.companyId)?.name || 'Select a company'} />
//                                     </SelectTrigger>
//                                     <SelectContent>
//                                         <SelectGroup>
//                                             {companies.map((company) => (
//                                                 <SelectItem key={company._id} value={company.name.toLowerCase()}>
//                                                     {company.name}
//                                                 </SelectItem>
//                                             ))}
//                                         </SelectGroup>
//                                     </SelectContent>
//                                 </Select>
//                             )}
//                         </div>
//                     </div>

//                     {loading ? (
//                         <Button className='w-full my-4'>
//                             <Loader2 className='mr-2 h-4 animate-spin' />
//                             Please wait
//                         </Button>
//                     ) : (
//                         <Button className='w-full mt-8'>Edit Job</Button>
//                     )}
//                     {companies.length === 0 && <p className='text-xs text-red-600 font-bold text-center my-3'>*Please register a company first, before posting a jobs</p>}
//                 </form>
//             </div>
//         </div>
//     );
// };

// export default AdminJobEdit;


import React, { useEffect, useState } from 'react';
import Navbar from '../shared/Navbar';
import { Button } from '../ui/button';
import { ArrowLeft, Loader2 } from 'lucide-react';
import { Label } from '../ui/label';
import { Input } from '../ui/input';
import { JOB_API_END_POINT } from '@/utils/constant';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'sonner';
import { useSelector } from 'react-redux';
import { setSingleJob } from '@/redux/jobSlice';
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from '../ui/select';

const AdminJobEdit = () => {
    const { id: jobId } = useParams(); // Lấy jobId từ URL
    const [input, setInput] = useState({
        title: '',
        description: '',
        location: '',
        jobType: '',
        experience: '',
        requirements: '',
        salary: '',
        position: 0,
        companyId: '',
    });
    const { singlejob } = useSelector((store) => store.job); // Truy xuất singlejob từ store
    const { companies } = useSelector((store) => store.company);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    // Hàm thay đổi giá trị input
    const changeEventHandler = (e) => {
        setInput({
            ...input,
            [e.target.name]: e.target.value,
        });
    };

    // Hàm thay đổi công ty
    const selectChangeHandler = (value) => {
        const selectedCompany = companies.find((company) => company.name.toLowerCase() === value);
        setInput({
            ...input,
            companyId: selectedCompany?._id,
        });
    };

    // Fetch dữ liệu của công việc từ API nếu singlejob chưa có
    useEffect(() => {
        const fetchSingleJob = async () => {
            try {
                const res = await axios.get(`${JOB_API_END_POINT}/get/${jobId}`, { withCredentials: true });
                if (res.data.success) {
                    setInput({
                        title: res.data.job?.title || '',
                        description: res.data.job?.description || '',
                        location: res.data.job?.location || '',
                        jobType: res.data.job?.jobType || '',
                        experience: res.data.job?.experience || '',
                        requirements: res.data.job?.requirements || '',
                        salary: res.data.job?.salary || '',
                        position: res.data.job?.position || 0,
                        companyId: res.data.job?.company?._id || '',
                    });
                }
            } catch (error) {
                console.log(error);
                toast.error('Failed to load job data.');
            }
        };

        fetchSingleJob(); // Fetch ngay khi trang được tải
    }, [jobId]);

    // Hàm submit form để cập nhật công việc
    const submitHandler = async (e) => {
        e.preventDefault();
        console.log(input);

        try {
            setLoading(true);
            const res = await axios.put(`${JOB_API_END_POINT}/update/${jobId}`, input, {
                headers: {
                    'Content-Type': 'application/json',
                },
                withCredentials: true,
            });
            if (res.data.success) {
                toast.success(res.data.message);
                navigate('/admin/jobs');
            }
        } catch (error) {
            console.log(error);
            toast.error(error.response?.data?.message || 'An error occurred');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div>
            <Navbar />
            <div className='max-w-xl mx-auto my-10'>
                <form onSubmit={submitHandler}>
                    <div className='flex items-center gap-5 p-8'>
                        <Button onClick={() => navigate('/admin/jobs')} variant='outline' className='flex items-center gap-2 text-gray-500 font-semibold'>
                            <ArrowLeft />
                            <span>Back</span>
                        </Button>
                        <h1 className='font-bold text-xl'>Edit Job</h1>
                    </div>
                    <div className='grid grid-cols-2 gap-4'>
                        <div>
                            <Label>Job Title</Label>
                            <Input
                                type='text'
                                name='title'
                                value={input.title}
                                onChange={changeEventHandler}
                            />
                        </div>
                        <div>
                            <Label>Description</Label>
                            <Input
                                type='text'
                                name='description'
                                value={input.description}
                                onChange={changeEventHandler}
                            />
                        </div>
                        <div>
                            <Label>Requirements</Label>
                            <Input
                                type='text'
                                name='requirements'
                                value={input.requirements}
                                onChange={changeEventHandler}
                            />
                        </div>
                        <div>
                            <Label>Salary</Label>
                            <Input
                                type='text'
                                name='salary'
                                value={input.salary}
                                onChange={changeEventHandler}
                            />
                        </div>
                        <div>
                            <Label>Location</Label>
                            <Input
                                type='text'
                                name='location'
                                value={input.location}
                                onChange={changeEventHandler}
                            />
                        </div>
                        <div>
                            <Label>Job Type</Label>
                            <Input
                                type='text'
                                name='jobType'
                                value={input.jobType}
                                onChange={changeEventHandler}
                            />
                        </div>
                        <div>
                            <Label>Experience Level</Label>
                            <Input
                                type='text'
                                name='experience'
                                value={input.experience}
                                onChange={changeEventHandler}
                            />
                        </div>
                        <div>
                            <Label>No of Positions</Label>
                            <Input
                                type='number'
                                name='position'
                                value={input.position}
                                onChange={changeEventHandler}
                            />
                        </div>
                        <div>
                            <Label>Company</Label>
                            {companies.length > 0 && (
                                <Select onValueChange={selectChangeHandler} defaultValue={input.companyId}>
                                    <SelectTrigger className='w-[180px]'>
                                        <SelectValue placeholder={companies.find((company) => company._id === input.companyId)?.name || 'Select a company'} />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectGroup>
                                            {companies.map((company) => (
                                                <SelectItem key={company._id} value={company.name.toLowerCase()}>
                                                    {company.name}
                                                </SelectItem>
                                            ))}
                                        </SelectGroup>
                                    </SelectContent>
                                </Select>
                            )}
                        </div>
                    </div>

                    {loading ? (
                        <Button className='w-full my-4'>
                            <Loader2 className='mr-2 h-4 animate-spin' />
                            Please wait
                        </Button>
                    ) : (
                        <Button className='w-full mt-8'>Edit Job</Button>
                    )}
                </form>
            </div>
        </div>
    );
};

export default AdminJobEdit;

