import { useQuery } from "react-query";
import { getCompanies } from "../../axios/queries";
import { useState } from "react";

const SuperCompanies = () => {
  const [filter, setFilter] = useState("");

  const { data, isLoading } = useQuery(["getCompanies", filter], () =>
    getCompanies(filter)
  );

  return (
    <div className="container mx-auto">
      <input
        type="text"
        placeholder="search"
        value={filter}
        onChange={(e) => setFilter(e.target.value)}
        className="border my-3 p-2 rounded w-full"
      />

      <div className="flex justify-between bg-slate-600 p-2 text-white capitalize font-bold rounded">
        <p>name</p>
        <p>No. of employees</p>
      </div>

      {isLoading ? (
        <p>Loading...</p>
      ) : data?.data?.length ? (
        data?.data.map((company: { name: string }) => {
          return (
            <div className="flex justify-between p-2 capitalize rounded border">
              <p>{company?.name}</p>
              {/* @ts-ignore */}
              <p>{company?.users?.length}</p>
            </div>
          );
        })
      ) : (
        <p className="text-red-500 capitalize">no result found</p>
      )}
    </div>
  );
};

export default SuperCompanies;
