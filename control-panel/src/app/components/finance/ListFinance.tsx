import React from "react";
import Image from "next/image";
import user from "../../../public/user1.png";
import FinanceDropdown from "./dropdown/FinanceDropdown";

const transactions = [
  {
    amount: "1,000$",
    description:
      "Lorem ipsum dolor sit amet consectetur. Senectus cum nulla est sit nibh et lacus. Maecenas a fringilla egestas quis blandit.",
    date: "Mar 25, 2024",
    time: "04:00PM",
    user: "M.Zayat",
    type: "Income",
    status: "Received",
  },
  {
    amount: "500$",
    description:
      "Lorem ipsum dolor sit amet consectetur. Senectus cum nulla est sit nibh et lacus. Maecenas a fringilla egestas quis blandit.",
    date: "Mar 25, 2024",
    time: "12:10PM",
    user: "M.Zayat",
    type: "Expenses",
    status: "Paid",
  },
  {
    amount: "1,000$",
    description:
      "Lorem ipsum dolor sit amet consectetur. Senectus cum nulla est sit nibh et lacus. Maecenas a fringilla egestas quis blandit.",
    date: "Mar 20, 2024",
    time: "04:30PM",
    user: "M.Zayat",
    type: "Income",
    status: "Received",
  },
  {
    amount: "1,000$",
    description:
      "Lorem ipsum dolor sit amet consectetur. Senectus cum nulla est sit nibh et lacus. Maecenas a fringilla egestas quis blandit.",
    date: "Mar 18, 2024",
    time: "03:00PM",
    user: "M.Zayat",
    type: "Income",
    status: "Received",
  },
  {
    amount: "2,500$",
    description:
      "Lorem ipsum dolor sit amet consectetur. Senectus cum nulla est sit nibh et lacus. Maecenas a fringilla egestas quis blandit.",
    date: "Mar 15, 2024",
    time: "12:10PM",
    user: "M.Zayat",
    type: "Expenses",
    status: "Paid",
  },
  {
    amount: "500$",
    description:
      "Lorem ipsum dolor sit amet consectetur. Senectus cum nulla est sit nibh et lacus. Maecenas a fringilla egestas quis blandit.",
    date: "Mar 15, 2024",
    time: "04:30PM",
    user: "M.Zayat",
    type: "Income",
    status: "Received",
  },
  {
    amount: "1,000$",
    description:
      "Lorem ipsum dolor sit amet consectetur. Senectus cum nulla est sit nibh et lacus. Maecenas a fringilla egestas quis blandit.",
    date: "Mar 22, 2024",
    time: "09:00AM",
    user: "M.Zayat",
    type: "Income",
    status: "Received",
  },
  {
    amount: "1,000$",
    description:
      "Lorem ipsum dolor sit amet consectetur. Senectus cum nulla est sit nibh et lacus. Maecenas a fringilla egestas quis blandit.",
    date: "Mar 18, 2024",
    time: "10:00AM",
    user: "M.Zayat",
    type: "Income",
    status: "Received",
  },
  {
    amount: "500$",
    description:
      "Lorem ipsum dolor sit amet consectetur. Senectus cum nulla est sit nibh et lacus. Maecenas a fringilla egestas quis blandit.",
    date: "Mar 10, 2024",
    time: "02:00PM",
    user: "M.Zayat",
    type: "Income",
    status: "Received",
  },
];

const ListFinance: React.FC = () => {
  // Function to get the first 5 words of the description
  const getShortDescription = (description: string) => {
    const words = description.split(" ").slice(0, 5).join(" ");
    return `${words}${words.length < description.length ? "..." : ""}`;
  };

  return (
    <section className="pb-10 lg:mx-10 my-5">
      <div className="border rounded-md border-[#E4E4E4] overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200 border rounded-md border-[#E4E4E4]">
          <thead>
            <tr>
              <th className="py-2 px-4 border-b text-left">Amount</th>
              <th className="py-2 px-4 border-b text-left">Description</th>
              <th className="py-2 px-4 border-b text-left">User</th>
              <th className="py-2 px-4 border-b text-left">Type</th>
              <th className="py-2 px-4 border-b text-left">Status</th>
              <th className="py-2 px-4 border-b text-left">Date</th>
            </tr>
          </thead>
          <tbody className="bg-white">
            {transactions.map((transaction, index) => (
              <tr key={index}>
                <td className="py-2 px-4 border-b font-bold text-[15px]">
                  {transaction.amount}
                </td>
                <td className="py-2 px-4 border-b font-medium text-[15px]">
                  {getShortDescription(transaction.description)}
                </td>
                <td className="py-2 px-4 border-b">
                  <Image
                    src={user}
                    width={25}
                    height={20}
                    alt="user"
                    className="rounded-full"
                  />
                </td>
                <td className="py-2 px-2 border-b">
                  <span
                    className={`inline-block w-24 px-1 py-1 rounded text-xs font-medium text-center ${
                      transaction.type === "Income"
                        ? "bg-[#19B600] bg-opacity-15 text-[#19B600]"
                        : "bg-[#CC0000] bg-opacity-15 text-[#CC0000]"
                    }`}
                  >
                    {transaction.type}
                  </span>
                </td>
                <td className="py-2 px-4 border-b">
                  <span
                    className={`inline-block w-24 px-2 py-1 rounded text-xs font-medium text-center ${
                      transaction.status === "Received"
                        ? "bg-[#FDC90E] text-black"
                        : "bg-[#FDC90E] text-black"
                    }`}
                  >
                    {transaction.status}
                  </span>
                </td>
                <td className="py-2 px-4 border-b text-[#404040] text-[12px]">
                  {transaction.date} {transaction.time}
                </td>
                <td>
                  <FinanceDropdown entityType="finance" entityId={123} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
};

export default ListFinance;
