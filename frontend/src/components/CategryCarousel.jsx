import React, { useState, useEffect, useRef } from 'react';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from './ui/carousel';
import { Button } from './ui/button';
import { useDispatch } from 'react-redux';
import { setSearchedQuery } from '@/redux/jobSlice';
import { useNavigate } from 'react-router-dom';

const category = ['Frontend Developer', 'Backend Developer', 'Data Analyst', 'UI/UX Designer', 'Product Manager', 'AI Engineer'];

const CategryCarousel = () => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const extendedCategory = [...category, ...category]; // Nhân đôi mảng category
    const transitionRef = useRef(null);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const searchJobHandler = (query) => {
      dispatch(setSearchedQuery(query));
      navigate("/browse")
    };
    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentIndex((prevIndex) => {
                if (prevIndex === extendedCategory.length - 1) {
                    return prevIndex + 1; // Di chuyển đến phần tử ảo sau cùng để tạo hiệu ứng mượt
                } else {
                    return prevIndex + 1;
                }
            });
        }, 1000); // Tự động chuyển động mỗi 1 giây

        return () => clearInterval(interval); // Dọn dẹp interval khi component bị unmount
    }, []);

    useEffect(() => {
        if (currentIndex === extendedCategory.length) {
            transitionRef.current.style.transition = 'none';
            setCurrentIndex(category.length);
        } else {
            transitionRef.current.style.transition = 'transform 0.5s ease-in-out';
        }
    }, [currentIndex]);

    return (
        <div>
            <Carousel className='w-full max-w-xl mx-auto my-20'>
                <CarouselContent
                    ref={transitionRef}
                    style={{
                        transform: `translateX(-${(currentIndex * 100) / extendedCategory.length}%)`,
                        transition: 'transform 0.5s ease-in-out',
                    }}>
                    {extendedCategory.map((cat, index) => (
                        <CarouselItem key={index} className='md:basis-1/2 lg:basis-1/3'>
                            <Button onClick={()=> searchJobHandler(cat)} variant='outline' className='rounded-full'>
                                {cat}
                            </Button>
                        </CarouselItem>
                    ))}
                </CarouselContent>
                <CarouselPrevious onClick={() => setCurrentIndex((prevIndex) => (prevIndex - 1 + extendedCategory.length) % extendedCategory.length)} />
                <CarouselNext onClick={() => setCurrentIndex((prevIndex) => (prevIndex + 1) % extendedCategory.length)} />
            </Carousel>
        </div>
    );
};

export default CategryCarousel;
