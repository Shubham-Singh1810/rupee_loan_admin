import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import {
  getTicketListServ,
  ticketCategoryUpdateServ,
  ticketCategoryAddServ,
  ticketCategoryDeleteServ,
} from "../../services/ticker.service";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import NoDataScreen from "../../components/NoDataScreen";
import { toast } from "react-toastify";
import Pagination from "../../components/Pagination";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import moment from "moment";
import ConfirmDeleteModal from "../../components/ConfirmDeleteModal";
function ChatBox() {
 

  return (
    <div className="container-fluid user-table vh-100 d-flex justify-content-center align-items-center">
      <p>Coming Soon</p>
    </div>
  );
}

export default ChatBox;
