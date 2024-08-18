import { zodResolver } from '@hookform/resolvers/zod';
import { SubmitHandler, useForm } from 'react-hook-form';
import { z } from 'zod';
import countries from '../assets/countries.json';
import { User } from '../services/types/user';
import Input from './Input';
import { addUser, ErrorResponse, updateUser } from '../services/user-service';
import { AxiosError } from 'axios';

const createSchema = (isEdit: boolean) =>
  z.object({
    email: z.string().email(),
    name: z.string(),
    surname: z.string(),
    age: z.coerce.number().int().gte(0).lte(150, 'Really, how old are you?'),
    country: z.string(),
    district: z.string(),
    role: z.union([
      z.literal('admin'),
      z.literal('user'),
      z.literal('engineer'),
      z.literal('manager'),
      z.literal('intern'),
    ]),
    phone: z.string().regex(/^\d{3}-\d{3}-\d{4}$/, 'Phone must be in a format 444-440-4040'),
    ...(isEdit ? {} : { password: z.string().min(6, 'Password must have a minimum 6 length.') }),
  });

type FormFields = z.infer<ReturnType<typeof createSchema>>;

interface UserFormProps {
  user?: User;
}
export default function UserForm({ user }: UserFormProps) {
  const schema = createSchema(!!user);
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors, isSubmitting },
  } = useForm<FormFields>({
    defaultValues: user
      ? {
          name: user.name,
          surname: user.surname,
          email: user.email,
          phone: user.phone,
          age: user.age,
          country: user.country,
          district: user.district,
          role: user.role,
        }
      : undefined,
    resolver: zodResolver(schema),
  });

  const isError = Object.keys(errors).filter((key) => key !== 'root').length > 0;

  const onSubmit: SubmitHandler<FormFields> = async (data) => {
    try {
      if (user) {
        const updatedUser = {
          id: user.id,
          ...data,
        };
        return await updateUser(updatedUser as User);
      }
      return await addUser(data as User);
    } catch (error) {
      const err = error as AxiosError<ErrorResponse>;
      setError('root', {
        message: JSON.stringify(err!.response?.data?.message || 'An unknown error occurred'),
      });
    }
  };
  return (
    <form className='flex flex-col gap-2' onSubmit={handleSubmit(onSubmit)}>
      <Input id='name' label='Name' type='text' {...register('name')} error={errors.name?.message} />
      <Input id='surname' label='Surname' type='text' {...register('surname')} error={errors.surname?.message} />
      <Input
        id='email'
        label='Email'
        type='text'
        {...register('email')}
        placeholder='example@example.com'
        error={errors.email?.message}
      />
      {!user && (
        <Input
          id='password'
          label='Password'
          type='password'
          {...register('password')}
          error={errors.password?.message}
        />
      )}
      <Input
        id='phone'
        label='Phone'
        type='text'
        placeholder='123-456-7890'
        {...register('phone')}
        error={errors.phone?.message}
      />
      <Input id='age' label='Age' type='number' {...register('age')} error={errors.age?.message} />

      <div className='flex items-center justify-between'>
        <div className='w-6/12'>
          <label htmlFor='country:' className='text-sm font-medium text-gray-700 mr-2'>
            Country:
          </label>
          <select id='country' className='focus:outline-none border-2 p-1 w-8/12' {...register('country')}>
            {countries.map((country) => (
              <option value={`${country.value}`}>{country.label}</option>
            ))}
          </select>
        </div>
        <div className='w-6/12'>
          <Input
            id='district'
            label='District'
            type='text'
            {...register('district')}
            error={errors.district?.message}
          />
        </div>
      </div>
      <button
        disabled={isSubmitting || isError}
        type='submit'
        className={`bg-green-600 text-white rounded-md p-2 mt-4 ${isError && 'opacity-30'} `}
      >
        {isSubmitting ? 'Loading...' : 'Submit'}
      </button>
      {errors.root && <div className='text-red-500 flex justify-center'>{errors.root.message}</div>}
    </form>
  );
}
