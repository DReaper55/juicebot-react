# JuiceBot Project

This project demonstrates the use of a prediction model to recommend the best drink to pair with a food. It also shows steps on how to make the drink, and the ingredients needed.

---

## Features
- **Food Search**: Search for a food in the database that you'll like a drink recommendation for.
- **Drink Recommendation**: Predict the drink that best pairs with the selected food.
- **Drink Recipe**: View the steps to take in making the drink.
- **Containerized Application**: The app is fully containerized using Docker and serves static assets with `serve`.

---

## Getting Started

### Prerequisites
- **Node.js**: Install the latest LTS version.
- **Docker**: Install Docker Desktop for containerization.

### Installation
1. Clone the repository:
   ```bash
   git clone https://github.com/DReaper55/juicebot-react.git
   cd juicebot-react
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Run the application locally:
   ```bash
   npm start
   ```

---

## Deployment with Docker

### Building and Running the Docker Image
1. Build the Docker image:
   ```bash
   docker build -t juicebot-react .
   ```

2. Run the container:
   ```bash
   docker run -p 3000:3000 juicebot-react
   ```

3. Access the application in your browser at `http://localhost:3000`.

---

## Directory Structure
```
src/
├── assets/                  # Static assets (models, JSON files, etc.)
├── components/              # React components
├── store/                   # Redux store and slices
├── utils/                   # Helper functions and utilities
└── App.tsx                  # Main application entry point
```

---

## Asset Paths
Static assets are stored in the `public` directory for easy resolution. Update asset paths as follows:
```javascript
export const AssetPaths = {
    DRINK_DATASET: '/assets/drinks.json',
    MODEL: '/assets/model.json',
    MODEL_MEAN: '/assets/mean.json',
    MODEL_SCALE: '/assets/scale.json',
    MODEL_WEIGHTS: '/assets/weights.bin'
};
```

Ensure assets are in the `public/assets` directory for correct loading.

---

## Troubleshooting

### Asset Not Loading
- Verify the asset paths in the browser developer tools.
- Ensure the assets are copied into the `public/assets` directory.

### Docker Issues
- Inspect the container's `dist` directory to verify the presence of static files:
  ```bash
  docker exec -it <container-id> sh
  ls /app/dist/assets
  ```

---

## Future Improvements
- Implement backend APIs for managing dynamic data.
- Improve mobile and desktop responsiveness.
- Add more food data.

---

## Contributing
Feel free to open issues or submit pull requests for any enhancements or fixes.

---

## License
This project is licensed under the MIT License. See the LICENSE file for details.