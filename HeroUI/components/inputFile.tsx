"use client";

import { useState } from "react";
import { Button } from "@heroui/button";
import { Card, CardBody } from "@heroui/card";
import { Spacer } from "@heroui/spacer";

export default function AudioUpload() {
  const [fileName, setFileName] = useState<string | null>(null);
  const [audioURL, setAudioURL] = useState<string | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const handleFile = (file: File) => {
    if (file && file.type.startsWith("audio/")) {
      setFileName(file.name);
      setAudioURL(URL.createObjectURL(file));
    } else {
      alert("Por favor, envie um arquivo de áudio válido 🎵");
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) handleFile(file);
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);

    const file = e.dataTransfer.files?.[0];
    if (file) handleFile(file);
  };

  const handleRemove = () => {
    setFileName(null);
    setAudioURL(null);
    // limpa o input de arquivo
    const input = document.getElementById("audio-upload") as HTMLInputElement;
    if (input) input.value = "";
  };

  return (
    <Card
      className="max-w-md mx-auto p-8 rounded-2xl bg-white text-center border-2 border-solid border-[#4B4B53] mt-20 mb-20"
      onDragOver={(e) => {
        e.preventDefault();
        e.stopPropagation();
        setIsDragging(true);
      }}
      onDragLeave={(e) => {
        e.preventDefault();
        e.stopPropagation();
        setIsDragging(false);
      }}
      onDrop={handleDrop}
    >
      <CardBody className="flex flex-col items-center justify-center gap-4">
        {/* Input de arquivo escondido */}
        <input
          id="audio-upload"
          type="file"
          accept="audio/*"
          onChange={handleFileChange}
          style={{ display: "none" }}
        />

        {/* Área de drag-and-drop */}
        <div
          className="w-full h-30 flex flex-col items-center justify-center cursor-pointer"
          onClick={() => document.getElementById("audio-upload")?.click()}
        >
          <h2 className="text-gray-900 text-lg font-semibold mb-1">
            Arraste e solte o arquivo aqui
          </h2>
          <p className="text-gray-600 text-sm">
            ou clique aqui para selecionar um arquivo de vídeo
          </p>
          
        </div>
        <Spacer y={1}/>
        <Button
          className="bg-[#6F1FC6] text-white font-semibold rounded-full px-8 py-3 w-3/4"
          onClick={() => document.getElementById("video-upload")?.click()}
        >
          Fazer upload
        </Button>
        <Spacer y={1} />

        {fileName && audioURL && (
          <div className="w-full">
            <div className="mb-4">
              <p className="text-white text-sm mb-2">Arquivo selecionado: {fileName}</p>
              <audio 
                controls 
                className="w-full"
                src={audioURL}
              >
                Seu navegador não suporta o elemento de áudio.
              </audio>
            </div>
            <Button
              className="justify-center"
              color="danger"
              variant="flat"
              size="sm"
              onClick={handleRemove}
            >
              Remover arquivo
            </Button>
          </div>
        )}
      </CardBody>
    </Card>
  );
}