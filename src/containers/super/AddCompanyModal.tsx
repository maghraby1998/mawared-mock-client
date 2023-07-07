import { Modal } from "@mui/material";
import { useEffect, useState } from "react";
import { useMutation } from "react-query";
import { addCompany } from "../../axios/mutations";
import TextInput from "../../inputs/TextInput";
import ValidateAt from "../../enums/ValidateAt";

interface Props {
  isOpen: boolean;
  handleClose: () => void;
  refetch: () => void;
}

export interface BusinessPartner {
  name: string;
  email: string;
}

const AddCompanyModal: React.FC<Props> = ({ isOpen, handleClose, refetch }) => {
  const [companyName, setCompanyName] = useState<string>("");
  const [businessPartners, setBusinessPartners] = useState<BusinessPartner[]>([
    {
      name: "",
      email: "",
    },
  ]);
  const [isFormSubmitted, setIsFormSubmitted] = useState(false);
  const [clientErrors, setClientErrors] = useState<string[]>([]);

  const sharedProps = { isFormSubmitted, setClientErrors };

  useEffect(() => {
    return () => {
      setIsFormSubmitted(false);
      setClientErrors([]);
    };
  }, [isOpen]);

  const handleSubmit = (event: any) => {
    setIsFormSubmitted(true);
    event.preventDefault();
    if (!clientErrors.length) {
      mutate({ companyName: companyName, businessPartners });
    }
  };

  const addBusinessPartner = () => {
    setBusinessPartners((prev) => {
      return [...prev, { name: "", email: "" }];
    });
  };

  const handleDeleteBusinessPartner = (index: number) => {
    setBusinessPartners((prev) => {
      return prev.filter((_, i) => index !== i);
    });
  };

  const handleBusinessPartnerInputChange = (
    index: number,
    name: string,
    value: string
  ) => {
    setBusinessPartners((prev) => {
      return prev.map((bp, i) => {
        if (index === i) {
          return { ...bp, [name]: value };
        } else {
          return bp;
        }
      });
    });
  };

  const { mutate, isLoading } = useMutation({
    mutationFn: ({
      companyName,
      businessPartners,
    }: {
      companyName: string;
      businessPartners: BusinessPartner[];
    }) => {
      return addCompany(companyName, businessPartners);
    },
    onSuccess: (data) => {
      refetch();
      handleCloseModal();
    },
  });

  const handleCloseModal = () => {
    handleClose();
    setCompanyName("");
    setBusinessPartners([{ name: "", email: "" }]);
  };

  return (
    <Modal
      open={isOpen}
      onClose={handleCloseModal}
      className="w-[800px] mx-auto my-[30px] rounded overflow-scroll flex flex-col itmes-start justify-start"
      disableEscapeKeyDown
      slotProps={{ backdrop: { onClick: () => {} } }}
    >
      <>
        <div className="h-[50px] bg-slate-300 w-full capitalize flex justify-between items-center">
          <p className="px-5">add company</p>
          <button
            className="bg-red-500 text-white text-xl font-bold h-full w-[50px]"
            onClick={handleCloseModal}
          >
            x
          </button>
        </div>
        <form
          onSubmit={handleSubmit}
          className="bg-white px-5 py-5 rounded-bl rounded-br"
        >
          <div className="flex flex-col mb-3">
            <TextInput
              label="name"
              name="name"
              placeholder="Company name..."
              value={companyName}
              onChange={(e) => setCompanyName(e.target.value)}
              validateAt={ValidateAt.isString}
              {...sharedProps}
            />
            {/* <input
              type="text"
              id="name"
              name="name"
              placeholder="Company name..."
              className="border-b border-b-slate-500 py-2"
              value={companyName}
              onChange={(e) => setCompanyName(e.target.value)}
            /> */}
          </div>
          <div className="flex items-center gap-3">
            <h3 className="capitalize text-slate-500 font-semibold">
              business partners
            </h3>
            <button
              className="bg-green-500 text-white h-7 w-7 text-xl flex items-center justify-center rounded-full"
              onClick={addBusinessPartner}
              type="button"
            >
              +
            </button>
          </div>
          {businessPartners.map((bp, index) => {
            return (
              <div key={index} className="flex gap-5">
                <input
                  type="text"
                  placeholder="Name..."
                  className="border-b border-b-slate-500 py-2 flex-1"
                  value={bp.name}
                  onChange={(e) =>
                    handleBusinessPartnerInputChange(
                      index,
                      "name",
                      e.target.value
                    )
                  }
                />
                <input
                  type="text"
                  placeholder="Email..."
                  className="border-b border-b-slate-500 py-2 flex-1"
                  value={bp.email}
                  onChange={(e) =>
                    handleBusinessPartnerInputChange(
                      index,
                      "email",
                      e.target.value
                    )
                  }
                />
                {index !== 0 ? (
                  <button
                    className="w-[100px]"
                    onClick={() => handleDeleteBusinessPartner(index)}
                  >
                    delete
                  </button>
                ) : (
                  <div className="w-[100px]"></div>
                )}
              </div>
            );
          })}
          <div className="flex justify-end mt-8 border-t border-t-slate-500 pt-2">
            <button className="bg-green-500 text-white px-5 py-1 rounded capitalize">
              {isLoading ? "loading..." : "save"}
            </button>
          </div>
        </form>
      </>
    </Modal>
  );
};

export default AddCompanyModal;
