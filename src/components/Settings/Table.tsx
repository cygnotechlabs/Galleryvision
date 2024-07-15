import axios from "axios";
import API_ENDPOINTS from "../../config/apiConfig";
import { useState, useEffect } from "react";

type Props = {};

type Tax = {
  date: string;
  taxPercentage: string;
};

type INR = {
  date: string;
  INR: string;
};

function Table({}: Props) {
  const [tax, setTax] = useState<Tax[]>([]);
  const [currency, setCurrency] = useState<INR[]>([]);

  const fetchDataTax = async () => {
    try {
      const response = await axios.get(API_ENDPOINTS.VIEW_TAX);
      setTax(response.data);
    } catch (error) {
      console.error("Error fetching tax data", error);
    }
  };

  const fetchDataCurrency = async () => {
    try {
      const response = await axios.get(API_ENDPOINTS.VIEW_CURRENCY);
      setCurrency(response.data);
    } catch (error) {
      console.error("Error fetching currency data", error);
    }
  };

  useEffect(() => {
    fetchDataTax();
    fetchDataCurrency();
  }, []);

  return (
    <div className="bg-white mt-4 flex gap-3 justify-around p-4">
      <div className="Currency-Table w-1/2">
        <p className="font-bold text-xl">Currency Table</p>
        <table className="min-w-full border border-gray-300">
          <thead>
            <tr className="bg-gray-200">
              <th className="border border-gray-300 py-2 px-2 text-center">
                Date
              </th>
              <th className="border border-gray-300 py-2 px-2 text-center">
                Currency Rate
              </th>
            </tr>
          </thead>
          <tbody>
            {[...currency]
              .reverse()
              .slice(0, 3)
              .map((entry) => (
                <tr key={entry.date}>
                  <td className="border border-gray-300 font-normal py-2 px-4 text-center">
                    {entry.date}
                  </td>
                  <td className="border border-gray-300 font-normal py-2 px-4 text-left">
                    $1 = ₹ {entry.INR}
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
      <div className="Tax-Table font-bold w-1/2">
        <p className="font-bold text-xl">Tax Table</p>
        <table className="min-w-full border border-gray-300">
          <thead>
            <tr className="bg-gray-200">
              <th className="border border-gray-300 py-2 px-2 text-center">
                Date
              </th>
              <th className="border border-gray-300 py-2 px-2 text-center">
                Tax Rate
              </th>
            </tr>
          </thead>
          <tbody>
            {[...tax]
              .reverse()
              .slice(0, 3)
              .map((entry) => (
                <tr key={entry.date}>
                  <td className="border border-gray-300 font-normal py-2 px-4 text-center">
                    {entry.date}
                  </td>
                  <td className="border border-gray-300 font-normal py-2 px-4 text-left">
                    {entry.taxPercentage} %
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Table;
