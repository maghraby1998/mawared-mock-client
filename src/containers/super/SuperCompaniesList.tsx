import { useQuery, useMutation } from "react-query";
import { getCompanies } from "../../axios/queries";
import { deleteCompany } from "../../axios/mutations";
import { useState } from "react";
import AddCompanyModal from "./AddCompanyModal";
import { Link } from "react-router-dom";

const SuperCompaniesList = () => {
  const [filter, setFilter] = useState("");
  const [isCompanyModalOpen, setIsCompanyModalOpen] = useState(false);

  const { data, isLoading, refetch } = useQuery(["getCompanies", filter], () =>
    getCompanies(filter)
  );

  const { mutate: deleteCompanyFunc, isLoading: deleteCompanyLoading } =
    useMutation({
      mutationFn: (id: number) => {
        return deleteCompany(id);
      },
      onSuccess: () => {
        refetch();
      },
    });

  const handleCloseCompanyModal = () => {
    setIsCompanyModalOpen(false);
  };

  const handleAddNewCompanyBtn = () => {
    setIsCompanyModalOpen(true);
  };

  const handleDeleteCompany = (id: number): void => {
    deleteCompanyFunc(id);
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
        <button onClick={handleAddNewCompanyBtn} className="add-new-btn-style">
          add new
        </button>
      </div>

      <div className="list-header-style">
        <p className="flex-1">name</p>
        <p className="flex-1">No. of employees</p>
        <p className="flex-1">actions</p>
      </div>

      {isLoading ? (
        <p>Loading...</p>
      ) : data?.data?.length ? (
        data?.data.map(
          (company: { id: number; name: string; users: { id: number }[] }) => {
            return (
              <div className="list-row-style">
                <Link className="flex-1" to={`/company/${company.id}`}>
                  {company?.name}
                </Link>
                <p className="flex-1">{company?.users?.length}</p>
                <div className="flex-1 text-left flex gap-3">
                  <button>edit</button>
                  <button onClick={() => handleDeleteCompany(company.id)}>
                    delete
                  </button>
                </div>
              </div>
            );
          }
        )
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

export default SuperCompaniesList;
