import React from "react";
import { Button } from "./ui/button";
import { Bookmark } from "lucide-react";
import { Avatar, AvatarImage } from "./ui/avatar";
import { Badge } from "./ui/badge";
import { useNavigate } from "react-router-dom";

const Job = ({ job }) => {
    const navigate = useNavigate();
    const daysAgoFunction = (mongodbTime) => {
        const createdAt = new Date(mongodbTime);
        const currentTime = new Date();
        const diff = currentTime - createdAt;
        return Math.floor(diff / (1000 * 60 * 60 * 24));
    }


    return (
        <div className="p-5 rounded-md shadow-xl bg-white border-gray-100">
            <div className="flex items-center justify-between">
                <p className="text-sm text-gray-650">{daysAgoFunction(job?.createdAt) <= 1 ? "Today" : `${daysAgoFunction(job?.createdAt)} days ago`}</p>
                <Button variant="outline" className="rounded-full" size="icon">
                    <Bookmark />
                </Button>
            </div>

            <div className="flex items-center gap-2 my-2">
                <Button className="p-6" variant="outline" size="icon">
                    <Avatar>
                        <AvatarImage src={job?.company?.logo || "https://www.shutterstock.com/image-vector/circle-line-simple-design-logo-600nw-2174926871.jpg"} />
                    </Avatar>
                </Button>
                <div>
                    <h1 className="font-medium text-lg">{job?.company?.name}</h1>
                    <p className="text-sm text-gray-500">{job?.location}</p>
                </div>
            </div>
            <div>
                <h1 className="font-bold text-lg my-2">{job?.title}</h1>
                <p className="text-sm text-gray-600">
                    {job?.description}
                </p>
            </div>
            <div className="flex items-center gap-2 mt-4">
                <Badge className={"text-blue-700 font-bold"} variant={"ghost"}>
                {job?.position} {job?.position > 1 ? 'Positions' : 'Position'}
                </Badge>
                <Badge className={"text-[#F83002] font-bold"} variant={"ghost"}>{job?.jobType}</Badge>
                <Badge className={"text-[#7209b7] font-bold"} variant={"ghost"}>{job?.salary} VNĐ</Badge>
            </div>
            <div className="flex items-center gap-4 mt-4">
                <Button
                    onClick={() => navigate(`/description/${job?._id}`)}
                    variant="outline"
                >
                Details
                </Button>
                <Button className="bg-[#7209b7]">Save For Later</Button>
            </div>
        </div>
    );
};

export default Job;
