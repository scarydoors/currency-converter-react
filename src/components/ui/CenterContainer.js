import { Children } from "react"

export default function CenterContainer({ children, loadingRender, loading, errorRender, error }) {
  const childrenList = Children.toArray(children);
  return (
    <div class="h-screen w-screen overflow-none flex flex-col md:justify-center items-center space-y-4 bg-gray-50 p-6">
      {loading && loadingRender}
      {error && errorRender}
      {!(loading || error) && (
        childrenList.map((child) => (
          <div class="flex flex-row w-full justify-center">
            {child}
          </div>
        ))
      )}
    </div>
  )
}
