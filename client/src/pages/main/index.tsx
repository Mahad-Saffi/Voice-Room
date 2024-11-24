import { Call, StreamVideo } from "@stream-io/video-react-sdk";
import { useUser } from "../../user-context";
import { Navigate, useNavigate } from "react-router-dom";
import React, { useState, useEffect } from "react";
import CryptoJS from "crypto-js";

interface newRoom {
    name: string;
    description: string;
}

interface Room {
    id: string;
    title: string;
    description: string;
    participantLength: number;
    createdBy: string;
}

type CustomCallData = {
    description?: string;
    title?: string;
};

export const MainPage = () => {
    const { client, user, setCall, isLoadingClient } = useUser();
    const [NewRoom, setNewRoom] = useState<newRoom>({name: "", description: ""});
    const [availableRooms, setAvailableRooms] = useState<Room[]>([]);
    
    useEffect(() => {
        if (client) fetchListOfCalls();
    }, [client]);

    const navigate = useNavigate();
    const hashRoomName = (roomName: string): string => {
        const hash = CryptoJS.SHA256(roomName).toString(CryptoJS.enc.Base64);
        return hash.replace(/[^a-zA-Z0-9]/g, "");
    };

    const createRoom = async () => {
        const {name, description} = NewRoom;

        if (!client || !user || !name || !description) return;

        const call = client.call("audio_room", hashRoomName(name))
        await call.join({
            create: true,
            data: {
                members: [{user_id: user.username}],
                custom: {
                    title: name,
                    description,
                }
        }
        });

        setCall(call);
        navigate("/room");
    };

    const fetchListOfCalls = async () => {
        const callsQueryResponse = await client?.queryCalls({
            filter_conditions: {
                ongoing: true },
                limit: 4,
                watch: true,
            });
        
        if (!callsQueryResponse) {
            alert("Failed to fetch calls");
        } else {
            const getCallInfo = async (call: Call): Promise<Room> => {
                const callInfo = await call.get();
                const customData = callInfo.call.custom;
                const id = callInfo.call.id ?? "";
                const { title, description } = (customData || {}) as CustomCallData;
                const participants = await callInfo.members.length ?? 0;
                const createdBy = callInfo.call.created_by.name ?? "";
                
                return {
                    id,
                    title: title ?? "",
                    description: description ?? "",
                    participantLength: participants,
                    createdBy,
                }
            };
            const roomPromises = callsQueryResponse.calls.map((call) => getCallInfo(call));

            const rooms = await Promise.all(roomPromises);

            setAvailableRooms(rooms);
        };
    };

    const joinCall = async (callID: string) => {
        const call = client?.call("audio_room", callID);
        try {
            await call?.join();
            setCall(call!);
            navigate("/room");
        } catch (error) {
            alert("Failed to join call. Please try again when room is live.");
        };
    
    };

    if (isLoadingClient) return <div>Loading...</div>;

    if ((!isLoadingClient && !user) || (!isLoadingClient && !client)) return <Navigate to="/sign-in" />;

    return (
        <StreamVideo client={client!}>
            <div className="min-h-screen bg-gray-900 text-white flex flex-col items-center p-8">
                <h1 className="text-4xl font-bold mb-8">Welcome, {user?.name}</h1>

                <div className="bg-gray-800 p-6 rounded-lg shadow-lg w-full max-w-md">
                    <h2 className="text-2xl font-semibold mb-4">Create Room</h2>
                    <input
                        type="text"
                        placeholder="Room Name..."
                        onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
                            setNewRoom((prev) => ({ ...prev, name: event.target.value }))
                        }
                        className="w-full bg-gray-700 p-2 rounded-md mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    <input
                        type="text"
                        placeholder="Room Description..."
                        onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
                            setNewRoom((prev) => ({ ...prev, description: event.target.value }))
                        }
                        className="w-full bg-gray-700 p-2 rounded-md mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    <button
                        onClick={createRoom}
                        className="w-full bg-blue-600 py-2 rounded-md font-semibold hover:bg-blue-700 transition"
                    >
                        Create
                    </button>
                </div>

                <div className="mt-12 w-full max-w-3xl">
                    {availableRooms.length !== 0 ? (
                        <>
                            <h2 className="text-3xl font-semibold mb-6">Available Rooms</h2>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                {availableRooms.map((room) => (
                                    <div
                                        key={room.id}
                                        className="bg-gray-800 p-4 rounded-lg shadow-lg hover:bg-gray-700 transition cursor-pointer"
                                        onClick={() => joinCall(room.id)}
                                    >
                                        <h3 className="text-xl font-bold mb-2">{room.title}</h3>
                                        <p className="text-sm text-gray-300 mb-2">{room.description}</p>
                                        <p className="text-sm mb-1">
                                            <strong>{room.participantLength}</strong> participants
                                        </p>
                                        <p className="text-sm text-gray-400">Created by: {room.createdBy}</p>
                                    </div>
                                ))}
                            </div>
                        </>
                    ) : (
                        <h2 className="text-2xl text-center text-gray-400">No rooms available</h2>
                    )}
                </div>
            </div>
        </StreamVideo>
    );
}