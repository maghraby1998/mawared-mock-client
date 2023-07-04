import { useQuery } from "react-query";
import { getCompanies } from "../../axios/queries";
import { useState } from "react";
import AddCompanyModal from "./AddCompanyModal";

const SuperCompanies = () => {
  const [filter, setFilter] = useState("");
  const [isCompanyModalOpen, setIsCompanyModalOpen] = useState(false);

  const handleCloseCompanyModal = () => {
    setIsCompanyModalOpen(false);
  };

  const { data, isLoading, refetch } = useQuery(
    ["getCompanies", filter],
    () => getCompanies(filter),
    { refetchOnMount: true }
  );

  const handleAddNewCompanyBtn = () => {
    setIsCompanyModalOpen(true);
  };

  return (
    <div className="container mx-auto">
      <div className="flex gap-3 my-3">
        <input
          type="text"
          placeholder="Search..."
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          className="border p-2 rounded w-full"
        />
        <button
          onClick={handleAddNewCompanyBtn}
          className="whitespace-nowrap bg-green-700 text-white p-3 capitalize font-semibold rounded hover:bg-green-800"
        >
          add new
        </button>
      </div>

      <div className="flex justify-between bg-slate-600 p-2 text-white capitalize font-bold rounded">
        <p className="flex-1">name</p>
        <p className="flex-1">No. of employees</p>
        <p className="flex-1">actions</p>
      </div>

      {isLoading ? (
        <p>Loading...</p>
      ) : data?.data?.length ? (
        data?.data.map((company: { name: string; users: { id: number }[] }) => {
          return (
            <div className="flex justify-between p-2 capitalize rounded border">
              <p className="flex-1">{company?.name}</p>
              <p className="flex-1">{company?.users?.length}</p>
              <button className="flex-1 text-left">edit</button>
            </div>
          );
        })
      ) : (
        <p className="text-red-500 capitalize">no result found</p>
      )}

      <AddCompanyModal
        refetch={refetch}
        isOpen={isCompanyModalOpen}
        handleClose={handleCloseCompanyModal}
      />
    </div>
  );
};

export default SuperCompanies;
