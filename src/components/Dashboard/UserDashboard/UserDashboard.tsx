"use client";

import logo from "@/assets/icons/Logo (5).png";
import image_picture from "@/assets/icons/sm.png";
import { useGetPharmaciesQuery } from "@/redux/pharmacies/Pharmacies";
import { decodeJwtToken } from "@/utils/tokenDecode";
import Image from "next/image";
import Link from "next/link";
import type React from "react";

interface StatusItemProps {
  title: string;
  status: "Complete" | "In Progress" | "Pending";
}

interface StatusColumnProps {
  title: string;
  icon: React.ReactNode;
  statusType: "Complete" | "In Progress" | "Pending";
  items: string[];
}

const StatusItem: React.FC<StatusItemProps> = ({ title, status }) => {
  return (
    <div className="flex dark:text-black items-center justify-between mb-4 py-3 px-4 bg-white rounded-md shadow-sm">
      <span className="text-sm font-medium text-gray-800">{title}</span>
      <span
        className={`text-xs px-3 py-1  rounded-full ${
          status === "Complete"
            ? "bg-green-100 text-green-800"
            : status === "In Progress"
            ? "bg-blue-100 text-blue-800"
            : "bg-yellow-100 text-yellow-800"
        }`}
      >
        {status}
      </span>
    </div>
  );
};

const StatusColumn: React.FC<StatusColumnProps> = ({
  title,
  icon,
  statusType,
  items,
}) => {
  return (
    <div className="flex-1 bg-[#F9F9F9] min-w-[280px] lg:min-w-0">
      <div className="flex items-center border border-[#ECECEC] gap-2 p-3 bg-white rounded-lg py-5  my-6 shadow-sm">
        <div
          className={`w-14 h-12 rounded-md flex items-center justify-center ${
            statusType === "Complete"
              ? "bg-yellow-100 "
              : statusType === "In Progress"
              ? "bg-yellow-100"
              : "bg-yellow-100"
          }`}
        >
          {icon}
        </div>
        <span className="text-lg font-bold">{title}</span>
      </div>

      <div className="bg-white p-6 rounded-lg border border-[#ECECEC]">
        <h3 className="text-base font-semibold mb-4">Document Status</h3>

        <div
          className="overflow-y-auto custom-scrollbar"
          style={{
            maxHeight: "400px",
          }}
        >
          {items.map((item, index) => (
            <StatusItem key={index} title={item} status={statusType} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default function UserDashboard() {
  const token = decodeJwtToken();
  const userId = token?.id;

  const { isLoading, data } = useGetPharmaciesQuery([
    {
      name: "userId",
      value: userId,
    },
  ]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  // Access all user pharmacy data
  const allUserData = data?.data?.data || [];

  const pendingData: string[] = [];
  const inProgressData: string[] = [];
  const incompleteData: string[] = [];

  console.log(allUserData);

  // Categorizing based on status
  Object.entries(allUserData[0])?.forEach(([key, value]) => {
    if (value === "PENDING" && key !== "status") {
      pendingData.push(key);
    } else if (value === "IN_PROGRESS" && key !== "status") {
      inProgressData.push(key);
    } else if (value === "COMPLETED" && key !== "status") {
      incompleteData.push(key);
    }
  });

  return (
    <div>
      {isLoading ? (
        <div> Loading ..</div>
      ) : (
        <div className="bg-[#F9F9F9] md:min-h-screen p-4 ">
          <header className="bg-white border-b  border-[#ECECEC] py-4 px-6">
            <div className="flex justify-between items-center">
              <div className="w-10 h-10">
                <div className="w-12 h-12  rounded-md flex items-center justify-center">
                  <Link href="/">
                    <Image
                      src={logo}
                      alt="logo"
                      width={500}
                      height={500}
                      className=""
                    />
                  </Link>
                </div>
              </div>

              <div className="w-10 h-10 rounded-full overflow-hidden">
                <Image
                  src={token?.photoUrl || image_picture}
                  alt="User avatar"
                  width={300}
                  height={300}
                  className="rounded-full"
                />
              </div>
            </div>
          </header>
          <style jsx global>{`
            .custom-scrollbar::-webkit-scrollbar {
              width: 8px;
            }

            .custom-scrollbar::-webkit-scrollbar-track {
              background: #f1f1f1;
              border-radius: 10px;
            }

            .custom-scrollbar::-webkit-scrollbar-thumb {
              background: #c1c1c1;
              border-radius: 10px;
            }

            .custom-scrollbar::-webkit-scrollbar-thumb:hover {
              background: #a1a1a1;
            }

            /* Firefox scrollbar */
            .custom-scrollbar {
              scrollbar-width: thin;
              scrollbar-color: #c1c1c1 #f1f1f1;
            }
          `}</style>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 md:px-10 gap-4">
            <StatusColumn
              title="Completed"
              icon={
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="32"
                  height="32"
                  viewBox="0 0 32 32"
                  fill="none"
                >
                  <path
                    d="M29.3327 16.0003C29.3327 8.63653 23.3631 2.66699 15.9993 2.66699C8.63555 2.66699 2.66602 8.63653 2.66602 16.0003C2.66602 23.3641 8.63555 29.3337 15.9993 29.3337C23.3631 29.3337 29.3327 23.3641 29.3327 16.0003Z"
                    fill="#F5E663"
                    stroke="#F5E663"
                    strokeWidth="1.5"
                  />
                  <path
                    d="M10.666 17.0003C10.666 17.0003 12.7993 18.217 13.866 20.0003C13.866 20.0003 17.066 13.0003 21.3327 10.667"
                    stroke="white"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              }
              statusType="Complete"
              items={incompleteData}
            />

            <StatusColumn
              title="In Progress"
              icon={
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="32"
                  height="32"
                  viewBox="0 0 32 32"
                  fill="none"
                >
                  <g opacity="0.8">
                    <path
                      d="M29.3327 16.0003C29.3327 8.63653 23.3631 2.66699 15.9993 2.66699C8.63555 2.66699 2.66602 8.63653 2.66602 16.0003C2.66602 23.3641 8.63555 29.3337 15.9993 29.3337C23.3631 29.3337 29.3327 23.3641 29.3327 16.0003Z"
                      stroke="#F5E663"
                      strokeWidth="1.5"
                    />
                  </g>
                </svg>
              }
              statusType="In Progress"
              items={inProgressData}
            />

            <StatusColumn
              title="Pending"
              icon={
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="32"
                  height="32"
                  viewBox="0 0 32 32"
                  fill="none"
                >
                  <g opacity="0.8">
                    <path
                      d="M29.3327 16.0003C29.3327 8.63653 23.3631 2.66699 15.9993 2.66699C8.63555 2.66699 2.66602 8.63653 2.66602 16.0003C2.66602 23.3641 8.63555 29.3337 15.9993 29.3337C23.3631 29.3337 29.3327 23.3641 29.3327 16.0003Z"
                      stroke="#F5E663"
                      strokeWidth="1.5"
                    />
                  </g>
                </svg>
              }
              statusType="Pending"
              items={pendingData}
            />
          </div>
        </div>
      )}
    </div>
  );
}
