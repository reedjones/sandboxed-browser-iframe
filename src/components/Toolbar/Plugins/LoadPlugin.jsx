import React from 'react';
import { useSharedState } from '../SharedStateProvider.jsx';
import { FaFolderOpen } from 'react-icons/fa';

const LoadPlugin = () => {
    const { state, setState } = useSharedState();

    const handleClick = () => {
        console.log('Load action');
        // Example: Use shared state
        console.log(state.data);
    };

    return (
        <button onClick={handleClick}>
            <FaFolderOpen /> Load
        </button>
    );
};

export default LoadPlugin;
