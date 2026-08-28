import React from 'react';
import { cn } from '../../lib/utils/cn';

export interface SparklineChartProps {
  data: number[];
  label?: string;
  color?: string;
  className?: string;
}

export const SparklineChart: React.FC<SparklineChartProps> = ({
  data,
  label,
  color = '#190191',
  className,
}) => {
  if (!data.length) return null;

  const max = Math.max(...data);
  const min = Math.min(...data);
  const range = max - min || 1;

  const width = 120;
  const height = 40;
  const padX = 2;

  const points = data.map((val, i) => {
    const x = padX + (i / (data.length - 1)) * (width - padX * 2);
    const y = height - ((val - min) / range) * (height - 4) - 2;
    return `${x},${y}`;
  });

  const trend = data[data.length - 1] - data[0];
  const trendPct = data[0] ? Math.round((trend / data[0]) * 100) : 0;

  return (
    <div className={cn('flex items-end justify-between gap-3', className)}>
      <svg
        viewBox={`0 0 ${width} ${height}`}
        width={width}
        height={height}
        className="shrink-0"
      >
        {/* Area fill */}
        <defs>
          <linearGradient id={`grad_${label}`} x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor={color} stopOpacity="0.15" />
            <stop offset="100%" stopColor={color} stopOpacity="0" />
          </linearGradient>
        </defs>
        <polyline
          fill={`url(#grad_${label})`}
          stroke="none"
          points={`${padX},${height} ${points.join(' ')} ${width - padX},${height}`}
        />
        <polyline
          fill="none"
          stroke={color}
          strokeWidth="1.5"
          strokeLinejoin="round"
          strokeLinecap="round"
          points={points.join(' ')}
        />
        {/* Latest dot */}
        {points.length > 0 && (() => {
          const last = points[points.length - 1].split(',');
          return <circle cx={last[0]} cy={last[1]} r="2.5" fill={color} />;
        })()}
      </svg>

      {label && (
        <span
          className={cn(
            'text-[10px] font-bold shrink-0',
            trendPct >= 0 ? 'text-emerald-600' : 'text-rose-500'
          )}
        >
          {trendPct >= 0 ? '↑' : '↓'} {Math.abs(trendPct)}%
        </span>
      )}
    </div>
  );
};
