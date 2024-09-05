import React, { useEffect, useState } from "react";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import Navbar from "./shared/Navbar";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import { APPLICATION_API_END_POINT, JOB_API_END_POINT } from "@/utils/constant";
import { setSingleJob } from "@/redux/jobSlice";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "sonner";
import useGetCompanyById from "@/hooks/useGetCompanyById";
import { Avatar, AvatarImage } from "./ui/avatar";

const JobDescription = () => {
    const params = useParams();
    const jobId = params.id;
    const dispatch = useDispatch();
    
    const {user} = useSelector(store=>store.auth);
    const { singleJob } = useSelector((store) => store.job);
    const isIntiallyApplied = singleJob?.applications?.some((application) => application.applicant === user?._id)||false;
    const [isApplied, setIsApplied] = useState(isIntiallyApplied);

    const companyId = singleJob?.company;
    useGetCompanyById(companyId);
    const {singleCompany} = useSelector(store=>store.company);

    const applyJobHandler = async () => {
        try {
            const res = await axios.get(`${APPLICATION_API_END_POINT}/apply/${jobId}`, { withCredentials: true });  
            // console.log(res.data);
            
            if (res.data.success) {
                setIsApplied(true); //update the local state
                const updateSingleJob = {...singleJob, applications: [...singleJob.applications, {applicant: user?._id}]};
                dispatch(setSingleJob(updateSingleJob)); //helps us to real time UI update
                toast.success(res.data.message);
            }  
        } catch (error) {
            console.log(error);
            toast.error(error.response.data.message);
        }
    };
    

    useEffect(() => {
        const fetchSingleJob = async () => {
            try {
                const res = await axios.get(`${JOB_API_END_POINT}/get/${jobId}`, { withCredentials: true });
                if (res.data.success) {
                    dispatch(setSingleJob(res.data.job));
                    setIsApplied(res.data.job.applications.some((application) => application.applicant === user?._id));
                }
            } catch (error) {
                console.log(error);
            }
        };
        fetchSingleJob();
    }, [jobId, dispatch, user?._id]);

    return (
        <>
            <Navbar />
            <div className="max-w-7xl mx-auto my-10">
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="font-bold text-xl">{singleJob?.title}</h1>
                        <div className="flex items-center gap-2 mt-4">
                            <Badge className={"text-[#f9a826] font-bold"} variant={"ghost"}>{singleJob?.location}</Badge>
                            {singleJob?.position >1 ?
                                <Badge className={"text-blue-700 font-bold"} variant={"ghost"}>
                                {singleJob?.position} {singleJob?.position > 1 ? 'Positions' : 'Position'}
                                </Badge>
                                : ""
                            }
                            
                            <Badge className={"text-[#F83002] font-bold"} variant={"ghost"}>{singleJob?.jobType}</Badge>
                            {
                                (singleJob?.salary === "0" || singleJob?.salary === null) ? "" : <Badge className={"text-[#7209b7] font-bold"} variant={"ghost"}>{singleJob?.salary} VNĐ</Badge>
                            }
                           
                        </div>
                    </div>
                    <Button
                        onClick={isApplied? null: applyJobHandler}
                        disabled={isApplied}
                        className={`rounded-lg ${isApplied ? "bg-gray-600 cursor-not-allowed" : "bg-[#7209b7] hover:bg-[#5f32ad]"} `}>
                        {isApplied ? "Already Applied" : "Apply Now"}
                    </Button>
                </div>
                {/* Company Description */}
                <h1 className="border-b-2 border-b-gray-300 font-medium py-4">Company Description</h1>
                <div className='my-4'>
                    <div className="flex items-center mb-4">
                        <Avatar>
                            <AvatarImage src={singleCompany?.logo || "https://www.shutterstock.com/image-vector/circle-line-simple-design-logo-600nw-2174926871.jpg"} />
                        </Avatar>
                        <h1 className='font-bold text-3xl my-1 mx-3'>{singleCompany?.name}</h1>
                    </div>
                    
                    <p className='pl-4 font-normal text-gray-800 italic my-5'>{singleCompany?.description}</p>
                     
                    {
                        singleCompany?.website ?
                        <p className="pl-4 font-normal text-gray-800 italic my-5">Additional information is available online at: <a className='text-blue-600 cursor-pointer italic' href={singleCompany?.website} target="_black" rel='noopener noreferrer'>{singleCompany?.website}</a></p>
                        : <span></span>
                    }
                   
                
                </div>
                {/* Job Description */}
                <h1 className="border-b-2 border-b-gray-300 font-medium py-4">Job Description</h1>
                <div className='my-4'>
                    <h1 className='font-bold my-1'>Role: <span className='pl-4 font-normal text-gray-800'>{singleJob?.title}</span></h1>
                    <h1 className='font-bold my-1'>Location: <span className='pl-4 font-normal text-gray-800'>{singleJob?.location}</span></h1>
                    <h1 className='font-bold my-1'>Description: <span className='pl-4 font-normal text-gray-800'>{singleJob?.description}</span></h1>
                    {
                        singleJob?.position > 1 ?
                        <h1 className='font-bold my-1'>Position: <span className='pl-4 font-normal text-gray-800'>{singleJob?.position}</span></h1>
                        : ""
                    }
                    <h1 className='font-bold my-1'>Requirements:</h1>
                    <ul className='list-disc list-inside pl-8'>
                            {singleJob?.requirements?.map((requirement, index) => (
                                <li key={index} className='font-normal text-gray-800'>{requirement}</li>
                            ))}
                    </ul>
                    
                    <h1 className='font-bold my-1'>Experience: <span className='pl-4 font-normal text-gray-800'>{singleJob?.experienceLevel} years</span></h1>
                    {(singleJob?.salary === "0" || singleJob?.salary == null) ? "" : <h1 className='font-bold my-1'>Salary: <span className='pl-4 font-normal text-gray-800'>{singleJob?.salary}VNĐ</span></h1>}
                    <h1 className='font-bold my-1'>Total Applicants: <span className='pl-4 font-normal text-gray-800'>{singleJob?.applications?.length}</span></h1>
                    <h1 className='font-bold my-1'>Posted Date: <span className='pl-4 font-normal text-gray-800'>{singleJob?.createdAt.split("T")[0]}</span></h1>
                </div>
            </div>
        </>
    );
};

export default JobDescription;
