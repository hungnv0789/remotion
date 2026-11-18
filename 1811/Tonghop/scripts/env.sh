#!/usr/bin/env bash
# Shared environment; source this file from the launchers.
set -Eeuo pipefail
TASK_SCRIPTS_DIR="$(cd -- "$(dirname -- "${BASH_SOURCE[0]}")" && pwd)"
TASK_PROJECT_DIR="$(cd -- "$TASK_SCRIPTS_DIR/../.." && pwd)"

if [[ -n "${NODE_BIN_DIR:-}" ]]; then
  export PATH="$NODE_BIN_DIR:$PATH"
elif ! command -v node >/dev/null 2>&1 || [[ "$(node -p 'process.versions.node.split(".")[0]')" -lt 22 ]]; then
  task_cached_node='/tmp/remotion-node/node-v22.23.4-linux-x64/bin'
  if [[ -x "$task_cached_node/node" ]]; then
    export PATH="$task_cached_node:$PATH"
  fi
fi
if ! command -v node >/dev/null 2>&1 || [[ "$(node -p 'process.versions.node.split(".")[0]')" -lt 22 ]]; then
  printf 'Node.js >=22 is required. Set NODE_BIN_DIR to its bin directory.\n' >&2
  return 1
fi
if [[ -z "${PYTHON_BIN:-}" ]]; then
  if [[ -x /tmp/remotion-asr/bin/python3 ]]; then
    PYTHON_BIN=/tmp/remotion-asr/bin/python3
  else
    PYTHON_BIN="$(command -v python3)"
  fi
fi
export PYTHON_BIN
export FFMPEG_BINARY="${FFMPEG_BINARY:-$TASK_PROJECT_DIR/node_modules/@remotion/compositor-linux-x64-gnu/ffmpeg}"
export FFPROBE_BINARY="${FFPROBE_BINARY:-$TASK_PROJECT_DIR/node_modules/@remotion/compositor-linux-x64-gnu/ffprobe}"
TASK_DEFAULT_MODEL=medium
if [[ -d /tmp/remotion-whisper-medium ]]; then
  TASK_DEFAULT_MODEL=/tmp/remotion-whisper-medium
fi
export TRANSCRIBE_MODEL="${TRANSCRIBE_MODEL:-$TASK_DEFAULT_MODEL}"
cd -- "$TASK_PROJECT_DIR"
