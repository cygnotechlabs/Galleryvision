import { Link } from "react-router-dom";
import LicensorTable from "../components/Licensor/LicensorTable";
import { Arrow } from "../components/icons/icon";

type Props = {};

interface Licensor {
  id: string;
  name: string;
  email: string;
  country: string;
}

function Licensor({}: Props) {
  return (
    <>
      <div className=" bg-gray-100 pl-[34px] pt-[42px] ">
        <div className="flex justify-between items-center pl-[34px]">
          <div>
            <h1 className="text-xl font-bold">Licensors</h1>
            <h1 className="pt-2">List of licensors created in the system</h1>
          </div>
          <Link
            to="/licensordetails"
            className="flex bg-black text-white rounded-lg w-[197px] h-[48px] justify-center gap-2 items-center font-bold"
          >
            Create licensor
            <Arrow />
          </Link>
        </div>

        <LicensorTable />
      </div>
    </>
  );
}

export default Licensor;
