"""Run Aapda Buddy's trained classifier on one satellite image."""
from pathlib import Path
import argparse
import json
import tensorflow as tf

IMAGE_SIZE = (224, 224)


def main():
    parser = argparse.ArgumentParser()
    parser.add_argument("image")
    parser.add_argument("--model", default="artifacts/aapda_buddy.keras")
    args = parser.parse_args()
    model = tf.keras.models.load_model(args.model)
    classes_path = Path(args.model).with_suffix(".classes.json")
    classes = json.loads(classes_path.read_text(encoding="utf-8")) if classes_path.exists() else ["clear", "flood", "wildfire"]
    image = tf.keras.utils.load_img(args.image, target_size=IMAGE_SIZE)
    tensor = tf.expand_dims(tf.keras.utils.img_to_array(image), 0)
    scores = model.predict(tensor, verbose=0)[0]
    ranked = sorted(zip(classes, scores.tolist()), key=lambda item: item[1], reverse=True)
    print(json.dumps({"prediction": ranked[0][0], "confidence": round(ranked[0][1], 4), "scores": {name: round(score, 4) for name, score in ranked}}, indent=2))


if __name__ == "__main__":
    main()
