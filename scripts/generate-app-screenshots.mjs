#!/usr/bin/env node

import { createRequire } from 'node:module'
import { execFile } from 'node:child_process'
import { promisify } from 'node:util'
import fs from 'node:fs/promises'
import { existsSync } from 'node:fs'
import os from 'node:os'
import path from 'node:path'

const execFileAsync = promisify(execFile)

const DEFAULT_APP_ROOT = '/Volumes/DuetDrive/Repos/AutoDocLocal'
const DEFAULT_OUTPUT_DIR = '/Volumes/DuetDrive/Repos/AutoDocLanding/assets/screenshots'

const appRoot = process.argv[2] ?? DEFAULT_APP_ROOT
const outputDir = process.argv[3] ?? DEFAULT_OUTPUT_DIR
const requireFromApp = createRequire(path.join(appRoot, 'package.json'))

const { _electron: electron } = requireFromApp('@playwright/test')
const ffmpegPath = requireFromApp('ffmpeg-static')
const sharp = requireFromApp('sharp')

// Meetings that should be seeded with a recorded screen video (so the app shows
// the video player instead of the audio-only fallback in the transcript tab).
const SCREEN_VIDEO_MEETING_IDS = new Set(['meeting-roadmap-q2'])

const mainEntry = path.join(appRoot, 'out', 'main', 'index.js')

if (!existsSync(mainEntry)) {
  throw new Error(`Built Electron entry not found at ${mainEntry}. Build AutoDocLocal first.`)
}

const demoMeetings = [
  {
    id: 'meeting-roadmap-q2',
    sourceName: 'Product Roadmap Review',
    customTitle: 'Product Roadmap Review — Q2 Planning',
    calendarTitle: 'Product Roadmap Review — Q2 Planning',
    startedAt: Date.parse('2026-03-25T10:00:00-04:00'),
    stoppedAt: Date.parse('2026-03-25T10:47:00-04:00'),
    durationSeconds: 47 * 60,
    speakers: {
      me: { label: 'Chris' },
      speaker_1: { label: 'Maya' },
      speaker_2: { label: 'Derek' },
    },
    transcript: [
      ['speaker_1', 8_000, 14_000, 'We should move transcript highlights into the Q3 roadmap and keep the launch tied to the new recording pipeline.'],
      ['me', 15_000, 23_000, 'I agree. Let us hold the launch until QA clears the post-processing fixes and the onboarding copy is updated.'],
      ['speaker_2', 25_000, 32_000, 'The beta cohort keeps asking for search, AI notes, and a clearer way to jump back to the exact moment in the meeting.'],
      ['speaker_1', 34_000, 41_000, 'Then the plan is transcript highlights in Q3, launch timing after QA, and a tighter onboarding pass before we widen access.'],
      ['me', 43_000, 52_000, 'I will draft the updated timeline today, and Maya can take the onboarding copy by Friday.'],
      ['speaker_2', 55_000, 63_000, 'We also need to confirm the local-only positioning stays front and center in the release notes and screenshots.'],
    ],
    segments: {
      decisions: [
        {
          id: 'decision-1',
          meetingId: 'meeting-roadmap-q2',
          category: 'decision',
          topic: 'Q3 Roadmap',
          title: 'Move transcript highlights into Q3',
          content: 'The team agreed transcript highlights should ship as part of the Q3 roadmap rather than the current beta milestone.',
          assignee: null,
          deadline: null,
          sourceStartMs: 8_000,
          sourceEndMs: 14_000,
        },
        {
          id: 'decision-2',
          meetingId: 'meeting-roadmap-q2',
          category: 'decision',
          topic: 'Launch',
          title: 'Gate launch on recording pipeline QA',
          content: 'Launch will stay tied to the new recording pipeline and post-processing fixes clearing QA.',
          assignee: null,
          deadline: null,
          sourceStartMs: 15_000,
          sourceEndMs: 23_000,
        },
        {
          id: 'decision-3',
          meetingId: 'meeting-roadmap-q2',
          category: 'decision',
          topic: 'Messaging',
          title: 'Keep local-only positioning explicit',
          content: 'Release notes and marketing screenshots should continue to emphasize local processing and private-by-default behavior.',
          assignee: null,
          deadline: null,
          sourceStartMs: 55_000,
          sourceEndMs: 63_000,
        },
      ],
      actionItems: [
        {
          id: 'action-1',
          meetingId: 'meeting-roadmap-q2',
          category: 'action_item',
          topic: 'Launch',
          title: 'Draft the updated launch timeline',
          content: 'Chris will turn the revised QA gate and feature sequencing into a new launch timeline.',
          assignee: 'Chris',
          deadline: 'Today',
          sourceStartMs: 43_000,
          sourceEndMs: 52_000,
        },
        {
          id: 'action-2',
          meetingId: 'meeting-roadmap-q2',
          category: 'action_item',
          topic: 'Onboarding',
          title: 'Revise onboarding copy',
          content: 'Maya will tighten the onboarding language so the value of local notes, search, and Ask AI is clearer on first run.',
          assignee: 'Maya',
          deadline: 'Friday',
          sourceStartMs: 43_000,
          sourceEndMs: 52_000,
        },
        {
          id: 'action-3',
          meetingId: 'meeting-roadmap-q2',
          category: 'action_item',
          topic: 'Marketing',
          title: 'Refresh product screenshots',
          content: 'Derek will update the screenshot set so the site reflects the current app shell and feature set.',
          assignee: 'Derek',
          deadline: 'This week',
          sourceStartMs: 55_000,
          sourceEndMs: 63_000,
        },
      ],
      information: [
        {
          id: 'info-1',
          meetingId: 'meeting-roadmap-q2',
          category: 'information',
          topic: 'Customer Signal',
          title: 'Search and notes remain top requests',
          content: 'The beta cohort keeps asking for search, AI notes, and a way to jump directly to the source moment.',
          assignee: null,
          deadline: null,
          sourceStartMs: 25_000,
          sourceEndMs: 32_000,
        },
        {
          id: 'info-2',
          meetingId: 'meeting-roadmap-q2',
          category: 'information',
          topic: 'Release',
          title: 'Recording pipeline is the pacing item',
          content: 'QA status on the recording pipeline is the primary constraint for expanding beyond the current beta cohort.',
          assignee: null,
          deadline: null,
          sourceStartMs: 15_000,
          sourceEndMs: 23_000,
        },
      ],
      discussion: [
        {
          id: 'discussion-1',
          meetingId: 'meeting-roadmap-q2',
          category: 'discussion',
          topic: 'Launch Tradeoffs',
          title: 'Sequence polish after reliability',
          content: 'The group aligned that polish work should follow reliability fixes instead of competing with them for the same launch window.',
          assignee: null,
          deadline: null,
          sourceStartMs: 34_000,
          sourceEndMs: 41_000,
        },
      ],
      statusUpdates: [
        {
          id: 'status-1',
          meetingId: 'meeting-roadmap-q2',
          category: 'status_update',
          topic: 'QA',
          title: 'Post-processing fixes are still in review',
          content: 'QA is actively validating the recording and post-processing fixes that unblock the broader launch.',
          assignee: null,
          deadline: null,
          sourceStartMs: 15_000,
          sourceEndMs: 23_000,
        },
        {
          id: 'status-2',
          meetingId: 'meeting-roadmap-q2',
          category: 'status_update',
          topic: 'Marketing',
          title: 'Screenshot refresh is queued',
          content: 'Marketing assets are being refreshed so the website reflects the latest UI and feature set.',
          assignee: null,
          deadline: null,
          sourceStartMs: 55_000,
          sourceEndMs: 63_000,
        },
      ],
    },
  },
  {
    id: 'meeting-investor-update',
    sourceName: 'Investor Update',
    customTitle: 'Investor Update — Series A Progress',
    calendarTitle: 'Investor Update — Series A Progress',
    startedAt: Date.parse('2026-03-24T15:00:00-04:00'),
    stoppedAt: Date.parse('2026-03-24T15:32:00-04:00'),
    durationSeconds: 32 * 60,
    speakers: {
      me: { label: 'Chris' },
      speaker_1: { label: 'Sarah' },
    },
    transcript: [
      ['speaker_1', 7_000, 15_000, 'The enterprise pipeline is healthy, but the team wants to see cleaner onboarding completion before we open the waitlist further.'],
      ['me', 18_000, 25_000, 'We can share the revised launch timeline after the roadmap review and include the local-first positioning in the update.'],
    ],
    segments: {
      decisions: [],
      actionItems: [
        {
          id: 'investor-action-1',
          meetingId: 'meeting-investor-update',
          category: 'action_item',
          topic: 'Follow-up',
          title: 'Send the revised timeline',
          content: 'Chris will send investors the revised launch timeline after the roadmap review.',
          assignee: 'Chris',
          deadline: 'Tomorrow',
          sourceStartMs: 18_000,
          sourceEndMs: 25_000,
        },
      ],
      information: [
        {
          id: 'investor-info-1',
          meetingId: 'meeting-investor-update',
          category: 'information',
          topic: 'Pipeline',
          title: 'Enterprise pipeline remains healthy',
          content: 'Investors heard that enterprise demand is strong, but onboarding completion is the current gating metric.',
          assignee: null,
          deadline: null,
          sourceStartMs: 7_000,
          sourceEndMs: 15_000,
        },
      ],
      discussion: [],
      statusUpdates: [],
    },
  },
  {
    id: 'meeting-eng-standup',
    sourceName: 'Engineering Standup',
    customTitle: 'Engineering Standup — Launch Readiness',
    calendarTitle: 'Engineering Standup — Launch Readiness',
    startedAt: Date.parse('2026-03-23T09:30:00-04:00'),
    stoppedAt: Date.parse('2026-03-23T09:48:00-04:00'),
    durationSeconds: 18 * 60,
    speakers: {
      me: { label: 'Chris' },
      speaker_1: { label: 'Derek' },
      speaker_2: { label: 'Maya' },
    },
    transcript: [
      ['speaker_2', 5_000, 11_000, 'Search highlighting is ready, and the jump-to-source links are working across transcript and notes.'],
      ['speaker_1', 13_000, 21_000, 'The screenshot refresh can happen as soon as we seed the isolated demo archive and capture the latest shell.'],
      ['me', 23_000, 30_000, 'Great. Let us keep the demo data separate from dev and production data so marketing has a safe sandbox.'],
    ],
    segments: {
      decisions: [
        {
          id: 'eng-decision-1',
          meetingId: 'meeting-eng-standup',
          category: 'decision',
          topic: 'Demo Data',
          title: 'Use an isolated screenshot sandbox',
          content: 'The team agreed the marketing screenshots should be captured from an isolated demo archive rather than real dev or production meeting data.',
          assignee: null,
          deadline: null,
          sourceStartMs: 23_000,
          sourceEndMs: 30_000,
        },
      ],
      actionItems: [],
      information: [
        {
          id: 'eng-info-1',
          meetingId: 'meeting-eng-standup',
          category: 'information',
          topic: 'Search',
          title: 'Jump-to-source links are ready',
          content: 'Search highlighting and jump-to-source links are working across transcript and notes views.',
          assignee: null,
          deadline: null,
          sourceStartMs: 5_000,
          sourceEndMs: 11_000,
        },
      ],
      discussion: [],
      statusUpdates: [],
    },
  },
]

const calendarScenario = {
  platform: 'darwin',
  permissions: {
    microphone: true,
    screen: true,
  },
  whisper: {
    status: { phase: 'ready', percent: 100 },
  },
  ollama: {
    status: { phase: 'ready', percent: 100 },
  },
  calendar: {
    accounts: [
      {
        id: 'acct-google',
        provider: 'google',
        email: 'product@example.com',
        connectedAt: Date.parse('2026-03-20T09:00:00-04:00'),
      },
      {
        id: 'acct-microsoft',
        provider: 'microsoft',
        email: 'ops@example.com',
        connectedAt: Date.parse('2026-03-20T09:05:00-04:00'),
      },
    ],
    events: [
      {
        id: 'google_evt_roadmap',
        externalId: 'evt-roadmap',
        accountId: 'acct-google',
        provider: 'google',
        recurringEventId: 'series-roadmap',
        title: 'Product Roadmap Review — Q2 Planning',
        startTime: Date.parse('2026-03-25T10:00:00-04:00'),
        endTime: Date.parse('2026-03-25T10:45:00-04:00'),
        attendees: ['maya@example.com', 'derek@example.com', 'chris@example.com'],
        meetingUrl: 'https://meet.google.com/abc-defg-hij',
        autoRecord: 'off',
        syncedAt: Date.parse('2026-03-25T08:00:00-04:00'),
      },
      {
        id: 'microsoft_evt_launch',
        externalId: 'evt-launch',
        accountId: 'acct-microsoft',
        provider: 'microsoft',
        recurringEventId: null,
        title: 'Launch Readiness Check',
        startTime: Date.parse('2026-03-25T13:30:00-04:00'),
        endTime: Date.parse('2026-03-25T14:00:00-04:00'),
        attendees: ['ops@example.com', 'qa@example.com'],
        meetingUrl: 'https://teams.microsoft.com/l/meetup-join/launch-readiness',
        autoRecord: 'off',
        syncedAt: Date.parse('2026-03-25T08:00:00-04:00'),
      },
      {
        id: 'google_evt_customer',
        externalId: 'evt-customer',
        accountId: 'acct-google',
        provider: 'google',
        recurringEventId: null,
        title: 'Customer Feedback Roundup',
        startTime: Date.parse('2026-03-25T16:00:00-04:00'),
        endTime: Date.parse('2026-03-25T16:30:00-04:00'),
        attendees: ['research@example.com'],
        meetingUrl: 'https://zoom.us/j/123456789',
        autoRecord: 'off',
        syncedAt: Date.parse('2026-03-25T08:00:00-04:00'),
      },
    ],
  },
}

async function ensureDir(dir) {
  await fs.mkdir(dir, { recursive: true })
}

async function writeJson(filePath, value) {
  await ensureDir(path.dirname(filePath))
  await fs.writeFile(filePath, JSON.stringify(value, null, 2))
}

async function seedPrefs(userDataDir) {
  await writeJson(path.join(userDataDir, 'autodoc-prefs.json'), {
    onboardingComplete: true,
    onboardingStep: 0,
    onboardingMicSettingsOpened: false,
    onboardingScreenSettingsOpened: false,
    launchAtLogin: false,
    analyticsConsent: false,
    experimentalSpeakerDiarization: false,
  })
}

async function seedAutoRecordState(userDataDir) {
  await writeJson(path.join(userDataDir, 'autodoc-auto-record.json'), {
    auto_record_once: ['microsoft_evt_launch'],
    auto_record_series: ['series-roadmap'],
  })
}

function buildTranscriptEntries(meeting) {
  return meeting.transcript.map(([speaker, startMs, endMs, text], index) => ({
    id: `${meeting.id}-transcript-${index + 1}`,
    meetingId: meeting.id,
    speaker,
    text,
    startMs,
    endMs,
    confidence: 0.97,
  }))
}

async function generateAudioTemplate(outputPath) {
  await execFileAsync(ffmpegPath, [
    '-f',
    'lavfi',
    '-i',
    'anullsrc=channel_layout=stereo:sample_rate=48000',
    '-t',
    '1',
    '-c:a',
    'libopus',
    '-b:a',
    '64k',
    '-y',
    outputPath,
  ])
}

// Builds a still "recorded meeting video" frame (matching the product demo
// video styling) and encodes it to a short screen.webm so the app renders its
// real video player in the transcript tab.
async function generateScreenVideo(meetingDir) {
  const pngPath = path.join(meetingDir, 'mock-screen.png')
  const svg = `
    <svg xmlns="http://www.w3.org/2000/svg" width="1280" height="720" viewBox="0 0 1280 720">
      <rect width="1280" height="720" fill="#f7f6ef"/>
      <rect x="64" y="56" width="1088" height="608" rx="28" fill="#ffffff" stroke="#ded8ca" stroke-width="3"/>
      <rect x="64" y="56" width="1088" height="86" rx="28" fill="#eef4ee"/>
      <text x="108" y="112" font-family="-apple-system, BlinkMacSystemFont, Segoe UI, sans-serif" font-size="32" font-weight="700" fill="#2f352f">Product Roadmap Review</text>
      <text x="900" y="112" font-family="-apple-system, BlinkMacSystemFont, Segoe UI, sans-serif" font-size="22" fill="#5B8C6A">Recorded meeting video</text>
      <rect x="108" y="188" width="470" height="256" rx="22" fill="#5B8C6A" opacity="0.16"/>
      <circle cx="186" cy="280" r="44" fill="#5B8C6A"/>
      <text x="156" y="294" font-family="-apple-system, BlinkMacSystemFont, Segoe UI, sans-serif" font-size="32" font-weight="700" fill="#ffffff">CH</text>
      <rect x="228" y="342" width="248" height="18" rx="9" fill="#5B8C6A" opacity="0.55"/>
      <rect x="228" y="382" width="180" height="14" rx="7" fill="#5B8C6A" opacity="0.35"/>
      <rect x="642" y="188" width="470" height="256" rx="22" fill="#7A8FB5" opacity="0.16"/>
      <circle cx="720" cy="280" r="44" fill="#7A8FB5"/>
      <text x="688" y="294" font-family="-apple-system, BlinkMacSystemFont, Segoe UI, sans-serif" font-size="30" font-weight="700" fill="#ffffff">MA</text>
      <rect x="762" y="342" width="248" height="18" rx="9" fill="#7A8FB5" opacity="0.55"/>
      <rect x="762" y="382" width="180" height="14" rx="7" fill="#7A8FB5" opacity="0.35"/>
      <rect x="108" y="498" width="1004" height="82" rx="18" fill="#fafaf7" stroke="#ded8ca"/>
      <text x="142" y="550" font-family="-apple-system, BlinkMacSystemFont, Segoe UI, sans-serif" font-size="24" fill="#2f352f">Decision: move transcript highlights into the Q3 roadmap.</text>
      <circle cx="1064" cy="622" r="10" fill="#C4956A"/>
      <circle cx="1094" cy="622" r="10" fill="#5B8C6A"/>
      <circle cx="1124" cy="622" r="10" fill="#7A8FB5"/>
    </svg>`
  await sharp(Buffer.from(svg)).png().toFile(pngPath)
  await execFileAsync(ffmpegPath, [
    '-y',
    '-loop',
    '1',
    '-i',
    pngPath,
    '-t',
    '4',
    '-c:v',
    'libvpx-vp9',
    '-pix_fmt',
    'yuv420p',
    path.join(meetingDir, 'screen.webm'),
  ])
}

async function seedRecordings(userDataDir) {
  const recordingsDir = path.join(userDataDir, 'recordings')
  await ensureDir(recordingsDir)

  const mediaDir = await fs.mkdtemp(path.join(os.tmpdir(), 'autodoc-marketing-media-'))
  const audioTemplate = path.join(mediaDir, 'audio.webm')
  await generateAudioTemplate(audioTemplate)

  for (const meeting of demoMeetings) {
    const meetingDir = path.join(recordingsDir, meeting.id)
    await ensureDir(meetingDir)
    await writeJson(path.join(meetingDir, 'metadata.json'), {
      sourceName: meeting.sourceName,
      startedAt: meeting.startedAt,
      stoppedAt: meeting.stoppedAt,
      durationSeconds: meeting.durationSeconds,
      calendarTitle: meeting.calendarTitle,
      customTitle: meeting.customTitle,
    })
    await writeJson(path.join(meetingDir, 'transcript.json'), buildTranscriptEntries(meeting))
    await writeJson(path.join(meetingDir, 'segments.json'), meeting.segments)
    await writeJson(path.join(meetingDir, 'speakers.json'), meeting.speakers)
    await fs.copyFile(audioTemplate, path.join(meetingDir, 'mic.webm'))
    if (SCREEN_VIDEO_MEETING_IDS.has(meeting.id)) {
      await generateScreenVideo(meetingDir)
    }
  }
}

async function pause(ms) {
  return await new Promise((resolve) => setTimeout(resolve, ms))
}

async function openRoute(page, route) {
  await page.evaluate((nextHash) => {
    window.location.hash = nextHash
  }, route)
  await pause(400)
}

// Native <video> does not reliably paint its first frame in a still screenshot,
// so overlay the generated recorded-screen frame (with a video chrome) on top of
// the player region — matching the product demo video.
async function injectTranscriptVideoFallback(page, imageDataUrl) {
  await page.evaluate((imageDataUrl) => {
    document.querySelector('#demo-video-fallback')?.remove()
    const video = document.querySelector('video')
    if (!video) return
    const rect = video.getBoundingClientRect()
    const fallback = document.createElement('div')
    fallback.id = 'demo-video-fallback'
    fallback.innerHTML = `
      <img src="${imageDataUrl}" alt="" />
      <div class="demo-video-controls">
        <span class="demo-play">▶</span>
        <span>0:00</span>
        <span class="demo-timeline"><span></span></span>
        <span>47:00</span>
      </div>
    `
    Object.assign(fallback.style, {
      position: 'fixed',
      left: `${rect.left}px`,
      top: `${rect.top}px`,
      width: `${rect.width}px`,
      height: `${rect.height}px`,
      zIndex: '2147483000',
      overflow: 'hidden',
      background: '#141414',
      pointerEvents: 'none',
    })
    const style = document.createElement('style')
    style.id = 'demo-video-fallback-style'
    style.textContent = `
      #demo-video-fallback img {
        display: block;
        width: 100%;
        height: 100%;
        object-fit: cover;
      }
      #demo-video-fallback .demo-video-controls {
        position: absolute;
        left: 0;
        right: 0;
        bottom: 0;
        display: grid;
        grid-template-columns: auto auto 1fr auto;
        align-items: center;
        gap: 12px;
        padding: 12px 18px;
        color: #fff;
        font: 600 13px -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
        background: linear-gradient(180deg, rgba(0, 0, 0, 0), rgba(0, 0, 0, 0.62));
      }
      #demo-video-fallback .demo-play { font-size: 14px; }
      #demo-video-fallback .demo-timeline {
        height: 4px;
        border-radius: 999px;
        background: rgba(255, 255, 255, 0.34);
        overflow: hidden;
      }
      #demo-video-fallback .demo-timeline span {
        display: block;
        width: 6%;
        height: 100%;
        background: #ffffff;
      }
    `
    document.head.appendChild(style)
    document.body.appendChild(fallback)
  }, imageDataUrl)
}

async function setWindowSize(electronApp) {
  await electronApp.evaluate(async ({ BrowserWindow }) => {
    const win = BrowserWindow.getAllWindows()[0]
    if (!win) return
    win.setBounds({ width: 1100, height: 720 })
    win.show()
    win.focus()
  })
}

async function captureShots(page, outputDirPath, mockScreenDataUrl) {
  await openRoute(page, '#/')
  await page.getByRole('heading', { name: 'Upcoming', exact: true }).waitFor()
  await page.screenshot({ path: path.join(outputDirPath, 'dashboard.png') })

  await openRoute(page, '#/recordings/meeting-roadmap-q2')
  await page.getByText('Product Roadmap Review — Q2 Planning', { exact: true }).waitFor()
  await page.screenshot({ path: path.join(outputDirPath, 'meeting-review.png') })

  await page.getByRole('button', { name: 'Transcript', exact: true }).click()
  await page.getByText('We should move transcript highlights into the Q3 roadmap', { exact: false }).waitFor()
  // Recorded-screen video is present, so the app renders its real video player.
  // Overlay the generated frame so the still shows content instead of a black box.
  await page.locator('video').first().waitFor({ state: 'visible', timeout: 10_000 })
  await pause(300)
  if (mockScreenDataUrl) {
    await injectTranscriptVideoFallback(page, mockScreenDataUrl)
  }
  await pause(400)
  await page.screenshot({ path: path.join(outputDirPath, 'transcript-view.png') })
  // Remove the fixed overlay so it doesn't bleed into later screenshots.
  await page.evaluate(() => {
    document.querySelector('#demo-video-fallback')?.remove()
    document.querySelector('#demo-video-fallback-style')?.remove()
  })

  await openRoute(page, '#/search')
  const input = page.getByPlaceholder('Search across all meetings...')
  await input.waitFor()
  await input.fill('launch')
  await page.getByText('matches across', { exact: false }).waitFor()
  await page.getByText('Product Roadmap Review', { exact: false }).waitFor()
  await pause(500)
  await page.screenshot({ path: path.join(outputDirPath, 'search-page.png') })
}

async function main() {
  const userDataDir = await fs.mkdtemp(path.join(os.tmpdir(), 'autodoc-marketing-'))
  console.log(`Using isolated AutoDoc user data at ${userDataDir}`)

  await ensureDir(outputDir)
  await seedPrefs(userDataDir)
  await seedAutoRecordState(userDataDir)
  await seedRecordings(userDataDir)

  const electronApp = await electron.launch({
    args: [mainEntry],
    env: {
      ...process.env,
      NODE_ENV: 'test',
      AUTODOC_E2E: '1',
      AUTODOC_TEST_USER_DATA_DIR: userDataDir,
      AUTODOC_E2E_SCENARIO: JSON.stringify(calendarScenario),
    },
  })

  try {
    const page = await electronApp.firstWindow()
    await setWindowSize(electronApp)
    await page.waitForLoadState('domcontentloaded')
    await page.getByText('AutoDoc', { exact: true }).waitFor()
    const mockScreenPath = path.join(userDataDir, 'recordings', 'meeting-roadmap-q2', 'mock-screen.png')
    let mockScreenDataUrl = null
    if (existsSync(mockScreenPath)) {
      mockScreenDataUrl = `data:image/png;base64,${(await fs.readFile(mockScreenPath)).toString('base64')}`
    }
    await captureShots(page, outputDir, mockScreenDataUrl)
    console.log(`Saved refreshed screenshots to ${outputDir}`)
  } finally {
    await electronApp.close().catch(() => {})
  }
}

main().catch((error) => {
  console.error(error)
  process.exitCode = 1
})
