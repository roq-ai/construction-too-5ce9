import { UserInterface } from 'interfaces/user';
import { ToolInterface } from 'interfaces/tool';
import { OutletInterface } from 'interfaces/outlet';
import { GetQueryInterface } from 'interfaces';

export interface RentalInterface {
  id?: string;
  user_id?: string;
  tool_id?: string;
  outlet_id?: string;
  start_date: any;
  end_date: any;
  status: string;
  created_at?: any;
  updated_at?: any;

  user?: UserInterface;
  tool?: ToolInterface;
  outlet?: OutletInterface;
  _count?: {};
}

export interface RentalGetQueryInterface extends GetQueryInterface {
  id?: string;
  user_id?: string;
  tool_id?: string;
  outlet_id?: string;
  status?: string;
}
