import React, { useEffect, useState } from "react";
import Navbar from "./shared/Navbar";
import FilterCard from "./FilterCard";
import Job from "./Job";
import { useSelector } from "react-redux";
import { motion } from "framer-motion";


const Jobs = () => {
    const { allJobs, searchedQuery } = useSelector((store) => store.job);
    const [filterJobs, setFilterJobs] = useState(allJobs);

    const parseSalaryRange = (salaryQuery) => {
        // Remove 'M' and split the range
        const range = salaryQuery.replace('M', '').split('-');
        const minSalary = parseFloat(range[0]) * 1000000;
        const maxSalary = parseFloat(range[1]) * 1000000;
        return { minSalary, maxSalary };
    };

    useEffect(() => {
        if (searchedQuery) {
            console.log(searchedQuery);

            const filteredJobs = allJobs.filter((job) => {
                const matchesTitle = job.title.toLowerCase().includes(searchedQuery.toLowerCase());
                const matchesDescription = job.description.toLowerCase().includes(searchedQuery.toLowerCase());
                const matchesLocation = job.location.toLowerCase().includes(searchedQuery.toLowerCase());

                let matchesSalary = false;
                
                // Check if the query is in a salary range format (e.g., "7-15M")
                if (searchedQuery.includes('-') && searchedQuery.toLowerCase().includes('m')) {
                    const { minSalary, maxSalary } = parseSalaryRange(searchedQuery);
                    matchesSalary = job.salary >= minSalary && job.salary <= maxSalary;
                } else {
                    matchesSalary = job.salary.toString().includes(searchedQuery);
                }

                return matchesTitle || matchesDescription || matchesLocation || matchesSalary;
            });
            
            setFilterJobs(filteredJobs);
        } else {
            setFilterJobs(allJobs);
        }
    }, [allJobs, searchedQuery]);

    return (
        <div>
            <Navbar />
            <div className="max-w-7xl mx-auto mt-5">
                <div className="flex gap-5">
                    <div className="w-20%">
                        <FilterCard />
                    </div>
                    {filterJobs.length <= 0 ? (
                        <span>Job not found</span>
                    ) : (
                        <div className="flex-1 h-[88vh] overflow-y-auto pb-5">
                            <div className="grid grid-cols-3 gap-4">
                                {filterJobs.map((job) => (
                                    <motion.div 
                                        initial={{opacity:0,x:100}}
                                        animate={{opacity:1,x:0}}
                                        exit={{opacity:0,x:-100}}
                                        transition={{duration:0.3}}
                                        key={job?._id}
                                    >
                                        <Job job={job} />
                                    </motion.div>
                                ))}
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Jobs;
