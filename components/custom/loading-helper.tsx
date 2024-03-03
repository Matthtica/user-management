import React from "react";
import BubbleLoading from '~icons/eos-icons/bubble-loading';

interface LoadingHelperProps extends React.HTMLAttributes<HTMLDivElement> {
  isPending: boolean,
  error: Error | null,
}

// TODO: Loading animation
// TODO: Error message red and big like serious error
export default function LoadingHelper( { isPending, error, children, className, ...props }: LoadingHelperProps) {
  const LoadingComp = <BubbleLoading className={className} />
  const ErrorComp = <div className={className} {...props}>{error?.message}</div>

  return <div {...props}>
    {isPending ? LoadingComp : error ? ErrorComp : children}
  </div>;
}
