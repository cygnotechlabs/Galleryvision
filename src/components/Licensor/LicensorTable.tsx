import { useState, useEffect } from "react";
import Modal from "../../layouts/Modal";
import LicensorView from "./LicensorView";
import { Edit, Eye, Filter, Invoice } from "../icons/icon";

type Props = {};
interface Licensor {
  id: string;
  licenserName: string;
  licenserEmail: string;
  companyName: string;
}

function LicensorTable({}: Props) {
  const [licensors, setLicensors] = useState<Licensor[]>([]);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    fetch("http://localhost:3000/get-licensor")
      .then(response => response.json())
      .then(data => setLicensors(data))
      .catch(error => console.error("Error fetching data:", error));
  }, []);

  return (
    <div className="bg-white shadow-md rounded-xl ml-[34px] mt-[24px] mr-[34px] h-[75svh] pr-9">
      {/* Search and Filter */}
      <div className="relative pl-8 pb-5 pt-8 pr-8 ">
        {/* Search Input */}
        <div className="flex justify-between text-sm">
          <input
            type="text"
            placeholder="Search"
            className="border border-gray-300 rounded-md px-4 w-[566px] h-[42px] pr-[40px]"
          />
          {/* Filter Button */}
          <button className="flex items-center px-4 gap-2 w-[93px] h-[34px] border border-gray-400 text-black font-medium bg-gray-100 rounded-lg">
            Filter
            <span>
              <Filter />
            </span>
          </button>
        </div>
      </div>
      {/* Table */}
      <div className="overflow-x-auto px-9 rounded-lg">
        <table className="w-full h-[368px] table-auto ">
          <thead>
            <tr className="bg-gray-100">
              <th className="px-4 py-1 text-left text-sm">Licensor Name</th>
              <th className="px-4 py-1 text-left text-sm">Email</th>
              <th className="px-4 py-1 text-left text-sm">Company Name</th>
              <th className="px-4 py-1 text-left text-sm">Actions</th>
            </tr>
          </thead>
          <tbody>
            {licensors.map((licensor, index) => (
              <tr key={index} className="bg-white">
                <td className="px-4 py-1 border-gray-200 text-sm">
                  {licensor.licenserName}
                </td>
                <td className="px-4 py-1 border-gray-200 text-sm">
                  {licensor.licenserEmail}
                </td>
                <td className="px-4 py-1 border-gray-200 text-sm">
                  {licensor.companyName}
                </td>
                <td className="px-4 py-1 border-gray-200">
                  <div className="flex items-center space-x-2">
                    <button
                      onClick={() => setOpen(true)}
                      className="flex gap-2 bg-red-100 hover:bg-red-200 text-black font-medium py-2 px-3 border border-black text-sm items-center rounded-lg"
                    >
                      <Eye />
                      View
                    </button>
                    <button className="flex gap-2 bg-gray-100-100 hover:bg-gray-400 text-black font-medium py-2 px-3 border border-black text-sm items-center rounded-lg">
                      <Edit />
                      Edit
                    </button>
                    <button className="flex gap-2 bg-gray-100-100 hover:bg-gray-400 text-black font-medium py-2 px-3 border border-black text-sm items-center rounded-lg">
                      <Invoice />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {/* Pagination */}
      <div className="pt-4 flex justify-center">
        <nav className="flex items-center gap-96" aria-label="Pagination">
          <div>Showing 1 of 5 of {licensors.length} entries</div>
          <ul className="flex list-style-none">
            {/* Pagination Links */}
          </ul>
        </nav>
      </div>
      {/* Modal */}
      <Modal open={open} onClose={() => setOpen(false)}>
        <LicensorView />
      </Modal>
    </div>
  );
}

export default LicensorTable;
