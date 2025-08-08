"use client"
import EmployeeCard from "./components/EmployeeCard";
import { createClient } from "@supabase/supabase-js";
import Link from "next/link";
import { useEffect, useState} from "react";

// connect to supabase
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseKey) {
  throw new Error("Missing Supabase environment variables");
}


const supabase = createClient(supabaseUrl,supabaseKey);


export default function Home() {

  //

  const [employees, setEmployees] = useState([]);
  const [numEmployees, setNumEmployees] = useState(0);
  const [totalRate, setTotalRate] = useState(0);

  useEffect(() => {
    getEmployees();
  }, []);


  async function getEmployees(){
    const {data:emp,error} = await supabase.from("employees").select();

    // sort employees by name
    emp?.sort((a,b) => a.name.localeCompare(b.name, undefined, { sensitivity: 'base' }));

    setEmployees(emp);

    // populate stats
    if (emp) {
      
      let cnt = 0;
      let tot = 0;

      for (let i of emp) {
        cnt++;
        tot += i.rate;
      }
      setNumEmployees(cnt);
      setTotalRate(tot);
    }
  }
    

  
  
  return (
    <>

      <br/><br/><br/>
      <div className="flex justify-between w-4/5 max-w-[1000px] m-auto">
        <Link href="/edit" className="font-semibold rounded-[10px] p-[8px] pr-[16px] pl-[16px] cursor-pointer hover:opacity-75 duration-250 hover:translate-y-[-3px] text-white" style={{background:"var(--font-color)"}}>New Employee</Link>
        <p className="opacity-50">{numEmployees} employees • ${Math.round(totalRate/numEmployees)}/hr avg.</p>
      </div>
      <br/>
      
      <div className="employee-card-holder">
        {employees.map((employee) =>
          <EmployeeCard employee={employee} key={employee.id}/>
        )}
      </div>
    </>
  );
}
