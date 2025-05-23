import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Link } from "react-router"
import { useNavigate } from "react-router"

import ApiRequest from "@/api"

export function LoginForm({
  className,
  ...props
}) {

  //handle login - miku21
  const handleLogin = async (e) => {
    e.preventDefault();
    const email = e.target.email.value;
    const password = e.target.password.value;

    try {
      const res = await ApiRequest.post("/api/login", {email, password})
      localStorage.setItem("token", res.data.token);
      alert("Login Successfull")
      /**
       * TODO : GIVE BELOW THIS CODE TO DASHBOARD
       */

      //end
    } catch (error) {
      alert(error.response?.data?.msg || "Login failed");
    }
  }
  return (
    <div className={cn("flex flex-col gap-6 items-center justify-center h-screen", className)} {...props}>
      <Card>
        <CardHeader className={'flex flex-col gap-10'}>
          <CardTitle className={'text-2xl text-center'}>Login to your account</CardTitle>
          <CardDescription>
            Enter your email below to login to your account
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleLogin}>
            <div className="flex flex-col gap-6">
              <div className="grid gap-3">
                <Label htmlFor="email">Email</Label>
                <Input id="email" type="email" placeholder="m@example.com" required />
              </div>
              <div className="grid gap-3">
                <div className="flex items-center gap-5">
                  <Label htmlFor="password">Password</Label>
                  <a
                    href="#"
                    className="ml-auto inline-block text-sm underline-offset-4 hover:underline">
                    Forgot your password?
                  </a>
                </div>
                <Input id="password" type="password" required />
              </div>
              <div className="flex flex-col gap-3">
                <Button type="submit" className="w-full">
                  Login
                </Button>
                {/* <Button variant="outline" className="w-full">
                  Login with Google
                </Button> */}
              </div>
            </div>
            <div className="mt-4 text-center text-sm">
              Don&apos;t have an account?{" "}
              <Link to="/register" className="underline underline-offset-4">
                Sign up
              </Link>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}


export function RegisterForm({
  className,
  ...props
}) {
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    const name = e.target.name.value;
    const age = e.target.age.value;
    // const address = e.target.address.value;
    // const username = e.target.username.value;
    const email = e.target.email.value;
    const password = e.target.password.value;

    try {
      const res = await ApiRequest.post("/api/register",{
        name,
        age,
        email,
        password
      });
      alert("Registration successful! You can now log in.");
      navigate("/login");
    } catch (error) {
      alert(error.response?.data?.msg || "Registration failed");
    }
  }
  return (
    <div className={cn("flex flex-col gap-6 items-center justify-center h-screen", className)} {...props}>
      <Card>
        <CardHeader className={'flex flex-col gap-10'}>
          <CardTitle className={'text-2xl text-center'}>Register to your account</CardTitle>
          <CardDescription>
            Enter data of registration data to make account
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleRegister}>
            <div className="flex flex-col gap-6">
              <div className="grid gap-3">
                <Label htmlFor="email">Name</Label>
                <Input id="name" type="text"  required />
              </div>
              <div className="grid gap-3">
                <Label htmlFor="email">Age</Label>
                <Input id="age" type="number"  required />
              </div>
              <div className="grid gap-3">
                <Label htmlFor="email">Email</Label>
                <Input id="email" type="email" placeholder="m@example.com" required />
              </div>
              <div className="grid gap-3">
                <div className="flex items-center gap-5">
                  <Label htmlFor="password">Password</Label>
                  <a
                    href="#"
                    className="ml-auto inline-block text-sm underline-offset-4 hover:underline">
                    Forgot your password?
                  </a>
                </div>
                <Input id="password" type="password" required />
              </div>
              <div className="flex flex-col gap-3">
                <Button type="submit" className="w-full">
                  Register
                </Button>
                {/* <Button variant="outline" className="w-full">
                  Login with Google
                </Button> */}
              </div>
            </div>
            <div className="mt-4 text-center text-sm">
              Already have an account?{" "}
              <Link to="/login" className="underline underline-offset-4">
                Login
              </Link>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
