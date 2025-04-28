'use client';

import { useEffect, useRef, useState } from 'react';

interface Props {
  data: any[];
  columns: any[];
  height?: number; // 可选的表格高度
  width?: number; // 可选的表格宽度
}

interface Selection {
  rowIndex: number;
  columnKey: string;
}

const CanvasTable = ({ data, columns, height, width }: Props) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [scrollTop, setScrollTop] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);
  const [selection, setSelection] = useState<Selection | null>(null);

  // 计算表格的总宽度和总高度
  const getTotalWidth = () => {
    return columns.reduce((acc, column) => acc + (column.width || 100), 0);
  };

  const getTotalHeight = () => {
    return data.length * 30 + 30; // 行高 * 数据行数 + 表头高度
  };

  // 处理画布点击事件
  const handleCanvasClick = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (!canvasRef.current) return;

    const canvas = canvasRef.current;
    const rect = canvas.getBoundingClientRect();

    // 获取点击位置（考虑滚动位置）
    const x = e.clientX - rect.left + scrollLeft;
    const y = e.clientY - rect.top + scrollTop;

    const headerHeight = 30;
    const rowHeight = 30;

    // 如果点击在表头区域，不做处理
    if (y < headerHeight) return;

    // 计算点击的行索引
    const rowIndex = Math.floor((y - headerHeight) / rowHeight);
    if (rowIndex >= data.length) return;

    // 计算点击的列
    let accumulatedWidth = 0;
    let clickedColumn = null;

    for (const column of columns) {
      const colWidth = column.width || 100;
      if (x >= accumulatedWidth && x < accumulatedWidth + colWidth) {
        clickedColumn = column;
        break;
      }
      accumulatedWidth += colWidth;
    }

    if (clickedColumn) {
      setSelection({
        rowIndex,
        columnKey: clickedColumn.key
      });
    }
  };

  useEffect(() => {
    if (canvasRef.current) {
      const canvas = canvasRef.current;
      const ctx = canvas.getContext('2d')!;

      // 获取设备像素比
      const dpr = window.devicePixelRatio || 1;

      // 获取容器的尺寸或使用提供的宽高
      const containerWidth = width || containerRef.current?.clientWidth || window.innerWidth;
      const containerHeight = height || containerRef.current?.clientHeight || window.innerHeight;

      // 设置画布的实际尺寸（考虑设备像素比）
      canvas.width = containerWidth * dpr;
      canvas.height = containerHeight * dpr;

      // 设置画布的CSS大小
      canvas.style.width = `${containerWidth}px`;
      canvas.style.height = `${containerHeight}px`;

      // 根据设备像素比缩放上下文
      ctx.scale(dpr, dpr);

      // 清除画布
      ctx.clearRect(0, 0, containerWidth, containerHeight);

      // 定义表格样式
      const cellPadding = 10;
      const headerHeight = 30;
      const rowHeight = 30;
      const borderWidth = 1;
      ctx.strokeStyle = '#ccc';
      ctx.font = '14px Arial';
      ctx.lineWidth = borderWidth; // 在这里设置线宽

      // 使用crisp edges提高文字渲染清晰度
      ctx.textBaseline = 'middle';
      ctx.imageSmoothingEnabled = false;

      // 计算可见行的范围
      const startRowIndex = Math.floor(scrollTop / rowHeight);
      const endRowIndex = Math.min(
        startRowIndex + Math.ceil(containerHeight / rowHeight) + 1,
        data.length
      );

      // 计算可见列的范围
      let columnStartIndex = 0;
      let columnEndIndex = columns.length - 1;
      let accumulatedWidth = 0;

      for (let i = 0; i < columns.length; i++) {
        const colWidth = columns[i].width || 100;
        if (accumulatedWidth + colWidth > scrollLeft) {
          columnStartIndex = i;
          break;
        }
        accumulatedWidth += colWidth;
      }

      accumulatedWidth = 0;
      for (let i = 0; i < columns.length; i++) {
        accumulatedWidth += columns[i].width || 100;
        if (accumulatedWidth > scrollLeft + containerWidth) {
          columnEndIndex = i;
          break;
        }
      }

      // 保存上下文状态
      ctx.save();

      // 应用滚动位移
      ctx.translate(-scrollLeft, -scrollTop);

      // 绘制表头（固定位置，不随内容滚动）
      let x = 0;
      for (let i = 0; i < columns.length; i++) {
        const column = columns[i];
        const width = column.width || 100;

        // 先设置背景颜色，确保所有列头背景一致
        ctx.fillStyle = '#f0f0f0';
        ctx.fillRect(x, 0, width, headerHeight);
        ctx.strokeRect(x, 0, width, headerHeight);

        // 然后设置文本颜色并绘制文本
        ctx.fillStyle = '#000';
        ctx.fillText(column.title, x + cellPadding, headerHeight / 2);
        x += width;
      }

      // 绘制表格内容（只绘制可见区域的行和列）
      for (let i = startRowIndex; i < endRowIndex; i++) {
        const row = data[i];
        const y = headerHeight + i * rowHeight;

        x = 0;
        for (let j = columnStartIndex; j <= columnEndIndex; j++) {
          const column = columns[j];
          const width = column.width || 100;

          // 如果是选中的单元格，绘制高亮背景
          if (selection && selection.rowIndex === i && selection.columnKey === column.key) {
            ctx.fillStyle = '#e6f7ff'; // 浅蓝色高亮
            ctx.fillRect(x, y, width, rowHeight);
          }

          ctx.strokeRect(x, y, width, rowHeight);
          ctx.fillStyle = '#000';
          if (row[column.key] !== undefined) {
            ctx.fillText(String(row[column.key]), x + cellPadding, y + rowHeight / 2);
          }
          x += width;
        }
      }

      // 恢复上下文状态
      ctx.restore();
    }
  }, [data, columns, scrollTop, scrollLeft, width, height, selection]);

  // 处理滚动事件
  const handleScroll = (e: React.UIEvent<HTMLDivElement>) => {
    setScrollTop(e.currentTarget.scrollTop);
    setScrollLeft(e.currentTarget.scrollLeft);
  };

  return (
    <div
      ref={containerRef}
      style={{
        width: width || '100%',
        height: height || '100%',
        overflow: 'auto',
        position: 'relative'
      }}
      onScroll={handleScroll}
    >
      <div
        style={{
          width: getTotalWidth(),
          height: getTotalHeight(),
          position: 'relative'
        }}
      >
        <canvas
          ref={canvasRef}
          onClick={handleCanvasClick}
          style={{
            position: 'sticky',
            top: 0,
            left: 0,
            cursor: 'pointer' // 鼠标变为指针形状，提示可点击
          }}
        />
      </div>
    </div>
  );
};

export default CanvasTable;
