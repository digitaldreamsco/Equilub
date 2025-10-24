const Button = ({ type = 'submit', className, ...props }) => (
    <button
        type={type}
        className={`text-center items-center px-4 py-2 bg-blue-900 rounded-full border border-transparent text-white font-bold uppercase tracking-widest hover:bg-gray-700 active:bg-gray-900 focus:outline-none focus:border-gray-900 focus:ring ring-gray-300 disabled:opacity-25 transition ease-in-out duration-150 ${className}`}
        {...props}
    />
)

export default Button
