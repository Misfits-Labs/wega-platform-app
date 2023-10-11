export const GameBarLoadingSkeleton = () => {
  return (
   <div tw="dark:bg-[#1C1C1C] py-2 px-3 rounded-[5px] grid grid-cols-4 animate-pulse">
    <div>
      <div tw="h-2.5 bg-gray-300 rounded-full dark:bg-gray-600 w-24 mb-2.5"></div>
      <div tw="w-34 h-2 bg-gray-200 rounded-full dark:bg-gray-700"></div>
    </div>
    <div>
      <div tw="h-2.5 bg-gray-300 rounded-full dark:bg-gray-600 w-24 mb-2.5"></div>
      <div tw="w-34 h-2 bg-gray-200 rounded-full dark:bg-gray-700"></div>
    </div>
    <div>
      <div tw="h-2.5 bg-gray-300 rounded-full dark:bg-gray-600 w-24 mb-2.5"></div>
      <div tw="w-34 h-2 bg-gray-200 rounded-full dark:bg-gray-700"></div>
    </div>
    <div tw="h-2.5 bg-gray-300 rounded-full dark:bg-gray-700 w-12"></div>
  </div> )
}
