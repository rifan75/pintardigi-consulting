import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface Imenu {
  legal: {
    id:string;
    no: number | null;
    name: string;
    url: string;
  }[];
  tax: {
    id:string;
    no: number | null;
    name: string;
    url: string;
  }[];
  accounting: {
    id:string;
    no: number | null;
    name: string;
    url: string;
  }[];
}

interface ImenuState {
  menuLegal: {
    id:string;
    no: number | null;
    name: string;
    url: string;
  }[];
  menuTax: {
    id:string;
    no: number | null;
    name: string;
    url: string;
  }[];
  menuAccounting: {
    id:string;
    no: number | null;
    name: string;
    url: string;
  }[];
}

const initialState: ImenuState = {
  menuLegal: [{
    id:"",
    no: null,
    name: "",
    url: ""
  }],
  menuTax: [{
    id:"",
    no: null,
    name: "",
    url: ""
  }],
  menuAccounting: [{
    id:"",
    no: null,
    name: "",
    url: ""
  }],
};

export const menuSlice = createSlice({
  name: "menu",
  initialState,
  reducers: {
    setMenu: (state, action: PayloadAction<Imenu>) => {
      return {
        ...state,
        menuLegal: action.payload.legal,
        menuTax: action.payload.tax,
        menuAccounting: action.payload.accounting,
      };
    },
  },
});

// Action creators are generated for each case reducer function
export const { setMenu } = menuSlice.actions;

export default menuSlice.reducer;
