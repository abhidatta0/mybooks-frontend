import {useForm, Controller} from 'react-hook-form';
import {zodResolver} from '@hookform/resolvers/zod';
import z from 'zod';
import Input from '@/components/hook-forms/Input';
import useEditForm from './useEditForm';
import { Book } from '../types';

const schema = z.object({
    title: z.string(),
    description: z.string().optional(),
    total_number_of_pages: z.number().min(1,{message:'Must be above 1'}), 
    number_of_pages_read: z.number().min(1,{message:'Must be above 1'}),    
});

type EditFormInputs = z.infer<typeof schema>;

type Props = {
    book:Book;
    handleClose: ()=> void;
}
const EditBookForm = ({handleClose, book}: Props)=>{
    const {mutate: editBook} = useEditForm();
    const isAlreadyCompleted = book.number_of_pages_read === book.total_number_of_pages;
    const { control, handleSubmit, formState: { errors } } = useForm<EditFormInputs>({
        resolver: zodResolver(schema),
        defaultValues:{
            title: book.title,
            description: book.description ?? '',
            number_of_pages_read: book.number_of_pages_read,
            total_number_of_pages: book.total_number_of_pages,
        }
    });

    const onSubmit  = (data: EditFormInputs)=>{
        editBook({payload: data, id: book.id}, {
            onSuccess:handleClose
        })
    }
   return <div>
    <p className='text-center text-xl'>Edit your book info</p>
    {isAlreadyCompleted && <p className='text-center text-xs text-red-500'>Hey, you have already finished reading</p>}
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
                disabled
            />
        )}
    />
    <Controller
        name="number_of_pages_read"
        control={control}
        render={({ field }) => (
            <Input
                label="Number of pages read"
                type="number"
                placeholder="0"
                value={field.value?.toString() || ''}
                onChange={(event)=>field.onChange(event.target.valueAsNumber)}
                error={errors.number_of_pages_read?.message}
            />
        )}
    />
    <button className="btn btn-primary w-full" onClick={handleSubmit(onSubmit)}>Update Book Info</button>
    </div>

   </div>
}

export default EditBookForm;