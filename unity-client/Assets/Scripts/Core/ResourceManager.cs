using System;

namespace DisasterSimulator.Core
{
    public class ResourceManager
    {
        public float Budget { get; private set; }
        public float Reputation { get; private set; }

        public event Action<float> OnBudgetChanged;
        public event Action<float> OnReputationChanged;

        public ResourceManager(float initialBudget, float initialReputation)
        {
            Budget = initialBudget;
            Reputation = initialReputation;
        }

        public void AddBudget(float amount)
        {
            Budget += amount;
            OnBudgetChanged?.Invoke(Budget);
        }

        public bool SpendBudget(float amount)
        {
            if (Budget >= amount)
            {
                Budget -= amount;
                OnBudgetChanged?.Invoke(Budget);
                return true;
            }
            return false;
        }

        public void AddReputation(float amount)
        {
            Reputation = Math.Min(Reputation + amount, 100);
            OnReputationChanged?.Invoke(Reputation);
        }

        public void LoseReputation(float amount)
        {
            Reputation = Math.Max(Reputation - amount, 0);
            OnReputationChanged?.Invoke(Reputation);
        }
    }
}
