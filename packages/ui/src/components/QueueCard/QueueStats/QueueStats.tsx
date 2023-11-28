import { AppQueue } from '@bull-board/api/typings/app';
import React from 'react';
import { toCamelCase } from '../../../utils/toCamelCase';
import s from './QueueStats.module.css';

interface IQueueStatsProps {
  queue: AppQueue;
}

export const QueueStats = ({ queue }: IQueueStatsProps) => {
  const total = queue.statuses.reduce((result, status) => result + (queue.counts[status] || 0), 0);

  return (
    <div className={s.stats}>
      <div className={s.progressBar}>
        {queue.statuses
          .filter((status) => queue.counts[status] > 0)
          .map((status) => {
            const value = queue.counts[status];

            return (
              <div
                key={status}
                role="progressbar"
                style={{ width: `${(value / total) * 100}%` }}
                aria-valuenow={value}
                aria-valuemin={0}
                aria-valuemax={total}
                className={s[toCamelCase(status)]}
              >
                {value}
              </div>
            );
          })}
      </div>
      <div>{total} Jobs</div>
    </div>
  );
};
