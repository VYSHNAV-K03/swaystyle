import React from 'react'
import HomeCustomize from './Home';
import CustomizerCloth from '../components/CustomizerCloth';
import CanvasModel from '../components/CanvasModel';

const Customizer = () => {
    return (
        <main className="app transition-all ease-in">
            <HomeCustomize />
            <CanvasModel />
            <CustomizerCloth />
            
        </main>
    )
}

export default Customizer