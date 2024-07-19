import React from 'react';
import { useSharedState } from '../SharedStateProvider';
import { FaSave } from 'react-icons/fa';

const SavePlugin = () => {
    const { state, setState } = useSharedState();

    const handleClick = () => {
        console.log('Save action');
        // Example: Update shared state
        setState({ ...state, data: 'Saved data' });
    };

    return (
        <button onClick={handleClick}>
            <FaSave /> Save
        </button>
    );
};

export default SavePlugin;
