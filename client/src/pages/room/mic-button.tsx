import { useCallStateHooks } from "@stream-io/video-react-sdk";

export const MicButton = () => {
    const { useMicrophoneState } = useCallStateHooks();
    const { microphone, isMute } = useMicrophoneState();

    return (
        <button
            onClick={async () => {
                if (isMute) {
                    await microphone?.enable();
                } else {
                    await microphone?.disable();
                }
            }}
            className={`px-4 py-2 rounded-lg shadow-md transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 ${
                isMute
                    ? "bg-yellow-600 hover:bg-yellow-700 text-white focus:ring-yellow-500"
                    : "bg-gray-600 hover:bg-gray-700 text-white focus:ring-gray-500"
            }`}
        >
            {isMute ? "Unmute" : "Mute"}
        </button>
    );
};
