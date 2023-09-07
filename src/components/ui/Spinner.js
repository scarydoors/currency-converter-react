export default function Spinner({ className }) {
  return (
    <div className={`m-auto ${className}`}>
      <svg className={`animate-spin h-full w-full mr-3 text-indigo-500`} viewBox="0 0 24 24">
        <path
          className="opacity-75"
          fill="currentColor"
          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
        ></path>
      </svg>
    </div>
  );
}
