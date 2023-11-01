import { v4 } from "uuid";
import { statusOption, typeOption } from "../helpers/constants";
import { toast } from "react-toastify";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addJob } from "../redux/jobSlice";

import "react-toastify/dist/ReactToastify.css";

const AddJob = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const handleSubmit = (e) => {
    e.preventDefault();

    //Form Dtasını oluşturma
    const form = new FormData(e.target);

    //formdaki değerlerden bir obje oluşturma
    const newJob = Object.fromEntries(form.entries());

    if (!newJob.type || !newJob.status) {
      toast.info("Tüm Alanları Doldurunuz");
      return;
    }

    //id ekleme
    newJob.id = v4();

    //tarih ekleme
    newJob.date = new Date().toLocaleDateString();

    axios
      .post("http://localhost:3050/jobs", newJob)
      .then(() => {
        //Yeni işi stora kaydetme
        dispatch(addJob(newJob));
        navigate("/");
        //Ekleme başarılı bildirimi
        toast.success("İş Başarıyla Eklendi");
      })
      .catch((error) => toast.error("Beklenmedik bir hata oluştu..."));
  };
  return (
    <div className="add-sec">
      <h2>Yeni İş Ekle</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="">Pozisyon</label>
          <input type="text" required name="position" />
        </div>
        <div>
          <label htmlFor="">Şirket</label>
          <input type="text" required name="company" />
        </div>
        <div>
          <label htmlFor="">Lokasyon</label>
          <input type="text" required name="location" />
        </div>
        <div>
          <label htmlFor="">Durum</label>
          <select name="status">
            <option selected disabled>
              Seçiniz
            </option>
            {statusOption.map((status, i) => (
              <option key={i}>{status}</option>
            ))}
          </select>
        </div>
        <div>
          <label htmlFor="">Tür</label>
          <select name="type">
            <option selected disabled>
              Seçiniz
            </option>
            {typeOption.map((status, i) => (
              <option key={i}>{status}</option>
            ))}
          </select>
        </div>
        <div>
          <button>Ekle</button>
        </div>
      </form>
    </div>
  );
};

export default AddJob;
