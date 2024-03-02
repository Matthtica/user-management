import React from "react";
import ThreeDotsLoading from '~icons/eos-icons/three-dots-loading';

interface LoadingHelperProps extends React.HTMLAttributes<HTMLDivElement> {
  isPending: boolean,
  error: Error | null,
}

// TODO: Loading animation
// TODO: Error message red and big like serious error
export default function LoadingHelper( { isPending, error, children, ...props }: LoadingHelperProps) {
  const LoadingComp = <ThreeDotsLoading className="w-12 h-12" />

  return <div {...props}>
    {isPending ? LoadingComp : error ? error.message : children}
  </div>;
}
