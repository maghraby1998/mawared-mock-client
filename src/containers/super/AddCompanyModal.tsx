import { Modal } from "@mui/material";
import { useEffect, useState } from "react";
import { useMutation } from "react-query";
import { addCompany } from "../../axios/mutations";
import TextInput from "../../inputs/TextInput";
import ValidateAt from "../../enums/ValidateAt";
import CustomModal from "../../components/CustomModal";

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
    <CustomModal
      modalTitle="add company"
      isOpen={isOpen}
      onClose={handleCloseModal}
    >
      <form onSubmit={handleSubmit} className="form-container">
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
              <TextInput
                name={`bpName-${index}`}
                type="text"
                placeholder="Name..."
                value={bp.name}
                onChange={(e) =>
                  handleBusinessPartnerInputChange(
                    index,
                    "name",
                    e.target.value
                  )
                }
                validateAt={ValidateAt.isString}
                {...sharedProps}
              />

              <TextInput
                name={`bpEmail-${index}`}
                type="text"
                placeholder="Email..."
                value={bp.email}
                onChange={(e) =>
                  handleBusinessPartnerInputChange(
                    index,
                    "email",
                    e.target.value
                  )
                }
                validateAt={ValidateAt.isString}
                {...sharedProps}
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
    </CustomModal>
  );
};

export default AddCompanyModal;
