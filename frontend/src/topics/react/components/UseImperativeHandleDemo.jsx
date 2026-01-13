/* eslint-disable */
import { useState, useRef, useImperativeHandle, forwardRef } from 'react';

const CustomInput = forwardRef((props, ref) => {
    const inputRef = useRef();

    useImperativeHandle(ref, () => ({
        alertValue: () => {
            alert(inputRef.current.value);
        },
        resetValue: () => {
            inputRef.current.value = '';
            inputRef.current.focus();
        },
        // We strictly limit what the parent can do. 
        // They CANNOT access inputRef.current.style, for example.
    }));

    return (
        <input
            ref={inputRef}
            className="border-2 border-indigo-200 dark:border-indigo-800 dark:bg-gray-900 dark:text-white rounded px-3 py-2 focus:ring-2 focus:ring-indigo-500 focus:outline-none w-full transition-colors"
            placeholder="Type something..."
        />
    );
});

const UseImperativeHandleDemo = () => {
    const childRef = useRef();

    return (
        <div className="space-y-6">
            <div className="p-4 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg transition-colors">
                <p className="mb-4 text-gray-600 dark:text-gray-300 text-sm">
                    The parent can only trigger specific actions exposed by the child via <code>useImperativeHandle</code>.
                </p>

                <div className="mb-4">
                    <CustomInput ref={childRef} />
                </div>

                <div className="flex gap-2">
                    <button
                        onClick={() => childRef.current.alertValue()}
                        className="px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700 dark:hover:bg-indigo-500 text-sm transition-colors"
                    >
                        Alert Value
                    </button>
                    <button
                        onClick={() => childRef.current.resetValue()}
                        className="px-4 py-2 bg-gray-600 dark:bg-gray-700 text-white rounded hover:bg-gray-700 dark:hover:bg-gray-600 text-sm transition-colors"
                    >
                        Reset & Focus
                    </button>
                </div>
            </div>
        </div>
    );
};

export default UseImperativeHandleDemo;
