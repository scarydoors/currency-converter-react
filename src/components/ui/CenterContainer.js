import {Children} from "react";

export default function CenterContainer({children}) {
  const childrenArray = Children.toArray(children)
  return (
    <div class="h-screen w-screen flex flex-col justify-center items-center space-y-4 bg-gray-50">
      {childrenArray.map((child, idx) => (
        <div key={idx} class="flex flex-row w-full justify-center">
          {child}
        </div>
      ))}
    </div>
  )
}
