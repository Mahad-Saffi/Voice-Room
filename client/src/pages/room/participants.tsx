import { ParticipantsAudio, useCallStateHooks } from "@stream-io/video-react-sdk";
import { Participant } from "./participant";

export const Participants = () => {
    const { useParticipants } = useCallStateHooks();
    const participants = useParticipants();

    return (
        <div className="bg-gray-800 p-6 rounded-lg shadow-md">
            <h2 className="text-2xl font-semibold text-white mb-4">Participants</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {/* Audio streams */}
                <ParticipantsAudio participants={participants} />
                {/* Render each participant */}
                {participants.map((p) => (
                    <Participant participant={p} key={p.sessionId} />
                ))}
            </div>
        </div>
    );
};
