import React, { useEffect, useState } from "react";
import Navbar from "../shared/Navbar";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { RadioGroup } from "../ui/radio-group";
import { Button } from "../ui/button";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { USER_API_END_POINT } from "@/utils/constant";
import { toast } from "sonner";
import { useDispatch, useSelector } from "react-redux";
import { setLoading } from "@/redux/authSlice";
import { Loader2 } from "lucide-react";

const Signup = () => {
  const [input, setInput] = useState({
    fullname: "",
    email: "",
    phoneNumber: "",
    password: "",
    confirmPassword: "",
    role: "student",
    file: "",
  });
  const {loading,user} = useSelector((store) => store.auth);
  const dispath = useDispatch();
  const navigate = useNavigate();
  const changeEventHandler = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };
  const changeFileHandler = (e) => {
    setInput({ ...input, file: e.target.files?.[0] });
  };
  const submidHandler = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("fullname", input.fullname);
    formData.append("email", input.email);
    formData.append("phoneNumber", input.phoneNumber);
    formData.append("password", input.password);
    formData.append("role", input.role);
    if (input.file) {
        formData.append("file", input.file);
    }
    if (input.password !== input.confirmPassword) {
        toast.error("Password and confirm password must be same");
        return;
    }
    try {
        dispath(setLoading(true));
        const res = await axios.post(`${USER_API_END_POINT}/register`, formData,{
            headers: {
                "Content-Type": "multipart/form-data",
            },
            withCredentials: true,
        });        
        if (res.data.success) {
            navigate("/login");
            toast.success(res.data.message);
        }
        
    } catch (error) {
        console.log(error);
        toast.error(error.response.data.message);
    } finally {
        dispath(setLoading(false));
    }
  }
  useEffect(() => {
    if (user){
      navigate("/");
    }
}, []);
  return (
    <div>
      <Navbar />
      <div className="flex items-center justify-center max-w-7xl mx-auto">
        <form
          onSubmit={submidHandler}
          action=""
          className="w-1/2 border border-gray-200 rounded-md p-4 my-10"
        >
          <h1 className="font-bold text-xl mb-5">Sign Up</h1>
          <div className="my-2">
            <Label>Full Name</Label>
            <Input
              type="text"
              placeholder="Enter your full name"
              name="fullname"
              value={input.fullname}
              onChange={changeEventHandler}
            />
          </div>
          <div className="my-2">
            <Label>Email</Label>
            <Input
              type="email"
              placeholder="abc@gmail.com"
              name="email"
              value={input.email}
              onChange={changeEventHandler}
            />
          </div>
          <div className="my-2">
            <Label>Phone Number</Label>
            <Input
              type="number"
              placeholder="Enter your phone number"
              name="phoneNumber"
              value={input.phoneNumber}
              onChange={changeEventHandler}
            />
          </div>
          <div className="my-2">
            <Label>Password</Label>
            <Input
              type="password"
              placeholder="Enter your password"
              name="password"
              value={input.password}
              onChange={changeEventHandler}
            />
          </div>
          <div className="my-2">
            <Label>Confirm Password</Label>
            <Input
              type="password"
              placeholder="Confirm your password"
              name="confirmPassword"
              value={input.confirmPassword}
              onChange={changeEventHandler}
            />
          </div>
          <div className="flex items-center justify-between">
            <RadioGroup
              defaultValue="student"
              className="flex items-center gap-4 my-5"
            >
              <div className="flex items-center space-x-2">
                <Input
                  type="radio"
                  name="role"
                  value="student"
                  id="r1"
                  checked={input.role === "student" ? true : false}
                  onChange={changeEventHandler}
                  className="cursor-pointer"
                />
                <Label htmlFor="r1">Student</Label>
              </div>
              <div className="flex items-center space-x-2">
                <Input
                  type="radio"
                  name="role"
                  value="recruiter"
                  id="r2"
                  checked={input.role === "recruiter" ? true : false}
                  onChange={changeEventHandler}
                  className="cursor-pointer"
                />
                <Label htmlFor="r2">Recruiter</Label>
              </div>
            </RadioGroup>
            <div className="flex items-center gap-2">
              <Label>Profile</Label>
              <Input 
                accept="image/*" 
                type="file" 
                onChange={changeFileHandler}
                className="cursor-pointer"  
            />
            </div>
          </div>
          {
            loading ? <Button className="w-full my-4"><Loader2 className="mr-2 h-4 animate-spin"/>Please wait</Button>
            :<Button type="submit" className="w-full my-4">Sign Up</Button>
          }
          
          <span className="text-sm"> Already have an account?
            <Link to={"/login"} className="text-blue-600">Login</Link>
          </span>
        </form>
      </div>
    </div>
  );
};

export default Signup;
