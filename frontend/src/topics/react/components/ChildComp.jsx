// import { memo, useRef } from "react";

// const MemoizedChild = memo(({ count, onIncrement }) => {
//     const renderCount = useRef(0);
//     renderCount.current++;

//     return (
//         <div className="p-4 bg-green-50 border-2 border-green-300 rounded-lg">
//             <div className="flex justify-between items-center mb-2">
//                 <h4 className="font-bold text-green-900">Memoized Child</h4>
//                 <span className="text-xs bg-green-600 text-white px-2 py-1 rounded">
//                     Renders: {renderCount.current}
//                 </span>
//             </div>
//             <p className="text-sm text-gray-700 mb-2">Count: {count}</p>
//             <button
//                 onClick={onIncrement}
//                 className="px-3 py-1 bg-green-600 text-white rounded text-sm hover:bg-green-700"
//             >
//                 Increment
//             </button>
//         </div>
//     );
// });

// MemoizedChild.displayName = 'MemoizedChild';