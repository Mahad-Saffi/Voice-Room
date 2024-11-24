import { useCall, useCallStateHooks } from "@stream-io/video-react-sdk";

export const LiveButton = () => {
    const { useIsCallLive } = useCallStateHooks();
    const call = useCall();
    const isLive = useIsCallLive();

    return (
        <button
            onClick={async () => {
                if (isLive) {
                    await call?.stopLive();
                } else {
                    await call?.goLive();
                }
            }}
            className={`px-4 py-2 rounded-lg shadow-md transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 ${
                isLive
                    ? "bg-red-600 hover:bg-red-700 text-white focus:ring-red-500"
                    : "bg-green-600 hover:bg-green-700 text-white focus:ring-green-500"
            }`}
        >
            {isLive ? "Stop Live" : "Go Live"}
        </button>
    );
};
