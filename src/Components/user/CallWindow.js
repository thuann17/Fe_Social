import React, { useState, useEffect, useRef } from "react";
import { MdCallEnd } from "react-icons/md";

const CallWindow = ({ isVideoCall, toggleCallWindow }) => {
  const [isMuted, setIsMuted] = useState(false);
  const [isCameraOff, setIsCameraOff] = useState(false);
  const [stream, setStream] = useState(null);
  const [isInCall, setIsInCall] = useState(true); // Track call state

  const localVideoRef = useRef(null);
  const remoteVideoRef = useRef(null);

  useEffect(() => {
    if (isInCall) {
      initializeWebRTC();
    } else {
      cleanupWebRTC();
    }

    return () => cleanupWebRTC();
  }, [isInCall]);

  const initializeWebRTC = async () => {
    try {
      const localStream = await navigator.mediaDevices.getUserMedia({
        video: isVideoCall,
        audio: true,
      });

      setStream(localStream);
      localVideoRef.current.srcObject = localStream;

      // Simulate WebRTC peer connection
      // TODO: Add real WebRTC signaling logic

    } catch (error) {
      console.error("Error accessing media devices:", error);
    }
  };

  const cleanupWebRTC = () => {
    if (stream) {
      const tracks = stream.getTracks();
      tracks.forEach((track) => track.stop());
    }
    setStream(null);
    setIsInCall(false);
  };

  const handleMuteUnmute = () => {
    if (stream) {
      const audioTrack = stream.getTracks().find((track) => track.kind === "audio");
      if (audioTrack) {
        audioTrack.enabled = !audioTrack.enabled;
        setIsMuted(!audioTrack.enabled);
      }
    }
  };

  const handleCameraToggle = () => {
    if (stream) {
      const videoTrack = stream.getTracks().find((track) => track.kind === "video");
      if (videoTrack) {
        videoTrack.enabled = !videoTrack.enabled;
        setIsCameraOff(!videoTrack.enabled);
      }
    }
  };

  const handleEndCall = () => {
    cleanupWebRTC();
    toggleCallWindow();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-60 flex justify-center items-center z-50">
      <div className="bg-white p-6 rounded-lg w-96 shadow-lg">
        <div className="flex flex-col items-center">
          <div className="w-full h-56 bg-gray-200 rounded-lg mb-4">
            {/* Local video */}
            <video ref={localVideoRef} autoPlay muted className="w-full h-full object-cover rounded-lg" />
          </div>
          <div className="w-full h-56 bg-gray-300 rounded-lg mb-4">
            {/* Remote video */}
            <video ref={remoteVideoRef} autoPlay className="w-full h-full object-cover rounded-lg" />
          </div>

          <div className="flex justify-between items-center space-x-4 w-full">
            <button
              onClick={handleMuteUnmute}
              className={`w-12 h-12 rounded-full ${isMuted ? 'bg-gray-300' : 'bg-green-500'} text-white`}
            >
              {isMuted ? "Unmute" : "Mute"}
            </button>
            <button
              onClick={handleCameraToggle}
              className={`w-12 h-12 rounded-full ${isCameraOff ? 'bg-gray-300' : 'bg-red-500'} text-white`}
            >
              {isCameraOff ? "Turn Camera On" : "Turn Camera Off"}
            </button>
            <button
              onClick={handleEndCall}
              className="w-12 h-12 rounded-full bg-red-600 text-white flex justify-center items-center"
            >
              <MdCallEnd size={24} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CallWindow;