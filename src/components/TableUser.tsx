"use client";

import React, { useEffect, useState } from "react";
import Table from "react-bootstrap/Table";
import { fetchAllUser } from "@/services/UserService";
import ReactPaginate from "react-paginate";
import ModalAdd from "@/components/ModalAdd";
import ModalEdit from "@/components/ModalEdit";

// 3:18:12

interface IUser {
  id: number;
  first_name: string;
  last_name: string;
  email: string;
}

const TableUser = () => {
  const [listUsers, setListUsers] = useState([]);
  const [totalUsers, setTotalUsers] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [isShowModalAddNew, setShowModalAddNew] = useState(false);
  const [isShowModalEdit, setShowModalEdit] = useState(false);
  const [dataUserEdit, setDataUserEdit] = useState({});

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

  const handleClose = () => {
    setShowModalEdit(false);
    setShowModalAddNew(false);
  };

  const handleUpdateTable = (user) => {
    setListUsers([user, ...listUsers]);
  };

  const handleEditUserFromModal = (user) => {
    let cloneListUsers = _.cloneDeep(listUsers);
    let index = listUsers.findIndex((item) => item.id === user.id);
    cloneListUsers[index].first_name = user.first_name;
    setListUsers(cloneListUsers);
  };

  const handleEditUser = (user) => {
    setDataUserEdit(user);
    setShowModalEdit(true);
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
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {listUsers && listUsers.length > 0
            ? listUsers.map((user: IUser) => (
                <tr key={`${user.id}`}>
                  <td>{user.id}</td>
                  <td>{user.email}</td>
                  <td>{user.first_name}</td>
                  <td>{user.last_name}</td>
                  <td className="flex items-center gap-x-3">
                    <button
                      className="btn btn-warning"
                      onClick={() => handleEditUser(user)}
                    >
                      Edit
                    </button>
                    <button
                      className="btn btn-danger"
                      onClick={() => setShowModalAddNew(true)}
                    >
                      Update
                    </button>
                  </td>
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

      <ModalAdd
        show={isShowModalAddNew}
        handleClose={handleClose}
        handleUpdateTable={handleUpdateTable}
      />

      <ModalEdit
        show={isShowModalEdit}
        dataUserEdit={dataUserEdit}
        handleClose={handleClose}
        handleEditUserFromModal={handleEditUserFromModal}
      />
    </>
  );
};

export default TableUser;
