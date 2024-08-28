import React, { useRef, useState, useEffect } from 'react';
import { FaImage, FaWindowClose } from 'react-icons/fa';
import { IoMdAttach } from 'react-icons/io';
import { MdKeyboardVoice } from 'react-icons/md';
import { FaCircleStop } from "react-icons/fa6";
import { useDropzone } from 'react-dropzone';
import {getIconForFile} from '../../utils/getFileIcon';

interface FileAttachmentProps {
    selectedFiles: File[];
    setSelectedFiles: React.Dispatch<React.SetStateAction<File[]>>;
    definer: string;
}

const FileAttachment: React.FC<FileAttachmentProps> = ({ selectedFiles, setSelectedFiles, definer }) => {
    const [recording, setRecording] = useState<boolean>(false);
    const [audioURL, setAudioURL] = useState<string | null>(null);
    const [mediaRecorder, setMediaRecorder] = useState<MediaRecorder | null>(null);
    const [audioBlob, setAudioBlob] = useState<Blob | null>(null);
    const [isPlaying, setIsPlaying] = useState<boolean>(false);
    const [audioDuration, setAudioDuration] = useState<number>(0);
    const [recordingTime, setRecordingTime] = useState<number>(0);
    const timerRef = useRef<NodeJS.Timeout | null>(null);
    const audioRef = useRef<HTMLAudioElement | null>(null);

    const { getRootProps, getInputProps } = useDropzone({
        onDrop: acceptedFiles => {
            setSelectedFiles(prevFiles => [...prevFiles, ...acceptedFiles]);
        }
    });

    const handleFileInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.files) {
            const files = Array.from(event.target.files);
            setSelectedFiles(prevFiles => [...prevFiles, ...files]);
        }
    };

    const removeFile = (file: File) => {
        setSelectedFiles(prevFiles => prevFiles.filter(f => f !== file));
    };

    const startRecording = () => {
        navigator.mediaDevices.getUserMedia({ audio: true })
            .then(stream => {
                const recorder = new MediaRecorder(stream);
                setMediaRecorder(recorder);

                recorder.ondataavailable = (event) => {
                    const blob = new Blob([event.data], { type: 'audio/wav' });
                    setAudioBlob(blob);
                    setTimeout(() => {
                        setAudioURL(URL.createObjectURL(blob));
                    }, 100);
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
        if (audioBlob) {
            const file = new File([audioBlob], 'voice_note.wav', { type: 'audio/wav' });
            setSelectedFiles(prevFiles => [...prevFiles, file]);
            setAudioBlob(null);
            setAudioURL(null);
        }
    }, [audioBlob, setSelectedFiles]);

    useEffect(() => {
        if (audioURL && audioRef.current) {
            const audio = audioRef.current;
            const updateDuration = () => {
                setAudioDuration(audio.duration);
            };
            audio.addEventListener('loadedmetadata', updateDuration);
            return () => {
                audio.removeEventListener('loadedmetadata', updateDuration);
            };
        }
    }, [audioURL]);


    return (
        <div>
            <label className="block font-semibold mb-1">Attach Files</label>
            <div className="flex justify-start p-2 items-center">
                <div className="flex space-x-4">
                    <label className='rounded-full bg-[#18b60046] cursor-pointer'>
                        <input
                            type="file"
                            accept="image/*"
                            className="hidden"
                            onChange={handleFileInputChange}
                        />
                        <FaImage className="text-2xl text-[#19B600] p-1" />
                    </label>
                    <label className='rounded-full bg-white cursor-pointer'>
                        <input
                            type="file"
                            accept=".doc,.docx,.pdf,.xls,.xlsx,.ppt,.pptx,.txt,.zip"
                            className="hidden p-1"
                            onChange={handleFileInputChange}
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
                                <MdKeyboardVoice className={`text-2xl text-[#64BEF2]`} />
                            </button>
                        )}
                    </div>
                </div>
            </div>
            <div {...getRootProps()} className="border-2 min-h-52 border-dashed border-gray-400 p-4 rounded-md cursor-pointer">
            <input {...getInputProps()} />
            {selectedFiles.length > 0 && (
                <div className="mt-4">
                    {selectedFiles.map((file, index) => (
                        <div key={index} className="flex items-center space-x-2 mb-2">
                            {getIconForFile(file.type)}
                            <div className="flex-1 text-xs">{file.name}</div>
                            {file.type.startsWith('audio/') ? (
                                <div className="flex items-center space-x-1">
                                    <audio ref={audioRef} controls src={audioURL || ''} />
                                    <button onClick={() => removeFile(file)} className="text-red-500">
                                        <FaWindowClose />
                                    </button>
                                </div>
                            ) : (
                                <button onClick={() => removeFile(file)} className="text-red-500">
                                    <FaWindowClose />
                                </button>
                            )}
                        </div>
                    ))}
                </div>
            )}
              </div>
        </div>
    );
};

export default FileAttachment;
