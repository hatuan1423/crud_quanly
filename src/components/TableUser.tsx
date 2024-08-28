"use client";

import React, { useEffect, useState } from "react";
import Table from "react-bootstrap/Table";
import { fetchAllUser } from "@/services/UserService";
import ReactPaginate from "react-paginate";
import ModalAdd from "@/components/ModalAdd";

// 2:39:04

const TableUser = () => {
  const [listUsers, setListUsers] = useState([]);
  const [totalUsers, setTotalUsers] = useState(0);
  const [totalPages, setTotalPages] = useState(0);

  useEffect(() => {
    getUsers(1);
  }, []);

  const getUsers = async (page: number) => {
    let res = await fetchAllUser(page);
    if (res && res.data) {
      setTotalPages(res.total_pages);
      setTotalUsers(res.total);
      setListUsers(res.data);
    }
  };

  const handlePageClick = (event: any) => {
    getUsers(event.selected + 1);
  };

  const [isShowModalAddNew, setShowModalAddNew] = useState(false);
  const handleClose = () => {
    setShowModalAddNew(false);
  };

  return (
    <>
      <div className="flex justify-between my-3 items-center">
        <span className="font-semibold">List users</span>
        <button
          className="btn btn-success"
          onClick={() => setShowModalAddNew(true)}
        >
          Add user
        </button>
      </div>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>ID</th>
            <th>Email</th>
            <th>First name</th>
            <th>Last name</th>
          </tr>
        </thead>
        <tbody>
          {listUsers && listUsers.length > 0
            ? listUsers.map((user) => (
                <tr key={`${user.id}`}>
                  <td>{user.id}</td>
                  <td>{user.email}</td>
                  <td>{user.first_name}</td>
                  <td>{user.last_name}</td>
                </tr>
              ))
            : ""}
        </tbody>
      </Table>

      <ReactPaginate
        breakLabel="..."
        nextLabel="next >"
        onPageChange={handlePageClick}
        pageRangeDisplayed={5}
        pageCount={totalPages}
        previousLabel="< previous"
        pageLinkClassName="page-link"
        pageClassName="page-item"
        previousClassName="page-item"
        previousLinkClassName="page-link"
        nextClassName="page-item"
        nextLinkClassName="page-link"
        breakClassName="page-item"
        breakLinkClassName="page-link"
        containerClassName="pagination justify-content-center"
        activeClassName="active"
      />

      <ModalAdd show={isShowModalAddNew} handleClose={handleClose} />
    </>
  );
};

export default TableUser;
