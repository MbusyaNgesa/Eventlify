import axios from "axios";

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || "http://localhost:5002/api",
  withCredentials: true,
});

export const login = async (email: string, password: string) => {
  const response = await api.post("/auth/login", { email, password });
  return response.data;
};

export const register = async (
  name: string,
  email: string,
  password: string
) => {
  const response = await api.post("/auth/register", { name, email, password });
  return response.data;
};

export const logout = async () => {
  const response = await api.get("/auth/logout");
  return response.data;
};

export const getEvents = async () => {
  const response = await api.get("/events");
  return response.data;
};

export const getEvent = async (id: string) => {
  const response = await api.get(`/events/${id}`);
  return response.data;
};

export const createEvent = async (eventData: any) => {
  const response = await api.post("/events", eventData);
  return response.data;
};

export const updateEvent = async (id: string, eventData: any) => {
  const response = await api.put(`/events/${id}`, eventData);
  return response.data;
};

export const deleteEvent = async (id: string) => {
  const response = await api.delete(`/events/${id}`);
  return response.data;
};

export const getTickets = async (eventId: string) => {
  const response = await api.get(`/tickets/event/${eventId}`);
  return response.data;
};

export const purchaseTickets = async (
  eventId: string,
  ticketType: string,
  quantity: number
) => {
  const response = await api.post("/tickets/purchase", {
    eventId,
    ticketType,
    quantity,
  });
  return response.data;
};

export const getUserProfile = async () => {
  //   const response = await api.get("/users/profile");
  //   return response.data;
};

export const updateUserProfile = async (userData: any) => {
  const response = await api.put("/users/profile", userData);
  return response.data;
};
