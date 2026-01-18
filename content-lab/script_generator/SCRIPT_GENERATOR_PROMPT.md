# Video Script Generator Prompt

## Purpose

Generate video scripts that sound like Mitch using proven video frameworks from successful content, combined with his natural speaking style and new video ideas.

---

## How to Use This System

### Step 1: Gather Framework Transcripts

1. Find 3 videos you like that have strong frameworks
2. Get their transcripts
3. Save them in `framework_transcripts/` folder
4. Name them descriptively (e.g., `framework_ali_abdaal_productivity.md`, `framework_hormozi_value_equation.md`)

### Step 2: Capture Mitch's Voice

1. Record or transcribe Mitch speaking off-the-cuff about topics
2. Save these in `mitch_voice_samples/` folder
3. Include raw, unedited speech patterns - this is the gold
4. Name them by topic or date (e.g., `mitch_voice_reality_design_rant.md`, `mitch_voice_2024_12_14.md`)

### Step 3: Define Your Video Idea

Create a brief for your new video including:

- **Hook concept**: The scroll-stopping opening line
- **Core message**: What's the one thing viewers should walk away with?
- **Key points**: 2-4 main ideas to cover
- **Target length**: 30s, 60s, 90s, etc.
- **Vibe/Energy**: High energy? Contemplative? Provocative?

### Step 4: Generate the Script

Use the prompt below with:

- Your video idea brief
- 2-3 framework transcripts
- 2-3 Mitch voice samples

---

## The Generator Prompt

```
You are a video script writer creating content for Reality Designers by Mitch.

BRAND VOICE RULES:
- Tech/computer metaphors for timeless wisdom (e.g., "your identity is legacy code", "bandwidth", "processing power")
- Jung-inspired philosophy in futuristic language
- Direct, no-fluff communication
- Emotionally charged but intellectually grounded
- Counterintuitive hooks that make people stop scrolling
- Actionable frameworks, not just inspiration

YOUR TASK:
Generate a video script that combines:
1. The structural frameworks from these successful videos
2. Mitch's natural speaking patterns and voice
3. The new video idea provided

---

### FRAMEWORK TRANSCRIPTS TO STUDY:
[Paste 2-3 framework transcripts here]

---

### MITCH'S VOICE SAMPLES:
[Paste 2-3 Mitch voice samples here]

---

### NEW VIDEO IDEA:
[Paste your video brief here]

**Hook concept**:
**Core message**:
**Key points**:
**Target length**:
**Vibe/Energy**:

---

OUTPUT FORMAT:

# [Video Title]

**The Real Pill:** "[One-line philosophical truth that frames the video]"

**Hook (0-5s):**
[Opening line that stops the scroll]

**Body (5-25s):**
[Main content with framework, examples, metaphors]
- Use Mitch's natural speech patterns
- Include specific tech metaphors
- Build the framework clearly
- Add humor/edge where natural

**Takeaway (25-30s):**
[Actionable conclusion, memorable punch line]

---

**Visual Notes:**
[Any specific visual cues, text overlays, or editing suggestions]

**Tone Notes:**
[Energy level, pacing, emotional beats]

---

GENERATION RULES:
1. Extract the STRUCTURE from framework transcripts (how they build arguments, pace reveals, create tension)
2. Extract the VOICE from Mitch samples (word choice, rhythm, humor style, metaphor preferences)
3. Apply BOTH to the new video idea
4. Keep it tight - every word must earn its place
5. Make the hook counterintuitive or provocative
6. End with something actionable, not just inspirational
7. Use specific numbers/rules when possible (e.g., "72-hour rule", "1% better")
8. Sound like Mitch having a conversation, not reading a script
```

---

## Quality Checklist

Before finalizing a script, verify:

- [ ] Hook stops the scroll (counterintuitive or emotionally charged)
- [ ] Uses tech/computer metaphor naturally
- [ ] Sounds like Mitch talking, not "content creator voice"
- [ ] Has clear framework/structure (not just rambling)
- [ ] Ends with actionable takeaway
- [ ] Under target length when spoken aloud
- [ ] No fluff words or filler
- [ ] Has at least one memorable phrase/concept
- [ ] Fits Reality Designers brand philosophy

---

## Pro Tips

### For Better Framework Extraction:

- Look for how they structure reveals (problem → insight → solution)
- Note their pacing (when they speed up, slow down, pause)
- Identify their pattern interrupts (unexpected turns)
- Study their callback techniques (referencing earlier points)

### For Better Voice Capture:

- Record Mitch explaining concepts to friends (most natural)
- Capture rants and passionate tangents (shows authentic voice)
- Include casual conversations about the work
- Note recurring phrases, metaphors, and verbal tics

### For Better Script Generation:

- Start with the hook - if it doesn't stop scrolls, restart
- Write the takeaway second - know where you're going
- Fill in the middle last - connect hook to takeaway
- Read it aloud - if it doesn't sound like Mitch talking, revise
- Cut 20% - scripts are always too long on first draft

---

## Example Workflow

1. **Monday**: Find 3 great videos, save transcripts
2. **Tuesday**: Record Mitch talking about 2-3 topics, transcribe
3. **Wednesday**: Generate 5 video scripts using the prompt
4. **Thursday**: Manually tweak scripts to perfection
5. **Friday**: Review and finalize top 3 for production

---

## Folder Structure

```
script_generator/
├── SCRIPT_GENERATOR_PROMPT.md (this file)
├── framework_transcripts/
│   ├── framework_[creator]_[topic].md
│   └── (add more as you find good ones)
├── mitch_voice_samples/
│   ├── mitch_voice_[topic]_[date].md
│   └── (add more as you record)
├── generated_scripts/
│   ├── [date]_[video_title].md
│   └── (generated scripts go here)
└── README.md (quick start guide)
```

---

## Notes

- This is a tool, not a replacement for creative judgment
- The best scripts come from generation + manual tweaking
- Update voice samples regularly as Mitch's style evolves
- Collect framework transcripts from diverse sources
- Trust your gut - if it doesn't feel right, it isn't

---

**Remember**: The goal is scripts that sound like Mitch, structured like proven winners, delivering fresh ideas. Framework + Voice + Idea = 🔥
