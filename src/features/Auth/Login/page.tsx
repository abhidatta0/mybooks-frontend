const Login = ()=>{
    return <div className="flex bg-white p-2 w-full border">
        <div className="w-1/2 bg-blue-300">
           Left image
        </div>
        <div className="border w-1/2">
            <p>Welcome Back to Digital</p>
            <p>Please Login</p>
            <div className="space-y-3">
            <div>
            <label>Email</label>
            <input type="email" placeholder="name@gmail.com" className="input w-full max-w-xs" />
            </div>
            <div>
            <label>Password</label>
            <input type="text" placeholder="******" className="input w-full max-w-xs" />
            </div>
            </div>
        </div>
    </div>
}

export default Login;