import Constants from '@/constants/app';

const Login = ()=>{
    return <div className="flex bg-white p-2 w-full h-screen">
        <div className="w-2/5 rounded-tl-2xl rounded-bl-2xl relative bg-[url('@/assets/login.jpg')] bg-cover">
           <div className='absolute bottom-9 left-4'>
            <p className='text-white text-2xl'>Start your journey with us</p>
            <p className='text-white text-base w-2/3'>Welcome to {Constants.APP_NAME}, your ultimate companion for managing and exploring your personal library. Whether you're an avid reader, a student, or a casual book lover, our app offers a seamless experience to organize your collection, discover new reads, and track your progress.</p>
           </div>
        </div>
        <div className="flex justify-center w-3/5 pt-24">
            <div className="flex flex-col items-center">
                <p className="text-2xl">Welcome Back to {Constants.APP_NAME}</p>
                <p>Please Login</p>
                <div className="space-y-5 w-1/2">
                <div className="flex flex-col">
                <label className="text-sm">Email</label>
                <input type="email" placeholder="name@email.com" className="input input-bordered w-full" />
                </div>
                <div className="flex flex-col">
                <label className="text-sm">Password</label>
                <input type="text" placeholder="******" className="input input-bordered w-full" />
                </div>
                <button className="btn btn-primary w-full">Login</button>
                </div>
            </div>
        </div>
    </div>
}

export default Login;