import toast from "react-hot-toast";
import userAuth from "../store/userStore";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useEffect, useState } from "react";
import type { LoanDataProps } from "../types";
import { FaPhoneAlt } from "react-icons/fa";

const LoanComponent = () => {
  const [searchParams] = useSearchParams();
  const status = searchParams.get("status");
  const { userData, LogOut, GetAllLoan, DeleteLoan } = userAuth();
  const [allLoans, setAllLoans] = useState<LoanDataProps[]>([]);
  const navigate = useNavigate();
  const userId = userData?.id as number;
  const userRole = userData?.role;

  useEffect(() => {
    const GetAllLoanData = async () => {
      const response = (await GetAllLoan()) as LoanDataProps[];
      setAllLoans(
        response.filter((eachLoan) => {
          if (userRole === "staff") {
            eachLoan.applicant.totalLoan = undefined;
            return eachLoan;
          }
          if (status) {
            return eachLoan.status === status;
          }
          return eachLoan;
        })
      );
    };
    GetAllLoanData();
  }, [GetAllLoan, userRole, status]);

  const handleLogout = async (userId: number) => {
    const response = await LogOut(userId);
    if (!userId) {
      return toast.error("unauthorise access");
    }
    if (response) {
      return navigate("/");
    }
  };
  const handleDeleteLoan = (loadId: number) => {
    try {
      DeleteLoan(loadId);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="py-6 w-[95%] mx-auto">
      <div className="flex flex-row justify-between items-center w-full">
        <h1 className="">Hi {userData?.name}</h1>
        <button
          onClick={() => handleLogout(userId)}
          className="bg-red-700 text-white px-4 py-2 rounded-md cursor-pointer"
        >
          Logout
        </button>
      </div>

      <div className="flex flex-col gap-3 mt-5">
        {allLoans.length < 1 ? (
          <>
            <div className="w-full my-24">
              <h1 className="text-sm font-semibold text-center">
                No Loan Data Found
              </h1>
            </div>
          </>
        ) : (
          <>
            {allLoans.map((eachLoan, index) => {
              return (
                <div key={index} className="bg-fadepurple rounded-md p-4">
                  <div className="w-full flex flex-row justify-between items-start ">
                    <div className="flex flex-col gap-2">
                      <h1 className="font-semibold text-maindark">
                        {eachLoan.amount}
                      </h1>
                      <p className="text-maindark font-semibold text-[0.8rem]">
                        {eachLoan.status}
                      </p>
                    </div>
                    <div>
                      <h1 className="text-[0.8rem] font-semibold text-maindark">
                        Expiry Date : {eachLoan.maturityDate}
                      </h1>
                    </div>
                  </div>
                  <div className="w-full flex mt-3 flex-row justify-between items-start ">
                    <div className="flex flex-col gap-2">
                      <h1 className="font-semibold text-maindark">
                        {eachLoan.applicant?.name}
                      </h1>
                      <p className="text-maindark font-semibold text-[0.8rem]">
                        {eachLoan.applicant?.email}
                      </p>
                    </div>
                    <div className="flex flex-col justify-end items-end">
                      <div className="flex flex-row gap-2 items-center">
                        <FaPhoneAlt />
                        <h1 className="text-[0.8rem] font-semibold text-maindark">
                          {eachLoan.applicant?.telephone}
                        </h1>
                      </div>
                      <h1 className="text-[0.8rem] mt-2 font-semibold text-maindark">
                        {eachLoan.applicant?.totalLoan}
                      </h1>
                      {userData?.role === "superAdmin" && (
                        <button
                          className="w-max cursor-pointer px-4 h-9 rounded-md bg-red-700 text-white text-sm mt-3 py-1"
                          onClick={() => handleDeleteLoan(eachLoan.id)}
                        >
                          Delete
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </>
        )}
      </div>
    </div>
  );
};

export default LoanComponent;
