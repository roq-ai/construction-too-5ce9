import { RentalInterface } from 'interfaces/rental';
import { ToolAvailabilityInterface } from 'interfaces/tool-availability';
import { CompanyInterface } from 'interfaces/company';
import { GetQueryInterface } from 'interfaces';

export interface OutletInterface {
  id?: string;
  name: string;
  address: string;
  company_id?: string;
  created_at?: any;
  updated_at?: any;
  rental?: RentalInterface[];
  tool_availability?: ToolAvailabilityInterface[];
  company?: CompanyInterface;
  _count?: {
    rental?: number;
    tool_availability?: number;
  };
}

export interface OutletGetQueryInterface extends GetQueryInterface {
  id?: string;
  name?: string;
  address?: string;
  company_id?: string;
}
