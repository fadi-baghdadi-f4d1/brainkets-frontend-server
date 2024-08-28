import React from "react";

const SkeletonLoader: React.FC = () => {
  return (
    <div className="mt-6 xl:mx-10 lg:mx-10">
      <div className="border rounded-md border-[#E4E4E4] overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y h-auto divide-gray-200 border rounded-md border-[#E4E4E4]">
            <thead>
              <tr>
                <th className="px-6 py-3 text-left text-[15px] font-semibold tracking-wider bg-gray-200">
                  <div className="h-4 bg-gray-300 rounded-md"></div>
                </th>
                <th className="px-6 py-3 text-left text-[15px] font-semibold tracking-wider bg-gray-200">
                  <div className="h-4 bg-gray-300 rounded-md"></div>
                </th>
                <th className="px-6 py-3 text-left text-[15px] font-semibold tracking-wider bg-gray-200">
                  <div className="h-4 bg-gray-300 rounded-md"></div>
                </th>
                <th className="px-6 py-3 text-left text-[15px] font-semibold tracking-wider bg-gray-200">
                  <div className="h-4 bg-gray-300 rounded-md"></div>
                </th>
                <th className="px-6 py-3 text-left text-[15px] font-semibold tracking-wider bg-gray-200"></th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {[...Array(8)].map((_, index) => (
                <tr key={index}>
                  <td className="px-6 py-2 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="h-6 bg-gray-300 rounded-md w-1/2"></div>
                    </div>
                  </td>
                  <td className="px-6 py-2 whitespace-nowrap">
                    <div className="h-6 bg-gray-300 rounded-md w-1/2"></div>
                  </td>
                  <td className="px-6 py-2 whitespace-nowrap">
                    <div className="flex items-center">
                      {[...Array(3)].map((_, i) => (
                        <div
                          key={i}
                          className="h-[30px] w-[30px] rounded-full bg-gray-300 mr-2"
                        ></div>
                      ))}
                    </div>
                  </td>
                  <td className="px-6 py-2 whitespace-nowrap">
                    <div className="w-5 h-5 inline-block rounded-full bg-gray-300"></div>
                  </td>
                  <td className="px-6 py-2 whitespace-nowrap">
                    <div className="h-6 bg-gray-300 rounded-md w-1/2"></div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default SkeletonLoader;
