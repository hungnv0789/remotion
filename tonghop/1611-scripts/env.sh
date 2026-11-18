#!/usr/bin/env bash
set -Eeuo pipefail
TASK_SCRIPTS_DIR="$(cd -- "$(dirname -- "${BASH_SOURCE[0]}")" && pwd)"
TASK_PROJECT_DIR="$(cd -- "$TASK_SCRIPTS_DIR/../../1611" && pwd)"
if [[ -n "${NODE_BIN_DIR:-}" ]]; then
  export PATH="$NODE_BIN_DIR:$PATH"
elif ! command -v node >/dev/null 2>&1 || [[ "$(node -p 'process.versions.node.split(".")[0]')" -lt 22 ]]; then
  task_cached_node='/tmp/remotion-node/node-v22.23.4-linux-x64/bin'
  if [[ -x "$task_cached_node/node" ]]; then export PATH="$task_cached_node:$PATH"; fi
fi
if ! command -v node >/dev/null 2>&1 || [[ "$(node -p 'process.versions.node.split(".")[0]')" -lt 22 ]]; then
  printf 'Node.js >=22 is required; set NODE_BIN_DIR.\n' >&2
  return 1
fi
if [[ -z "${ASR_PYTHON_BIN:-}" ]]; then
  if [[ -n "${PYTHON_BIN:-}" ]]; then ASR_PYTHON_BIN="$PYTHON_BIN"
  elif [[ -x /tmp/remotion-asr/bin/python3 ]]; then ASR_PYTHON_BIN=/tmp/remotion-asr/bin/python3
  else ASR_PYTHON_BIN="$(command -v python3)"; fi
fi
if [[ -z "${TTS_PYTHON_BIN:-}" ]]; then
  if [[ -x /tmp/vieneu-venv/bin/python ]]; then TTS_PYTHON_BIN=/tmp/vieneu-venv/bin/python
  else TTS_PYTHON_BIN="$(command -v python3)"; fi
fi
export ASR_PYTHON_BIN TTS_PYTHON_BIN
export PYTHON_BIN="${PYTHON_BIN:-$ASR_PYTHON_BIN}"
# A repository-level binary can audit old media even before npm ci repairs dependencies.
for binary in ffmpeg ffprobe; do
  task_var=FFMPEG_BINARY
  if [[ "$binary" == ffprobe ]]; then task_var=FFPROBE_BINARY; fi
  if [[ -z "${!task_var:-}" ]]; then
    task_bin="$TASK_PROJECT_DIR/node_modules/@remotion/compositor-linux-x64-gnu/$binary"
    if [[ ! -x "$task_bin" ]]; then task_bin="$TASK_PROJECT_DIR/../node_modules/@remotion/compositor-linux-x64-gnu/$binary"; fi
    if [[ ! -x "$task_bin" ]] && command -v "$binary" >/dev/null 2>&1; then task_bin="$(command -v "$binary")"; fi
    export "$task_var=$task_bin"
  fi
done
TASK_DEFAULT_MODEL=small
if [[ -d /tmp/remotion-whisper-small ]]; then TASK_DEFAULT_MODEL=/tmp/remotion-whisper-small; fi
export ALIGN_MODEL="${ALIGN_MODEL:-$TASK_DEFAULT_MODEL}"
export VOICE_NAME="${VOICE_NAME:-Ngọc Huyền}"
export TTS_TEMPO="${TTS_TEMPO:-1.12}"
export TTS_THREADS="${TTS_THREADS:-3}"
cd -- "$TASK_PROJECT_DIR"
