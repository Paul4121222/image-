import AutoTable from "../../components/AutoTable";
import CheckBox from "../../components/CheckBox";
import { useState } from "react";
const list = [
  {
    name: "A",
    path: "aaa/bbb",
    date: "2014/7/8",
  },
  {
    name: "B",
    path: "ccc/bbb",
    date: "2078/6/9",
  },
  {
    name: "C",
    path: "ddd/eee",
    date: "1999/4/6",
  },
];

const TrashContainer = () => {
  const [rowsActive, setRowsActive] = useState([]);

  const columns = [
    {
      dataKey: "",
      title: "Checkbox",
      width: 120,
      render: ({}) => {
        return (
          <div style={{ display: "flex", justifyContent: "center" }}>
            <CheckBox checked={true} onClick={() => {}} />
          </div>
        );
      },
    },
    {
      dataKey: "name",
      title: "Name",
      width: 80,
    },
    {
      dataKey: "date",
      title: "Date",
      width: 120,
    },
    {
      dataKey: "path",
      title: "Path",
      width: 120,
    },
  ];

  return (
    <div style={{ width: "100%", height: "100%" }}>
      <AutoTable columns={columns} list={list} />
    </div>
  );
};

export default TrashContainer;
