"use client";

import { useState } from "react";
import { Button } from "@heroui/button";
import { Card, CardBody } from "@heroui/card";
import { Spacer } from "@heroui/spacer";

export default function MediaUpload() {
  const [fileName, setFileName] = useState<string | null>(null);
  const [mediaURL, setMediaURL] = useState<string | null>(null);
  const [fileType, setFileType] = useState<string | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const handleFile = (file: File) => {
    if (file && (file.type.startsWith("audio/") || file.type.startsWith("video/"))) {
      setFileName(file.name);
      setMediaURL(URL.createObjectURL(file));
      setFileType(file.type);
    } else {
      alert("Por favor, envie um arquivo de áudio ou vídeo válido 🎵🎬");
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
    setMediaURL(null);
    setFileType(null);
    // limpa o input de arquivo
    const input = document.getElementById("media-upload") as HTMLInputElement;
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
          id="media-upload"
          type="file"
          accept="audio/*,video/*"
          onChange={handleFileChange}
          style={{ display: "none" }}
        />

        {/* Área de drag-and-drop */}
        <div
          className="w-full h-30 flex flex-col items-center justify-center cursor-pointer"
          onClick={() => document.getElementById("media-upload")?.click()}
        >
          <h2 className="text-gray-900 text-lg font-semibold mb-1">
            Arraste e solte o arquivo aqui
          </h2>
          <p className="text-gray-600 text-sm">
            ou clique aqui para selecionar um arquivo
          </p>
          
        </div>
        <Spacer y={1}/>
        <Button
          className="bg-[#6F1FC6] text-white font-semibold rounded-full px-8 py-3 w-3/4"
          onClick={() => document.getElementById("media-upload")?.click()}
        >
          Fazer upload
        </Button>
        <Spacer y={1} />

        {fileName && mediaURL && (
          <div className="w-full">
            <div className="mb-4">
              <p className="text-white text-sm mb-2">Arquivo selecionado: {fileName}</p>
              {fileType?.startsWith("audio/") ? (
                <audio 
                  controls 
                  className="w-full"
                  src={mediaURL}
                >
                  Seu navegador não suporta o elemento de áudio.
                </audio>
              ) : (
                <video 
                  controls 
                  className="w-full max-h-64"
                  src={mediaURL}
                >
                  Seu navegador não suporta o elemento de vídeo.
                </video>
              )}
            </div>
            <div className="flex justify-center">
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
          </div>
        )}
      </CardBody>
    </Card>
  );
}