import { ToolInterface } from 'interfaces/tool';
import { OutletInterface } from 'interfaces/outlet';
import { GetQueryInterface } from 'interfaces';

export interface ToolAvailabilityInterface {
  id?: string;
  tool_id?: string;
  outlet_id?: string;
  quantity: number;
  created_at?: any;
  updated_at?: any;

  tool?: ToolInterface;
  outlet?: OutletInterface;
  _count?: {};
}

export interface ToolAvailabilityGetQueryInterface extends GetQueryInterface {
  id?: string;
  tool_id?: string;
  outlet_id?: string;
}
