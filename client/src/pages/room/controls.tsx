import { LiveButton } from "./live-button";
import { MicButton } from "./mic-button";

export const Controls = () => {
    return (
        <div className="flex items-center justify-center space-x-4 mt-4">
            <MicButton />
            <LiveButton />
        </div>
    );
};
