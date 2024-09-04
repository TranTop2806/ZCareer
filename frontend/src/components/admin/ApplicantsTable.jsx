import React from 'react';
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from '../ui/table';
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover';
import { MoreHorizontal } from 'lucide-react';
import { useSelector } from 'react-redux';
import { toast } from 'sonner';
import { APPLICATION_API_END_POINT } from '@/utils/constant';
import axios from 'axios';

const shortListingStatus = ['Accepted', 'Rejected'];
const ApplicantsTable = () => {
    const { applicants } = useSelector((store) => store.application);
    const statusHandler = async (status,id) => {
        try {
            axios.defaults.withCredentials = true;
            const res = await axios.post(`${APPLICATION_API_END_POINT}/status/${id}/update`, {status}
            );
            if (res.data.success) {
                toast.success(res.data.message);
            }    
        } catch (error) {
            toast.error(error.response.data.message);
            
        }
    }
    return (
        <div>
            <Table>
                <TableCaption>A list of your recent applied user</TableCaption>
                <TableHeader>
                    <TableRow>
                        <TableHead>FullName</TableHead>
                        <TableHead>Email</TableHead>
                        <TableHead>Contact</TableHead>
                        <TableHead>Resume</TableHead>
                        <TableHead>Applied On</TableHead>
                        <TableHead className='text-right'>Status</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody className=''>
                    {applicants &&
                        applicants.applications.map((item) => (
                            <tr key={item._id}>
                                <TableCell>{item?.applicant?.fullname}</TableCell>
                                <TableCell>{item?.applicant?.email}</TableCell>
                                <TableCell>{item?.applicant?.phoneNumber}</TableCell>
                                <TableCell>
                                    {
                                        item?.applicant?.profile?.resume ? 
                                        <a  className='text-blue-600 cursor-pointer' href={item?.applicant?.profile?.resume} target="_black" rel='noopener noreferrer'>{item?.applicant?.profile?.resumeOriginalName}</a>
                                        : <span>No Resume</span>
                                    }
                                </TableCell>
                                <TableCell>{item?.applicant?.createdAt.split("T")[0]}</TableCell>
                                <TableCell className='float-right '>
                                    <Popover>
                                        <PopoverTrigger>
                                            <MoreHorizontal />
                                        </PopoverTrigger>
                                        <PopoverContent className='w-32'>
                                            {shortListingStatus.map((status, i) => {
                                                return (
                                                    <div onClick={()=>statusHandler(status,item?._id)} key={i} className='flex w-fit items-center my-2 cursor-pointer'>
                                                        <span>{status}</span>
                                                    </div>
                                                );
                                            })}
                                        </PopoverContent>
                                    </Popover>
                                </TableCell>
                            </tr>
                        ))}
                </TableBody>
            </Table>
        </div>
    );
};

export default ApplicantsTable;
