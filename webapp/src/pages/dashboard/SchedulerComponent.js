import {
  Inject,
  ScheduleComponent,
  Day,
  Week,
  WorkWeek,
  Month,
  Agenda,
} from "@syncfusion/ej2-react-schedule";
import React, { useRef, useEffect, useState } from "react";
import { useContextApp } from "../../context/contextApp";
import Datetime from "react-datetime";
import FullCalendar from "@fullcalendar/react"; // must go before plugins
import dayGridPlugin from "@fullcalendar/daygrid"; // a plugin!

//this component is to display the calendar with jobs with status as Interview Scheduled
const SchedulerComponent = () => {
  let event = [
    //  { title: '', position:"",date: '' },
    //  { title: 'rolwynq', position:"dev",date: '2022-04-06' }
  ];
  const [test, setTest] = useState([]);
  const {
    getAllJobs,
    jobs,
    position,
    company,
    jobLocation,
    jobType,
    jobTypeOptions,
    status,
    statusOptions,
    handleChange,
    clearValues,
    dateOfInterview,
    addEvent,
  } = useContextApp();

  let calRef = useRef();

  useEffect(() => {
    getAllJobs();
    console.log(jobs);
    console.log("ok");
    let jobArray = [];
    jobs.map(async (job, index) => {
      console.log(event);
      if (
        job.status === "Interview Scheduled" &&
        job.dateOfInterview !== null
      ) {
        console.log(job);
        console.log(index);
        let events = {
          title: job.company,
          position: job.position,
          date: job.dateOfInterview.toString().substring(0, 10),
        };
        jobArray.push(events);
        // setTest(events[0])
        // let events=[{ "title":job.company,
        //  "position":job.position,
        //  "date":job.dateOfInterview.toString().substring(0,10)}]
        console.log(test);
      }
      //calRef.current.getApi().changeView("dayGridMonth")
    });
    setTest(jobArray);
    // setTest({})
    // setTest(...test, event)
    //calRef.current.getApi().addEvent(test)
    calRef.current.getApi().changeView("dayGridMonth");
    console.log("ok");
  }, [company, position, dateOfInterview, status]);

  //  const onEventAdded = (event) => {
  //      let calendarApi = getApi()
  //      calendarApi.addEvent()
  //  }
  //onEventAdded(event);

  // const testfn = () => {
  //     let testevent=[
  //         { title: 'rolwyn', date: '2022-04-05' },
  //         { title: 'rolwynq', date: '2022-04-06' }
  //     ]

  //     setTest(testevent)
  //     calRef.current.getApi().changeView("dayGridMonth")
  // }

  return (
    <>
      {/* //<button onClick={testfn}>test</button> */}
      <div
        style={{
          width: "100%",
          position: "relative",
          top: 50,
          height: "auto",
          zIndex: -1,
        }}
      >
        <FullCalendar
          plugins={[dayGridPlugin]}
          initialView="dayGridMonth"
          events={test}
          ref={calRef}
        ></FullCalendar>
      </div>
    </>
  );
};

export default SchedulerComponent;
