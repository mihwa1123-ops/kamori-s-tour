import type { ReactNode } from 'react';
import './InfoRow.css';

export interface InfoRowProps {
  icon?: ReactNode;
  label: string;
  value: ReactNode;
}

export function InfoRow({ icon, label, value }: InfoRowProps) {
  return (
    <div className="info-row">
      {icon && (
        <span className="info-row__icon" aria-hidden="true">
          {icon}
        </span>
      )}
      <span className="info-row__label">{label}</span>
      <span className="info-row__value">{value}</span>
    </div>
  );
}
