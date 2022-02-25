import { InputHTMLAttributes } from 'react'

function Input({
  name,
  placeholder,
  type,
  value,
  onChange,
}: InputHTMLAttributes<HTMLInputElement>) {
  return (
    <div className="group relative z-0 mb-6 w-full">
      <input
        value={value}
        type={type}
        name={name}
        onChange={onChange}
        className="peer block w-full appearance-none border-0 border-b-2 border-gray-300 bg-transparent py-2.5 px-0 text-sm text-gray-900 focus:border-blue-600 focus:outline-none focus:ring-0"
        placeholder=" "
        required
      />
      <label
        htmlFor={name}
        className="absolute top-3 -z-10 origin-[0] -translate-y-7 scale-75 transform text-sm text-gray-500 duration-300 after:ml-0.5 after:text-red-500 after:content-['*'] peer-placeholder-shown:translate-y-0 peer-placeholder-shown:scale-100 peer-focus:left-0 peer-focus:-translate-y-7 peer-focus:scale-75 peer-focus:text-blue-600"
      >
        {placeholder}
      </label>
    </div>
  )
}

export default Input
