"use client"
import Link from 'next/link'
import React from 'react'
import { create } from 'zustand';
import { createClient } from "@supabase/supabase-js";
import { useEffect } from 'react';
import { redirect, useSearchParams } from 'next/navigation';

// connect to supabase
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseKey) {
  throw new Error("Missing Supabase environment variables");
}

const supabase = createClient(supabaseUrl,supabaseKey);

const useProfileStore = create((set) => ({
    profile:{
        name:"",
        position: "",
        email: "",
        rate:0,
        address:"",
        phone:"",
        id:""

    },
    setProfile: (prof) => set({profile: prof}),
    setProfileAttr: (attr, val) => set((state) => ({
        profile: {
            ...state.profile,
            [attr]: val
        }
    }))
}));

const Edit = () => {

    // check if editing or creating
    const searchParams = useSearchParams();
    const empId = searchParams.get("id");
    

    const profile = useProfileStore((state) => state.profile);
    const setProfile = useProfileStore((state) => state.setProfile);
    const setProfileAttr = useProfileStore((state) => state.setProfileAttr);

    // load profile from supabase
    useEffect(() => {
        getEmployee();
    }, []);

    async function getEmployee(){
        if(empId){
            const {data:emp,error} = await supabase.from("employees").select().eq("id",empId);
            setProfile(emp[0]);
        }
        else{
            let newId = "";
            const chars = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
            for(let i = 0; i < 10; i++){
                const ind = parseInt(Math.random() * chars.length);
                newId += chars[ind];
            }
            setProfile({
                name:"",
                position: "",
                email: "",
                rate:0,
                address:"",
                phone:"",
                id:newId

            },)
        }
    }

    async function deleteProfile(e){
        e.preventDefault();
        const {data, error} = await supabase.from("employees").delete().eq("id", empId);
        redirect("/");
    }

    async function saveProfile(e){
        e.preventDefault();
        if(empId){
            const {data, error} = await supabase.from("employees").upsert(profile);
        }
        else{
            let newId = "";
            const chars = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
            for(let i = 0; i < 10; i++){
                const ind = parseInt(Math.random() * chars.length);
                newId += chars[ind];
            }
            setProfileAttr("id",newId);
            const {data, error} = await supabase.from("employees").upsert(profile);
        }
        redirect("/");
    }

    

    return (
    <>
        <br/><br/>
        <form className="edit-form bg-white w-4/5 max-w-[600px] mx-auto p-[20px] rounded-[12px]">
            <p>Personal Information</p>
            <label>Full name</label>
            <input placeholder="Ex: John Doe" value={profile.name} onChange={(e) => setProfileAttr("name",e.target.value)} required/>

            <label>Address</label>
            <input placeholder="Ex: 123 Random Ln, City, State, Country" value={profile.address} onChange={(e) => setProfileAttr("address",e.target.value)} required/>


            <p>Role</p>
            <label>Position</label>
            <input placeholder="Ex: Software Engineer" value={profile.position} onChange={(e) => setProfileAttr("position",e.target.value)} required/>

            <label>Pay rate ($/hr)</label>
            <input placeholder="Ex: 10" type="number" value={profile.rate} onChange={(e) => setProfileAttr("rate",e.target.value)} required/>

            <p>Contact</p>
            <label>Email</label>
            <input placeholder="Ex: johndoe@gmail.com" value={profile.email} onChange={(e) => setProfileAttr("email",e.target.value)} required/>

            <label>Phone</label>
            <input placeholder="Ex: (123) 456-7890" value={profile.phone} onChange={(e) => setProfileAttr("phone",e.target.value)} required/>
            

            <div className="flex justify-end">
                <Link href="/" className="employee-form-button text-white" style={{background:"var(--font-color)"}}>Close</Link>
                {empId != null ? (<button className="employee-form-button" style={{background:"var(--profile-red)"}} onClick={deleteProfile}>Delete</button>):(<></>)}
                <button type='submit' className="employee-form-button" style={{background:"var(--profile-green)"}} onClick={saveProfile}>Save</button>
            </div>
        </form>
    </>
  )
}

export default Edit