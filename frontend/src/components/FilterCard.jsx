import React, { useEffect, useState } from 'react';
import { RadioGroup, RadioGroupItem } from './ui/radio-group';
import { Label } from './ui/label';
import { useDispatch } from 'react-redux';
import { setSearchedQuery } from '@/redux/jobSlice';

const filterData = [
    {
        filterType: 'Location',
        array: ['Hồ Chí Minh', 'Hà Nội', 'Đà Nẵng', 'Bình Dương', 'Vũng Tàu'],
    },
    {
        filterType: 'Industry',
        array: ['Frontend', 'Backend', 'Fullstack', 'Mobile', 'DevOps', 'Testing', 'UI/UX', 'Data Science', 'AI/ML'],
    },
    {
        filterType: 'Salary',
        array: ['Negotiable','0-500$', '500-1000$', '1000-2000$', '2000-4000$', '4000-6000$', '6000-8000$', '8000-10000$'],
    },
];
const FilterCard = () => {
    const [selectedValue, setSelectedValue] = useState('');
    const changeHandler = (value) => {
        setSelectedValue(value);
    };
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(setSearchedQuery(selectedValue));
    }, [selectedValue]);

    return (
        <div className='w-full bg-white p-3 rounded-md'>
            <h1 className='font-bold text-lg'>Filter Jobs</h1>
            <hr className='mt-3' />
            <RadioGroup value={selectedValue} onValueChange = {changeHandler}>
                {filterData.map((data, index) => (
                    <div>
                        <h1 className='font-bold text-lg'>{data.filterType}</h1>
                        {data.array.map((item, idx) => {
                            const itemId = `id${index}-${idx}`
                            return (
                                <div className='flex items-center space-x-2 my-2'>
                                    <RadioGroupItem value={item} id={itemId} />
                                    <Label htmlFor={itemId}>{item}</Label>
                                </div>
                            );
                        })}
                    </div>
                ))}
            </RadioGroup>
        </div>
    );
};

export default FilterCard;
