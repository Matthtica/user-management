import React from 'react';
import BubbleLoading from '~icons/eos-icons/bubble-loading';

interface LoadingSkeletonProps extends React.HTMLAttributes<SVGSVGElement> {}
export default function LoadingSkeleton({ ...props }: LoadingSkeletonProps) {
  return <BubbleLoading {...props}/>
}
