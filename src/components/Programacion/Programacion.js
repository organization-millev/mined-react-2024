import React, { useState,useEffect } from 'react';
import {useProgramacion} from '../../hooks/useProgramacion';
import {useCurso} from '../../hooks/useCurso';
import Navbar from '../Navbar/Navbar';
import CursoBanner from '../common/CursoBanner/CursoBanner';
import Explicacion from './Explicacion/Explicacion';
import ListaEnVivo from './ListaEnVivo/ListaEnVivo';
import Horario from './Horario/Horario';
import AvisoLegal from '../common/AvisoLegal/AvisoLegal';
import Footer from '../Footer/Footer';

const Programacion = () => {
    
    
    const {curso,loadCurso} = useCurso()
    
    const {programacion,listaEnVivo,LoadListaEnVivo,loadHorario} = useProgramacion()
    
    
    
    useEffect(()=>{
        loadCurso()
        loadHorario()
        LoadListaEnVivo()
    },[])
    
    return(<>
        <Navbar/>
        <div className="full-container font-sans">
            <CursoBanner obj={curso}/>
        </div>
        <div className="semi-full-container font-sans">
            <Explicacion obj={curso} />
        </div>
        <div className="full-container bg-[#ECECEC] mt-5 font-sans">
            <ListaEnVivo obj={listaEnVivo}/>
        </div>
        <div className="full-container lg:semi-full-container !pb-[40px] font-sans">
            <Horario obj={programacion} color={curso.color}/>
        </div>
        <AvisoLegal/>
        <Footer/>
    </>)
    
}

export default Programacion