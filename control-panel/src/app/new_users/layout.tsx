"use client";
import React, { useState, useEffect } from "react";
import UsersHeader from "../components/users/UsersHeader";
import UsersFilter from "../components/users/UsersFilter";
import GridUsers from "../components/users/GridUsers";
import ListUsers from "../components/users/ListUsers";
import { getUsers } from "../services/users/userCrud/GetUsersApi";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";

const Users: React.FC = () => {
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(1);
  const [selectedFilter, setSelectedFilter] = useState<string>("");
  const [searchQuery, setSearchQuery] = useState<string>("");

  useEffect(() => {
    setCurrentPage(1);
  }, [selectedFilter]);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await getUsers(
          currentPage,
          selectedFilter,
          searchQuery
        );
        setTotalPages(Math.ceil(response.count / 12));
      } catch (error) {
        console.error("Failed to fetch users", error);
      }
    };

    fetchUsers();
  }, [currentPage, selectedFilter, searchQuery]);

  const handlePageChange = (page: number) => {
    if (page > 0 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <section className="bg-[#1B3483]">
        <UsersHeader
          setViewMode={setViewMode}
          viewMode={viewMode}
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={handlePageChange}
          onSearch={setSearchQuery}
        />
        <UsersFilter
          selectedFilter={selectedFilter}
          setSelectedFilter={setSelectedFilter}
          setSearchQuery={setSearchQuery}
        />
        {viewMode === "grid" ? (
          <GridUsers
            currentPage={currentPage}
            totalPages={totalPages}
            selectedFilter={selectedFilter}
            searchQuery={searchQuery}
          />
        ) : (
          <ListUsers
            currentPage={currentPage}
            totalPages={totalPages}
            selectedFilter={selectedFilter}
            searchQuery={searchQuery}
          />
        )}
      </section>
      <Footer />
    </div>
  );
};

export default Users;
