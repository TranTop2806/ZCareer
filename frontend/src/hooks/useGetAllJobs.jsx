import { setAllJobs } from '@/redux/jobSlice';
import { JOB_API_END_POINT } from '@/utils/constant'
import axios from 'axios'
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';

const useGetAllJobs = () => {
    const dispatch = useDispatch();
    const {searchedQuery} = useSelector(store=>store.job);
    useEffect(() => {
    const fetchAllJobs = async () => {
        try {
            const query = searchedQuery ? `?keyword=${searchedQuery}` : '';
            const res = await axios.get(`${JOB_API_END_POINT}/get${query}`);
            if (res.data.success) {
                dispatch(setAllJobs(res.data.jobs));
            }
        } catch (error) {
            console.log(error);
        }
    } 
    fetchAllJobs();
  }, [searchedQuery, dispatch])
}

export default useGetAllJobs