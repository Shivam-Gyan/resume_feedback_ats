import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { usePuterStore } from "~/lib/puter";

const WipeApp = () => {
    const { auth, isLoading, error, clearError, fs, ai, kv } = usePuterStore();
    const navigate = useNavigate();
    const [files, setFiles] = useState<FSItem[]>([]);

    const loadFiles = async () => {
        const files = (await fs.readDir("./")) as FSItem[];
        setFiles(files);
    };

    useEffect(() => {
        loadFiles();
    }, []);

    useEffect(() => {
        if (!isLoading && !auth.isAuthenticated) {
            navigate("/auth?next=/wipe");
        }
    }, [isLoading]);

    const handleDelete = async () => {
        files.forEach(async (file) => {
            await fs.delete(file.path);
        });
        await kv.flush();
        loadFiles();
    };

    if (isLoading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error {error}</div>;
    }

    return (
        <div className="max-w-lg mx-auto mt-12 p-8 bg-white rounded-xl shadow-lg border border-gray-200">
            <div className="mb-6 flex items-center gap-3">
            <span className="font-semibold text-gray-700">Authenticated as:</span>
            <span className="text-blue-700 font-mono">{auth.user?.username}</span>
            </div>
            <div className="mb-2 text-lg font-medium text-gray-800">Existing files:</div>
            <div className="flex flex-col gap-2 mb-6">
            {files.length === 0 ? (
                <div className="text-gray-400 italic">No files found.</div>
            ) : (
                files.map((file) => (
                <div
                    key={file.id}
                    className="flex items-center gap-3 px-4 py-2 bg-gray-50 rounded border border-gray-100"
                >
                    <span className="text-gray-700">{file.name}</span>
                </div>
                ))
            )}
            </div>
            <div className="flex justify-end">
            <button
                className="bg-red-600 hover:bg-red-700 transition-colors text-white px-6 py-2 rounded-md font-semibold shadow focus:outline-none focus:ring-2 focus:ring-red-400"
                onClick={handleDelete}
            >
                Wipe App Data
            </button>
            </div>
        </div>
    );
};

export default WipeApp;