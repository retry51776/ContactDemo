import { react, useState } from "react";
import {
  useGroupBy,
  useSortBy,
  useTable,
  useGlobalFilter,
  useAsyncDebounce,
} from "react-table";
import { deleteContact } from "../data/contact";

// I know this is bad user experience
// But I like columns def be static & able to define outside table
// Otherwise I need to do useMemo hook; Then I am able to use refresh of useQuery
// This app getting too big anyway
const columns = [
  {
    Header: "A-Z",
    accessor: (row) => row?.last_name?.charAt(0),
    id: "initial",
  },
  {
    Header: "Last Name",
    accessor: "last_name",
  },
  {
    Header: "First Name",
    accessor: "first_name",
  },
  {
    Header: "Email",
    accessor: "email",
  },
  {
    Header: "Phone",
    accessor: "phone",
  },
  {
    Header: "Address",
    accessor: "address",
  },
  {
    Header: "Edit",
    id: "edit",
    accessor: "id",
    Cell: ({ value }) => <a href={`/address/${value}`}>Edit</a>,
  },
  {
    Header: "Delete",
    id: "delete",
    accessor: "id",
    Cell: ({ value }) => (
      <button onClick={() => deleteContact(value)}>Delete</button>
    ),
  },
];

const GlobalFilter = ({ globalFilter, setGlobalFilter }) => {
  const [filter, setFilter] = useState(globalFilter);
  const deferSetGlobalFilter = useAsyncDebounce((value) => {
    setGlobalFilter(value || undefined);
  }, 200);
  const onFilterChange = (e) => {
    setFilter(e.target.value);
    deferSetGlobalFilter(e.target.value);
  };
  return (
    <input
      type="text"
      value={filter}
      placeholder="Search Records"
      onChange={onFilterChange}
    />
  );
};
const Header = ({ headerGroups }) =>
  headerGroups.map((headerGroup) => (
    <tr {...headerGroup.getHeaderGroupProps()}>
      {headerGroup.headers.map((column) => (
        <th {...column.getHeaderProps(column.getSortByToggleProps())}>
          {column.render("Header")}
          <span>
            {column.isSorted ? (column.isSortedDesc ? " 🔽" : " 🔼") : ""}
          </span>
          <div>{column.canFilter ? column.render("Filter") : null}</div>
        </th>
      ))}
    </tr>
  ));

const Cell = ({ cell, row }) => {
  if (cell.isGrouped) {
    return (
      <>
        <span {...row.getToggleRowExpandedProps()}>
          {row.isExpanded ? "-" : "+"}
        </span>
        {cell.render("Cell")}
      </>
    );
  }

  if (cell.isAggregated) {
    return cell.render("Aggregated");
  }

  return cell.render("Cell");
};

const Rows = ({ rows, prepareRow }) =>
  rows.map((row) => {
    prepareRow(row);
    return (
      <tr>
        {row.cells.map((cell) => (
          <td {...cell.getCellProps()}>
            <Cell cell={cell} row={row} />
          </td>
        ))}
      </tr>
    );
  });

const ContactTable = ({ data }) => {
  const {
    getTableProps,
    headerGroups,
    rows,
    prepareRow,
    setGlobalFilter,
    state: { globalFilter },
  } = useTable(
    {
      columns,
      data,
      initialState: {
        sortBy: [
          {
            id: "initial",
            desc: false,
          },
        ],
      },
    },
    useGlobalFilter,
    useGroupBy,
    useSortBy
  );

  return (
    <>
      <GlobalFilter
        globalFilter={globalFilter}
        setGlobalFilter={setGlobalFilter}
      />
      <table {...getTableProps()}>
        <thead>
          <Header headerGroups={headerGroups} />
        </thead>
        <tbody {...getTableProps()}>
          <Rows rows={rows} prepareRow={prepareRow} />
        </tbody>
      </table>
    </>
  );
};

export default ContactTable;
