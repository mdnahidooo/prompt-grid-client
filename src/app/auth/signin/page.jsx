"use client";

import { authClient } from "@/lib/auth-client";
import { Check } from "@gravity-ui/icons";
import {
    Button,
    Card,
    FieldError,
    Form,
    Input,
    Label,
    TextField,
} from "@heroui/react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import { RiResetRightFill } from "react-icons/ri";
import { toast } from "react-toastify";

export default function SignInPage() {
    const router = useRouter();
    const [isShowPassword, setIsShowPassword] = useState(false);
    const [loading, setLoading] = useState(false);

    const onSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        const target = e.currentTarget;
        const email = target.elements.namedItem("email")?.value;
        const password = target.elements.namedItem("password")?.value;

        const { data, error } = await authClient.signIn.email({
            email,
            password,
            callbackURL: "/", // Redirects to home page on successful verification
        });

        setLoading(false);

        if (!error) {
            toast.success("Welcome back! Authentication successful.", {
                style: {
                    background: "#E7E1B1",
                    color: "#000000",
                    borderRadius: "16px",
                    border: "1px solid #306D29",
                },
                progressStyle: {
                    background: "#306D29",
                },
            });

            setTimeout(() => {
                router.push('/');
            }, 30);
        } else {
            toast.error(error.message || "Invalid credentials. Please verify your data.", {
                style: {
                    background: "#E7E1B1",
                    color: "#000000",
                    borderRadius: "16px",
                    border: "1px solid #0D530E",
                },
                progressStyle: {
                    background: "#306D29",
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
            console.error("Google authentication fallback breakdown:", err);
        }
    };

    return (
        <div className="flex items-center justify-center pb-20 pt-5 px-4 bg-[#FBF5DD] min-h-screen">
            <Card className="relative overflow-hidden border border-[#E7E1B1] mx-auto w-full max-w-lg py-10 mt-5 bg-white shadow-md px-6 sm:px-10">

                {/* ✨ Decorative Accent Shape */}
                <div className="absolute -top-10 -right-10 w-58 h-58 bg-[#306D29] opacity-10 rounded-full pointer-events-none"></div>

                <h1 className="text-center text-2xl font-bold text-[#000000]">
                    Sign In
                </h1>

                <Form className="flex flex-col gap-4 mt-4 w-full" onSubmit={onSubmit}>
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
                        <Input placeholder="Enter your email" className="w-full text-[#000000] border-[#E7E1B1] focus:border-[#306D29]" />
                        <FieldError className="text-red-600 text-xs mt-1" />
                    </TextField>

                    <TextField
                        isRequired
                        name="password"
                        type={isShowPassword ? "text" : "password"}
                        className="relative"
                    >
                        <Label className="text-[#000000] font-medium">Password</Label>
                        <div className="relative w-full">
                            <Input placeholder="Enter your password" className="w-full pr-10 text-[#000000] border-[#E7E1B1] focus:border-[#306D29]" />
                            <span
                                className="absolute right-3 top-1/2 -translate-y-1/2 cursor-pointer text-[#306D29] z-20 flex items-center h-full px-1"
                                onClick={() => setIsShowPassword(!isShowPassword)}
                            >
                                {isShowPassword ? <FaEye size={16} /> : <FaEyeSlash size={16} />}
                            </span>
                        </div>
                        <FieldError className="text-red-600 text-xs mt-1" />
                    </TextField>

                    <div className="flex gap-3 pt-4">
                        <Button type="submit" isLoading={loading} className="bg-[#306D29] text-white font-semibold flex-1">
                            {!loading && <Check />}
                            Sign In
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
                    <span className="text-[#000000]/70">New to PromptGrid? </span>
                    <Link href="/auth/signup" className="text-[#0D530E] font-semibold hover:underline">
                        Create Account
                    </Link>
                </p>
            </Card>
        </div>
    );
}