import { useState, useEffect } from "react";
import Modal from "../../layouts/Modal";
import LicensorView from "./LicensorView";
import { Edit, Eye, Filter, Search, Trash } from "../icons/icon";
import axios from "axios";
import DeleteModal from "../../UI/DeleteModal";
import { Link } from "react-router-dom";

type Props = {};
interface Licensor {
  _id: string;
  companyName: string;
  companyEmail: string;
  companyLogo: string;
  licenserName: string;
  licenserEmail: string;
  licenserAddress: string;
  licenserPhno: string;
  paymentMethod: string;
  bankAccNum: string;
  ifsc_iban: string;
  currency: string;
}

function LicensorTable({}: Props) {
  const [openDelete, setOpenDelete] = useState(false);
  const [licensorDeleteId, setLicensorDeleteId] = useState<string>("");
  const [licensors, setLicensors] = useState<Licensor[]>([]);
  const [searchTerm, setSearchTerm] = useState("");

  const [licensor, setLicensor] = useState({
    _id: "",
    companyName: "",
    companyEmail: "",
    companyLogo: "",
    licenserName: "",
    licenserEmail: "",
    licenserAddress: "",
    licenserPhno: "",
    paymentMethod: "",
    bankAccNum: "",
    ifsc_iban: "",
    currency: "",
  });
  const [open, setOpen] = useState(false);

  useEffect(() => {
    fetchData(); // Call the fetchData function
  }, []);
  const fetchData = async () => {
    // Define an asynchronous function
    try {
      const response = await axios.get("http://localhost:3000/get-licensor"); // Await the axios request
      setLicensors(response.data); // Set the data in the state
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const handleDelete = async (): Promise<void> => {
    try {
      await axios.delete(
        `http://localhost:3000/remove-licensor/${licensorDeleteId}`
      );
      setLicensors((prevLicensors) =>
        prevLicensors.filter((licensor) => licensor._id !== licensorDeleteId)
      );
      setOpenDelete(false);
    } catch (error) {
      console.error("Error deleting licensor:", error);
    }
    fetchData();
  };
  const handleSearch = () => {
    // Filter the licensers based on the search term
    const filteredLicensors = licensors.filter(
      (licensor) =>
        licensor.licenserName
          .toLowerCase()
          .includes(searchTerm.toLowerCase()) ||
        licensor.companyName.toLowerCase().includes(searchTerm.toLowerCase())
    );
    // Do something with the filtered licensers, like updating state or displaying them
    console.log(filteredLicensors);
  };
  return (
    <div className="bg-white shadow-md rounded-xl ml-[34px] mt-[24px] mr-[34px] h-[75svh] pr-9">
      {/* Search and Filter */}
      <div className="relative pl-8 pb-5 pt-8 pr-8 ">
        {/* Search Input */}
        <div className="flex justify-between text-sm">
          <div className="flex">
            <input
              type="text"
              placeholder="Search"
              className="border border-gray-300 rounded-s-md px-4 w-[566px] h-[42px] pr-[40px]"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <button
              onClick={handleSearch}
              className="bg-black text-white px-2 rounded-e-2xl"
            >
              <Search />
            </button>
          </div>
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
        <table className="w-full  table-auto ">
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
                      onClick={() => {
                        setOpen(true);
                        setLicensor(licensor);
                      }}
                      className="flex gap-2 bg-red-100 hover:bg-red-200 text-black font-medium py-2 px-3 border border-black text-sm items-center rounded-lg"
                    >
                      <Eye />
                      View
                    </button>
                    <Link to={`/update-licensor/${licensor._id}`}>
                      <button className="flex gap-2 bg-gray-100 hover:bg-gray-400 text-black font-medium py-2 px-3 border border-black text-sm items-center rounded-lg">
                        <Edit />
                        Edit
                      </button>
                    </Link>

                    <button
                      onClick={() => {
                        setOpenDelete(true);
                        setLicensorDeleteId(licensor._id);
                        console.log(licensor._id);
                      }}
                      className="flex gap-2 bg-red-400 hover:bg-gray-400 text-white hover:text-black  font-medium py-2 px-3 border border-black text-sm items-center rounded-lg"
                    >
                      <Trash />
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
          <ul className="flex list-style-none">{/* Pagination Links */}</ul>
        </nav>
      </div>
      {/* Modal */}
      <Modal open={open} onClose={() => setOpen(false)}>
        <LicensorView licensor={licensor} onClose={() => setOpen(false)} />
      </Modal>
      <Modal
        onClose={() => {
          setOpenDelete(false);
        }}
        open={openDelete}
      >
        <DeleteModal
          onClose={() => setOpenDelete(false)}
          handleDelete={() => handleDelete()}
        />
      </Modal>
    </div>
  );
}

export default LicensorTable;
