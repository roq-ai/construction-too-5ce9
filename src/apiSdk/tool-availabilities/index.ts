import axios from 'axios';
import queryString from 'query-string';
import { ToolAvailabilityInterface, ToolAvailabilityGetQueryInterface } from 'interfaces/tool-availability';
import { GetQueryInterface } from '../../interfaces';

export const getToolAvailabilities = async (query?: ToolAvailabilityGetQueryInterface) => {
  const response = await axios.get(`/api/tool-availabilities${query ? `?${queryString.stringify(query)}` : ''}`);
  return response.data;
};

export const createToolAvailability = async (toolAvailability: ToolAvailabilityInterface) => {
  const response = await axios.post('/api/tool-availabilities', toolAvailability);
  return response.data;
};

export const updateToolAvailabilityById = async (id: string, toolAvailability: ToolAvailabilityInterface) => {
  const response = await axios.put(`/api/tool-availabilities/${id}`, toolAvailability);
  return response.data;
};

export const getToolAvailabilityById = async (id: string, query?: GetQueryInterface) => {
  const response = await axios.get(`/api/tool-availabilities/${id}${query ? `?${queryString.stringify(query)}` : ''}`);
  return response.data;
};

export const deleteToolAvailabilityById = async (id: string) => {
  const response = await axios.delete(`/api/tool-availabilities/${id}`);
  return response.data;
};
