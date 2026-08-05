import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Link, useNavigate } from 'react-router-dom';
import InputField from '../components/InputField';
import { authApi } from '../../../api/auth/authApi';
import googleIcon from '../../../assets/images/google.png';

const registerSchema = z.object(
  {
    gender: z.enum(['male', 'female', 'other'], 'Vui lòng chọn giới tính').optional(),
    email: z.string().email('Email không hợp lệ'),
    birthday: z.date().optional(),
    password: z.string().min(8, 'Mật khẩu phải có ít nhất 8 ký tự'),
    confirmedPassword: z.string().min(1, 'Vui lòng xác nhận mật khẩu'),
  }).refine((data) => data.password === data.confirmedPassword,
  {
    message: 'Mật khẩu xác nhận không khớp',
    path: ['confirmedPassword'],
  });

type RegisterInput = z.infer<typeof registerSchema>;

const registerService = async (data: RegisterInput) => {
  return authApi.register(data);
};

function useRegister() {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<RegisterInput>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      gender: 'male',
    },
  });

  const onSubmit = async (data: RegisterInput) => {
    try {
      const response = await registerService(data);
      if (response.status == 200 || response.status == 201) {
        navigate('/login');
      }
      else {
        alert(response.data?.message || 'Đăng ký thất bại. Vui lòng thử lại.');
      }
    } catch (error: any) {
      alert(error.response?.data?.message || 'Đăng ký thất bại. Vui lòng thử lại.');
    }
  };

  const handleGoogleRegister = () => {
    window.location.href = `${import.meta.env.VITE_API_URL}/auth/google`;
  }

  return {
    register,
    errors,
    isSubmitting,
    onSubmit: handleSubmit(onSubmit),
    handleGoogleRegister,
  };
}

export default function RegisterForm() {
  const {
    register,
    errors,
    isSubmitting,
    onSubmit,
    handleGoogleRegister
  } = useRegister();

  return (
    <div className = "min-h-screen w-full flex items-center justify-center bg-gray-50 p-4">
      <div className = "w-full max-w-md p-6 bg-white rounded-2xl border border-orange-200 shadow-sm flex flex-col justify-center">
        <div className = "mb-6 text-center">
          <h1 className = "text-2xl font-bold text-gray-800">Đăng ký tài khoản</h1>
          <p className = "text-gray-600">Đã có tài khoản?{" "}
            <Link to = "/login" className = "text-blue-500 font-medium hover:underline">Đăng nhập</Link>
          </p>
      </div>

        <form onSubmit = {onSubmit} className="space-y-4">
          <InputField
            label = "Email * :"
            placeholder = "email@focusflow.com"
            type = "email"
            {...register('email')}
            errorText = {errors.email?.message}
          />

          <div>
            <label className = "block text-sm text-gray-700 font-medium mb-1">Giới tính:</label>
            <div className = "flex items-center space-x-6">
              <label className = "flex items-center space-x-2 cursor-pointer">
                <input
                  type = "radio"
                  value = "male"
                  {...register('gender')}
                  className = "text-amber-500 form-radio focus:ring-amber-500"
                />
                <span className = "text-gray-700">Nam</span>
              </label>
              <label className = "flex items-center space-x-2 cursor-pointer">
                <input
                  type = "radio"
                  value = "female"
                  {...register('gender')}
                  className = "text-amber-500 form-radio focus:ring-amber-500"
                />
                <span className = "text-gray-700">Nữ</span>
              </label>
              <label className = "flex items-center space-x-2 cursor-pointer">
                <input
                  type = "radio"
                  value = "Other"
                  {...register('gender')}
                  className = "text-amber-500 form-radio focus:ring-amber-500"
                />
                <span className = "text-gray-700">Khác</span>
              </label>
            </div>
          </div>

          <InputField
            label = "Mật khẩu * :"
            placeholder = "Nhập mật khẩu"
            type = "password"
            {...register('password')}
            errorText = {errors.password?.message}
          />

          <InputField
            label = "Xác nhận mật khẩu * :"
            placeholder = "Nhập lại mật khẩu"
            type = "password"
            {...register('confirmedPassword')}
            errorText = {errors.confirmedPassword?.message}
          />

          <button
            type = "submit"
            disabled = {isSubmitting}
            className = "w-full py-2 bg-amber-500 text-white font-semibold rounded-xl shadow-md hover:bg-amber-600 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-75 disabled:opacity-50 transition duration-200"
          >
            {isSubmitting ? 'Đang đăng ký...' : 'Đăng ký'}
          </button>
        </form>

        <div className = "relative my-6 text-center">
          <div className = "absolute inset-0 flex items-center">
            <div className = "w-full border-t border-gray-300"></div>
          </div>
          <span className = "relative px-4 bg-white text-gray-500 tracking-wider">HOẶC</span>
        </div>

        <button
          type = "button"
          onClick = {handleGoogleRegister}
          className = "w-full py-2 bg-white text-gray-700 flex items-center justify-center border border-gray-300 font-semibold rounded-xl shadow-sm hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-75 transition duration-200"
        >
          <img
            src = {googleIcon}
            className = "w-15 h-15 object contain"
          />
          <span>Đăng nhập bằng Google</span>
        </button>
      </div>
    </div>
  );
}
