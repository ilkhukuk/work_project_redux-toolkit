import { useEffect } from "react";
import Card from "../components/Card";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { setJobs, setError } from "../redux/jobSlice";
import Filter from "../components/Filter";

const JobList = () => {

  const state = useSelector((store) => store);

  const dispath = useDispatch();

  useEffect(() => {
    axios
      .get("http://localhost:3050/jobs")
      .then((res) => dispath(setJobs(res.data)))
      .catch((error) => dispath(setError(error)));
  }, []);


  return (
    <div className="list-page">
      <Filter />
      <h3 className="job-count">
        Bulunan ( {state.mainJobs.length} ) iş arasından ( {state.jobs.length} )
        tanesini görüntülüyorsunuz{" "}
      </h3>
      <section className="job-list">
        {/*Eğerki API den cevab bekleniyorsa*/}
        {!state.initialized && <p>Yükleniyor...</p>}
        {state.initialized && !state.isError ? (
          state.jobs.map((job) => {
            return <Card key={job.id} job={job} />;
          })
        ) : (
          <p>Üzgünüz bir hata oluştu</p>
        )}
      </section>
    </div>
  );
};

export default JobList;
