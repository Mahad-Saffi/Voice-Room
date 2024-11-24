import { PermissionRequestEvent, useCall } from '@stream-io/video-react-sdk';
import { useState, useEffect, useCallback } from 'react';

export const PermissionRequestPanel = () => {
    const [requests, setRequests] = useState<PermissionRequestEvent[]>([]);
    const call = useCall();

    useEffect(() => {
        return call?.on("call.permission_request", (event) => {
            const request = event as PermissionRequestEvent;
            setRequests((reqs) => [...reqs, request]);
        });
    }, [call]);

    const handlePermissionRequest = useCallback(
        async (request: PermissionRequestEvent, accept: boolean) => {
            const { user, permissions } = request;
            try {
                if (accept) {
                    await call?.grantPermissions(user.id, permissions);
                } else {
                    await call?.revokePermissions(user.id, permissions);
                }
                setRequests((reqs) => reqs.filter((req) => req !== request));
            } catch (e) {
                alert("Failed to handle permission request");
            }
        },
        [call]
    );

    if (!requests.length) return null;

    return (
        <div className="bg-gray-800 p-4 rounded-lg shadow-md space-y-4">
            <h4 className="text-xl font-semibold text-white">Permission Requests</h4>
            {requests.map((request) => (
                <div
                    key={request.user.id}
                    className="flex items-center justify-between bg-gray-700 p-3 rounded-md"
                >
                    <span className="text-sm text-white">
                        <strong>{request.user.name}</strong> requested to{" "}
                        <strong>{request.permissions.join(", ")}</strong>
                    </span>
                    <div className="space-x-2">
                        <button
                            className="px-3 py-1 text-sm font-medium text-white bg-green-600 rounded hover:bg-green-700"
                            onClick={() => handlePermissionRequest(request, true)}
                        >
                            Approve
                        </button>
                        <button
                            className="px-3 py-1 text-sm font-medium text-white bg-red-600 rounded hover:bg-red-700"
                            onClick={() => handlePermissionRequest(request, false)}
                        >
                            Deny
                        </button>
                    </div>
                </div>
            ))}
        </div>
    );
};
