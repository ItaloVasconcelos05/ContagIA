"use client";

import { useState } from "react";
import { Button } from "@heroui/button";
import { Card, CardBody } from "@heroui/card";
import { Spacer } from "@heroui/spacer";

export default function DragDropAudioUpload() {
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
      className={`max-w-md mx-auto p-6 text-center transition-colors ${
        isDragging ? "bg-primary-50 border-primary-400" : ""
      }`}
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
      <CardBody className="flex flex-col items-center gap-4">
        {/* input escondido */}
        <input
          id="audio-upload"
          type="file"
          accept="audio/*"
          onChange={handleFileChange}
          style={{ display: "none" }}
        />

        {/* área de drag-and-drop */}
        <div
          className={`w-full p-6 border-2 border-dashed rounded-lg transition-colors cursor-pointer ${
            isDragging
              ? "border-primary bg-primary-50"
              : "border-default-300 hover:border-primary-300"
          }`}
          onClick={() => document.getElementById("audio-upload")?.click()}
        >
          <p className="text-sm text-default-500">
            {fileName
              ? "Arraste outro arquivo aqui ou clique para trocar"
              : "Arraste seu arquivo de áudio aqui ou clique para selecionar"}
          </p>
        </div>

        <Spacer y={1} />

        {/* informações e player */}
        {fileName && (
          <div className="w-full flex flex-col items-center gap-2">
            <p className="text-sm text-gray-500">
              Selecionado: <strong>{fileName}</strong>
            </p>

            {audioURL && (
              <audio controls className="w-full mt-2">
                <source src={audioURL} />
                Seu navegador não suporta o player de áudio.
              </audio>
            )}

            {/* botão de remover */}
            <Button
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