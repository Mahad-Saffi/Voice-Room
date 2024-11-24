import { Avatar, StreamVideoParticipant } from "@stream-io/video-react-sdk";

interface Props {
    participant: StreamVideoParticipant;
}

export const Participant = (props: Props) => {
    return (
        <div className="flex flex-col items-center text-center space-y-2">
            <Avatar
                imageSrc={props.participant.image}
                className={`w-20 h-20 border-4 rounded-full shadow-lg transition ${
                    props.participant.isSpeaking ? "border-green-500 animate-pulse" : "border-gray-500"
                }`}
            />
            <p className="text-sm font-medium text-gray-200">{props.participant.name}</p>
        </div>
    );
};
