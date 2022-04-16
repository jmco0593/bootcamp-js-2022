import React from 'react';
import { CardContainer } from "./components/CardContainer";
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import './App.css';
import { useSelector } from "react-redux";


function App()
{
    const state = useSelector((state) => state);
    console.log(state);
    return(
        <CardContainer/>
    );
}

export {App};