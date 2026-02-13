"use client"

import React, { useState, useEffect, Suspense } from "react"
import { useInterpreterController } from "@/lib/hooks/useInterpreterController"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Slider } from "@/components/ui/slider"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { CameraSetupWizard } from "@/components/CameraSetupWizard"
import { ScanningKeyboard } from "@/components/ScanningKeyboard"
import { SignLanguageSelector } from "@/components/SignLanguageSelector"
import { Camera, RefreshCw, Volume2, Mic, Settings, LayoutGrid, Eye, EyeOff, Save, Trash2, StopCircle, PlayCircle } from "lucide-react"

function InterpreterContent() {
    const {
        videoRef,
        canvasRef,
        isCameraRunning,
        modelLoaded,
        status,
        isOverlayEnabled,
        toggleOverlay,
        toggleCamera,
        prediction,
        isClassifierReady,
        handleExport
    } = useInterpreterController()

    const [committedText, setCommittedText] = useState("")
    const [isSetupOpen, setIsSetupOpen] = useState(false)
    const [isScanningOpen, setIsScanningOpen] = useState(false)
    const [quickSettingsOpen, setQuickSettingsOpen] = useState(false)

    // TTS Settings
    const [volume, setVolume] = useState(1.0)
    const [rate, setRate] = useState(1.0)

    const handleSpeak = () => {
        if (!committedText) return
        const utterance = new SpeechSynthesisUtterance(committedText)
        utterance.volume = volume
        utterance.rate = rate
        window.speechSynthesis.speak(utterance)
    }

    const handlePredictionCommit = () => {
        if (prediction?.label) {
            setCommittedText((prev) => prev + prediction.label)
        }
    }

    return (
        <div className="h-full flex flex-col gap-6">
            {/* Status Bar */}
            <div className="flex gap-4 flex-wrap">
                <Badge variant={isCameraRunning ? "default" : "destructive"} className="label-premium py-2 px-5 rounded-full shadow-sm bg-slate-900 border-none">
                    {isCameraRunning ? "Camera Active" : "Camera Off"}
                </Badge>
                <Badge variant={modelLoaded ? "secondary" : "outline"} className="label-premium py-2 px-5 rounded-full shadow-sm">
                    {modelLoaded ? "Model Ready" : "Loading Model..."}
                </Badge>
                <Badge variant="outline" className="label-premium py-2 px-5 rounded-full border-slate-200 bg-white/50 opacity-60">
                    Offline Ready
                </Badge>
            </div>

            {/* Main Content Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 pb-24">
                {/* Left Card: Input */}
                <Card className="glass-orb rounded-[32px] overflow-hidden border-none shadow-sm">
                    <CardHeader className="pb-4 px-6 pt-6">
                        <CardTitle className="label-premium opacity-50 flex justify-between items-center text-xs">
                            Video Input
                            <div className="flex gap-2">
                                <Button size="sm" variant="ghost" onClick={toggleOverlay} className="rounded-full label-premium h-8 px-4 font-black">
                                    {isOverlayEnabled ? <Eye className="w-3.5 h-3.5 mr-1.5" /> : <EyeOff className="w-3.5 h-3.5 mr-1.5" />}
                                    {isOverlayEnabled ? "Hide Skeleton" : "Show Skeleton"}
                                </Button>
                            </div>
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="p-0 relative aspect-[4/3] bg-black/5 rounded-2xl mx-4 mb-4 overflow-hidden">
                        <video ref={videoRef} className="absolute inset-0 w-full h-full object-cover opacity-60" autoPlay playsInline muted />
                        <canvas ref={canvasRef} className="absolute inset-0 w-full h-full object-cover" width={640} height={480} />

                        {!isCameraRunning && (
                            <div className="absolute inset-0 flex items-center justify-center bg-white/20 backdrop-blur-md z-10 text-slate-900">
                                <Button size="xl" onClick={toggleCamera} className="gap-3 text-sm font-black uppercase tracking-[0.2em] py-8 px-10 rounded-full bg-slate-900 text-white shadow-2xl hover:scale-105 transition-all">
                                    <PlayCircle className="w-10 h-10" />
                                    Start Camera
                                </Button>
                            </div>
                        )}

                        <div className="absolute bottom-4 right-4 z-20 flex gap-2">
                            <Button size="icon" variant="secondary" onClick={() => setIsSetupOpen(true)} title="Recalibrate" className="rounded-full w-12 h-12 glass-orb">
                                <RefreshCw className="w-5 h-5 text-slate-600" />
                            </Button>
                        </div>
                    </CardContent>
                    <div className="px-8 py-6 bg-white/40 border-t border-black/5 flex justify-between items-center">
                        <span className="label-premium text-slate-500 opacity-60">
                            {status}
                        </span>
                        {isCameraRunning && (
                            <Button variant="destructive" size="default" onClick={toggleCamera} className="rounded-full label-premium px-8 h-10 border-none bg-red-500 hover:bg-red-600">
                                <StopCircle className="w-3.5 h-3.5 mr-2" /> Stop
                            </Button>
                        )}
                    </div>
                </Card>

                {/* Right Card: Output */}
                <Card className="glass-orb rounded-[32px] border-none shadow-sm flex flex-col h-[600px] lg:h-auto overflow-hidden">
                    <Tabs defaultValue="letters" className="flex-1 flex flex-col">
                        <CardHeader className="pb-2 px-6 pt-6">
                            <TabsList className="bg-black/5 rounded-full h-14 p-1.5">
                                <TabsTrigger value="letters" className="label-premium h-full rounded-full data-[state=active]:bg-white data-[state=active]:shadow-sm data-[state=active]:text-slate-900 px-8">Letters & Typing</TabsTrigger>
                                <TabsTrigger value="phrases" className="label-premium h-full rounded-full data-[state=active]:bg-white data-[state=active]:shadow-sm data-[state=active]:text-slate-900 px-8">Phrases</TabsTrigger>
                            </TabsList>
                        </CardHeader>

                        <CardContent className="flex-1 p-6 flex flex-col gap-6">
                            <TabsContent value="letters" className="flex-1 flex flex-col gap-6 mt-0">
                                {/* Live Prediction */}
                                <div className="bg-indigo-500/5 rounded-[32px] p-10 text-center border border-indigo-500/10 mb-2">
                                    <h3 className="label-premium text-indigo-600 opacity-60 mb-6 font-black">Live Prediction</h3>
                                    <div className="font-display font-black text-8xl text-slate-900 h-24 flex items-center justify-center tracking-tighter">
                                        {prediction?.label || <span className="opacity-10">-</span>}
                                        {prediction && <span className="text-2xl font-bold text-indigo-400 ml-6 tracking-normal">{(prediction.prob * 100).toFixed(0)}%</span>}
                                    </div>
                                    <div className="mt-8 flex justify-center">
                                        <Button onClick={handlePredictionCommit} disabled={!prediction} size="lg" className="rounded-full bg-slate-900 text-white shadow-lg label-premium px-12 h-14 hover:scale-105 transition-all">
                                            Append "{prediction?.label}"
                                        </Button>
                                    </div>
                                </div>

                                {/* Committed Text */}
                                <div className="flex-1 bg-white/50 rounded-[24px] p-6 border border-black/5 relative shadow-inner">
                                    <textarea
                                        className="w-full h-full bg-transparent border-none resize-none text-3xl font-bold focus:ring-0 p-2 text-slate-900 placeholder:text-slate-300"
                                        value={committedText}
                                        onChange={(e) => setCommittedText(e.target.value)}
                                        placeholder="Typed text will appear here..."
                                    />
                                    <div className="absolute bottom-6 right-6 flex gap-2">
                                        <Button size="icon" variant="ghost" onClick={setCommittedText.bind(null, "")} title="Clear" className="rounded-full hover:bg-red-50 hover:text-red-500">
                                            <Trash2 className="w-5 h-5" />
                                        </Button>
                                    </div>
                                </div>

                                {/* Actions */}
                                <div className="grid grid-cols-2 gap-4">
                                    <Button size="xl" className="h-16 rounded-full bg-slate-900 text-white font-black uppercase text-[10px] tracking-[0.2em] shadow-xl hover:scale-105 transition-all" onClick={handleSpeak}>
                                        <Volume2 className="w-6 h-6 mr-3" /> Speak
                                    </Button>
                                    <Button size="xl" variant="secondary" className="h-16 rounded-full glass-orb font-black uppercase text-[10px] tracking-[0.2em] shadow-lg hover:scale-105 transition-all text-slate-600" onClick={() => setIsScanningOpen(!isScanningOpen)}>
                                        <LayoutGrid className="w-6 h-6 mr-3" /> Keyboard
                                    </Button>
                                </div>
                            </TabsContent>

                            <TabsContent value="phrases" className="flex-1 flex flex-col justify-center items-center text-center mt-0">
                                <div className="space-y-6">
                                    <div className="w-24 h-24 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-4">
                                        <Save className="w-10 h-10 text-slate-400" />
                                    </div>
                                    <h3 className="text-xl font-bold text-slate-700">Saved Phrases</h3>
                                    <p className="text-slate-500 max-w-xs mx-auto">
                                        Teach SignMeUp custom phrases to recognize them instantly.
                                    </p>
                                    <Button size="xl" className="w-full max-w-xs rounded-full bg-slate-900 text-white font-black uppercase text-[10px] tracking-widest h-12">
                                        Teach New Phrase
                                    </Button>
                                    <Button size="xl" variant="outline" className="w-full max-w-xs rounded-full glass-orb font-black uppercase text-[10px] tracking-widest h-12" onClick={handleExport}>
                                        <Save className="w-5 h-5 mr-2" /> Export Dataset
                                    </Button>
                                </div>
                            </TabsContent>
                        </CardContent>
                    </Tabs>
                </Card>
            </div>

            {/* Quick Settings Drawer (Collapsible) */}
            {quickSettingsOpen && (
                <div className="fixed inset-x-0 bottom-0 bg-white border-t-2 border-slate-200 p-6 shadow-2xl z-40 pb-24 animate-in slide-in-from-bottom">
                    <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8">
                        <div>
                            <h3 className="font-bold text-lg mb-4">Text-to-Speech</h3>
                            <div className="space-y-4">
                                <div className="flex items-center justify-between">
                                    <Label>Volume</Label>
                                    <Slider value={[volume * 100]} max={100} onValueChange={(v) => setVolume(v[0] / 100)} className="w-1/2" />
                                </div>
                                <div className="flex items-center justify-between">
                                    <Label>Rate</Label>
                                    <Slider value={[rate * 10]} min={5} max={20} onValueChange={(v) => setRate(v[0] / 10)} className="w-1/2" />
                                </div>
                            </div>
                        </div>
                        <div>
                            <h3 className="font-bold text-lg mb-4">Accessibility</h3>
                            <div className="space-y-4">
                                <div className="flex items-center justify-between">
                                    <Label>High Contrast</Label>
                                    <Switch />
                                </div>
                                <div className="flex items-center justify-between">
                                    <Label>Large Text</Label>
                                    <Switch />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {/* Overlays */}
            <CameraSetupWizard
                isOpen={isSetupOpen}
                onClose={() => setIsSetupOpen(false)}
                onCameraAccess={toggleCamera}
                isCameraRunning={isCameraRunning}
            />

            <ScanningKeyboard
                isOpen={isScanningOpen}
                onClose={() => setIsScanningOpen(false)}
                onSelect={(key) => setCommittedText(curr => curr + key)}
                suggestions={["HELLO", "THANK YOU", "YES", "NO"]}
            />
        </div>
    )
}

export default function InterpreterPage() {
    return (
        <Suspense fallback={<div className="min-h-screen flex items-center justify-center bg-slate-50 text-slate-500">Loading Interpreter...</div>}>
            <InterpreterContent />
        </Suspense>
    )
}
