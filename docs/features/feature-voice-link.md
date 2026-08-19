# Feature Deep Dive: Real-Time VoiceLink

> Sub-400ms Conversational Voice Streaming for the Ghost Peer Agent

---

## 🎙️ Overview

VoiceLink elevates MayuronOS from a typing-based interface to an **ambient, conversational audio partner**. You can speak freely to the Ghost Peer ("Pixel"), and Pixel responds conversationally with natural pacing and interruptions.

---

## ⚡ The Audio Pipeline

```
[ User Speaks ] ──► [ Web Audio API (PCM Capture) ]
                            │ (24kHz Chunks)
                            ▼
                    [ WebSocket / WebRTC Stream ]
                            │
                            ▼
                    [ Fast Speech-to-Text ]
                            │
                            ▼
                    [ Groq Llama 3.3 (Ghost Peer) ]
                            │ (Generates Token Stream)
                            ▼
                    [ Neural TTS Stream ]
                            │ (Opus/PCM Audio Stream)
                            ▼
[ Speaker / Headphones ] ◄── [ Web Audio AudioContext Node ]
```

---

## 🔑 Key Engineering Innovations

1. **Sub-400ms End-to-End Latency:** 
   * Traditional voice bots wait for you to finish speaking, transcribe the whole sentence, call the LLM, convert to MP3, and play it back (taking 3–5 seconds).
   * VoiceLink uses **streaming audio buffers**: playback begins on the 3rd token of LLM generation.
2. **Natural Turn-Taking & Interruption Handling:**
   * If you start speaking while Pixel is talking, the client-side `AudioContext` instantly pauses playback and cancels the active AI stream.

---

## 💡 Real-Life Use Case

```
Mayur (speaking): "Pixel, why does my useEffect run twice on load?"
Pixel (voice in ear, 350ms): "Oh! That's React 18 Strict Mode in development! 
It mounts, unmounts, and remounts your component on purpose to catch cleanup bugs."
```
