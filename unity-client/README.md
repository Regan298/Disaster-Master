# Disaster Simulator - Unity Client

This directory contains the C# scripts and structure to build a Unity client for the Disaster Simulator. This implementation converts the web-based simulator into a more game-like experience where you manage resources and respond to events.

## Prerequisites

- Unity 2019.4 or later (Recommended: 2021.3 LTS or newer)
- Visual Studio or VS Code

## Setup Instructions

1.  **Create a New Unity Project**
    -   Open Unity Hub and create a new 2D or 3D project.

2.  **Import Scripts**
    -   Copy the `Assets` folder from this directory (`unity-client/Assets`) into your Unity project's root folder.
    -   Unity will compile the scripts automatically.

3.  **Scene Setup**
    -   Create a new Scene (e.g., `GameScene`).
    -   **Game Manager:**
        -   Create an Empty GameObject named `GameManager`.
        -   Add the `GameManager` script component (`Assets/Scripts/Core/GameManager.cs`).
    -   **Simulation Manager:**
        -   Create an Empty GameObject named `SimulationManager`.
        -   Add the `SimulationManager` script component (`Assets/Scripts/Core/SimulationManager.cs`).
        -   **Important:** In the Inspector for `GameManager`, drag the `SimulationManager` GameObject to the `Simulation Manager` field.
        -   In the Inspector for `SimulationManager`, drag the `GameManager` GameObject to the `Game Manager` field.
    -   **UI Manager:**
        -   Create a Canvas (Right-click in Hierarchy -> UI -> Canvas).
        -   Create an Empty GameObject named `UIManager` (can be outside or inside Canvas, but keeping it organized is good).
        -   Add the `UIManager` script component (`Assets/Scripts/UI/UIManager.cs`).
        -   Assign the `UIManager` reference in both `GameManager` and `SimulationManager` inspectors.

4.  **UI Setup**
    -   **HUD:**
        -   Inside the Canvas, create Text elements (UI -> Legacy -> Text or TextMeshPro) for **Time**, **Budget**, and **Reputation**.
        -   Select the `UIManager` GameObject.
        -   Drag these Text elements to the corresponding fields in the `UIManager` component (`Time Text`, `Budget Text`, `Reputation Text`).
    -   **Event Popup:**
        -   Create a UI Image/Panel inside the Canvas to serve as the background for an event popup.
        -   Add the `EventPanel` script component (`Assets/Scripts/UI/EventPanel.cs`) to this Panel.
        -   Add Text elements as children for **Subject**, **Location**, and **Recipient**.
        -   Add Button elements as children for **Respond** and **Ignore**.
        -   Select the Panel. In the `EventPanel` component, drag the Text and Button elements to their respective fields.
        -   **Create Prefab:** Drag this Panel from the Hierarchy into your Project window (e.g., into an `Assets/Prefabs` folder) to create a Prefab.
        -   Delete the Panel from the scene.
        -   **Popup Container:** Create an Empty GameObject inside the Canvas named `PopupContainer` (this determines where popups spawn).
        -   Select the `UIManager` GameObject.
        -   Drag the `EventPanel` Prefab to the `Event Panel Prefab` field.
        -   Drag the `PopupContainer` GameObject to the `Popup Container` field.

5.  **Data Setup**
    -   You need a scenario file. You can use the `scenario.xml` from the `Disaster-Master` project (e.g., inside `DemoScenario.zip`).
    -   Rename the file extension to `.xml` if needed (Unity recognizes `.xml` as `TextAsset`).
    -   Drag the `scenario.xml` file into your Unity Project (e.g., `Assets/Resources`).
    -   Select the `SimulationManager` GameObject in the scene.
    -   Drag the `scenario.xml` asset to the `Scenario File` field in the Inspector.

6.  **Run**
    -   Press Play in Unity.
    -   The simulation should load the XML.
    -   The Time display should update.
    -   Events will appear as popups when their time is reached.
    -   Clicking "Respond" will deduct budget and increase reputation.
    -   Clicking "Ignore" will decrease reputation.

## Game Logic

-   **Budget:** You start with a fixed budget (configurable in `GameManager`). Responding to events costs money.
-   **Reputation:** Represents public trust. Ignoring events lowers reputation. Responding increases it.
-   **Winning/Losing:** Currently, the simulation runs until the scenario ends. You can extend `GameManager` to trigger a "Game Over" if Budget or Reputation drops below zero.

## Customization

-   **Map:** To make it even more game-like, add a map image to the Canvas. In `SimulationManager`, map the `evt.Location` string to `Vector2` coordinates on the map and spawn the Event Popup at that position.
-   **Units:** Instead of a generic "Respond" button, you could implement a system where you deploy specific units (Fire, Police, Medical) depending on the `evt.Type`.
