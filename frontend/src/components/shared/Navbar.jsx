import React from 'react';
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover';
import { Button } from '../ui/button';
import { Avatar, AvatarImage } from '../ui/avatar';
import { LogOut, User2 } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { USER_API_END_POINT } from '@/utils/constant';
import axios from 'axios';
import { toast } from 'sonner';
import { setUser } from '@/redux/authSlice';

const Navbar = () => {
    const { user } = useSelector((store) => store.auth);
    const dispath = useDispatch();
    const navigate = useNavigate();
    const logoutHandler = async () => {
        try {
            const res = await axios.get(`${USER_API_END_POINT}/logout`, { withCredentials: true });
            if (res.data.success) {
                dispath(setUser(null));
                navigate('/');
                toast.success(res.data.message);
            }
        } catch (error) {
            console.log(error);
            toast.error(error.response.data.message);
        }
    };

    return (
        <div className='bg-[#e8e5ec7e] sticky top-0 z-50'>
            <div className='flex items-center justify-between mx-auto max-w-7xl h-16'>
                <div>
                    <h1 className='text-2xl font-bold flex items-center'>
                        <Link to={'/'} className="flex items-center">
                            <img className='w-8 h-8"' src="../public/favicon.png" alt="" />
                            Z<span className='text-[#6A38C2]'>Career</span>
                        </Link>
                    </h1>
                </div>
                <div className='flex items-center gap-12'>
                    <ul className='flex font-medium items-center gap-5'>
                        {user && user.role === 'recruiter' ? (
                            <>
                                <li>
                                    <Link to={'/admin/companies'}>Companies</Link>
                                </li>
                                <li>
                                    <Link to={'/admin/jobs'}>Jobs</Link>
                                </li>
                            </>
                        ) : (
                            <>
                                <li>
                                    <Link to={'/'}>Home</Link>
                                </li>
                                <li>
                                    <Link to={'/jobs'}>Jobs</Link>
                                </li>
                                <li>
                                    <Link to={'/browse'}>Browse</Link>
                                </li>
                            </>
                        )}
                    </ul>
                    {!user ? (
                        <div className='flex items-center gap-2'>
                            <Link to={'/login'}>
                                <Button variant='outline'>Login</Button>
                            </Link>
                            <Link to={'/signup'}>
                                <Button className='bg-[#6A38C2] hover:bg-[#5b30a6]'>Signup</Button>
                            </Link>
                        </div>
                    ) : (
                        <Popover>
                            <PopoverTrigger asChild>
                                <Avatar className='cursor-pointer'>
                                    <AvatarImage src={user?.profile?.profilePhoto} alt='avatar' />
                                </Avatar>
                            </PopoverTrigger>
                            <PopoverContent className='w-80'>
                                <div>
                                    <div className='flex gap-4 space-y-2'>
                                        <Avatar>
                                            <AvatarImage src={user?.profile?.profilePhoto} alt='avatar' />
                                        </Avatar>
                                        <div>
                                            <h4 className='font-medium'>{user?.fullname}</h4>
                                            <p className='text-sm text-muted-foreground'>{user?.profile?.bio}.</p>
                                        </div>
                                    </div>
                                    <div className='flex flex-col my-2 text-gray-680'>
                                        {
                                          user && user.role === 'student' && (
                                            <div className='flex w-fit items-center gap-2 cursor-pointer'>
                                              <User2 />
                                              <Button variant='link'>
                                                  <Link to={'/profile'}>View Profile</Link>
                                              </Button>
                                            </div>
                                          )
                                        }
                                        
                                        <div className='flex w-fit items-center gap-2 cursor-pointer'>
                                            <LogOut />
                                            <Button onClick={logoutHandler} variant='link'>
                                                Logout
                                            </Button>
                                        </div>
                                    </div>
                                </div>
                            </PopoverContent>
                        </Popover>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Navbar;
