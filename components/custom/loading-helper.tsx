import React, { FC } from 'react'
import SVGSpinner from '~icons/svg-spinners/blocks-shuffle-2'

interface LoadingSpinnerProps extends React.HTMLAttributes<SVGSVGElement> {}
export const LoadingSpinner: FC<LoadingSpinnerProps> = ({ ...props }: LoadingSpinnerProps) => {
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

  return <>
    {isPending ? LoadingComp : error ? ErrorComp : children}
  </>
}

const PageLoading: FC = () => {
  return <LoadingSpinner className="w-10 h-10 mx-auto mt-[45%]"/>
}

export {
  FetchLoading,
  PageLoading
}
