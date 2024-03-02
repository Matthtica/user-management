import React from "react";
import BubbleLoading from '~icons/eos-icons/bubble-loading';

interface LoadingHelperProps extends React.HTMLAttributes<HTMLDivElement> {
  isPending: boolean,
  error: Error | null,
}

// TODO: Loading animation
// TODO: Error message red and big like serious error
export default function LoadingHelper( { isPending, error, children, ...props }: LoadingHelperProps) {
  const LoadingComp = <BubbleLoading className="w-10 h-10 mx-auto mt-40" />

  return <div {...props}>
    {isPending ? LoadingComp : error ? error.message : children}
  </div>;
}
