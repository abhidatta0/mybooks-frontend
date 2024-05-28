import Constants from '@/constants/app';
import {useForm, Controller} from 'react-hook-form';
import {zodResolver} from '@hookform/resolvers/zod';
import { useAuth } from '../AuthProvider';
import z from 'zod';
import Input from '@/components/hook-forms/Input';

const schema = z.object({
    email: z.string().email({ message: 'Invalid email address' }),
    password: z.string().min(8, { message: 'Password must be at least 8 characters' }),
});

type LoginFormInputs = z.infer<typeof schema>;

const Login = ()=>{
    const {loginUser} = useAuth();

    const { control, handleSubmit, formState: { errors } } = useForm<LoginFormInputs>({
        resolver: zodResolver(schema),
    });

    const onSubmit = async (data: LoginFormInputs) => {
        try {
            await loginUser(data);
        } catch (err) {
            console.error('Login failed', err);
        }
    };
    
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
                <div className="space-y-5 w-full">
                    <Controller
                        name="email"
                        control={control}
                        render={({ field }) => (
                            <Input
                                label="Email"
                                type="email"
                                placeholder="name@email.com"
                                value={field.value || ''}
                                onChange={field.onChange}
                                error={errors.email?.message}
                            />
                        )}
                    />
                    <Controller
                        name="password"
                        control={control}
                        render={({ field }) => (
                            <Input
                                label="Password"
                                type="password"
                                placeholder="********"
                                value={field.value || ''}
                                onChange={field.onChange}
                                error={errors.password?.message}
                            />
                        )}
                    />
                    <button className="btn btn-primary w-full" onClick={handleSubmit(onSubmit)}>Login</button>
                </div>
            </div>
        </div>
    </div>
}

export default Login;