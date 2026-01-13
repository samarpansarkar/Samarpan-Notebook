import { useState, useContext, createContext, memo } from 'react';

const ContextOptimizationDemo = () => {
    return (
        <div className="p-4 text-center">
            <h2 className="text-xl font-bold">Context Optimization Demo</h2>
            <p>If you can see this, the component is rendering.</p>
        </div>
    );
};

export default ContextOptimizationDemo;
