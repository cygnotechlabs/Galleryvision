import React, { useEffect } from "react";
import { parse, format } from "date-fns";

type Log = {
  _id: string;
  fileName: string;
  fileType: string;
  dateTime: string;
  status: string;
};

type Props = {
  fetchData: () => void;
  log: Log[];
  error: string | null;
};

const LogTable: React.FC<Props> = ({ fetchData, log, error }) => {
  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return (
    <div className="Currency-Table w-full">
      <p className="font-bold text-xl mb-3">Upload Logs</p>
      {error && <p className="text-red-500">{error}</p>}
      <table className="min-w-full border border-gray-300">
        <thead>
          <tr className="bg-gray-200">
            <th className="border border-gray-300 py-2 px-2 text-center">
              File Name
            </th>
            <th className="border border-gray-300 py-2 px-2 text-center">
              File Type
            </th>
            <th className="border border-gray-300 py-2 px-2 text-center">
              Date
            </th>
            <th className="border border-gray-300 py-2 px-2 text-center">
              Time
            </th>
            <th className="border border-gray-300 py-2 px-2 text-center">
              Status
            </th>
          </tr>
        </thead>
        <tbody>
          {log.map((entry) => {
            const parsedDate = parse(
              entry.dateTime,
              "d/M/yyyy, h:mm:ss a",
              new Date()
            );
            return (
              <tr key={entry._id} className="bg-white">
                <td className="border border-gray-300 py-2 px-2 text-center">
                  {entry.fileName}
                </td>
                <td className="border border-gray-300 py-2 px-2 text-center">
                  {entry.fileType}
                </td>
                <td className="border border-gray-300 py-2 px-2 text-center">
                  {format(parsedDate, "MM/dd/yyyy")}
                </td>
                <td className="border border-gray-300 py-2 px-2 text-center">
                  {format(parsedDate, "hh:mm:ss a")}
                </td>
                <td className="border border-gray-300 py-2 px-2 text-center">
                  {entry.status}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default LogTable;
