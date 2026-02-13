"use client"

import React, { useState, useEffect, Suspense } from "react"
import { useInterpreterController } from "@/lib/hooks/useInterpreterController"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Progress } from "@/components/ui/progress"
// import { Input } from "@/components/ui/input" // We need Input! I forgot to create it. I'll use standard input or create it.
import { ArrowLeft, Mic, Save, RotateCcw, Check, Video } from "lucide-react"
import Link from "next/link"
import { useRouter } from "next/navigation"

// Quick Input Component inline or I'll create it later if strict
function Input({ className, ...props }: React.InputHTMLAttributes<HTMLInputElement>) {
    return (
        <input
            className={`flex h-12 w-full rounded-md border border-input bg-background px-3 py-2 text-lg ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 ${className}`}
            {...props}
        />
    )
}

const STEPS = ["Name", "Record", "Review", "Save"]

function TeachContent() {
    const router = useRouter()
    const [currentStep, setCurrentStep] = useState(0)
    const [phraseName, setPhraseName] = useState("")

    const {
        videoRef,
        isCameraRunning,
        toggleCamera,
        isRecording,
        startRecording,
        stopRecording,
        recordCount,
        status
    } = useInterpreterController()

    // Step 1: Name
    // Step 2: Record
    // Step 3: Review (Simulated for now, usually we'd replay but we don't store video, just features. So maybe "Test"?)
    // Step 4: Save (Done)

    const handleNext = () => {
        if (currentStep === 0 && !phraseName) return
        if (currentStep < STEPS.length - 1) setCurrentStep(curr => curr + 1)
    }

    const handleBack = () => {
        if (currentStep > 0) setCurrentStep(curr => curr - 1)
        else router.push("/interpreter")
    }

    const handleStartRecording = async () => {
        if (!isCameraRunning) await toggleCamera()
        // Wait a bit?
        startRecording(phraseName)
    }

    const handleStopRecording = async () => {
        await stopRecording(phraseName, "PHRASE")
        handleNext() // Go to Review/Save
    }

    return (
        <div className="h-full flex flex-col gap-8">
            <div className="max-w-3xl mx-auto w-full space-y-8">
                {/* Stepper */}
                <div className="space-y-5 px-6">
                    <div className="flex justify-between items-center">
                        {STEPS.map((step, i) => (
                            <div key={step} className="flex flex-col items-center gap-2">
                                <span className={`label-premium ${i <= currentStep ? "text-slate-900" : "opacity-30"}`}>
                                    {step}
                                </span>
                                <div className={`h-1.5 w-1.5 rounded-full ${i <= currentStep ? "bg-indigo-600" : "bg-slate-200"}`}></div>
                            </div>
                        ))}
                    </div>
                    <Progress value={(currentStep / (STEPS.length - 1)) * 100} className="h-1 bg-slate-100 rounded-full" />
                </div>

                <Card className="glass-orb rounded-[32px] border-none shadow-sm min-h-[500px] flex flex-col overflow-hidden">
                    <CardHeader className="text-center pt-16 pb-10">
                        <CardTitle className="font-display font-black text-5xl uppercase tracking-tighter text-slate-900 mb-4">{STEPS[currentStep]}</CardTitle>
                        <CardDescription className="label-premium opacity-60">
                            {currentStep === 0 && "Give your new sign a name."}
                            {currentStep === 1 && "Perform the sign clearly in front of the camera."}
                            {currentStep === 2 && "Phrase recorded successfully."}
                            {currentStep === 3 && "Your phrase is ready to use!"}
                        </CardDescription>
                    </CardHeader>

                    <CardContent className="flex-1 flex flex-col items-center justify-center gap-8 p-10">
                        {currentStep === 0 && (
                            <div className="w-full max-w-sm space-y-6 text-center">
                                <Label htmlFor="phraseName" className="label-premium opacity-40">Phrase Name</Label>
                                <Input
                                    id="phraseName"
                                    placeholder="e.g. 'Coffee'"
                                    value={phraseName}
                                    onChange={(e) => setPhraseName(e.target.value)}
                                    autoFocus
                                    className="text-center text-5xl font-black tracking-tighter bg-transparent border-none focus-visible:ring-0 placeholder:text-slate-100 h-24 mb-4"
                                />
                                <div className="h-1 w-24 bg-indigo-500/10 mx-auto rounded-full"></div>
                            </div>
                        )}

                        {currentStep === 1 && (
                            <div className="w-full max-w-2xl relative aspect-video bg-black/5 rounded-[24px] overflow-hidden border border-black/5 shadow-inner">
                                <video ref={videoRef} className="absolute inset-0 w-full h-full object-cover opacity-60" autoPlay playsInline muted />
                                {!isCameraRunning && (
                                    <div className="absolute inset-0 flex items-center justify-center bg-white/20 backdrop-blur-md">
                                        <Button onClick={toggleCamera} className="rounded-full bg-slate-900 text-white font-black uppercase text-[10px] tracking-widest px-8 h-12 shadow-2xl">
                                            Turn On Camera
                                        </Button>
                                    </div>
                                )}
                                {isRecording && (
                                    <div className="absolute top-6 right-6 animate-pulse bg-red-600 text-white px-4 py-2 rounded-full text-[10px] font-black uppercase tracking-widest shadow-xl">
                                        Recording... {recordCount}
                                    </div>
                                )}
                            </div>
                        )}

                        {currentStep === 2 && (
                            <div className="text-center space-y-6">
                                <div className="w-24 h-24 bg-green-500/10 rounded-full flex items-center justify-center mx-auto text-green-600">
                                    <Check className="w-12 h-12" />
                                </div>
                                <p className="text-xl font-bold text-slate-900">Recorded <span className="text-indigo-600">{recordCount}</span> frames for <span className="uppercase tracking-tighter">"{phraseName}"</span>.</p>
                            </div>
                        )}

                        {currentStep === 3 && (
                            <div className="text-center space-y-6">
                                <div className="w-24 h-24 bg-indigo-500/10 rounded-full flex items-center justify-center mx-auto text-indigo-600 shadow-inner">
                                    <Save className="w-12 h-12" />
                                </div>
                                <p className="text-xl font-bold text-slate-900 uppercase tracking-tighter">Saved to local device</p>
                            </div>
                        )}
                    </CardContent>

                    <CardFooter className="flex justify-between p-10 bg-white/40 border-t border-black/5">
                        <Button variant="ghost" onClick={handleBack} disabled={isRecording} className="label-premium rounded-full px-10 h-14 hover:bg-slate-100 uppercase font-black">
                            {currentStep === 0 ? "Cancel" : "Back"}
                        </Button>

                        {currentStep === 0 && (
                            <Button onClick={handleNext} disabled={!phraseName} size="lg" className="label-premium rounded-full bg-slate-900 text-white px-12 h-14 shadow-xl hover:scale-105 transition-all font-black">Next</Button>
                        )}

                        {currentStep === 1 && (
                            isRecording ? (
                                <Button onClick={handleStopRecording} variant="destructive" size="xl" className="label-premium rounded-full px-16 h-16 shadow-2xl animate-pulse font-black border-none">
                                    Stop Recording
                                </Button>
                            ) : (
                                <Button onClick={handleStartRecording} size="xl" className="label-premium rounded-full bg-red-600 hover:bg-red-700 text-white px-16 h-16 shadow-2xl hover:scale-105 transition-all font-black border-none">
                                    <Mic className="w-6 h-6 mr-3" /> Start Recording
                                </Button>
                            )
                        )}

                        {currentStep === 2 && (
                            <div className="flex gap-4">
                                <Button variant="outline" onClick={() => setCurrentStep(1)} className="label-premium rounded-full glass-orb px-10 h-14 shadow-sm border-none font-black text-slate-600">
                                    <RotateCcw className="w-4 h-4 mr-2" /> Redo
                                </Button>
                                <Button onClick={() => setCurrentStep(3)} size="lg" className="label-premium rounded-full bg-slate-900 text-white px-12 h-14 shadow-xl font-black">
                                    Save Phrase
                                </Button>
                            </div>
                        )}

                        {currentStep === 3 && (
                            <Link href="/interpreter">
                                <Button size="lg" variant="default" className="label-premium rounded-full bg-slate-900 text-white px-16 h-14 shadow-xl hover:scale-105 transition-all font-black">Done</Button>
                            </Link>
                        )}
                    </CardFooter>
                </Card>
            </div>
        </div>
    )
}

export default function TeachPage() {
    return (
        <Suspense fallback={<div className="min-h-screen flex items-center justify-center bg-slate-50 text-slate-500">Loading Teach Page...</div>}>
            <TeachContent />
        </Suspense>
    )
}
