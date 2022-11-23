import { object as yupObject, string as yupString, date as yupDate } from "yup";

const validationSchema = yupObject().shape({
  nrp: yupString().required("Form Tidak boleh kosong"),
  name: yupString().required("Form Tidak boleh kosong"),
  born_place: yupString().required("Form Tidak boleh kosong"),
  born_date: yupDate().nullable().required("Form Tidak boleh kosong"),
  address: yupString().required("Form Tidak boleh kosong"),
  rank_id: yupString().required("Form Tidak boleh kosong"),
  status_id: yupString().required("Form Tidak boleh kosong"),
});

export default validationSchema;
