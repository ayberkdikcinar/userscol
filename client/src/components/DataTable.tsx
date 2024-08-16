interface DataTableProps<T> {
  data: T[];
  config: {
    label: string;
    render: (data: T) => string | number | JSX.Element | undefined;
  }[];
  keyFn: (data: T) => string | number | undefined;
}

export default function DataTable<T>({ data, config, keyFn }: DataTableProps<T>) {
  const renderedHeaders = config.map((column) => {
    return (
      <th className='text-start p-2' key={column.label}>
        {column.label}
      </th>
    );
  });

  const renderedRows = data.map((rowData) => {
    const renderedCells = config.map((column) => {
      return (
        <td className='p-2' key={column.label}>
          {column.render(rowData)}
        </td>
      );
    });

    return (
      <tr className='text-start border-b' key={keyFn(rowData)}>
        {renderedCells}
      </tr>
    );
  });

  return (
    <table className='m-2 table-auto border-spacing-2'>
      <thead>
        <tr className='border-b-2'>{renderedHeaders}</tr>
      </thead>
      <tbody>{renderedRows}</tbody>
    </table>
  );
}
