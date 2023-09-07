import {Children} from "react";

export default function CenterContainer({ children, loadingRender, loading, errorRender, error }) {
  Children.only(children);
  return (
    <div class="h-screen w-screen overflow-none flex flex-col md:justify-center items-center space-y-4 bg-gray-50 p-6">
      {loading && loadingRender}
      {error && errorRender}
      {!(loading || error) && (
        <div class="flex flex-row w-full justify-center">
          {children}
        </div>
      )}
    </div>
  )
}
