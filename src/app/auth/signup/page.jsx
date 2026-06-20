"use client";

import { authClient } from "@/lib/auth-client";
import { Check } from "@gravity-ui/icons";
import {
    Button,
    Card,
    Description,
    FieldError,
    Form,
    Input,
    Label,
    TextField,
    Select,
    ListBox,
} from "@heroui/react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import { RiResetRightFill } from "react-icons/ri";
import { toast } from "react-toastify";

export default function SignUpPage() {
    const router = useRouter();
    const [isShowPassword, setIsShowPassword] = useState(false);
    const [loading, setLoading] = useState(false);

    const onSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        const target = e.currentTarget;
        const name = target.elements.namedItem("name")?.value;
        const image = target.elements.namedItem("image")?.value;
        const email = target.elements.namedItem("email")?.value;
        const password = target.elements.namedItem("password")?.value;
        const role = target.elements.namedItem("role")?.value;

        const { data, error } = await authClient.signUp.email({
            name,
            email,
            password,
            image: image || undefined,
            role: role || "user",
            plan: "free",
        });

        setLoading(false);

        if (!error) {
            toast.success("Account created successfully!", {
                style: {
                    background: "white",
                    color: "#059669", // Black text for success toast
                    borderRadius: "px",
                    border: "1px solid #059669",
                },
                progressStyle: {
                    background: "#059669",
                },
            });

            setTimeout(() => {
                router.push('/');
            }, 30);
        } else {
            toast.error(error.message || "Registration failed. Email may already exist", {
                style: {
                    background: "white",
                    color: "#000000", // Black text for error toast
                    borderRadius: "2px",
                    border: "1px solid red",
                },
                progressStyle: {
                    background: "red",
                },
            });
        }
    };

    const handleGoogleSignIn = async () => {
        try {
            await authClient.signIn.social({
                provider: 'google',
                callbackURL: '/'
            });
        } catch (err) {
            console.error("Google login pipeline breakdown:", err);
        }
    };

    return (
        <div className="flex items-center justify-center pb-20 pt-5 px-4 bg-[#FBF5DD] min-h-screen">
            <Card className="relative overflow-hidden border border-[#E7E1B1] mx-auto w-full max-w-lg py-10 mt-5 bg-white shadow-md px-6 sm:px-10">

                {/* ✨ Decorative Accent Shape */}
                <div className="absolute -top-10 -right-10 w-58 h-58 bg-[#059669] opacity-10 rounded-full pointer-events-none"></div>

                <h1 className="text-center text-2xl font-bold text-[#000000]">
                    Sign Up
                </h1>

                <Form className="flex flex-col gap-4 mt-4 w-full" onSubmit={onSubmit}>
                    <TextField isRequired name="name" type="text">
                        <Label className="text-[#000000] font-medium">Name</Label>
                        <Input placeholder="Enter your name" className="w-full text-[#000000] border-[#E7E1B1] focus:border-[#059669]" />
                        <FieldError className="text-red-600 text-xs mt-1" />
                    </TextField>

                    <TextField name="image" type="text">
                        <Label className="text-[#000000] font-medium">Image URL</Label>
                        <Input placeholder="Avatar Image URL (Optional)" className="w-full text-[#000000] border-[#E7E1B1] focus:border-[#059669]" />
                        <FieldError className="text-red-600 text-xs mt-1" />
                    </TextField>

                    <TextField
                        isRequired
                        name="email"
                        type="email"
                        validate={(value) => {
                            if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(value)) {
                                return "Please enter a valid email address";
                            }
                            return null;
                        }}
                    >
                        <Label className="text-[#000000] font-medium">Email</Label>
                        <Input placeholder="Enter your email" className="w-full text-[#000000] border-[#E7E1B1] focus:border-[#059669]" />
                        <FieldError className="text-red-600 text-xs mt-1" />
                    </TextField>

                    <TextField
                        isRequired
                        minLength={8}
                        name="password"
                        type={isShowPassword ? "text" : "password"}
                        className="relative"
                        validate={(value) => {
                            if (value.length < 8) return "Password must be at least 8 characters";
                            if (!/[A-Z]/.test(value)) return "Password must contain at least one uppercase letter";
                            if (!/[0-9]/.test(value)) return "Password must contain at least one number";
                            return null;
                        }}
                    >
                        <Label className="text-[#000000] font-medium">Password</Label>
                        <div className="relative w-full">
                            <Input placeholder="Enter your password" className="w-full pr-10 text-[#000000] border-[#E7E1B1] focus:border-[#059669]" />
                            <span
                                className="absolute right-3 top-1/2 -translate-y-1/2 cursor-pointer text-[#059669] z-20 flex items-center h-full px-1"
                                onClick={() => setIsShowPassword(!isShowPassword)}
                            >
                                {isShowPassword ? <FaEye size={16} /> : <FaEyeSlash size={16} />}
                            </span>
                        </div>
                        <Description className="text-xs text-[#000000]/80 mt-1">
                            Must be at least 8 characters with 1 uppercase and 1 number
                        </Description>
                        <FieldError className="text-red-600 text-xs mt-1" />
                    </TextField>

                    {/* Accurate Project Roles Map Selection */}
                    <Select isRequired name="role" placeholder="Select your account type">
                        <Label className="text-[#000000] font-medium">Register Workspace As</Label>
                        <Select.Trigger className="border border-[#E7E1B1] bg-white text-[#000000]">
                            <Select.Value />
                            <Select.Indicator />
                        </Select.Trigger>
                        <Select.Popover className="bg-white border border-[#E7E1B1]">
                            <ListBox>
                                <ListBox.Item id="user" textValue="user" className="text-[#000000] data-[hover=true]:bg-[#FBF5DD]">
                                    User
                                    <ListBox.ItemIndicator />
                                </ListBox.Item>
                                <ListBox.Item id="creator" textValue="creator" className="text-[#000000] data-[hover=true]:bg-[#FBF5DD]">
                                    Creator
                                    <ListBox.ItemIndicator />
                                </ListBox.Item>
                            </ListBox>
                        </Select.Popover>
                    </Select>

                    <div className="flex gap-3 pt-2">
                        <Button type="submit" isLoading={loading} className="bg-[#059669] text-white font-semibold flex-1">
                            {!loading && <Check />}
                            Submit
                        </Button>

                        <Button type="reset" className="text-[#000000] bg-[#E7E1B1] hover:bg-[#E7E1B1]/80 font-medium border border-[#E7E1B1]">
                            <RiResetRightFill />
                            Reset
                        </Button>
                    </div>
                </Form>

                <div className="relative flex py-4 items-center w-full">
                    <div className="grow border-t border-[#E7E1B1]"></div>
                    <span className="shrink mx-4 text-xs text-[#000000] uppercase font-medium">Or</span>
                    <div className="grow border-t border-[#E7E1B1]"></div>
                </div>

                <Button onClick={handleGoogleSignIn} className="w-full border border-[#E7E1B1] text-[#000000] bg-white hover:bg-[#FBF5DD] font-medium">
                    <FcGoogle size={18} />
                    Sign In With Google
                </Button>

                <p className="mt-6 text-center text-sm">
                    <span className="text-[#000000]/70">Already have an account? </span>
                    <Link href="/auth/signin" className="text-[#059669] font-semibold hover:underline">
                        Login
                    </Link>
                </p>
            </Card>
        </div>
    );
}