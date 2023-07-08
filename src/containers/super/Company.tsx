import React from "react";
import { Link, useParams } from "react-router-dom";
import { useQuery } from "react-query";
import { getCompany } from "../../axios/queries";

interface Company {
  id: number;
  name: string;
  currencies: any[];
  offices: any[];
  departments: any[];
  positions: any[];
}

const Company: React.FC = () => {
  const { id } = useParams();

  const { data, isLoading } = useQuery(
    ["getCompany", id],
    () => {
      if (!id) return;
      return getCompany(+id);
    },
    { refetchOnMount: true }
  );

  const { name, offices, departments, positions, users, currencies } =
    data?.data ?? ({} as Company);

  const businessPartnersUsers = users?.filter(
    (user: { isBusinessPartner: boolean }) => user.isBusinessPartner
  );

  const employees = users?.filter(
    (user: { isBusinessPartner: boolean }) => !user.isBusinessPartner
  );

  return (
    <div className="p-3">
      <Link
        to={"/super"}
        className="bg-slate-500 hover:bg-slate-600 text-white py-2 px-3 rounded mb-3 block w-fit capitalize"
      >
        {`< back`}
      </Link>
      <p>
        <span className="capitalize font-semibold">company name: </span> {name}
      </p>
      <div className="my-3">
        <h3 className="text-cyan-700 capitalize font-bold border-b-4 w-fit">
          offices ({offices?.length})
        </h3>
        {offices?.length ? (
          offices?.map((office: { id: number; name: string }) => {
            return <p key={office.id}>{office.name}</p>;
          })
        ) : (
          <p className="text-gray-400/50 capitalize">no offices</p>
        )}
      </div>

      <div className="my-3">
        <h3 className="text-cyan-700 capitalize font-bold border-b-4 w-fit">
          departments ({departments?.length})
        </h3>
        {departments?.length ? (
          departments?.map((department: { id: number; name: string }) => {
            return <p key={department.id}>{department.name}</p>;
          })
        ) : (
          <p className="text-gray-400/50 capitalize">no departments</p>
        )}
      </div>

      <div className="my-3">
        <h3 className="text-cyan-700 capitalize font-bold border-b-4 w-fit">
          business partners ({businessPartnersUsers?.length})
        </h3>
        {businessPartnersUsers?.length ? (
          businessPartnersUsers?.map((bp: { id: number; name: string }) => {
            return (
              <p key={bp.id} className="capitalize">
                - {bp.name}
              </p>
            );
          })
        ) : (
          <p className="text-gray-400/50 capitalize">no business partners</p>
        )}
      </div>

      <div className="my-3">
        <h3 className="text-cyan-700 capitalize font-bold border-b-4 w-fit">
          employees ({employees?.length})
        </h3>
        {employees?.length ? (
          employees?.map((employees: { id: number; name: string }) => {
            return <p key={employees.id}>{employees.name}</p>;
          })
        ) : (
          <p className="text-gray-400/50 capitalize">no employees</p>
        )}
      </div>
    </div>
  );
};

export default Company;
