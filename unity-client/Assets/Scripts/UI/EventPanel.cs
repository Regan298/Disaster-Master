using UnityEngine;
using UnityEngine.UI;
using DisasterSimulator.Data;
using DisasterSimulator.Core;

namespace DisasterSimulator.UI
{
    public class EventPanel : MonoBehaviour
    {
        public Text subjectText;
        public Text locationText;
        public Text recipientText;
        public Button respondButton;
        public Button ignoreButton;

        private Event currentEvent;

        public void Setup(Event evt)
        {
            currentEvent = evt;
            if (subjectText != null) subjectText.text = evt.Subject;
            if (locationText != null) locationText.text = evt.Location;
            if (recipientText != null) recipientText.text = evt.Recipient;

            if (respondButton != null)
            {
                respondButton.onClick.RemoveAllListeners();
                respondButton.onClick.AddListener(OnRespond);
            }

            if (ignoreButton != null)
            {
                ignoreButton.onClick.RemoveAllListeners();
                ignoreButton.onClick.AddListener(OnIgnore);
            }
        }

        void OnRespond()
        {
            // Simple logic: Spend money, gain reputation
            if (GameManager.Instance != null && GameManager.Instance.ResourceManager != null)
            {
                if (GameManager.Instance.ResourceManager.SpendBudget(100))
                {
                    GameManager.Instance.ResourceManager.AddReputation(10);
                    Debug.Log("Responded to event!");
                    Destroy(gameObject);
                }
                else
                {
                    Debug.Log("Not enough budget!");
                    // Maybe show some UI feedback here
                }
            }
        }

        void OnIgnore()
        {
            if (GameManager.Instance != null && GameManager.Instance.ResourceManager != null)
            {
                GameManager.Instance.ResourceManager.LoseReputation(5);
                Debug.Log("Ignored event.");
            }
            Destroy(gameObject);
        }
    }
}
