import { useState, useEffect } from 'react';
import { HotTable } from '@handsontable/react';
import Handsontable from 'handsontable';
import 'handsontable/dist/handsontable.full.min.css';

type Student = {
  name: string;
  [date: string]: string | number; 
  total?: number; 
};

const initialData: Student[] = [
  { name: 'Иван Иванов', '01.12': 85, '02.12': 90 },
  { name: 'Петр Петров', '01.12': 88, '02.12': 92 },
  { name: 'Сергей Сергеев', '01.12': 70, '02.12': 80 },
];

export function Table(): JSX.Element {
  const [data, setData] = useState<Student[]>([]);

  useEffect(() => {
    const updatedData = initialData.map((student) => {
      const total = Object.keys(student)
        .filter((key) => key !== 'name' && key !== 'total')
        .reduce((sum, key) => sum + (Number(student[key]) || 0), 0);
      return { ...student, total };
    });

    updatedData.sort((a, b) => (b.total || 0) - (a.total || 0));

    setData(updatedData);
  }, []);

  const columns = [
    { data: 'name', title: 'ФИО', readOnly: true, width: 200, height: 50 }, 
    { data: '01.12', title: '01.12', type: Handsontable.cellTypes.numeric },
    { data: '02.12', title: '02.12', type: Handsontable.cellTypes.numeric },
    {
      data: 'total',
      title: 'Итоговые баллы',
      readOnly: true,
      type: Handsontable.cellTypes.numeric,
    },
  ];

  return (
    <div className="container mx-auto ">
      <h1 className="text-xl font-bold mb-4">Таблица с баллами</h1>
      <div className='text-[15px] font-semibold'>
      <HotTable
        data={data}
        colHeaders={columns.map((col) => col.title)}
        rowHeaders={true}
        columns={columns}
        stretchH="all"
        width="100%"
        height="auto"
        licenseKey="non-commercial-and-evaluation"
        className="handsontable text-[15px] font-semibold text-center"
        columnSorting={{
          initialConfig: {
            column: 3, 
            sortOrder: 'desc',
          },
        }}
        rowHeights={40}
        allowInsertRow={false}
        allowInsertColumn={false}
        autoWrapRow={true}
        autoWrapCol={true}
      />
      </div>
    </div>
  );
}
