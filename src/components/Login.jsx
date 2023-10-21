import { signIn } from "@junobuild/core";

const Login = () => {
  return (
    <div className="w-[350px] bg-white rounded-2xl p-5 flex flex-col justify-center items-center">
        <h1 className="text-center w-full font-bold text-gray-800 text-2xl mb-4">
          Expense Tracker
        </h1>
        <h1 className="text-center w-full font-bold text-gray-700 text-lg mb-4">
        Sign In With Internet Identity 
        </h1>
      <button
        type="button"
        onClick={signIn}
        className="rounded-md bg-gradient-to-r from-cyan-500 to-blue-500 px-3.5 py-1.5 text-base font-semibold leading-7 text-white shadow-sm  focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-teal-600"
      >
        <div className="flex items-center justify-center gap-1.5">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-6 h-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15m3 0l3-3m0 0l-3-3m3 3H9"
            />
          </svg>
          Sign In
        </div>
      </button>
    </div>
  );
};

export default Login;