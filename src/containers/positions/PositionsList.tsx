import { CircularProgress, Grow, Slide } from "@mui/material";
import React, { useState } from "react";
import TextInput from "../../inputs/TextInput";
import { useQuery } from "react-query";
import { getCompanyPositions } from "../../axios/queries";
import { useDispatch } from "react-redux";
import { togglePositionModal } from "../../redux/slices/generalSlice";
import AddPositionModal from "./AddPositionModal";

const PositionsList: React.FC = () => {
  const dispatch = useDispatch();
  const [filter, setFilter] = useState<string>("");

  const {
    data: positionsData,
    isLoading: fetchPositionsLoading,
    refetch: refetchPositionsList,
  } = useQuery(["getAllPosition", filter], () => {
    return getCompanyPositions(filter);
  });

  const handleNameFilterInputChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    let { value } = e.target;

    setFilter(value);
  };

  const handleAddNew = () => {
    dispatch(togglePositionModal(true));
  };

  return (
    <div className="page-container">
      {false ? (
        <CircularProgress className="absolute top-[50%] left-[50%]" />
      ) : null}
      <h2 className="page-title">positions</h2>

      <div className="flex gap-5 items-end mb-5">
        <TextInput
          name="filter"
          value={filter}
          onChange={handleNameFilterInputChange}
          placeholder="Search..."
          containerStyle="w-full"
        />
        <Slide direction="left" in={true} mountOnEnter unmountOnExit>
          <button className="add-new-btn-style" onClick={handleAddNew}>
            add new
          </button>
        </Slide>
      </div>

      <div className="list-header-style">
        <p className="flex-1">name</p>
        <p className="flex-1 text-right">actions</p>
      </div>

      {positionsData?.data.map((position: any, index: number) => {
        return (
          <Slide
            direction="up"
            in={true}
            mountOnEnter
            unmountOnExit
            timeout={(index + 1) * 100}
          >
            <div className="list-row-style">
              <p className="flex-1">{position?.name}</p>
              <p className="flex-1 text-right">actions</p>
            </div>
          </Slide>
        );
      })}
      <AddPositionModal refetchPositionsList={refetchPositionsList} />
    </div>
  );
};

export default PositionsList;
