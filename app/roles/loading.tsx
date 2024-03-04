import LoadingSpinner from "@/components/custom/loading-spinner";

export default function Loading() {
  return <div className="h-full  w-full flex flex-col items-center">
      <LoadingSpinner className="w-10 h-10"/>
  </div>
}
