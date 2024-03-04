import React, { FC } from 'react'
import SVGSpinner from '~icons/svg-spinners/blocks-shuffle-2'

interface LoadingSpinnerProps extends React.HTMLAttributes<SVGSVGElement> {}
const LoadingSpinner: FC<LoadingSpinnerProps> = ({ ...props }: LoadingSpinnerProps) => {
  return <SVGSpinner {...props}/>
}

interface FetchLoadingProps extends React.HTMLAttributes<HTMLDivElement> {
  isPending: boolean,
  error: Error | null,
}

// TODO: Error message red and big like serious error
const FetchLoading: FC<FetchLoadingProps> = ( { isPending, error, children, className, ...props }) => {
  const LoadingComp = <LoadingSpinner className={className} />
  const ErrorComp = <div className={className} {...props}>{error?.message}</div>

  return <div {...props}>
    {isPending ? LoadingComp : error ? ErrorComp : children}
  </div>;
}

interface PageLoadingProps extends React.HTMLAttributes<HTMLDivElement> {}
const PageLoading: FC<PageLoadingProps> = () => {
  return <LoadingSpinner className="w-10 h-10 mx-auto mt-52"/>
}

export {
  FetchLoading,
  PageLoading
}
