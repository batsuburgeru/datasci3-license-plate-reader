from flask import Flask, request, jsonify
from ultralytics import YOLO
import base64
from io import BytesIO
from PIL import Image
from flask_cors import CORS

# Initialize Flask app
app = Flask(__name__)
CORS(app)

# Load YOLOv8 license plate detection model (replace with your model path)
model = YOLO("best.pt")

@app.route('/')
def index():
  return 'Server is running'

def decode_base64_image(frame_data):
  image_bytes = base64.b64decode(frame_data)
  image = Image.open(BytesIO(image_bytes))
  return image

def extract_bounding_boxes(results):
  bounding_boxes = []
  for r in results:
    boxes = r.boxes  # Assuming 'boxes' attribute holds bounding boxes

    for box in boxes:
      x1, y1, x2, y2 = box.xyxy[0]  # Access coordinates via xyxy
      bounding_boxes.append({
          "x": int(x1),
          "y": int(y1),
          "width": int(x2 - x1),  # Calculate width
          "height": int(y2 - y1),  # Calculate height
      })
  return bounding_boxes

@app.route("/predict", methods=["POST"])
def predict():
  try:
    # Get frame data from request
    frame_data = request.json["frame"]

    # Process frame data (e.g., decode base64)
    try:
      frame = decode_base64_image(frame_data)
    except Exception as e:
      print(f"Error decoding base64 image: {e}")
      return jsonify({"error": "Error decoding image"}), 500

    # Perform license plate detection using YOLOv8
    try:
      results = model(frame)
      print(results)  # Print complete results object for debugging

      # Check if results exist (no predictions)
      if not results:
        return jsonify({"error": "No license plates detected"}), 404

      # Extract bounding boxes from results
      predictions = extract_bounding_boxes(results)
      print(f"Predictions: {predictions}")  # Print extracted bounding boxes for debugging

      return jsonify({"predictions": predictions})
    
    except Exception as e:
      print(f"Error performing license plate detection: {e}")
      # Check for YOLOv8-specific errors
      if "no detections" in str(e).lower():
        return jsonify({"error": "No license plates detected"}), 404
      else:
        return jsonify({"error": "Error processing frame"}), 500

  except Exception as e:
    print(f"Unexpected error: {e}")
    return jsonify({"error": "Internal server error"}), 500

if __name__ == "__main__":
  app.run(host='0.0.0.0', debug=True)
