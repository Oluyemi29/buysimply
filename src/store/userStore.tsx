import { create } from "zustand";
import type { LoanDataProps, UserAuthProps } from "../types";
import toast from "react-hot-toast";

const userAuth = create<UserAuthProps>((set) => ({
  userData: null,
  userToken: null,
  isActive: false,
  isCheckingActive: false,
  Login: async (email, password) => {
    const API = import.meta.env.VITE_BACKEND_URL as string;

    const request = await fetch(`${API}/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify({ email, password }),
    });
    const response = await request.json();
    if (response.success) {
      toast.success(response.message);
      set((prevData) => {
        return {
          ...prevData,
          userData: response.data,
          userToken: response.token,
        };
      });
      return true;
    } else {
      toast.error(response.message);
      return false;
    }
  },

  LogOut: async (userId) => {
    const API = import.meta.env.VITE_BACKEND_URL as string;
    const request = await fetch(`${API}/logout`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify({ userId }),
    });
    const response = await request.json();
    if (response.success) {
      set((prevData) => {
        return {
          ...prevData,
          isActive: false,
          isCheckingActive: false,
          userData: null,
          userToken: null,
        };
      });
      toast.success(response.message);
      return true;
    } else {
      toast.error(response.message);
      return false;
    }
  },

  CheckActive: async () => {
    set((prevData) => {
      return {
        ...prevData,
        isCheckingActive: true,
      };
    });
    const API = import.meta.env.VITE_BACKEND_URL as string;
    const request = await fetch(`${API}/isactive`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
    });
    const response = await request.json();
    if (response.success) {
      return set((prevData) => {
        return {
          ...prevData,
          isActive: response.success,
          isCheckingActive: false,
          userData: response.data,
        };
      });
    } else {
      return set((prevData) => {
        return {
          ...prevData,
          isActive: response.success,
          isCheckingActive: false,
        };
      });
    }
  },

  loanData: [],
  GetAllLoan: async () => {
    const API = import.meta.env.VITE_BACKEND_URL as string;
    const request = await fetch(`${API}/loans`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
    });
    const response = await request.json();
    if (response.success) {
      set((prevData) => {
        return {
          ...prevData,
          loanData: response.data,
        };
      });
      return response.data;
    } else {
      set((prevData) => {
        return {
          ...prevData,
          loanData: [],
        };
      });
      return [];
    }
  },
  GetSingleUserLoan: async (Email) => {
    const API = import.meta.env.VITE_BACKEND_URL as string;
    const request = await fetch(`${API}/loans/${Email}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
    });
    const response = await request.json();
    if (response.success) {
      return response.data as LoanDataProps[] | [];
    } else {
      return [];
    }
  },
  DeleteLoan: async (loanId) => {
    const API = import.meta.env.VITE_BACKEND_URL as string;
    const request = await fetch(`${API}/deleteloan`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ loanId }),
      credentials: "include",
    });
    const response = await request.json();
    if (response.success) {
      return toast.success(response.message);
    } else {
      return toast.error(response.message);
    }
  },
  GetAllExpiredLoan: async () => {
    const API = import.meta.env.VITE_BACKEND_URL as string;
    const request = await fetch(`${API}/expiredloans`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
    });
    const response = await request.json();
    if (response.success) {
      set((prevData) => {
        return {
          ...prevData,
          loanData: response.data,
        };
      });
      return response.data;
    } else {
      set((prevData) => {
        return {
          ...prevData,
          loanData: [],
        };
      });
      return [];
    }
  },
}));

export default userAuth;
