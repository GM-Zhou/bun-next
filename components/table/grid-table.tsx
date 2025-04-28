import React from 'react';

interface GridTableProps {
  columns: number;
  rows: number;
  gap?: string;
  children: React.ReactNode;
  style?: React.CSSProperties;
}

const GridTable: React.FC<GridTableProps> = ({ columns, rows, gap = '8px', children, style }) => {
  return (
    <div
      style={{
        display: 'grid',
        gridTemplateColumns: `repeat(${columns}, 1fr)`,
        gridTemplateRows: `repeat(${rows}, auto)`,
        gap,
        ...style
      }}
    >
      {children}
    </div>
  );
};

interface GridTableCellProps {
  columnStart?: number;
  columnEnd?: number;
  rowStart?: number;
  rowEnd?: number;
  children: React.ReactNode;
  style?: React.CSSProperties;
}

const GridTableCell: React.FC<GridTableCellProps> = ({
  columnStart = 'auto',
  columnEnd = 'auto',
  rowStart = 'auto',
  rowEnd = 'auto',
  children,
  style
}) => {
  return (
    <div
      style={{
        gridColumnStart: columnStart,
        gridColumnEnd: columnEnd,
        gridRowStart: rowStart,
        gridRowEnd: rowEnd,
        ...style
      }}
    >
      {children}
    </div>
  );
};

export { GridTable, GridTableCell };
