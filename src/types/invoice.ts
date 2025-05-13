export interface Invoice {
  id: number;
  account_razon: string;
  account_fiscal_id: string;
  chs_data_dat: Date;
  invoice_number: string;
  ce_ca: string;
  fecha_autorizacion: Date;
  cashmov_ope: string;
  cashmov_cant: number;
  cashmov_des: string;
  cashmov_imp: string;
  for_amt: string;
  account_dir: null;
  account_email: string;
  paymod: string;
}