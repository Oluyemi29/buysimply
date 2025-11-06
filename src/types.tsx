import { z } from "zod";

export const FormSchema = z.object({
  email: z.email(),
  password: z.string().min(1, { message: "Minimum of one character" }),
});

export type UserDataProps = {
  id: number;
  name: string;
  email: string;
  role: string;
} | null;

export type LoanDataProps = {
  id: number;
  amount: string;
  maturityDate: string;
  status: string;
  applicant: {
    name: string;
    email: string;
    telephone: string;
    totalLoan: string | undefined;
  };
  createdAt: "2024-01-25 14:27:37";
};

export type UserTokenProps = string | null;

export type UserAuthProps = {
  userData: UserDataProps;
  loanData: LoanDataProps[];
  userToken: UserTokenProps;
  isActive: boolean;
  isCheckingActive: boolean;
  Login: (email: string, password: string) => Promise<boolean>;
  LogOut: (userId: number) => Promise<boolean>;
  CheckActive: () => void;
  GetAllLoan: () => Promise<LoanDataProps | []>;
  GetSingleUserLoan: (Email: string) => Promise<LoanDataProps[] | []>;
  GetAllExpiredLoan: () => Promise<LoanDataProps | []>;
  DeleteLoan: (loadId: number) => void;
};
