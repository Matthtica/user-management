import React, { FC } from 'react'
import SVGSpinner from '~icons/svg-spinners/blocks-shuffle-2'

interface LoadingSpinnerProps extends React.HTMLAttributes<SVGSVGElement> {}

const LoadingSpinner: FC<LoadingSpinnerProps> = ({ ...props }: LoadingSpinnerProps) => {
  return <SVGSpinner {...props}/>
}

export default LoadingSpinner;
