import axios from 'axios'
import {
  CONTACT_CREATE,
  CONTACT_DELETE,
  CONTACT_DELETE_ALL,
  CONTACT_FETCH_ALL,
  CONTACT_UPDATE,
} from "../constant/contactConstant";

export const createContact = (form) => async (dispatch) => {
  try {
    const {data} = axios.post("/contact",form)
    dispatch({type:CONTACT_CREATE,payload:data})
  } catch (error) {
    console.log(error)
  }
}

export const fetchContacts = () => async (dispatch) => {
  try {
    const { data } = axios.get("/contact", form);
    dispatch({ type: CONTACT_FETCH_ALL, payload: data });
  } catch (error) {
    console.log(error)
  }
}

export const updateContact = (id,form) => async (dispatch) => {
  try {
    const {data} = await axios.put(`/contact/${id}`,form)
    console.log(data)
    dispatch({type:CONTACT_UPDATE,payload:data})
  } catch (error) {
    console.log(error)
  }
}