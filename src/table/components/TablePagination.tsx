import React from "react";
import useTable from "../hooks/use-table";
import { trans } from "./../../localization";
import { TablePagination as MaterialTablePagination } from "@material-ui/core";

export default function TablePagination() {
  const {
    pagination,
    pageNumber,
    itemsPerPage,
    setItemsPerPage,
    setPageNumber,
  } = useTable();

  const [currentPage, setCurrentPage] = React.useState(
    pagination.currentPage - 1
  );

  const handleChangePage = (e, pageNumber) => {
    setCurrentPage(pageNumber);

    // page has been updated and we need to send again another request to backend
    setPageNumber(pageNumber + 1);
  };

  React.useEffect(() => {
    if (!pageNumber) return;
    if (pageNumber - 1 !== currentPage) {
      setCurrentPage(pageNumber);
    }
  }, [pageNumber]);

  const allowedItemsPerPage = [10, 15, 20, 25, 30, 50, 100];

  const handleChangeRowsPerPage = (e) => {
    setItemsPerPage(e.target.value);
    setCurrentPage(0); // reset again current page
  };

  // display total row translation
  const displayedRows = ({ from, to, count }) => {
    return trans("table.displayedRows", from, to, count);
  };

  return (
    <>
      <MaterialTablePagination
        rowsPerPageOptions={allowedItemsPerPage}
        component="div"
        count={pagination.totalRecords}
        rowsPerPage={itemsPerPage || pagination.itemsPerPage}
        page={currentPage}
        labelDisplayedRows={displayedRows}
        labelRowsPerPage={trans("table.labelRowsPerPage")}
        onChangePage={handleChangePage}
        onPageChange={handleChangePage}
        onChangeRowsPerPage={handleChangeRowsPerPage}
      />
    </>
  );
}
