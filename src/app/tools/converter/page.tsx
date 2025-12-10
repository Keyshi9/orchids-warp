"use client";

import { useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Upload,
  FileText,
  Image,
  FileType,
  ArrowRight,
  Download,
  X,
  RefreshCw,
  ArrowLeft,
  Wrench,
} from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Progress } from "@/components/ui/progress";
import { ThemeToggle } from "@/components/theme-toggle";

type ConversionFormat = {
  id: string;
  name: string;
  extension: string;
  icon: React.ReactNode;
  color: string;
  accepts: string[];
};

const formats: ConversionFormat[] = [
  {
    id: "pdf",
    name: "PDF",
    extension: ".pdf",
    icon: <FileText className="w-5 h-5" />,
    color: "bg-red-500/20 text-red-400",
    accepts: ["docx", "doc", "png", "jpg", "jpeg", "txt", "html"],
  },
  {
    id: "docx",
    name: "Word",
    extension: ".docx",
    icon: <FileType className="w-5 h-5" />,
    color: "bg-blue-500/20 text-blue-400",
    accepts: ["pdf", "txt", "html", "rtf"],
  },
  {
    id: "png",
    name: "PNG",
    extension: ".png",
    icon: <Image className="w-5 h-5" />,
    color: "bg-green-500/20 text-green-400",
    accepts: ["jpg", "jpeg", "webp", "gif", "bmp", "svg", "pdf"],
  },
  {
    id: "jpg",
    name: "JPEG",
    extension: ".jpg",
    icon: <Image className="w-5 h-5" />,
    color: "bg-yellow-500/20 text-yellow-400",
    accepts: ["png", "webp", "gif", "bmp", "svg", "pdf"],
  },
  {
    id: "webp",
    name: "WebP",
    extension: ".webp",
    icon: <Image className="w-5 h-5" />,
    color: "bg-purple-500/20 text-purple-400",
    accepts: ["png", "jpg", "jpeg", "gif", "bmp"],
  },
  {
    id: "svg",
    name: "SVG",
    extension: ".svg",
    icon: <Image className="w-5 h-5" />,
    color: "bg-pink-500/20 text-pink-400",
    accepts: ["png", "jpg", "jpeg"],
  },
  {
    id: "txt",
    name: "TXT",
    extension: ".txt",
    icon: <FileText className="w-5 h-5" />,
    color: "bg-gray-500/20 text-gray-400",
    accepts: ["pdf", "docx", "doc", "html"],
  },
  {
    id: "html",
    name: "HTML",
    extension: ".html",
    icon: <FileType className="w-5 h-5" />,
    color: "bg-orange-500/20 text-orange-400",
    accepts: ["pdf", "docx", "txt", "md"],
  },
];

type UploadedFile = {
  id: string;
  file: File;
  name: string;
  size: string;
  type: string;
  targetFormat: string;
  status: "pending" | "converting" | "done" | "error";
  progress: number;
};

function formatFileSize(bytes: number): string {
  if (bytes === 0) return "0 Bytes";
  const k = 1024;
  const sizes = ["Bytes", "KB", "MB", "GB"];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i];
}

function getFileExtension(filename: string): string {
  return filename.split(".").pop()?.toLowerCase() || "";
}

export default function ConverterPage() {
  const [files, setFiles] = useState<UploadedFile[]>([]);
  const [isDragging, setIsDragging] = useState(false);
  const [globalTargetFormat, setGlobalTargetFormat] = useState<string>("pdf");

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  }, []);

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  }, []);

  const handleDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault();
      setIsDragging(false);
      const droppedFiles = Array.from(e.dataTransfer.files);
      addFiles(droppedFiles);
    },
    [globalTargetFormat]
  );

  const handleFileSelect = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      if (e.target.files) {
        const selectedFiles = Array.from(e.target.files);
        addFiles(selectedFiles);
      }
    },
    [globalTargetFormat]
  );

  const addFiles = (newFiles: File[]) => {
    const uploadedFiles: UploadedFile[] = newFiles.map((file) => ({
      id: Math.random().toString(36).substr(2, 9),
      file,
      name: file.name,
      size: formatFileSize(file.size),
      type: getFileExtension(file.name),
      targetFormat: globalTargetFormat,
      status: "pending",
      progress: 0,
    }));
    setFiles((prev) => [...prev, ...uploadedFiles]);
  };

  const removeFile = (id: string) => {
    setFiles((prev) => prev.filter((f) => f.id !== id));
  };

  const updateFileFormat = (id: string, format: string) => {
    setFiles((prev) =>
      prev.map((f) => (f.id === id ? { ...f, targetFormat: format } : f))
    );
  };

  const simulateConversion = async () => {
    for (const file of files) {
      if (file.status !== "pending") continue;

      setFiles((prev) =>
        prev.map((f) =>
          f.id === file.id ? { ...f, status: "converting", progress: 0 } : f
        )
      );

      for (let i = 0; i <= 100; i += 10) {
        await new Promise((resolve) => setTimeout(resolve, 150));
        setFiles((prev) =>
          prev.map((f) => (f.id === file.id ? { ...f, progress: i } : f))
        );
      }

      setFiles((prev) =>
        prev.map((f) =>
          f.id === file.id ? { ...f, status: "done", progress: 100 } : f
        )
      );
    }
  };

  const getFormatIcon = (formatId: string) => {
    const format = formats.find((f) => f.id === formatId);
    return format?.icon || <FileText className="w-5 h-5" />;
  };

  const getFormatColor = (formatId: string) => {
    const format = formats.find((f) => f.id === formatId);
    return format?.color || "bg-gray-500/20 text-gray-400";
  };

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b sticky top-0 z-50 bg-background">
        <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link
              href="/"
              className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              <span className="text-sm">Retour</span>
            </Link>
            <div className="h-4 w-px bg-border" />
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded bg-foreground flex items-center justify-center">
                <Wrench className="w-4 h-4 text-background" />
              </div>
              <span className="text-lg font-semibold">ToolBox</span>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <ThemeToggle />
            <Button variant="outline" size="sm">
              Connexion
            </Button>
          </div>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 py-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-8"
        >
          <div className="w-16 h-16 mx-auto mb-4 rounded-2xl bg-foreground flex items-center justify-center">
            <RefreshCw className="w-8 h-8 text-background" />
          </div>
          <h1 className="text-3xl font-bold mb-2">Convertisseur de Fichiers</h1>
          <p className="text-muted-foreground">
            Convertissez vos fichiers entre PDF, Word, PNG, JPEG et plus
          </p>
        </motion.div>

        <Card className="p-6 md:p-8">
          <div className="mb-6 flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
            <h2 className="text-xl font-semibold">Convertir mes fichiers</h2>
            <div className="flex items-center gap-3">
              <span className="text-sm text-muted-foreground">Convertir en:</span>
              <Select value={globalTargetFormat} onValueChange={setGlobalTargetFormat}>
                <SelectTrigger className="w-[140px]">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {formats.map((format) => (
                    <SelectItem key={format.id} value={format.id}>
                      <div className="flex items-center gap-2">
                        {format.icon}
                        <span>{format.name}</span>
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          <div
            className={`file-drop-zone rounded-2xl p-8 md:p-12 text-center cursor-pointer transition-all ${
              isDragging ? "active" : ""
            }`}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
            onClick={() => document.getElementById("file-input")?.click()}
          >
            <input
              id="file-input"
              type="file"
              multiple
              className="hidden"
              onChange={handleFileSelect}
              accept=".pdf,.doc,.docx,.png,.jpg,.jpeg,.webp,.gif,.bmp,.svg,.txt,.html,.rtf"
            />
            <motion.div
              animate={{ scale: isDragging ? 1.05 : 1 }}
              transition={{ duration: 0.2 }}
            >
              <div className="w-16 h-16 mx-auto mb-4 rounded-2xl bg-primary/10 flex items-center justify-center">
                <Upload className="w-8 h-8 text-primary" />
              </div>
              <h3 className="text-lg font-medium mb-2">
                Glissez-déposez vos fichiers ici
              </h3>
              <p className="text-muted-foreground text-sm mb-4">
                ou cliquez pour sélectionner
              </p>
              <div className="flex flex-wrap justify-center gap-2">
                {["PDF", "DOCX", "PNG", "JPG", "WebP", "SVG"].map((ext) => (
                  <span
                    key={ext}
                    className="px-2 py-1 rounded-md bg-secondary text-secondary-foreground text-xs"
                  >
                    {ext}
                  </span>
                ))}
                <span className="px-2 py-1 rounded-md bg-secondary text-secondary-foreground text-xs">
                  +plus
                </span>
              </div>
            </motion.div>
          </div>

          <AnimatePresence>
            {files.length > 0 && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                className="mt-6 space-y-3"
              >
                {files.map((file) => (
                  <motion.div
                    key={file.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 20 }}
                    className="flex items-center gap-4 p-4 rounded-xl bg-secondary/50"
                  >
                    <div
                      className={`w-10 h-10 rounded-lg flex items-center justify-center ${getFormatColor(
                        file.type
                      )}`}
                    >
                      {getFormatIcon(file.type)}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="font-medium truncate">{file.name}</p>
                      <p className="text-sm text-muted-foreground">
                        {file.size}
                      </p>
                      {file.status === "converting" && (
                        <Progress value={file.progress} className="mt-2 h-1" />
                      )}
                    </div>
                    <div className="flex items-center gap-2">
                      <ArrowRight className="w-4 h-4 text-muted-foreground" />
                      <Select
                        value={file.targetFormat}
                        onValueChange={(v) => updateFileFormat(file.id, v)}
                        disabled={file.status !== "pending"}
                      >
                        <SelectTrigger className="w-[100px]">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          {formats.map((format) => (
                            <SelectItem key={format.id} value={format.id}>
                              {format.name}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="flex items-center gap-2">
                      {file.status === "done" && (
                        <Button size="sm" variant="outline">
                          <Download className="w-4 h-4" />
                        </Button>
                      )}
                      {file.status === "converting" && (
                        <div className="w-8 h-8 flex items-center justify-center">
                          <RefreshCw className="w-4 h-4 animate-spin text-primary" />
                        </div>
                      )}
                      <Button
                        size="sm"
                        variant="ghost"
                        onClick={() => removeFile(file.id)}
                        disabled={file.status === "converting"}
                      >
                        <X className="w-4 h-4" />
                      </Button>
                    </div>
                  </motion.div>
                ))}
                <div className="flex justify-end pt-4">
                  <Button
                    onClick={simulateConversion}
                    disabled={!files.some((f) => f.status === "pending")}
                    className="gap-2"
                  >
                    <RefreshCw className="w-4 h-4" />
                    Convertir {files.filter((f) => f.status === "pending").length} fichier(s)
                  </Button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </Card>

        <div className="mt-8 grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-3">
          {formats.map((format, index) => (
            <motion.div
              key={format.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
            >
              <Card
                className={`p-4 text-center cursor-pointer hover:scale-105 transition-transform bg-card/50 backdrop-blur-sm ${getFormatColor(
                  format.id
                )}`}
              >
                <div className="w-10 h-10 mx-auto mb-2 rounded-lg bg-background/50 flex items-center justify-center">
                  {format.icon}
                </div>
                <p className="font-medium text-sm">{format.name}</p>
                <p className="text-xs text-muted-foreground">
                  {format.extension}
                </p>
              </Card>
            </motion.div>
          ))}
        </div>
      </main>
    </div>
  );
}