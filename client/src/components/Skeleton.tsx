import classNames from 'classnames';

interface SkeletonProps {
  times: number;
  className?: string;
}
export default function Skeleton({ times, className }: SkeletonProps) {
  const innerClasses = classNames(
    'animate-shimmer',
    'absolute',
    'inset-0',
    '-translate-x-full',
    'bg-gradient-to-r',
    'from-gray-200',
    'via-white',
    'to-gray-200'
  );
  const outerClassess = classNames('relative', 'overflow-hidden', 'bg-gray-200', 'mb-2.5', className);

  const boxes = Array(times)
    .fill(0)
    .map((_, i) => (
      <div key={i} className={outerClassess}>
        <div className={innerClasses}></div>
      </div>
    ));
  return <div>{boxes}</div>;
}
