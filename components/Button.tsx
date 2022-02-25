import { ButtonHTMLAttributes } from 'react'

function Button({
  children,
  ...rest
}: ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button
      {...rest}
      className="rounded-xl bg-indigo-700 px-6 py-2 text-white hover:bg-indigo-500 disabled:bg-slate-700"
    >
      {children}
    </button>
  )
}

export default Button
