import React, { useState, useEffect } from 'react';

const COLORS = [
    { name: 'Slate', value: 'slate' },
    { name: 'Gray', value: 'gray' },
    { name: 'Zinc', value: 'zinc' },
    { name: 'Neutral', value: 'neutral' },
    { name: 'Stone', value: 'stone' },
    { name: 'Red', value: 'red' },
    { name: 'Orange', value: 'orange' },
    { name: 'Amber', value: 'amber' },
    { name: 'Yellow', value: 'yellow' },
    { name: 'Lime', value: 'lime' },
    { name: 'Green', value: 'green' },
    { name: 'Emerald', value: 'emerald' },
    { name: 'Teal', value: 'teal' },
    { name: 'Cyan', value: 'cyan' },
    { name: 'Sky', value: 'sky' },
    { name: 'Blue', value: 'blue' },
    { name: 'Indigo', value: 'indigo' },
    { name: 'Violet', value: 'violet' },
    { name: 'Purple', value: 'purple' },
    { name: 'Fuchsia', value: 'fuchsia' },
    { name: 'Pink', value: 'pink' },
    { name: 'Rose', value: 'rose' },
];

const INTENSITIES = ['300', '400', '500', '600', '700', '800', '900'];
const DIRECTIONS = [
    { name: 'Right', value: 'to-r' },
    { name: 'Left', value: 'to-l' },
    { name: 'Top Right', value: 'to-tr' },
    { name: 'Bottom Right', value: 'to-br' },
    { name: 'Top', value: 'to-t' },
    { name: 'Bottom', value: 'to-b' },
];

const GradientPicker = ({ value, onChange }) => {
    const parseValue = (val) => {
        if (!val) return { from: 'blue', fromIn: '500', to: 'cyan', toIn: '500', dir: 'to-r' };

        const parts = val.split(' ');
        let from = 'blue', fromIn = '500', to = 'cyan', toIn = '500', dir = 'to-r';

        parts.forEach(p => {
            if (p.startsWith('from-')) {
                const segs = p.replace('from-', '').split('-');
                from = segs[0];
                fromIn = segs[1] || '500';
            } else if (p.startsWith('to-')) {
                if (['to-r', 'to-l', 'to-t', 'to-b', 'to-tr', 'to-tl', 'to-br', 'to-bl'].includes(p)) {
                    dir = p;
                } else {
                    const segs = p.replace('to-', '').split('-');
                    to = segs[0];
                    toIn = segs[1] || '500';
                }
            }
        });
        return { from, fromIn, to, toIn, dir };
    };

    const [state, setState] = useState(parseValue(value));

    // Sync internal state with external value prop
    useEffect(() => {
        const constructed = `from-${state.from}-${state.fromIn} to-${state.to}-${state.toIn}`;
        if (value && value !== constructed) {
            setState(parseValue(value));
        }
    }, [value]); // Relying on value change to trigger update

    useEffect(() => {
        const newValue = `from-${state.from}-${state.fromIn} to-${state.to}-${state.toIn}`;
        if (newValue !== value) {
            onChange(newValue);
        }
    }, [state]);

    const update = (key, val) => {
        setState(prev => ({ ...prev, [key]: val }));
    };

    return (
        <div className="bg-gray-750 p-4 rounded-lg border border-gray-600 space-y-4">
            <div className="flex gap-4">
                <div className="flex-1 space-y-2">
                    <label className="text-xs text-gray-400 font-semibold uppercase">Start Color</label>
                    <div className="flex gap-2">
                        <select
                            value={state.from}
                            onChange={(e) => update('from', e.target.value)}
                            className="w-full bg-gray-700 border border-gray-600 rounded px-2 py-1 text-sm text-white focus:outline-none focus:border-indigo-500"
                        >
                            {COLORS.map(c => <option key={c.value} value={c.value}>{c.name}</option>)}
                        </select>
                        <select
                            value={state.fromIn}
                            onChange={(e) => update('fromIn', e.target.value)}
                            className="w-20 bg-gray-700 border border-gray-600 rounded px-2 py-1 text-sm text-white focus:outline-none focus:border-indigo-500"
                        >
                            {INTENSITIES.map(i => <option key={i} value={i}>{i}</option>)}
                        </select>
                    </div>
                </div>

                <div className="flex-1 space-y-2">
                    <label className="text-xs text-gray-400 font-semibold uppercase">End Color</label>
                    <div className="flex gap-2">
                        <select
                            value={state.to}
                            onChange={(e) => update('to', e.target.value)}
                            className="w-full bg-gray-700 border border-gray-600 rounded px-2 py-1 text-sm text-white focus:outline-none focus:border-indigo-500"
                        >
                            {COLORS.map(c => <option key={c.value} value={c.value}>{c.name}</option>)}
                        </select>
                        <select
                            value={state.toIn}
                            onChange={(e) => update('toIn', e.target.value)}
                            className="w-20 bg-gray-700 border border-gray-600 rounded px-2 py-1 text-sm text-white focus:outline-none focus:border-indigo-500"
                        >
                            {INTENSITIES.map(i => <option key={i} value={i}>{i}</option>)}
                        </select>
                    </div>
                </div>
            </div>

            <div className="space-y-2">
                <label className="text-xs text-gray-400 font-semibold uppercase">Preview</label>
                <div className={`h-12 rounded-lg bg-linear-to-r from-${state.from}-${state.fromIn} to-${state.to}-${state.toIn} flex items-center justify-center shadow-inner`}>
                    <span className="text-white font-bold text-sm text-shadow">Icon Gradient</span>
                </div>
                <div className="text-center">
                    <span className="text-xs text-gray-500 font-mono">from-{state.from}-{state.fromIn} to-{state.to}-{state.toIn}</span>
                </div>
            </div>
        </div>
    );
};

export default GradientPicker;
