import { OwnCapability, useCallStateHooks, useRequestPermission } from "@stream-io/video-react-sdk";
import { Controls } from "./controls";
import { useUser } from "../../user-context";
import { PermissionRequestPanel } from "./permission-request";
import { Participants } from "./participants";

export const Room = () => {
    const { useCallCustomData, useParticipants, useCallCreatedBy } = useCallStateHooks();
    const { user } = useUser();

    const custom = useCallCustomData();
    const participants = useParticipants();
    const createdBy = useCallCreatedBy();

    const { hasPermission, requestPermission } = useRequestPermission(OwnCapability.SEND_AUDIO);

    return (
        <div className="min-h-screen bg-gray-900 text-white flex flex-col items-center py-8 px-4">
            <div className="bg-gray-800 w-full max-w-3xl rounded-lg p-6 shadow-lg">
                <h2 className="text-3xl font-bold mb-4">{custom?.title ?? "TITLE"}</h2>
                <h3 className="text-lg text-gray-300 mb-4">{custom?.description ?? "DESCRIPTION"}</h3>
                <p className="text-sm text-gray-400 mb-4">{participants.length} participant(s)</p>
                <div className="mb-6">
                    <Participants />
                </div>
                {user?.username === createdBy?.id && (
                    <div className="mb-4">
                        <PermissionRequestPanel />
                    </div>
                )}
                {hasPermission ? (
                    <Controls />
                ) : (
                    <button
                        onClick={requestPermission}
                        className="px-4 py-2 bg-blue-600 rounded-md text-white font-semibold hover:bg-blue-700 transition"
                    >
                        &#9995; Request Permission
                    </button>
                )}
            </div>
        </div>
    );
};
