import {useSharedState} from "@/components/Toolbar/SharedStateProvider.jsx";
import {useEffect} from "react";


const withSharedState = (WrappedComponent, initFunc) => {
    const F = (props) => {
        const { state, setState } = useSharedState();

        useEffect(() => {
            if (initFunc) {
                initFunc([state, setState]);
            }
        }, [state, setState]);

        return <WrappedComponent {...props} state={state} setState={setState} />;
    };
    //
    return F
};

export default withSharedState;