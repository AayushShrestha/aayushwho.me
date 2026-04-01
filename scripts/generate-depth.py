#!/usr/bin/env python3
"""
Generate a grayscale depth map from hero-image-ref.png using
Depth Anything V2 Small via HuggingFace Transformers.

Usage:
    python scripts/generate-depth.py

Requirements:
    pip install transformers torch pillow numpy
"""

import sys
import numpy as np
import torch
from PIL import Image
from transformers import AutoImageProcessor, AutoModelForDepthEstimation

INPUT    = "public/images/hero-image-ref.png"
OUTPUT   = "public/images/hero-depth.png"
MODEL_ID = "depth-anything/Depth-Anything-V2-Small-hf"

# Target dimensions — must match hero-image.png so UV spaces are identical
TARGET_W, TARGET_H = 2730, 1536


def main() -> None:
    print(f"Loading source image: {INPUT}")
    try:
        source = Image.open(INPUT).convert("RGB")
    except FileNotFoundError:
        sys.exit(f"Error: {INPUT} not found. Run from the project root.")

    print(f"Source size: {source.size[0]}×{source.size[1]}")

    # Use Auto classes instead of pipeline — avoids the image_processor_type
    # registry look-up that causes the ValueError with newer model configs.
    print(f"Loading {MODEL_ID} (downloads ~100 MB on first run)…")
    processor = AutoImageProcessor.from_pretrained(MODEL_ID)
    model     = AutoModelForDepthEstimation.from_pretrained(MODEL_ID)
    model.eval()

    device = "cuda" if torch.cuda.is_available() else "cpu"
    model.to(device)
    print(f"Running on: {device}")

    print("Running depth estimation…")
    inputs = processor(images=source, return_tensors="pt").to(device)
    with torch.no_grad():
        outputs = model(**inputs)

    # post_process_depth_estimation resizes back to the original image size
    post = processor.post_process_depth_estimation(
        outputs,
        target_sizes=[(source.size[1], source.size[0])],  # (H, W)
    )
    depth_tensor = post[0]["predicted_depth"]  # shape: (H, W), float32

    # Normalize to 0–255 grayscale
    # Depth Anything V2 convention: higher value = closer to camera (disparity-style)
    # The subject (foreground) will be bright; background will be dark —
    # which is the correct convention for the WebGL displacement shader.
    arr = depth_tensor.cpu().numpy().astype(np.float32)
    arr_min, arr_max = arr.min(), arr.max()
    if arr_max > arr_min:
        arr = (arr - arr_min) / (arr_max - arr_min) * 255.0
    else:
        arr = np.zeros_like(arr)

    gray = Image.fromarray(arr.astype(np.uint8), mode="L")

    # Resize to match hero-image.png so both textures share identical UV space
    print(f"Resizing to {TARGET_W}×{TARGET_H}…")
    gray = gray.resize((TARGET_W, TARGET_H), Image.LANCZOS)

    gray.save(OUTPUT)
    print(f"\nSaved depth map → {OUTPUT}  ({gray.size[0]}×{gray.size[1]})")
    print(
        "\nTip: open the depth map and verify the subject (Aayush) appears bright\n"
        "and the background is dark. If inverted, uncomment the inversion line in\n"
        "this script:  arr = arr.max() - arr"
    )


if __name__ == "__main__":
    main()
