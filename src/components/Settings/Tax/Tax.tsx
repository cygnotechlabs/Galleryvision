import { useState } from "react";
import Modal from "../../../layouts/Modal";
import { Edit, Plus, Trash } from "../../icons/icon";
import EditTax from "./EditTax";
import AddTax from "./AddTax";

type Props = {};

interface Tax {
  id: string;
  tax: string;
  rate: string;
}

const tax: Tax[] = [
  {
    id: "1",
    tax: "VAT",
    rate: "12",
  },
  {
    id: "2",
    tax: "GST",
    rate: "10",
  },
  {
    id: "3",
    tax: "GBP",
    rate: "17",
  },
];

const Tax = ({}: Props) => {
  const [openEdit, setOpenEdit] = useState(false);
  const [openAdd, setOpenAdd] = useState(false);
  return (
    <div className="pl-11">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-lg font-bold">Tax</p>
          <p className="text-sm">Add Usable tax to the system</p>
        </div>
        <button
          onClick={() => setOpenAdd(true)}
          className="flex items-center py-2 px-4 rounded-lg text-white bg-black"
        >
          <Plus /> <p className="text-sm font-medium">Add</p>
        </button>
      </div>
      <div>
        <table className="mt-6">
          <thead className="bg-gray-100">
            <th className="text-left px-2 py-1 ">Tax Type</th>
            <th className="text-left px-2 py-1">Rate</th>
            <th className="text-left px-2 py-1">Action</th>
          </thead>
          <tbody>
            {tax.map((tax, index) => (
              <tr key={index} className="bg-white">
                <td className="px-2 py-1 w-[215px] h-[42px] border-gray-200 text-sm">
                  {tax.tax}
                </td>
                <td className="px-2 py-1 w-[172px] h-[48px] border-gray-200 text-sm">
                  {tax.rate}
                </td>
                <td className="px-2 py-1 border-gray-200">
                  <div className="flex gap-3 items-center space-x-2">
                    <button
                      onClick={() => setOpenEdit(true)}
                      className="flex gap-2 bg-gray-200 hover:bg-red-100 text-black font-medium py-2 px-3 border border-black text-sm items-center rounded-lg"
                    >
                      <Edit />
                      Edit
                    </button>
                    <button className="flex gap-2 bg-red-100 hover:bg-gray-300 text-black font-medium py-2 px-3 border border-black text-sm items-center rounded-lg">
                      <Trash />
                      Delete
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <Modal open={openEdit} onClose={() => setOpenEdit(false)}>
        <EditTax onClose={() => setOpenEdit(false)} />
      </Modal>
      <Modal open={openAdd} onClose={() => setOpenAdd(false)}>
        <AddTax onClose={() => setOpenAdd(false)} />
      </Modal>
    </div>
  );
};

export default Tax;
