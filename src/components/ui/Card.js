export default function Card({children}) {
  return (
    <div className="grow max-w-lg p-6 rounded-lg border border-gray-200 shadow-md bg-white">
      {children}
    </div>
  )
}
