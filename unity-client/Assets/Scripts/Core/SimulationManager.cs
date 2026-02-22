using UnityEngine;
using System.Collections.Generic;
using System.IO;
using System.Xml.Serialization;
using DisasterSimulator.Data;
using DisasterSimulator.UI;

namespace DisasterSimulator.Core
{
    public class SimulationManager : MonoBehaviour
    {
        [Header("Configuration")]
        public TextAsset scenarioFile;
        public float timeScale = 1.0f;

        [Header("References")]
        public UIManager uiManager;
        public GameManager gameManager;

        private Scenario currentScenario;
        private float currentTime;
        private bool isRunning;
        private HashSet<Event> triggeredEvents = new HashSet<Event>();

        public float CurrentTime => currentTime;

        void Start()
        {
            if (scenarioFile != null)
            {
                LoadScenario(scenarioFile.text);
            }
        }

        public void LoadScenario(string xmlContent)
        {
            XmlSerializer serializer = new XmlSerializer(typeof(Scenario));
            using (StringReader reader = new StringReader(xmlContent))
            {
                currentScenario = (Scenario)serializer.Deserialize(reader);
            }

            currentTime = 0;
            triggeredEvents.Clear();
            isRunning = true;
            Debug.Log($"Loaded Scenario: {currentScenario.Name}");
        }

        void Update()
        {
            if (!isRunning || currentScenario == null) return;

            currentTime += Time.deltaTime * timeScale;

            // Update UI time
            if (uiManager != null)
            {
                uiManager.UpdateTime(TimeUtils.FormatTime(currentTime));
            }

            CheckEvents();
        }

        void CheckEvents()
        {
            if (currentScenario.Events == null) return;

            foreach (var evt in currentScenario.Events)
            {
                if (triggeredEvents.Contains(evt)) continue;

                float eventTime = TimeUtils.ParseTime(evt.TimeString);
                if (currentTime >= eventTime)
                {
                    TriggerEvent(evt);
                }
            }
        }

        void TriggerEvent(Event evt)
        {
            triggeredEvents.Add(evt);
            Debug.Log($"Event Triggered: {evt.Subject} at {evt.Location}");

            if (uiManager != null)
            {
                uiManager.ShowEventPopup(evt);
            }
        }

        public void StopSimulation()
        {
            isRunning = false;
        }

        public void ResumeSimulation()
        {
            isRunning = true;
        }
    }
}
