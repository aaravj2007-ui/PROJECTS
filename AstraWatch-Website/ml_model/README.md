# Aapda Buddy ML model

This is a transfer-learning baseline for classifying satellite images as `clear`, `flood`, or `wildfire`. It is intentionally separate from the live government feeds: the model produces an AI signal, while NDMA, NCS, and INCOIS remain the authoritative sources for published alerts.

## 1. Prepare data

Create this structure and add labelled `.jpg`, `.jpeg`, or `.png` images:

```text
ml_model/data/train/clear/
ml_model/data/train/flood/
ml_model/data/train/wildfire/
ml_model/data/val/clear/
ml_model/data/val/flood/
ml_model/data/val/wildfire/
```

Keep validation images separate from training images. Aim for at least 100–300 images per class to start.

## 2. Train

```powershell
cd ml_model
python -m venv .venv
.venv\Scripts\Activate.ps1
pip install -r requirements.txt
python train.py --data data --epochs 8
```

## 3. Predict

```powershell
python predict.py path\to\satellite-image.jpg
```

The result is JSON with the predicted class, confidence, and all class scores. Do not use this prototype as the sole basis for emergency decisions; verify results with official authorities.
