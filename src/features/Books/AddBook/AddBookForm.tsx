import {useForm, Controller} from 'react-hook-form';
import {zodResolver} from '@hookform/resolvers/zod';
import z from 'zod';
import Input from '@/components/hook-forms/Input';
import useAddBook from './useAddForm';
import { useAuthUser } from '@/features/Auth/useAuthUser';

const schema = z.object({
    title: z.string(),
    description: z.string().optional(),
    total_number_of_pages: z.number().min(1,{message:'Must be above 1'}),    
});

type CreateFormInputs = z.infer<typeof schema>;

type Props = {
    handleClose: ()=> void;
}
const CreateBookForm = ({handleClose}: Props)=>{
    const {id} = useAuthUser();
    const {mutate: addBook} = useAddBook();
    const { control, handleSubmit, formState: { errors } } = useForm<CreateFormInputs>({
        resolver: zodResolver(schema),
    });

    const onSubmit  = (data: CreateFormInputs)=>{
        addBook({...data, user_id:id}, {
            onSuccess:handleClose
        })
    }
   return <div>
    <p className='text-center text-xl'>Add a new book</p>
    <div className='space-y-3'>

    <Controller
        name="title"
        control={control}
        render={({ field }) => (
            <Input
                label="Title"
                type="text"
                placeholder="Write book name"
                value={field.value || ''}
                onChange={field.onChange}
                error={errors.title?.message}
            />
        )}
    />
    <Controller
        name="description"
        control={control}
        render={({ field }) => (
            <Input
                label="Description"
                type="text"
                placeholder="Write a short description about it (optional)"
                value={field.value || ''}
                onChange={field.onChange}
                error={errors.description?.message}
            />
        )}
    />
    <Controller
        name="total_number_of_pages"
        control={control}
        render={({ field }) => (
            <Input
                label="Total number of pages"
                type="number"
                placeholder="0"
                value={field.value?.toString() || ''}
                onChange={(event)=>field.onChange(event.target.valueAsNumber)}
                error={errors.total_number_of_pages?.message}
            />
        )}
    />
    <button className="btn btn-primary w-full" onClick={handleSubmit(onSubmit)}>Add Book Info</button>
    </div>

   </div>
}

export default CreateBookForm;