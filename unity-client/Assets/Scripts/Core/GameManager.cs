using UnityEngine;
using DisasterSimulator.UI;

namespace DisasterSimulator.Core
{
    public class GameManager : MonoBehaviour
    {
        public static GameManager Instance { get; private set; }

        [Header("Configuration")]
        public float initialBudget = 1000f;
        public float initialReputation = 50f;

        [Header("References")]
        public SimulationManager simulationManager;
        public UIManager uiManager;

        public ResourceManager ResourceManager { get; private set; }

        private void Awake()
        {
            if (Instance == null)
            {
                Instance = this;
                DontDestroyOnLoad(gameObject);
            }
            else
            {
                Destroy(gameObject);
            }

            ResourceManager = new ResourceManager(initialBudget, initialReputation);
        }

        private void Start()
        {
            if (uiManager != null)
            {
                uiManager.UpdateBudget(ResourceManager.Budget);
                uiManager.UpdateReputation(ResourceManager.Reputation);

                ResourceManager.OnBudgetChanged += uiManager.UpdateBudget;
                ResourceManager.OnReputationChanged += uiManager.UpdateReputation;
            }
        }
    }
}
