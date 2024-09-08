"use client";

import React, { useState, useImperativeHandle, forwardRef, useRef, useEffect } from 'react';
import { useDropzone } from 'react-dropzone';
import { uploadFiles } from '../../services/tasks/UploadFiles/UploadFileApi';
import { AxiosProgressEvent } from 'axios';
import { FaImage, FaWindowClose } from 'react-icons/fa';
import { IoMdAttach } from 'react-icons/io';
import { MdKeyboardVoice } from 'react-icons/md';
import { FaCircleStop } from "react-icons/fa6";

interface FileUploadComponentProps {
    definer: string;
}

interface FileWithProgress {
    file: File;
    progress: number;
    uploaded: boolean;
}

interface FileUploadComponentHandle {
    uploadAllFiles: () => Promise<boolean>;
}

const PleaseFile = forwardRef<FileUploadComponentHandle, FileUploadComponentProps>(({ definer }, ref) => {
    const [files, setFiles] = useState<FileWithProgress[]>([]);
    const [recording, setRecording] = useState<boolean>(false);
    const [audioURL, setAudioURL] = useState<string | null>(null);
    const [mediaRecorder, setMediaRecorder] = useState<MediaRecorder | null>(null);
    const [audioBlob, setAudioBlob] = useState<Blob | null>(null);
    const [recordingTime, setRecordingTime] = useState<number>(0);
    const timerRef = useRef<NodeJS.Timeout | null>(null);
    const audioRef = useRef<HTMLAudioElement | null>(null);

    const onDrop = (acceptedFiles: File[]) => {
        const newFiles = acceptedFiles.map((file) => ({
            file,
            progress: 0,
            uploaded: false,
        }));
        setFiles((prevFiles) => [...prevFiles, ...newFiles]);
    };

    const startRecording = () => {
        navigator.mediaDevices.getUserMedia({ audio: true })
            .then(stream => {
                const recorder = new MediaRecorder(stream);
                setMediaRecorder(recorder);

                recorder.ondataavailable = (event) => {
                    const blob = new Blob([event.data], { type: 'audio/wav' });
                    setAudioBlob(blob);
                    setAudioURL(URL.createObjectURL(blob));
                };

                recorder.start();
                setRecording(true);

                timerRef.current = setInterval(() => {
                    setRecordingTime(prevTime => prevTime + 1);
                }, 1000);
            })
            .catch(err => {
                console.error('Error accessing media devices:', err);
            });
    };

    const stopRecording = () => {
        if (mediaRecorder) {
            mediaRecorder.stop();
            setRecording(false);
            mediaRecorder.stream.getTracks().forEach(track => track.stop());
        }
        if (timerRef.current) {
            clearInterval(timerRef.current);
            timerRef.current = null;
        }
        setRecordingTime(0);
    };

    useEffect(() => {
        if (audioBlob && audioURL) {
            const file = new File([audioBlob], 'voice_note.wav', { type: 'audio/wav' });
            const newFileWithProgress = {
                file,
                progress: 0,
                uploaded: false,
            };
            setFiles((prevFiles) => [...prevFiles, newFileWithProgress]);
            setAudioBlob(null); // Clear the audio blob after processing
        }
    }, [audioBlob, audioURL]);

    useImperativeHandle(ref, () => ({
        uploadAllFiles: handleUploadAll
    }));

    const handleUploadAll = async () => {
        try {
            // Create an array of promises, each representing the upload of a single file
            const uploadPromises = files.map((fileWithProgress) => {
                return uploadFiles(fileWithProgress.file, definer, (progressEvent: AxiosProgressEvent) => {
                    if (progressEvent.total) {
                        const progress = Math.round((progressEvent.loaded * 100) / progressEvent.total);
                        setFiles((prevFiles) =>
                            prevFiles.map((fwp) =>
                                fwp.file.name === fileWithProgress.file.name ? { ...fwp, progress } : fwp
                            )
                        );
                    }
                });
            });
    
            // Wait for all the upload promises to resolve
            await Promise.all(uploadPromises);
    
            // Mark all files as uploaded once the uploads are complete
            setFiles((prevFiles) =>
                prevFiles.map((fwp) => ({
                    ...fwp,
                    uploaded: true,
                }))
            );
    
            return true;
        } catch (error: any) {
            alert(error.message);
            return false;
        }
    };
    

    const handleRemoveFile = (fileName: string) => {
        setFiles((prevFiles) => prevFiles.filter((fwp) => fwp.file.name !== fileName));
    };

    const { getRootProps, getInputProps } = useDropzone({
        onDrop,
        accept: { 'application/pdf': [], 'application/zip': [], 'image/*': [], 'audio/*': [] },
        multiple: true,
    });

    return (
        <div>
            <label className="block font-semibold mb-1">Attach Files</label>
            <div className="flex justify-start p-2 items-center">
    <div className="flex space-x-4">
        <label className="rounded-full bg-[#18b60046] cursor-pointer flex items-center justify-center w-8 h-8">
            <input
                type="file"
                accept="image/*"
                className="hidden"
                onChange={(e) => {
                    if (e.target.files) {
                        onDrop(Array.from(e.target.files));
                    }
                }}
            />
            <FaImage className="text-2xl text-[#19B600] p-1" />
        </label>
        <label className="rounded-full bg-white cursor-pointer flex items-center justify-center w-8 h-8">
            <input
                type="file"
                accept=".doc,.docx,.pdf,.xls,.xlsx,.ppt,.pptx,.txt,.zip"
                className="hidden p-1"
                onChange={(e) => {
                    if (e.target.files) {
                        onDrop(Array.from(e.target.files));
                    }
                }}
            />
            <IoMdAttach className="text-2xl text-black p-1" />
        </label>
        <div className="flex items-center space-x-2">
            {recording ? (
                <div className="flex items-center space-x-2">
                    <div className="flashing-circle" />
                    <div>{`${Math.floor(recordingTime / 60)}:${String(recordingTime % 60).padStart(2, '0')}`}</div>
                    <button onClick={stopRecording}><FaCircleStop className="text-green-600 text-xl" /></button>
                </div>
            ) : (
                <button
                    type="button"
                    onClick={() => recording ? stopRecording() : startRecording()}
                    className="p-1 bg-white rounded-full"
                >
                    <MdKeyboardVoice className="text-2xl text-[#64BEF2]" />
                </button>
            )}
        </div>
    </div>
</div>


            <div className="p-1 border rounded-lg border-gray-300 bg-gray-50">
                <div
                    {...getRootProps()}
                    className="flex items-center justify-center p-4 border-2 border-dashed rounded-lg cursor-pointer bg-white"
                >
                    <input {...getInputProps()} />
                    <button type="button" className="px-4 py-2 bg-gray-200 rounded-md">Browse...</button>
                    <span className="ml-2 text-gray-500">Or drop files here</span>
                </div>

                <div className="mt-4">
    {files.map((fileWithProgress) => (
        <div key={fileWithProgress.file.name} className="p-2 border-b">
            <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                    <div>
                        <p className="text-gray-800">{fileWithProgress.file.name}</p>
                        <p className="text-gray-500 text-sm">
                            {(fileWithProgress.file.size / (1024 * 1024)).toFixed(1)} MB
                        </p>
                    </div>
                    {fileWithProgress.file.type.startsWith('audio/') && (
                        <audio 
                            ref={audioRef} 
                            controls 
                            src={audioURL || ''} 
                            className="w-60" 
                        />
                    )}
                </div>
                <div className="flex items-center">
                    <button 
                        onClick={() => handleRemoveFile(fileWithProgress.file.name)} 
                        className="text-red-500"
                    >
                        <FaWindowClose />
                    </button>
                </div>
            </div>
            {fileWithProgress.progress > 0 && (
                <div className="mt-2">
                    <div className="h-2 bg-gray-200 rounded-full">
                        <div
                            className="h-2 bg-blue-500 rounded-full"
                            style={{ width: `${fileWithProgress.progress}%` }}
                        ></div>
                    </div>
                    <span className="text-sm text-gray-500">{fileWithProgress.progress}%</span>
                </div>
            )}
        </div>
    ))}
</div>


            </div>
        </div>
    );
});

PleaseFile.displayName = 'PleaseFile';
export default PleaseFile;
