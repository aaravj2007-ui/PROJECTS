"""Train Aapda Buddy's satellite disaster classifier.

Expected folders:
  data/train/{wildfire,flood,clear}/*.jpg
  data/val/{wildfire,flood,clear}/*.jpg
"""
from pathlib import Path
import argparse
import json
import tensorflow as tf

IMAGE_SIZE = (224, 224)
CLASS_NAMES = ["clear", "flood", "wildfire"]


def build_model():
    base = tf.keras.applications.EfficientNetB0(
        include_top=False, weights="imagenet", input_shape=(*IMAGE_SIZE, 3)
    )
    base.trainable = False
    inputs = tf.keras.Input(shape=(*IMAGE_SIZE, 3))
    x = tf.keras.applications.efficientnet.preprocess_input(inputs)
    x = base(x, training=False)
    x = tf.keras.layers.GlobalAveragePooling2D()(x)
    x = tf.keras.layers.Dropout(0.25)(x)
    outputs = tf.keras.layers.Dense(len(CLASS_NAMES), activation="softmax")(x)
    return tf.keras.Model(inputs, outputs)


def main():
    parser = argparse.ArgumentParser()
    parser.add_argument("--data", default="data", help="Dataset root")
    parser.add_argument("--epochs", type=int, default=8)
    parser.add_argument("--output", default="artifacts/aapda_buddy.keras")
    args = parser.parse_args()
    data = Path(args.data)
    train_dir, val_dir = data / "train", data / "val"
    for directory in (train_dir, val_dir):
        if not directory.exists():
            raise SystemExit(f"Missing {directory}. Add class folders: {', '.join(CLASS_NAMES)}")
    train = tf.keras.utils.image_dataset_from_directory(train_dir, class_names=CLASS_NAMES, image_size=IMAGE_SIZE, batch_size=32, shuffle=True, seed=42)
    val = tf.keras.utils.image_dataset_from_directory(val_dir, class_names=CLASS_NAMES, image_size=IMAGE_SIZE, batch_size=32, shuffle=False)
    autotune = tf.data.AUTOTUNE
    train, val = train.prefetch(autotune), val.prefetch(autotune)
    model = build_model()
    model.compile(optimizer=tf.keras.optimizers.Adam(1e-3), loss="sparse_categorical_crossentropy", metrics=["accuracy"])
    output = Path(args.output); output.parent.mkdir(parents=True, exist_ok=True)
    callbacks = [tf.keras.callbacks.EarlyStopping(patience=3, restore_best_weights=True), tf.keras.callbacks.ModelCheckpoint(output, save_best_only=True)]
    history = model.fit(train, validation_data=val, epochs=args.epochs, callbacks=callbacks)
    output.with_suffix(".classes.json").write_text(json.dumps(CLASS_NAMES, indent=2), encoding="utf-8")
    print(f"Saved model to {output}")
    print(f"Best validation accuracy: {max(history.history.get('val_accuracy', [0])):.3f}")


if __name__ == "__main__":
    main()
