import React from 'react';
import { Badge } from './ui/badge';
import { useNavigate } from 'react-router-dom';
import { Button } from './ui/button';
import { Avatar, AvatarImage } from './ui/avatar';

const LastestJobCards = ({ job }) => {
    const navigate = useNavigate();
    return (
        <div onClick={() => navigate(`description/${job._id}`)} className='p-5 rounded-md shadow-xl bg-white border border-gray-100 cursor-pointer'>
            <div className='flex items-center gap-2 my-2'>
                <Button className='p-6' variant='outline' size='icon'>
                    <Avatar>
                        <AvatarImage src={job?.company?.logo || 'https://www.shutterstock.com/image-vector/circle-line-simple-design-logo-600nw-2174926871.jpg'} />
                    </Avatar>
                </Button>
                <div>
                    <h1 className='font-medium text-lg truncate'>{job?.company?.name}</h1>
                    <p className='text-sm text-gray-500'>{job?.company?.location}</p>
                </div>
            </div>
            <div>
                <h1 className='font-bold text-lg my-2 line-clamp-1'>{job?.title}</h1>
                <p className='text-sm text-gray-600 line-clamp-1'>{job?.description}</p>
            </div>
            <div className='flex items-center gap-2 mt-4'>
                <Badge className='text-blue-700 font-bold' variant='ghost'>
                    {job?.location}
                </Badge>
                <Badge className={'text-[#F83002] font-bold'} variant={'ghost'}>
                    {job?.jobType}
                </Badge>
                {job?.salary === '0' || job?.salary === null ? (
                    ''
                ) : isNaN(Number(job?.salary)) ? (
                    <Badge className="text-[#7209b7] font-bold" variant="ghost">
                        Negotiable
                    </Badge>
                ) : (
                    <Badge className="text-[#7209b7] font-bold" variant="ghost">
                        {job?.salary} $
                    </Badge>
                )}
            </div>
        </div>      
    );
};

export default LastestJobCards;
