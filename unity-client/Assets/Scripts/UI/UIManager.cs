using UnityEngine;
using UnityEngine.UI;
using DisasterSimulator.Data;
using DisasterSimulator.Core;

namespace DisasterSimulator.UI
{
    public class UIManager : MonoBehaviour
    {
        [Header("HUD")]
        public Text timeText;
        public Text budgetText;
        public Text reputationText;

        [Header("Popups")]
        public GameObject eventPanelPrefab; // Assign a prefab with EventPanel script
        public Transform popupContainer;

        public void UpdateTime(string timeString)
        {
            if (timeText != null) timeText.text = timeString;
        }

        public void UpdateBudget(float budget)
        {
            if (budgetText != null) budgetText.text = $"Budget: ${budget}";
        }

        public void UpdateReputation(float reputation)
        {
            if (reputationText != null) reputationText.text = $"Reputation: {reputation:F1}%";
        }

        public void ShowEventPopup(Event evt)
        {
            if (eventPanelPrefab != null && popupContainer != null)
            {
                GameObject panelObj = Instantiate(eventPanelPrefab, popupContainer);
                EventPanel panel = panelObj.GetComponent<EventPanel>();
                if (panel != null)
                {
                    panel.Setup(evt);
                }
            }
        }
    }
}
