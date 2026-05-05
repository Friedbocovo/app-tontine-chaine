import { useState, useRef, useCallback, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const documentTypes = [
  { id: "CNI", label: "Carte Nationale d'Identité", icon: "🪪" },
  { id: "CIP", label: "Carte d'Identité Professionnelle", icon: "💼" },
  { id: "CNI_BIOMETRIQUE", label: "CNI Biométrique", icon: "🔐" },
  { id: "PASSEPORT", label: "Passeport", icon: "📘" },
];

export default function KYC() {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [selectedDoc, setSelectedDoc] = useState(null);
  const [documentFile, setDocumentFile] = useState(null);
  const [selfieCapture, setSelfieCapture] = useState(null);
  const [cameraActive, setCameraActive] = useState(false);
  const [cameraError, setCameraError] = useState("");
  const [countdown, setCountdown] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [faceDetected, setFaceDetected] = useState(false);

  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const countdownRef = useRef(null);
  const streamRef = useRef(null);

  // ✅ Attacher le stream après que React rende <video>
  useEffect(() => {
    if (cameraActive && videoRef.current && streamRef.current) {
      videoRef.current.srcObject = streamRef.current;
      videoRef.current.play().catch((e) => console.error("play error:", e));
    }
  }, [cameraActive]);

  // Nettoyage quand on quitte
  useEffect(() => {
    return () => {
      if (streamRef.current) {
        streamRef.current.getTracks().forEach((t) => t.stop());
      }
    };
  }, []);

  const startCamera = async () => {
    setCameraError("");
    setFaceDetected(false);
    try {
      const mediaStream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: "user", width: { ideal: 640 }, height: { ideal: 480 } },
        audio: false,
      });
      streamRef.current = mediaStream;
      setCameraActive(true);
      setTimeout(() => setFaceDetected(true), 2000);
    } catch (err) {
      if (err.name === "NotAllowedError" || err.name === "PermissionDeniedError") {
        setCameraError("Accès refusé. Autorisez la caméra dans les paramètres du navigateur.");
      } else if (err.name === "NotFoundError") {
        setCameraError("Aucune caméra trouvée sur cet appareil.");
      } else {
        setCameraError("Erreur caméra : " + err.message);
      }
    }
  };

  const stopCamera = useCallback(() => {
    if (streamRef.current) {
      streamRef.current.getTracks().forEach((t) => t.stop());
      streamRef.current = null;
    }
    if (videoRef.current) {
      videoRef.current.srcObject = null;
    }
    if (countdownRef.current) {
      clearInterval(countdownRef.current);
      countdownRef.current = null;
    }
    setCameraActive(false);
    setFaceDetected(false);
    setCountdown(null);
  }, []);

  const startCountdown = () => {
    if (!faceDetected || countdown !== null) return;
    let count = 3;
    setCountdown(count);
    countdownRef.current = setInterval(() => {
      count--;
      if (count <= 0) {
        clearInterval(countdownRef.current);
        countdownRef.current = null;
        setCountdown(null);
        capturePhoto();
      } else {
        setCountdown(count);
      }
    }, 1000);
  };

  const capturePhoto = () => {
    if (!videoRef.current || !canvasRef.current) return;
    const canvas = canvasRef.current;
    const video = videoRef.current;
    canvas.width = video.videoWidth || 640;
    canvas.height = video.videoHeight || 480;
    const ctx = canvas.getContext("2d");
    ctx.translate(canvas.width, 0);
    ctx.scale(-1, 1);
    ctx.drawImage(video, 0, 0);
    setSelfieCapture(canvas.toDataURL("image/jpeg", 0.9));
    stopCamera();
  };

  const handleSubmit = () => {
    setError("");
    if (step === 1) {
      if (!selectedDoc) { setError("Veuillez sélectionner un type de document"); return; }
      if (!documentFile) { setError("Veuillez uploader votre document"); return; }
      setStep(2);
      return;
    }
    if (step === 2) {
      if (!selfieCapture) { setError("Veuillez prendre votre selfie"); return; }
      setLoading(true);
      setTimeout(() => {
        setLoading(false);
        localStorage.setItem("kycStatus", "PENDING");
        setStep(3);
      }, 2500);
    }
  };

  // ================================
  // ÉTAPE 3 — SUCCÈS
  // ================================
  if (step === 3) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-start justify-center md:py-8">
        <div className="w-full max-w-md bg-white min-h-screen md:min-h-0 md:rounded-3xl md:shadow-2xl overflow-hidden flex items-center justify-center px-6 py-10">
          <div className="w-full text-center">
            <div className="w-24 h-24 rounded-full bg-green-50 flex items-center justify-center mx-auto mb-6">
              <span className="text-5xl">✅</span>
            </div>
            <h1 className="text-2xl font-bold text-gray-900 mb-3">Documents soumis !</h1>
            <p className="text-gray-400 text-sm leading-relaxed mb-8">
              Votre dossier KYC est en cours de vérification automatique.
              Vous recevrez une notification dès que votre compte sera activé.
            </p>
            <div className="flex flex-col gap-3 mb-10 text-left">
              {[
                { label: "Document soumis", done: true },
                { label: "Selfie capturé", done: true },
                { label: "Vérification automatique en cours", done: false, spin: true },
                { label: "Compte activé", done: false },
              ].map((item, i) => (
                <div key={i} className="flex items-center gap-3">
                  <div className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0 ${
                    item.done ? "bg-green-700 text-white" : "bg-gray-100 text-gray-400"
                  }`}>
                    {item.done ? "✓" : item.spin ? (
                      <div className="w-3 h-3 border-2 border-gray-400 border-t-transparent rounded-full animate-spin" />
                    ) : "○"}
                  </div>
                  <span className={`text-sm ${item.done ? "text-gray-800 font-medium" : "text-gray-400"}`}>
                    {item.label}
                  </span>
                </div>
              ))}
            </div>
            <div className="bg-blue-50 rounded-2xl p-4 mb-8 text-left">
              <div className="flex items-start gap-3">
                <span>🔒</span>
                <p className="text-xs text-blue-600 leading-relaxed">
                  Vos documents ne sont jamais stockés. Seule leur empreinte
                  cryptographique est enregistrée sur la blockchain.
                </p>
              </div>
            </div>
            <button
              type="button"
              onClick={() => navigate("/connexion")}
              className="w-full py-4 rounded-2xl font-semibold text-white text-base active:scale-95 transition-transform"
              style={{ backgroundColor: "#1B5E4B" }}
            >
              Aller à la connexion
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 flex items-start justify-center md:py-8">
      <div className="w-full max-w-md bg-white min-h-screen md:min-h-0 md:rounded-3xl md:shadow-2xl overflow-hidden flex flex-col">

        {/* Header */}
        <div className="flex items-center justify-between px-6 pt-8 pb-4">
          <button
            type="button"
            onClick={() => step === 1 ? navigate(-1) : setStep(step - 1)}
            className="w-9 h-9 rounded-full bg-gray-100 flex items-center justify-center"
          >
            <span className="text-gray-600">←</span>
          </button>
          <span className="text-sm font-semibold text-gray-500">
            Vérification d'identité (KYC)
          </span>
          <div className="w-9" />
        </div>

        <div className="flex-1 px-6 pb-10 overflow-y-auto">

          <div className="mb-4">
            <h1 className="text-2xl font-bold text-gray-900 mb-1">
              {step === 1 ? "Étape 1 — Votre document" : "Étape 2 — Votre selfie"}
            </h1>
            <p className="text-gray-400 text-sm">
              {step === 1
                ? "Choisissez votre document et uploadez-le"
                : "Placez votre visage dans le cadre et prenez votre selfie"}
            </p>
          </div>

          {/* Barre progression */}
          <div className="flex gap-1 mb-8">
            <div className="h-1.5 flex-1 rounded-full bg-green-700" />
            <div className={`h-1.5 flex-1 rounded-full ${step >= 2 ? "bg-green-700" : "bg-gray-200"}`} />
            <div className="h-1.5 flex-1 rounded-full bg-gray-200" />
          </div>

          {/* ÉTAPE 1 — Document */}
          {step === 1 && (
            <div className="flex flex-col gap-4">
              {documentTypes.map((doc) => (
                <div key={doc.id}>
                  <button
                    type="button"
                    onClick={() => {
                      setSelectedDoc(selectedDoc === doc.id ? null : doc.id);
                      setDocumentFile(null);
                    }}
                    className={`w-full flex items-center gap-4 p-4 rounded-2xl border-2 transition-all text-left ${
                      selectedDoc === doc.id ? "border-green-700 bg-green-50" : "border-gray-100 bg-gray-50"
                    }`}
                  >
                    <span className="text-3xl">{doc.icon}</span>
                    <div className="flex-1">
                      <p className={`font-semibold text-sm ${selectedDoc === doc.id ? "text-green-800" : "text-gray-800"}`}>
                        {doc.label}
                      </p>
                    </div>
                    <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center flex-shrink-0 ${
                      selectedDoc === doc.id ? "border-green-700 bg-green-700" : "border-gray-300"
                    }`}>
                      {selectedDoc === doc.id && <div className="w-2 h-2 rounded-full bg-white" />}
                    </div>
                  </button>

                  {selectedDoc === doc.id && (
                    <div className="mt-2 px-2">
                      <label className={`flex flex-col items-center justify-center w-full h-36 rounded-2xl border-2 border-dashed cursor-pointer transition-all ${
                        documentFile ? "border-green-700 bg-green-50" : "border-gray-200 bg-gray-50 hover:bg-gray-100"
                      }`}>
                        {documentFile ? (
                          <div className="text-center px-4">
                            <span className="text-3xl">✅</span>
                            <p className="text-green-700 font-semibold text-sm mt-2 truncate max-w-xs">{documentFile.name}</p>
                            <p className="text-gray-400 text-xs mt-1">Appuyez pour changer</p>
                          </div>
                        ) : (
                          <div className="text-center">
                            <span className="text-4xl">📷</span>
                            <p className="text-gray-600 text-sm mt-2 font-medium">Uploader votre {doc.label}</p>
                            <p className="text-gray-400 text-xs mt-1">JPG, PNG — max 5MB</p>
                          </div>
                        )}
                        <input
                          type="file"
                          accept="image/*"
                          onChange={(e) => { const f = e.target.files[0]; if (f) setDocumentFile(f); }}
                          className="hidden"
                        />
                      </label>
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}

          {/* ÉTAPE 2 — Selfie */}
          {step === 2 && (
            <div className="flex flex-col items-center gap-6 w-full">

              {/* Selfie capturé */}
              {selfieCapture && !cameraActive && (
                <div className="flex flex-col items-center gap-4 w-full">
                  <div className="relative">
                    <img
                      src={selfieCapture}
                      alt="selfie"
                      className="w-56 h-56 object-cover rounded-full border-4 border-green-700 shadow-lg"
                    />
                    <div className="absolute bottom-2 right-2 w-10 h-10 bg-green-700 rounded-full flex items-center justify-center shadow">
                      <span className="text-white text-lg">✓</span>
                    </div>
                  </div>
                  <p className="text-green-700 font-semibold text-sm">Selfie capturé avec succès !</p>
                  <button type="button"
                    onClick={() => { setSelfieCapture(null); setFaceDetected(false); }}
                    className="text-gray-400 text-sm underline">
                    Reprendre le selfie
                  </button>
                </div>
              )}

              {/* ✅ VIDEO — toujours dans le DOM quand cameraActive=true */}
              {cameraActive && (
                <div className="flex flex-col items-center gap-4 w-full">
                  <div
                    className="relative w-full max-w-sm mx-auto rounded-3xl overflow-hidden bg-black"
                    style={{ height: "360px" }}
                  >
                    <video
                      ref={videoRef}
                      autoPlay
                      playsInline
                      muted
                      className="w-full h-full object-cover"
                      style={{ transform: "scaleX(-1)" }}
                    />
                    <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                      <div className={`w-44 h-52 rounded-full border-4 transition-all duration-500 ${
                        faceDetected ? "border-green-400" : "border-white border-dashed opacity-70"
                      }`} />
                    </div>
                    {countdown !== null && (
                      <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50">
                        <span className="text-white font-bold text-9xl">{countdown}</span>
                      </div>
                    )}
                    <div className="absolute bottom-4 left-0 right-0 flex justify-center">
                      <div className={`px-4 py-2 rounded-full text-sm font-semibold shadow ${
                        faceDetected ? "bg-green-500 text-white" : "bg-white text-gray-700"
                      }`}>
                        {faceDetected ? "✓ Visage détecté" : "🔍 Recherche du visage..."}
                      </div>
                    </div>
                  </div>

                  <canvas ref={canvasRef} className="hidden" />

                  <div className="flex gap-4 w-full max-w-sm">
                    <button type="button" onClick={stopCamera}
                      className="flex-1 py-3 rounded-2xl border-2 border-gray-200 text-gray-600 font-semibold text-sm">
                      Annuler
                    </button>
                    <button type="button" onClick={startCountdown}
                      disabled={!faceDetected || countdown !== null}
                      className={`flex-1 py-3 rounded-2xl font-semibold text-sm text-white transition-all ${
                        faceDetected && countdown === null ? "active:scale-95" : "opacity-50"
                      }`}
                      style={{ backgroundColor: faceDetected && countdown === null ? "#1B5E4B" : "#9CA3AF" }}>
                      {countdown !== null ? `Dans ${countdown}s...` : "📸 Capturer"}
                    </button>
                  </div>
                </div>
              )}

              {/* Bouton ouvrir caméra */}
              {!cameraActive && !selfieCapture && (
                <div className="flex flex-col items-center gap-6 w-full">
                  <div className="w-48 h-48 rounded-full bg-gray-50 border-4 border-dashed border-gray-200 flex flex-col items-center justify-center">
                    <span className="text-6xl">🤳</span>
                    <p className="text-gray-400 text-xs mt-3 text-center px-6">
                      Votre visage apparaîtra ici
                    </p>
                  </div>
                  <div className="w-full bg-gray-50 rounded-2xl p-5">
                    <p className="text-sm font-semibold text-gray-700 mb-3">📋 Instructions</p>
                    <div className="flex flex-col gap-2">
                      {[
                        "Assurez-vous d'être dans un endroit bien éclairé",
                        "Regardez directement la caméra",
                        "Retirez vos lunettes si possible",
                        "Gardez votre visage dans le cadre oval",
                      ].map((tip, i) => (
                        <div key={i} className="flex items-start gap-2">
                          <span className="text-green-700 text-xs mt-0.5 font-bold">✓</span>
                          <p className="text-gray-500 text-xs leading-relaxed">{tip}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                  {cameraError && (
                    <div className="w-full bg-red-50 rounded-2xl p-4">
                      <p className="text-red-500 text-sm text-center">{cameraError}</p>
                    </div>
                  )}
                  <button type="button" onClick={startCamera}
                    className="w-full py-4 rounded-2xl font-semibold text-white text-base flex items-center justify-center gap-2 active:scale-95 transition-transform"
                    style={{ backgroundColor: "#1B5E4B" }}>
                    📸 Ouvrir la caméra
                  </button>
                </div>
              )}
            </div>
          )}

          {error && <p className="text-red-400 text-xs mt-4 text-center">{error}</p>}

          {!cameraActive && (
            <button type="button" onClick={handleSubmit} disabled={loading}
              className="w-full mt-8 py-4 rounded-2xl font-semibold text-white text-base flex items-center justify-center gap-2 active:scale-95 transition-transform"
              style={{ backgroundColor: "#1B5E4B" }}>
              {loading ? (
                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
              ) : (
                <span>{step === 1 ? "Continuer vers le selfie →" : "Soumettre et vérifier →"}</span>
              )}
            </button>
          )}
        </div>
      </div>
    </div>
  );
}