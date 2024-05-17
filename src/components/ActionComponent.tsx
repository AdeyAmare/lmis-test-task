import { DataItem } from "./CertificationTable";

export const ActionComponent = ({ row }: { row: DataItem }) => {
    return (
      <div>
        <button>Edit</button>
        <button>Delete</button>
      </div>
    );
  };
  