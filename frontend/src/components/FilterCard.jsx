import React from 'react'
import { RadioGroup, RadioGroupItem } from './ui/radio-group'
import { Label } from './ui/label'

const filterData = [
  {
    filterType: "Location",
    array: ["Ho Chi Minh", "Ha Noi", "Da Nang", "Binh Duong", "Vung Tau"]
  },
  {
    filterType: "Industry",
    array: ["Frontend", "Backend", "Fullstack", "Mobile", "DevOps"]
  },
  {
    filterType: "Salary",
    array: ["0-5M", "5-10M", "10-20M", "20-40M", ">40M"]
  },
]
const FilterCard = () => {
  return (
    <div className='w-full bg-white p-3 rounded-md'>
      <h1 className='font-bold text-lg'>Filter Jobs</h1>
      <hr className='mt-3'/>
      <RadioGroup>
        {
          filterData.map((data,index) =>(
            <div>
              <h1 className='font-bold text-lg'>{data.filterType}</h1>
              {
                data.array.map((item,index) => {
                  return (
                    <div className='flex items-center space-x-2 my-2'>
                      <RadioGroupItem value={item}/>
                      <Label>{item}</Label>
                    </div>
                  )
                })
              }
            </div>
          ))
        }
      </RadioGroup>

    </div>
  )
}

export default FilterCard