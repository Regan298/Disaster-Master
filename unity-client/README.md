# Disaster Simulator - Unity Client

This directory contains a complete Unity project for the Disaster Simulator. This implementation converts the web-based simulator into a more game-like experience where you manage resources and respond to events.

## Prerequisites

- Unity 2021.3 LTS or newer.

## Getting Started

1.  **Open the Project**
    -   Open Unity Hub.
    -   Click "Open" and select the `unity-client` folder.
    -   Unity will import the assets (this may take a few minutes).

2.  **Open the Main Scene**
    -   In the Project window, navigate to `Assets/Scenes`.
    -   Double-click `MainScene` to open it.

3.  **Run the Simulation**
    -   Press Play.
    -   The simulation logic will run, and the time will update.
    -   Event popups will appear at the scheduled times.

## Troubleshooting & Customization

The provided `MainScene` is a starter template. You may notice:
-   **Event Popups look blank:** The `EventPanel` object (under `Canvas`) is a placeholder. You need to customize its visual appearance:
    -   Select the `EventPanel` object in the Hierarchy (it might be disabled/greyed out). Enable it temporarily to edit.
    -   Add UI Text elements as children for the **Subject**, **Location**, and **Recipient**.
    -   Add UI Button elements as children for **Respond** and **Ignore**.
    -   Drag these new UI elements into the corresponding fields in the `EventPanel` script component in the Inspector.
    -   Once customized, disable the `EventPanel` object again (the script uses it as a template to spawn copies).

-   **Buttons not clicking:** If the UI buttons are unresponsive, ensure there is an **EventSystem** in the scene.
    -   If missing: Right-click in the Hierarchy window -> **UI** -> **Event System**.

-   **Scenario Data:** The project is set up to load `scenario.xml`. Ensure you have a valid `scenario.xml` file assigned to the `SimulationManager` component in the Inspector. If it's missing:
    -   Import your `scenario.xml` into `Assets/Resources` (rename it to `.xml` extension if needed).
    -   Drag it into the `Scenario File` field of the `SimulationManager`.

## Project Structure

-   `Assets/Scripts/Data`: Data classes for XML parsing.
-   `Assets/Scripts/Core`: Game logic (GameManager, SimulationManager, ResourceManager).
-   `Assets/Scripts/UI`: UI management scripts.
-   `Assets/Scenes`: Contains the `MainScene`.

## Game Logic

-   **Budget:** You start with a fixed budget. Responding to events costs money.
-   **Reputation:** Represents public trust. Ignoring events lowers reputation. Responding increases it.
